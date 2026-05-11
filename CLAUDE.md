# Notebase Conventions

Rules for any LLM agent contributing to this Obsidian notebase. The goal is a clean knowledge graph in which every concept is linked exactly once per context, and every note reflects a single, well-placed idea.

## Folder Structure

- Top-level subjects: `Math/` and `Physics/`.
- Inside each subject, content is organised by module: `Module 1 - …/`, `Module 2 - …/`, etc.
- File names use hierarchical section numbering matching the module: `4.1.2 - Second Order Linear ODEs.md`, `6.4 - Position and Momentum.md`.
- Place new files in the module folder where the topic naturally lives. Physics applications go under `Physics/`; pure mathematical machinery goes under `Math/`.

## Section Hierarchy

Within a single note, use markdown headings to indicate levels of abstraction, with the highest level of abstraction at the top. The `#` title gives the topic, `##` headings group callouts at the same level of generality (e.g. core definitions, then specific solutions, then examples, then limiting cases), and `###` subdivides further when a section grows.

A typical flow runs from the most general definition or governing equation, down through theorems and corollaries that apply it, and ends with worked examples and limit cases. Examples and asymptotic limits sit at the bottom because they specialize the abstractions above; they should not appear before the general definition they specialize.

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

Proofs sit _outside_ the callout they prove and reference its anchor:

```
`\begin{proof}`@[[#^anchor]]
...proof content...
`\end{proof}`
```

A proof can contain display math, multiple paragraphs, and links, but never another callout. A proof does not need to repeat definitions and WikiLinks present in the theorem. **The proof shares the local-context scope of its parent callout: if a concept is already linked in the callout, do not relink it in the proof.** Treat the callout-plus-proof block as one wikilink scope, not two.

When a proof step needs to cite an earlier display math block for clarity, link to it with a wikilink rather than restating the equation: `by [[#^anchor|equation (1)]]`. Add a block-ID anchor to a display equation **only** when a proof actually links to it. Equation anchors are local proof aids, not part of the knowledge graph; do not anchor every display block by default.

## Writing Style

Every callout should pair a **plain English description** with a **formal mathematical definition in LaTeX**. The reader should be able to grasp the idea from the prose alone, then turn to the math for precision.

A good definition reads like a short paragraph in natural language, naming the object, explaining what it does, and noting why it matters. Then the formal statement appears in display math:

```
> [!def] Probability Current
> Describes the flow of probability density through space, analogous to the flow of a fluid. For a wavefunction $\psi(x,t)$, the current $S$ measures how much probability passes a point per unit time.
> $$S=\frac{\hbar}{2mi}\left(\psi^{*}\frac{\partial \psi}{\partial x}-\psi\frac{\partial \psi^{*}}{\partial x}\right)$$
```

Avoid jargon-only sentences. If a term needs to be introduced, define it with words first, then with symbols.

### Punctuation and Tone

- **No em dashes anywhere.** Use commas, parentheses, semicolons, or split into two sentences.
- Avoid filler words like "the"
- No bolding for emphasis inside callouts or proofs. Bold only the **defined term** itself when it first appears in a definition.
- No emojis.
- Section headings are sentence case. Defined-concept names and proper nouns are Title Case.
- Prefer flowing prose over bullet lists inside callouts. Use lists only for genuinely enumerated content.
- Display math for any equation worth referencing. Inline math for one-off symbols.
- Use inline math to indicate the expression for a phrase after it first appears.

### Math Conventions

- Inline math with `$…$`, display math with `$$…$$`. Key parts of derivations and proofs should always be in display math for clarity.
- **Display math block formatting.** The opening and closing `$$` markers each go on their own line, and the block has a blank line above and below. No exceptions, even inside callouts or lists.

  ```
  
  $$
  \begin{align}
  u_{1}&=\sqrt{q_{0}}\,e^{-q_{0}|x-a|}  \\[0.5em]
  u_{2}&=\sqrt{q_{0}}\,e^{-q_{0}|x+a|}
  \end{align}
  $$
  
  ```
- Use `\begin{align}` for sequences of equations sharing context. Use `\begin{cases}` for piecewise definitions.
- Vectors are `\mathbf{v}`, matrices are capitalized `\mathbf{A}`. Operators are `\hat{O}`. Bra and ket as `\bra{·}`, `\ket{·}`, `\braket{·|·}`.
- **Display math derivatives** use full Leibniz notation: $\frac{d}{dx}$, $\frac{\partial^{2}\psi}{\partial x^{2}}$. This makes the differentiated variable explicit when the equation is the focal point of the callout.
- **Inline derivatives in math notes** use prime notation: $y'$, $y''$, $f'(x)$. Reserve dot notation $\dot{x}$, $\ddot{x}$ for cases that explicitly contrast $x$ derivatives with $t$ derivatives (typical in physics, where $\dot{x}$ unambiguously means $dx/dt$).
- Use `dfrac` for fractions in a case block
- Never use `\frac` in inline math. Write $a/b$ instead, parenthesising as needed (e.g. $(k-k')/(k+k')$). Reserve `\frac` for display math.
- **Use `\,` (thin space) to indicate multiplication** between adjacent factors in display math. Write $\gamma\,q_{0}\,e^{-4q_{0}a}$ instead of $\gamma q_{0}e^{-4q_{0}a}$, and $\alpha(1+2q_{0}a)\,e^{-2q_{0}a}$ instead of $\alpha(1+2q_{0}a)e^{-2q_{0}a}$. The thin space visually separates the factors so the product is unambiguous and easier to scan. Skip it inside grouped subscripts/exponents, between a function name and its argument, and where standard notation already glues symbols (e.g. $dx$, $q_{0}a$ inside an exponent).
- Preferably, there should be no descriptive text after the last display math block in a theorem or definition.
- Use `0.5em` spacing for `align` block line breaks, `1em` if both lines have fractions.
- Display math ends a sentence. The line of prose after a display math block always begins a new sentence and must start with a capital letter, even if the prose before the display math ended in a colon, comma, or no punctuation. No exceptions.
- Break paragraphs after one or two long sentences, so prose stays scannable rather than turning into a wall of text.
- Split long display equations across multiple aligned lines with `\begin{align}` rather than chaining `=` signs in a single line. Each `=` step that would overflow the visual width gets its own aligned line, keeping the chain readable.
- Lists inside callouts that enumerate mathematical conditions (boundary conditions, axioms, constraints) use display math with minimal or no surrounding prose. Each item is one display equation; the equation IS the item, not an illustration of it. Avoid descriptive sentences after the math.
- When evaluating a definite integral with the bound bar `\bigg|_a^b`, wrap the antiderivative in `\left(\ldots\right)` so the demarcation between the expression being evaluated and the bounds is unambiguous: `\left(\frac{e^{kx}}{k}\right)\bigg|_a^b`, not `\frac{e^{kx}}{k}\bigg|_a^b`.

## Wikilinks

Wikilinks are how the knowledge graph forms. They require care.

### Always Link Concepts

Whenever a note references a defined concept, link to it with `[[File#^anchor|Display Text]]`. Display text must be **Title Case** matching the linked concept's name. Never leave a named concept unlinked when its definition exists somewhere in the notebase.

### Avoid Redundant Links (transitive closure)

**This is the most important wikilink rule, and the most often violated.** The graph should encode each connection _exactly once_ per local context. Do not link to a concept that is already reachable through another link in the same callout, paragraph, or callout-plus-proof block. Transitive closure is not a hint, it is a hard constraint: every extra link you add that the reader can already reach through one click of an earlier link is noise that obscures the genuine edges.

> Example: a definition that links to [[4.0 - ODEs#^f66176|ODE]] does not also need to link to [[3.5 - Derivatives#^ea814a|Derivative]], because the ODE definition already links derivatives. The reader can follow the chain.

Before adding any wikilink, ask: _if a reader clicks the most specific link in this sentence, will they reach the concept I'm tempted to add within one or two further clicks?_ If yes, drop the redundant link. The graph will pick it up automatically through the chain. **Err on the side of fewer links, not more.**

The same rule applies across the callout-and-proof boundary. A proof inherits its callout's link scope, so a concept linked in the callout statement should not be relinked in the proof body, and vice versa.

### No Duplicate Links

Within a single callout, never link the same concept twice. Once a concept has been linked, every subsequent mention is plain text. The graph already records the edge from the first link. Repeating it adds clutter without adding structure.

> Example: if the opening sentence of a definition links to [[2.6 - Eigenvectors and Eigenvalues#^888169|Eigenvalue]], later sentences in the same definition just write "eigenvalue" without re-linking, even when the word reappears multiple times.

This applies per callout, not per file. A new theorem callout may freely re-link concepts that were already linked in an earlier definition on the same page.

### Show the Symbol After a Key WikiLink

When a wikilink names a concept that has a canonical symbol, follow the link with the symbol in inline math. This anchors the abstract name to its concrete notation in the same line of prose. Apply this for *very key* links, the ones that introduce or pin down the central object of a sentence, not for every passing reference.

> Example: `Momentum is the [[6.0 - Postulates#^continuous-observable]] $\hat{p}$` makes the link target's symbol immediate; the reader does not have to follow the link to recover that this concept is denoted $\hat{p}$.

Apply this to operators, observables, eigenstates, expectation values, uncertainties, and other concepts where the symbol is the working notation. Skip it for links to definitions whose symbols are obvious from surrounding math, or for follow-up references inside the same callout.

### Link the Most Specific Concept

Link to the narrowest concept that fits. Prefer `[[2.6 - Eigenvectors and Eigenvalues#^223c29|Characteristic Polynomial]]` over a generic link to the eigenvectors note. Specific anchors create sharper graph edges.

### No "see \_\_\_" forward Links

Never write standalone redirect prose like _"see [[Other Note]]"_ or _"for X applications, see [[Y]]"_. If content belongs in another note, **move it there**. The backlinks panel will surface the connection automatically. Inline wikilinks inside natural prose are fine; standalone redirects are not.

### One Concept, One home

Each concept lives in exactly one note. When you find content drifting (for example, quantum-specific material in a classical note), relocate it to its proper home rather than duplicating or cross-referencing.

### Capitalize Proper Nouns in WikiLink Display Text

## Editing Posture

- Prefer **editing existing notes** over creating new ones. Only create a new file when a topic genuinely warrants its own page (a distinct theorem, a major worked example, or a sub-section that has outgrown its parent).
- When refactoring, **fully relocate** content rather than leaving stub redirects.
- Preserve handwritten or user-authored content verbatim unless asked to revise it. When in doubt, add alongside rather than overwrite.
- **Stick to the source.** When transcribing from a handwritten page or scanned image, transcribe *only* what is on the page. Do not invent extra commentary, motivation, justifications, intuitions, edge-case remarks, or follow-up paragraphs that the source does not contain. If the handwritten page has three lines, the note has three lines. Match the level of detail of the source, not the level of detail you think the topic deserves. The only additions allowed are the structural minimum required by the conventions above (callout wrapper, plain-English sentence, anchor, wikilinks).
- Don't create top-level documentation, README, or index files unless explicitly requested.
- Consider breaking up the file when it reaches more than 200 lines.
- Avoid using custom pipes for links (e.g [[#^382f29|Homogenous Solution]]) unless the definition is very long, e.g. over 3-4 words.

## Never

- Never use em dashes.
- Never write "see \_\_\_" pointers.
- Never link to a concept already reachable transitively from another link in the same context.
- Never link the same concept twice within one callout.
- Never use lowercase or sentence-case display text for a wikilink to a named concept.
- Never duplicate a definition across notes.
- Never invent block anchors that don't exist. Verify the target before linking.
- Never write a callout with only formal math. Always include a plain English description.
- **Never publish a callout with zero outgoing wikilinks.** A callout with no links is a dead node in the knowledge graph, reachable only by direct lookup and contributing nothing to the graph's structure. Every callout must point to at least one parent or related concept, even if the link feels obvious. If genuinely no other concept is involved, the callout is probably too narrow or in the wrong file.
- Never add content that is not in the source you are transcribing. No bonus paragraphs, no "why this matters," no extrapolations, no analogies, no limit cases or asymptotic remarks unless the handwritten page wrote them down.
