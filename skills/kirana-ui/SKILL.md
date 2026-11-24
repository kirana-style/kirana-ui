---
name: kirana-ui
description: Build interfaces with Kirana UI, the shadcn/ui components rebuilt on Kirana (installed with kirana-style ui from the @kirana registry) for React, Vue, Svelte, Solid and Angular, on Kirana UI Primitives, Base UI, React Aria, Ark UI, Reka UI, Bits UI, ui-sdk or NG Primitives. Use whenever a project has kirana-style.lock.json, components under components/ui from the @kirana registry, or asks to add, restyle, theme, compose or debug a Kirana UI component, a block, a chart or an AI Elements chat pattern. It is not shadcn/ui on Tailwind: no className strings, no cn(), no dark: variant.
---

# Kirana UI

Kirana UI is shadcn/ui's components, blocks, charts and AI Elements rebuilt on Kirana (compiled
`css()` styles, no Tailwind), for five frameworks and several headless bases. A project installs
the components' source into itself, as shadcn/ui does, and owns it from then on.

Two other skills sit under this one; install them too:

- **`kirana`** (`npx skills add kirana-style/kirana`): writing Kirana styles, `css()`, `sx`,
  tokens, diagnostics. Every style you write here follows it.
- **`kirana-ui-primitives`** (in this repository): the headless library the Kirana UI base is built
  on, when you use a primitive directly.

## First, read the project

Before writing anything, find out what it is built with. Do not assume React or Base UI.

1. `kirana-style.lock.json` and the `ui` block of `kirana.config.ts`: the framework, the
   **base** (`kirana`, `base`, `aria`, `ark`, `reka`, `bits`, `uisdk`, `ng`), the design (a preset
   code), the aliases (`@/components/ui`).
2. `npx kirana-style ui view <item>` for what a component installs on this framework and base;
   `npx kirana-style ui search <query>` for what exists. Never invent a component or a prop:
   if the registry has no such item, say so.
3. `npx kirana-style export` for the design system's real tokens (`theme.primary`,
   `spacing[4]`, `radius.md` …). Use those names; never hard-code a colour or a size the tokens
   have.

## Adding components

```sh
npx kirana-style ui add button dialog          # with every item they need
npx kirana-style ui add dialog --dry-run       # what it would write, first
```

- Files land at the project's aliases (`@/components/ui/dialog.tsx` …), each recorded with its
  hash in `kirana-style.lock.json`. Packages install with the project's package manager.
- `add` runs `kirana-style check` on what it wrote. A failure there is a real problem: read it.
- Change the design with `npx kirana-style ui preset <code>`, never by editing every file.
- `ui diff`, `ui outdated` and `ui update` compare with the registry; `update` keeps what the
  project changed and stops where both changed.
- A brand-new project starts from the command the site's Get Code (`/create`) writes:
  `npx @kirana-style/registry init --template @kirana/<template> my-app --framework <f> --base <b> --preset <code>`.

The full command list, with flags: `references/commands.md`.

## The rules

1. **Styles are `css()` handles, passed as `sx`.** `<Button sx={styles.save}>`, never
   `className="…"`, never a Tailwind string, never `cn()`. Several: `sx={[styles.a, styles.b]}`.
   Each framework spells it its own way (`:sx` in Vue, `[sx]` on Angular's directives):
   `references/frameworks.md`.
2. **Keep the component's API.** The parts, props, variants and `data-slot` names are
   shadcn/ui's (`variant="outline"`, `size="sm"`, `<DialogContent>` …). Read the installed file
   for what a part takes; do not add props shadcn/ui's component does not have.
3. **Restyle by editing the installed file or passing `sx`**, not by wrapping it in a `div` and
   targeting its children. A caller's `sx` merges per property and condition: to beat a
   component's state style (`[data-state="open"]`), write yours under the same condition.
4. **States are the base's own attributes.** On Base UI and Kirana UI a state is present or
   absent (`[data-open]`, `[data-checked]`), on Ark and Reka it is `data-state="open"`, on React
   Aria `[data-selected]` … The installed style module (`*.styles.ts`, flattened for the
   project's base) already writes them: copy the attribute it uses, never guess one.
5. **Composition follows the base.** "Render this as a link": React `render={<a href="…" />}`
   (with `nativeButton={false}` on a Button), Vue `as-child` with the element in the slot, Svelte
   `{#snippet asChild(props)}`, Solid `asChild={(props) => <a {...props()} />}`.
6. **Colours are tokens, themes are `defineTheme`.** Every colour is a `light-dark()` pair; dark
   mode is the `<html>` mode, never a `dark:` variant or `prefers-color-scheme` in a component.
7. **Icons go through the installed `IconPlaceholder`** (it draws the project's icon library).
   An icon's size comes from the component it sits in; do not give it `sx` for its size.
8. **AI Elements chat patterns run on the AI SDK or TanStack AI.** Pick the project's runtime and
   install its packages; never mix the two in one chat: `references/ai-elements.md`.

## Check your work

After every change, in this order:

1. `npx kirana-style check <paths>`: every Kirana diagnostic, with its code and a fix. Fix every
   error; do not silence one in the config without asking.
2. The project's own `lint`, `format` and `typecheck` scripts.
3. Look at it in the browser, in light and dark, and right to left if the project is.
4. When it compiles but looks wrong: `npx kirana-style trace <file>:<line> <property>` says which
   rule wins and why.

## Never

- Never `className`, `class` strings, Tailwind utilities, `cn()`, `clsx()`, `cva()` or `dark:`.
- Never a raw colour (`#3b82f6`, `rgb(…)`) where a token exists, and never one colour for both
  modes.
- Never edit `kirana-style.lock.json` by hand, and never `--overwrite` a file the project changed
  without saying so: run `ui diff` first.
- Never copy a component from shadcn/ui's site or a Tailwind project into this one: add the
  registry's item, or port it with the `kirana-migrate` skill.
- Never wrap a Base UI menu or select label outside its group (`DropdownMenuLabel` outside
  `DropdownMenuGroup` throws when the menu opens).

## When something goes wrong

The known pitfalls and their fixes (a popup losing a section's theme, a select left behind on
scroll, a link announced as a button, a scroll area that will not cap its height, the lint rule
that flags the components, `ui add` refusing reformatted files, tests in jsdom):
`references/pitfalls.md`. Tests: `references/testing.md`.

Letting an AI agent use the page you build: the `kirana-ui-agent` skill.

The site's docs are plain markdown too: `llms.txt` (every page) and each page's `.md` twin, at
`https://ui.kirana.style` (`https://ui.kirana-style.workers.dev` until the domain is attached).
Read the component's page before an unusual change.
