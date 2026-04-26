# Notebase Conventions

Rules for any LLM agent contributing to this Obsidian notebase. The goal is a clean knowledge graph in which every concept is linked exactly once per context, and every note reflects a single, well-placed idea.

## Folder Structure

- Top-level subjects: `Math/` and `Physics/`.
- Inside each subject, content is organised by module: `Module 1 - …/`, `Module 2 - …/`, etc.
- File names use hierarchical section numbering matching the module: `4.1.2 - Second Order Linear ODEs.md`, `6.4 - Position and Momentum.md`.
- Place new files in the module folder where the topic naturally lives. Physics applications go under `Physics/`; pure mathematical machinery goes under `Math/`.

## Callouts

Use Obsidian callouts for every definition, theorem, example, axiom, or corollary:

- `> [!def]` for definitions
- `> [!thm]` for theorems
- `> [!cor]` for corollaries
- `> [!exm]` or `> [!example]` for worked examples
- `> [!axm]` for axioms or postulates

Each callout block must end with a block-ID anchor on its own line:

```
^anchorname
```

Use a short descriptive slug (`^xp-comm`, `^step-above`) when adding new anchors. Reuse existing hashcodes (`^b09447`) only when editing in place.

## Proofs

Proofs sit *outside* the callout they prove and reference its anchor:

```
`\begin{proof}`@[[#^anchor]]
...proof content...
`\end{proof}`
```

A proof can contain display math, multiple paragraphs, and links, but never another callout.

## Writing Style

Every callout should pair a **plain English description** with a **formal mathematical definition in LaTeX**. The reader should be able to grasp the idea from the prose alone, then turn to the math for precision.

A good definition reads like a short paragraph in natural language, naming the object, explaining what it does, and noting why it matters. Then the formal statement appears in display math:

```
> [!def] Probability Current
> Describes the flow of probability density through space, analogous to the flow of a fluid. For a wavefunction $\psi(x,t)$, the current $S$ measures how much probability passes a point per unit time.
> $$S=\frac{\hbar}{2mi}\left(\psi^{*}\frac{\partial \psi}{\partial x}-\psi\frac{\partial \psi^{*}}{\partial x}\right)$$
```

Avoid jargon-only sentences. If a term needs to be introduced, define it with words first, then with symbols.

### Punctuation and tone

- **No em dashes anywhere.** Use commas, parentheses, semicolons, or split into two sentences.
- No bolding for emphasis inside callouts. Bold only the **defined term** itself when it first appears in a definition.
- No emojis.
- Section headings are sentence case. Defined-concept names are Title Case.
- Prefer flowing prose over bullet lists inside callouts. Use lists only for genuinely enumerated content.
- Display math for any equation worth referencing. Inline math for one-off symbols.


### Math conventions

- Inline math with `$...$`, display math with `$$...$$`.
- Use `\begin{align}` for sequences of equations sharing context. Use `\begin{cases}` for piecewise definitions.
- Vectors are `\mathbf{v}`. Operators are `\hat{O}`. Bra and ket as `\bra{·}`, `\ket{·}`, `\braket{·|·}`.
- **Display math derivatives** use full Leibniz notation: $\frac{d}{dx}$, $\frac{\partial^{2}\psi}{\partial x^{2}}$. This makes the differentiated variable explicit when the equation is the focal point of the callout.
- **Inline derivatives in math notes** use prime notation: $y'$, $y''$, $f'(x)$. Reserve dot notation $\dot{x}$, $\ddot{x}$ for cases that explicitly contrast $x$ derivatives with $t$ derivatives (typical in physics, where $\dot{x}$ unambiguously means $dx/dt$).
- Use dfrac in a case block
- Use inline fraction like $y/x$ rather than `\frac` in inline math 

## Wikilinks

Wikilinks are how the knowledge graph forms. They require care.

### Always link concepts

Whenever a note references a defined concept, link to it with `[[File#^anchor|Display Text]]`. Display text must be **Title Case** matching the linked concept's name. Never leave a named concept unlinked when its definition exists somewhere in the notebase.

### Avoid redundant links (transitive closure)

The graph should encode each connection *once* per local context. Do not link to a concept that is already reachable through another link in the same callout or paragraph.

> Example: a definition that links to [[4.0 - ODEs#^f66176|ODE]] does not also need to link to [[3.5 - Derivatives#^ea814a|Derivative]], because the ODE definition already links derivatives. The reader can follow the chain.

When in doubt, ask: *if a reader clicks the most specific link in this sentence, will they reach the concept I'm tempted to add?* If yes, drop the redundant link.

### No duplicate links

Within a single callout, never link the same concept twice. Once a concept has been linked, every subsequent mention is plain text. The graph already records the edge from the first link. Repeating it adds clutter without adding structure.

> Example: if the opening sentence of a definition links to [[2.6 - Eigenvectors and Eigenvalues#^888169|Eigenvalue]], later sentences in the same definition just write "eigenvalue" without re-linking, even when the word reappears multiple times.

This applies per callout, not per file. A new theorem callout may freely re-link concepts that were already linked in an earlier definition on the same page.

### Link the most specific concept

Link to the narrowest concept that fits. Prefer `[[2.6 - Eigenvectors and Eigenvalues#^223c29|Characteristic Polynomial]]` over a generic link to the eigenvectors note. Specific anchors create sharper graph edges.

### No "see ___" forward links

Never write standalone redirect prose like *"see [[Other Note]]"* or *"for X applications, see [[Y]]"*. If content belongs in another note, **move it there**. The backlinks panel will surface the connection automatically. Inline wikilinks inside natural prose are fine; standalone redirects are not.

### One concept, one home

Each concept lives in exactly one note. When you find content drifting (for example, quantum-specific material in a classical note), relocate it to its proper home rather than duplicating or cross-referencing.

## Editing Posture

- Prefer **editing existing notes** over creating new ones. Only create a new file when a topic genuinely warrants its own page (a distinct theorem, a major worked example, or a sub-section that has outgrown its parent).
- When refactoring, **fully relocate** content rather than leaving stub redirects.
- Preserve handwritten or user-authored content verbatim unless asked to revise it. When in doubt, add alongside rather than overwrite.
- Don't create top-level documentation, README, or index files unless explicitly requested.
- Consider breaking up the file when it reaches more than 200 lines.
- Avoid using custom pipes for links (e.g [[#^382f29|Homogenous Solution]]) unless the definition is very long, e.g. over 3-4 words.

## Never

- Never use em dashes.
- Never write "see ___" pointers.
- Never link to a concept already reachable transitively from another link in the same context.
- Never link the same concept twice within one callout.
- Never use lowercase or sentence-case display text for a wikilink to a named concept.
- Never duplicate a definition across notes.
- Never invent block anchors that don't exist. Verify the target before linking.
- Never write a callout with only formal math. Always include a plain English description.
