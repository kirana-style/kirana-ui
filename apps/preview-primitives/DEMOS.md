# Writing a demo

A demo is one component of `@kirana-ui/react`, drawn raw and styled three ways from **one** piece
of markup. It lives in `src/demos/<slug>/` (the component's name in kebab case) as four files.
`src/demos/collapsible/` is the model: read all four of its files before writing one.

| File                | What it is                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `demo.tsx`          | The markup. `export default function Demo({ s })`, where `s` gives each styled element its props: `<Dialog.Trigger {...s.trigger}>`. Type `s` as `Styles<"trigger" \| "popup" \| …>` with every name the demo uses. |
| `styles.module.css` | CSS Modules: one class per name in `s`.                                                                                                                                                                             |
| `tailwind.ts`       | Tailwind 4: `export default { trigger: "…", popup: "…" }`, one class list per name.                                                                                                                                 |
| `kirana.ts`         | Kirana: `export default { trigger: css({…}), … }`, one handle per name.                                                                                                                                             |

## Rules

- **The three stylings must look the same**, value for value: write the CSS first, then say the
  same thing in Tailwind and in Kirana. Every name in `s` exists in all three files.
- **A beginner reads this.** Keep the demo small and real: a dialog that edits a name, a select of
  fruits. No lorem ipsum, no nested copies of the same component, no test ids. State the demo
  needs is its own (`useState`). It must work when pressed, typed in and tabbed through.
- **Use the component as its reference says.** The parts, props and the attributes each part
  writes are in `node_modules/@kirana-ui/react/llms.txt` (from the repository root:
  `apps/site/node_modules/@kirana-ui/react/llms.txt`), and a whole tested example of each is in
  `apps/site/primitives/anatomy.json` (key: the slug, then `react`). Import from the component's
  own entry: `@kirana-ui/react/dialog`.
- **Style states by the attributes the parts write** (`[data-open]`, `[data-highlighted]`,
  `[data-starting-style]` / `[data-ending-style]` for motion) and geometry by their CSS variables
  (`--transform-origin`, `--available-height`, `--anchor-width`). Give popups a short entrance and
  exit. Give everything that takes focus a visible `:focus-visible` ring.
- **Only the shared values for colour**: `--surface`, `--raised`, `--ink`, `--quiet`, `--line`,
  `--accent`, `--on-accent`, `--ring`, `--danger` (`src/theme.css`). In Tailwind they are the
  colours `surface`, `raised`, `ink`, `quiet`, `line`, `accent`, `on-accent`, `ring`, `danger`
  (`bg-surface`, `text-quiet`, `border-line`, `outline-ring`); in Kirana, `theme.surface` …
  `theme.onAccent` from `src/tokens.ts`. No other colours, except `transparent`, and
  `rgb(0 0 0 / 0.4)` for a backdrop. Radii: `0.375rem` (`rounded-md`), `0.5rem` (`rounded-lg`),
  `0.75rem` (`rounded-xl`), `9999px` (`rounded-full`). Spacing in `rem` steps of `0.25rem`.
- **Tailwind 4 syntax**: a boolean data attribute is a variant by its name
  (`data-open:opacity-100`, `data-starting-style:opacity-0`), a valued one is
  `data-[side=top]:…`; a CSS variable is `h-(--collapsible-panel-height)`,
  `origin-(--transform-origin)`. No `@apply`, no config.
- **Kirana**: a state is a condition on a value, `{ base: …, "[data-open]": …, ":hover": … }`.
  Write longhands, never a shorthand the compiler cannot split: `borderWidth` + `borderStyle` +
  `borderColor`, `outlineWidth` + `outlineStyle` + `outlineColor`, `fontFamily: "inherit"` +
  `fontSize: "inherit"` (not `font`), `paddingBlock` / `paddingInline`, `transitionProperty` +
  `transitionDuration`. A pseudo-element is a nested key (`"::after": {…}`). Colours are
  `theme.*` tokens.
- **What each styling starts from differs, so say everything.** Tailwind's preflight zeroes
  margins, removes a button's border and background, and makes `font` inherit; plain CSS and
  Kirana start from the browser's defaults. So in CSS and Kirana write `margin: 0` on headings
  and paragraphs, a button's `border`, `background` and `font: inherit` (in Kirana:
  `fontFamily`, `fontSize` **and** `lineHeight: "inherit"`), and in Tailwind write the border a
  button should have. Sizes are border-box in all three (`theme.css`). The check at the end
  compares every element's computed styles and box across the three, at rest and pressed.
- **No inline `style`, no ids the library does not need, no other packages.**

## Checking

From the repository root, on your own folders only:

    vp check --fix apps/preview-primitives/src/demos/<slug>

It formats, type-checks and runs Kirana's own diagnostics on `kirana.ts`: zero errors and zero
warnings before a demo is done. Do not build the app and do not start a server: one build at the
end draws every demo and compares its three stylings.
