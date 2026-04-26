#!/usr/bin/env node
// verify-links.mjs
//
// Walks an Obsidian vault, parses every callout, and verifies the wikilink
// graph against the conventions in co.md:
//
//   1. Every link target should resolve (file + optional block anchor).
//   2. Within a single callout, no concept may be linked twice.
//   3. Within a single callout, no link should be redundant under transitive
//      closure: if target T is reachable from another link in the same callout
//      by following the link graph, the direct link to T is redundant.
//
// Usage:
//   node scripts/verify-links.mjs                    # dry-run report
//   node scripts/verify-links.mjs --fix              # rewrite redundant links
//   node scripts/verify-links.mjs --vault <path>     # vault root (default: cwd parent)
//   node scripts/verify-links.mjs --max-depth 8      # cap graph traversal depth
//
// No external dependencies. Run with Node >= 18.

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative, basename, dirname, sep, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ===========================================================================
// CLI
// ===========================================================================

const argv = process.argv.slice(2);

function flagValue(name) {
  const i = argv.indexOf(name);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : null;
}

function defaultVaultRoot() {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, '..');
}

const opts = {
  fix: argv.includes('--fix'),
  vault: flagValue('--vault') ?? defaultVaultRoot(),
  maxDepth: Number(flagValue('--max-depth') ?? 8),
  verbose: argv.includes('--verbose') || argv.includes('-v'),
};

// ===========================================================================
// Vault walk
// ===========================================================================

const SKIP_DIRS = new Set(['.obsidian', '.git', '.trash', 'node_modules', 'Assets']);

async function walkMarkdown(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walkMarkdown(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

// ===========================================================================
// Markdown parsing
// ===========================================================================
//
// A "context" is the unit inside which we evaluate transitive-closure rules.
// Every callout is one context. Loose paragraphs between callouts are also
// captured (so stray links can be reported), but only callouts get block
// anchors.

const CALLOUT_HEAD_RE = /^>\s*\[!(\w+)\]\s*(.*)$/;
const ANCHOR_LINE_RE  = /^\^([\w-]+)\s*$/;
const WIKILINK_RE     = /\[\[([^\[\]]+?)\]\]/g;

function parseCallouts(text) {
  const lines = text.split('\n');
  const contexts = [];
  let active = null;

  const closeActive = (endLine) => {
    if (!active) return;
    active.endLine = endLine;
    // Look ahead past blank lines for a trailing `^anchor` line.
    let j = endLine + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    const anchorMatch = j < lines.length ? lines[j].match(ANCHOR_LINE_RE) : null;
    if (anchorMatch) active.anchor = anchorMatch[1];
    active.links = parseLinks(active.text);
    contexts.push(active);
    active = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const head = line.match(CALLOUT_HEAD_RE);

    if (head) {
      closeActive(i - 1);
      active = {
        type: head[1],
        name: head[2].trim(),
        startLine: i,
        endLine: i,
        anchor: null,
        text: line + '\n',
        links: [],
      };
    } else if (active && line.startsWith('>')) {
      active.text += line + '\n';
    } else if (active) {
      closeActive(i - 1);
    }
  }
  closeActive(lines.length - 1);

  return contexts;
}

// Parses every wikilink in a chunk of text.
//
// Recognised forms:
//   [[Target]]
//   [[Target|Display]]
//   [[Target#Heading]]
//   [[Target#^anchor]]
//   [[Target#^anchor|Display]]
//   [[#^anchor|Display]]                (self-file link)
function parseLinks(text) {
  const out = [];
  WIKILINK_RE.lastIndex = 0;
  for (const m of text.matchAll(WIKILINK_RE)) {
    const inner = m[1];
    const pipeAt = inner.indexOf('|');
    const targetPart = pipeAt >= 0 ? inner.slice(0, pipeAt) : inner;
    const display    = pipeAt >= 0 ? inner.slice(pipeAt + 1) : null;

    const hashAt = targetPart.indexOf('#');
    const file   = (hashAt >= 0 ? targetPart.slice(0, hashAt) : targetPart).trim();
    let anchor   = null;
    let heading  = null;
    if (hashAt >= 0) {
      const tail = targetPart.slice(hashAt + 1).trim();
      if (tail.startsWith('^')) anchor  = tail.slice(1);
      else                      heading = tail;
    }

    out.push({ raw: m[0], file, anchor, heading, display, index: m.index });
  }
  return out;
}

// ===========================================================================
// Vault index
// ===========================================================================

class VaultIndex {
  constructor(vaultRoot) {
    this.root = vaultRoot;
    this.byPath = new Map();      // absPath -> FileEntry
    this.byBasename = new Map();  // basename (no .md) -> [absPath, ...]
  }

  async load() {
    for (const abs of await walkMarkdown(this.root)) {
      const text = await readFile(abs, 'utf8');
      const entry = {
        absPath: abs,
        relPath: relative(this.root, abs),
        basename: basename(abs, '.md'),
        contexts: parseCallouts(text),
      };
      this.byPath.set(abs, entry);
      const list = this.byBasename.get(entry.basename) ?? [];
      list.push(abs);
      this.byBasename.set(entry.basename, list);
    }
  }

  // Resolves a link's `file` (basename or partial path) to an absolute path.
  // Returns null if no markdown file matches.
  resolveFile(linkFile, fromAbs) {
    if (!linkFile) return fromAbs;     // self-link: [[#^anchor]]
    const base = basename(linkFile, '.md');
    const candidates = this.byBasename.get(base);
    if (!candidates?.length) return null;
    if (candidates.length === 1) return candidates[0];

    // Multiple basename hits. Prefer one whose path ends with the link's path.
    const wantSuffix = linkFile.endsWith('.md') ? linkFile : linkFile + '.md';
    const suffixHits = candidates.filter(
      (p) => p.endsWith(sep + wantSuffix) || p.endsWith('/' + wantSuffix)
    );
    if (suffixHits.length === 1) return suffixHits[0];

    // Fall back to the candidate sharing the longest path prefix with `fromAbs`.
    const fromDir = dirname(fromAbs);
    return [...candidates].sort(
      (a, b) => commonPrefixLen(b, fromDir) - commonPrefixLen(a, fromDir)
    )[0];
  }

  // Finds the callout in `absPath` whose anchor matches. Null if not found.
  resolveAnchor(absPath, anchor) {
    if (!anchor) return null;
    return this.byPath.get(absPath)?.contexts.find((c) => c.anchor === anchor) ?? null;
  }
}

function commonPrefixLen(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

// ===========================================================================
// Link graph
// ===========================================================================
//
// A graph node is a (file, anchor) pair. Outgoing edges of a node are the
// wikilinks inside that callout. If `anchor` is null, the node represents the
// whole file and edges are the union of links across every callout in it.

const nodeKey = (absPath, anchor) => `${absPath}::${anchor ?? ''}`;

class LinkGraph {
  constructor(vault, maxDepth) {
    this.vault = vault;
    this.maxDepth = maxDepth;
  }

  edgesFrom(absPath, anchor) {
    const file = this.vault.byPath.get(absPath);
    if (!file) return [];
    if (anchor) {
      const ctx = this.vault.resolveAnchor(absPath, anchor);
      return ctx ? ctx.links : [];
    }
    return file.contexts.flatMap((c) => c.links);
  }

  // Resolves a link to its target node. Returns null if unresolved.
  targetNode(link, fromAbs) {
    const abs = this.vault.resolveFile(link.file, fromAbs);
    return abs ? { abs, anchor: link.anchor, key: nodeKey(abs, link.anchor) } : null;
  }

  // DFS reachability. Returns the set of node keys reachable from `start`,
  // including `start` itself. Used to answer the boolean question
  // "is target T reachable from link L?" with minimal memory overhead.
  reachableFrom(startNode) {
    const seen = new Set();
    const stack = [{ ...startNode, depth: 0 }];
    while (stack.length) {
      const { abs, anchor, depth, key } = stack.pop();
      if (seen.has(key)) continue;
      seen.add(key);
      if (depth >= this.maxDepth) continue;
      for (const link of this.edgesFrom(abs, anchor)) {
        const next = this.targetNode(link, abs);
        if (next && !seen.has(next.key)) {
          stack.push({ ...next, depth: depth + 1 });
        }
      }
    }
    return seen;
  }

  // BFS shortest path. Used for human-readable evidence: a 2-hop explanation
  // is far more convincing than a 6-hop one even though both confirm
  // reachability. BFS guarantees the shortest such path.
  shortestPath(startNode, targetKey) {
    if (startNode.key === targetKey) return [startNode];
    const seen = new Set([startNode.key]);
    const queue = [[startNode]];
    while (queue.length) {
      const path = queue.shift();
      if (path.length > this.maxDepth) continue;
      const tail = path[path.length - 1];
      for (const link of this.edgesFrom(tail.abs, tail.anchor)) {
        const next = this.targetNode(link, tail.abs);
        if (!next || seen.has(next.key)) continue;
        if (next.key === targetKey) return [...path, next];
        seen.add(next.key);
        queue.push([...path, next]);
      }
    }
    return null;
  }
}

// ===========================================================================
// Diagnostics
// ===========================================================================
//
// For every callout we emit findings of four kinds:
//   broken-file    target file does not exist in the vault
//   broken-anchor  target file exists but anchor does not
//   duplicate      same target linked twice in this callout
//   redundant      target reachable transitively via another link in this callout

function diagnose(vault, graph) {
  const findings = [];
  for (const file of vault.byPath.values()) {
    for (const ctx of file.contexts) {
      diagnoseCallout(file, ctx, vault, graph, findings);
    }
  }
  return findings;
}

function diagnoseCallout(file, ctx, vault, graph, findings) {
  const links = ctx.links;
  if (links.length === 0) return;

  // Pre-resolve every link to its target node (or null).
  const targets = links.map((link) => graph.targetNode(link, file.absPath));

  // 1. Broken links.
  links.forEach((link, i) => {
    if (!targets[i]) {
      findings.push({ file, ctx, kind: 'broken-file', link });
      return;
    }
    if (link.anchor && !vault.resolveAnchor(targets[i].abs, link.anchor)) {
      findings.push({ file, ctx, kind: 'broken-anchor', link });
    }
  });

  // 2. Duplicate links: same resolved target appears more than once.
  const firstSeen = new Map();   // key -> first link
  links.forEach((link, i) => {
    const t = targets[i];
    if (!t) return;
    if (firstSeen.has(t.key)) {
      findings.push({
        file, ctx, kind: 'duplicate', link,
        evidence: { firstRaw: firstSeen.get(t.key).raw },
      });
    } else {
      firstSeen.set(t.key, link);
    }
  });

  // 3. Redundant under transitive closure. For each link L_i, ask whether
  // any *other* link L_j reaches L_i's target through one or more hops. If
  // so, L_i is implied by L_j and can be dropped.
  links.forEach((link, i) => {
    const myTarget = targets[i];
    if (!myTarget) return;
    for (let j = 0; j < links.length; j++) {
      if (i === j) continue;
      const otherTarget = targets[j];
      if (!otherTarget || otherTarget.key === myTarget.key) continue;
      const reachable = graph.reachableFrom(otherTarget);
      if (!reachable.has(myTarget.key)) continue;
      const path = graph.shortestPath(otherTarget, myTarget.key);
      if (path && path.length > 1) {
        findings.push({
          file, ctx, kind: 'redundant', link,
          evidence: { via: links[j], path },
        });
        return;   // one redundancy reason per link is enough
      }
    }
  });
}

// ===========================================================================
// Reporting
// ===========================================================================

function formatPath(vault, path) {
  return path
    .map(({ abs, anchor }) => {
      const rel = relative(vault.root, abs);
      return anchor ? `${rel}#^${anchor}` : rel;
    })
    .join(' -> ');
}

function ctxLabel(ctx) {
  if (ctx.anchor) return `^${ctx.anchor} (${ctx.name || ctx.type})`;
  return `(prose @L${ctx.startLine + 1})`;
}

function report(findings, vault) {
  if (findings.length === 0) {
    console.log('No issues found.');
    return;
  }

  const byFile = new Map();
  for (const f of findings) {
    const list = byFile.get(f.file.relPath) ?? [];
    list.push(f);
    byFile.set(f.file.relPath, list);
  }

  for (const [rel, list] of [...byFile.entries()].sort()) {
    console.log(`\n[FILE] ${rel}`);
    const byCtx = new Map();
    for (const f of list) {
      const k = ctxLabel(f.ctx);
      const arr = byCtx.get(k) ?? [];
      arr.push(f);
      byCtx.set(k, arr);
    }
    for (const [label, arr] of byCtx) {
      console.log(`  [CALLOUT] ${label}`);
      for (const f of arr) printFinding(f, vault);
    }
  }
  console.log(`\n${findings.length} finding(s).`);
}

function printFinding(f, vault) {
  switch (f.kind) {
    case 'broken-file':
      console.log(`    BROKEN-FILE   ${f.link.raw}`);
      break;
    case 'broken-anchor':
      console.log(`    BROKEN-ANCHOR ${f.link.raw}`);
      break;
    case 'duplicate':
      console.log(`    DUPLICATE     ${f.link.raw}  (already linked: ${f.evidence.firstRaw})`);
      break;
    case 'redundant':
      console.log(`    REDUNDANT     ${f.link.raw}`);
      console.log(`                  via ${f.evidence.via.raw}: ${formatPath(vault, f.evidence.path)}`);
      break;
  }
}

// ===========================================================================
// Auto-fix
// ===========================================================================
//
// Replaces redundant or duplicate wikilinks with their plain display text.
//   [[X#^a|Display]] -> Display
//   [[X|Display]]    -> Display
//   [[X#^a]]         -> X
//   [[X]]            -> X

function unlink(raw) {
  const inner = raw.slice(2, -2);
  const pipeAt = inner.indexOf('|');
  if (pipeAt >= 0) return inner.slice(pipeAt + 1);
  const hashAt = inner.indexOf('#');
  return hashAt >= 0 ? inner.slice(0, hashAt) : inner;
}

async function applyFixes(findings, vault) {
  // Group fixable findings (redundant + duplicate) by file, then by callout.
  const byFile = new Map();
  for (const f of findings) {
    if (f.kind !== 'redundant' && f.kind !== 'duplicate') continue;
    const fileEdits = byFile.get(f.file.absPath) ?? new Map();
    const ctxEdits = fileEdits.get(f.ctx) ?? [];
    ctxEdits.push(f.link.raw);
    fileEdits.set(f.ctx, ctxEdits);
    byFile.set(f.file.absPath, fileEdits);
  }

  for (const [abs, fileEdits] of byFile) {
    let text = await readFile(abs, 'utf8');
    for (const [ctx, raws] of fileEdits) {
      const before = ctx.text;
      let after = before;
      for (const raw of raws) {
        const idx = after.indexOf(raw);
        if (idx >= 0) {
          after = after.slice(0, idx) + unlink(raw) + after.slice(idx + raw.length);
        }
      }
      if (after !== before) {
        text = text.replace(before, after);
        ctx.text = after;   // keep in-memory model in sync
      }
    }
    await writeFile(abs, text, 'utf8');
    console.log(`  fixed ${relative(vault.root, abs)}`);
  }
}

// ===========================================================================
// Main
// ===========================================================================

(async () => {
  const stats = await stat(opts.vault).catch(() => null);
  if (!stats?.isDirectory()) {
    console.error(`Vault not found: ${opts.vault}`);
    process.exit(1);
  }
  if (opts.verbose) console.error(`Vault: ${opts.vault}`);

  const vault = new VaultIndex(opts.vault);
  await vault.load();
  if (opts.verbose) console.error(`Indexed ${vault.byPath.size} markdown files.`);

  const graph = new LinkGraph(vault, opts.maxDepth);
  const findings = diagnose(vault, graph);
  report(findings, vault);

  if (opts.fix) {
    console.log('\nApplying fixes (REDUNDANT and DUPLICATE only)...');
    await applyFixes(findings, vault);
  } else {
    console.log('\nDry run. Pass --fix to rewrite files.');
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
