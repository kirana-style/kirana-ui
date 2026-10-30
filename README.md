# shadcn/ui on Kirana

The shadcn/ui component set, its blocks and its examples, rebuilt on
[Kirana](https://github.com/kirana-style/kirana), a compile-time styling system,
with a design system layered on top that keeps Tailwind's vocabulary and Panda's
ideas about tokens and recipes. It is becoming the site and registry at
`ui.kirana.style`: the site, its previews per framework, and the registry they draw.

> **Kirana is the compiler, Panda is the inspiration for the API, and Tailwind is
> the vocabulary.**

There is no Tailwind, no StyleX, no `cn`, no `class-variance-authority`, and no
`dark:` variant anywhere in the codebase. Every style is compiled to layered
atomic CSS at build time by Kirana's Rust engine, installed from npm.

```mermaid
flowchart TD
  A["<b>Tailwind vocabulary</b><br/>registry/core/scales.ts · inlined, emit no CSS<br/><code>space[4] · fontSize.sm · breakpoint.md</code>"]
  B["<b>Design tokens</b><br/>defineTokens · every colour one light-dark() value, reassigned per axis on &lt;html&gt;<br/><code>theme.primary · radius.lg · font.heading</code>"]
  C["<b>Axes and states</b><br/>the ui relation on &lt;html&gt; · when() for every base · relation()<br/><code>axes.style.lyra · OPEN · State.Switch.Root.checked</code>"]
  D["<b>Style modules</b><br/>registry/styles · one per component, every style in it"]
  E["<b>Markup</b><br/>registry/bases · per framework and base, no style values"]
  F["<b>Kirana compiler</b><br/>one layered atomic stylesheet"]
  A --> B --> C --> D --> E --> F
```

## Documentation

Start at [`docs/README.md`](docs/README.md). The four documents there cover the
design system:

| Document                                                  | What it answers                                                |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| [architecture.md](docs/architecture.md)                   | How it is layered, and why each decision went that way         |
| [porting-from-tailwind.md](docs/porting-from-tailwind.md) | The mental shift, the utility-by-utility mapping, the pitfalls |
| [catalogue.md](docs/catalogue.md)                         | What already exists, so you do not rebuild it                  |
| [workflows.md](docs/workflows.md)                         | Adding a component, removing one, verifying a port             |

The compiler, its packages and its specification are in
[kirana-style/kirana](https://github.com/kirana-style/kirana).

## Layout

```
apps/site                 the site (:3000): home, docs, blocks, charts, /create; the Worker `ui`
apps/preview-react        the React previews (:3007), prerendered into the site's /preview/react
apps/preview-vue …        the Vue, Svelte, Solid and Angular previews (:3003 to :3006)
registry/
├── core/                 the design system: axes, tokens, scales, preset codes
├── styles/               each component's look in every style
├── bases/                the components, blocks and examples per framework and base
└── icons/                IconPlaceholder and the icon data per library
packages/builder          the registry's JSON (`vp run registry`)
packages/shell            the site's head, colour mode and chrome icon
packages/docs-core        the docs framework's content engine (a copy of Kirana's)
packages/docs-ui          the docs framework's frame, on the registry's components
packages/fonts            the families a design can name, loaded on demand
packages/vite-config      the Vite + Kirana (+ Cloudflare) config every app uses
scripts/                  use-kirana.ts (moves the Kirana version), check-licenses.ts,
                          install-smoke.ts (the registry installed with kirana-style ui),
                          conformance.ts (the pages against shadcn/ui's own site)
upstream/shadcn.json      what each item was ported from in shadcn/ui, unit by unit
conformance/              the reviewed differences from shadcn/ui's site
```

Every `@kirana-style/*` package and the `kirana-style` CLI are pinned to one
exact version in the Bun catalog in the root `package.json`, and move together
with `bun scripts/use-kirana.ts <version | latest>`. Other versions used by more
than one workspace are pinned once in the same catalog and referenced as
`"catalog:"`; anything a single workspace uses is versioned in that workspace
alone.

## Using components

```tsx
import { Button } from "@workspace/registry/bases/react-base/ui/button"
```

A project installs them with `kirana-style ui add button` (or shadcn/ui's CLI), each flattened to
the project's style, base and icon library.

Components take an `sx` prop instead of `className`, applied last so a caller can
always override:

```tsx
const styles = { pushEnd: css({ marginInlineStart: "auto" }) }

<Button variant="outline" size="sm" sx={styles.pushEnd}>
  Save
</Button>
```

Plain elements take `sx` too; the compiler turns it into `className`, merged with
the element's own. An array composes several styles, and later entries win:

```tsx
<div sx={[styles.row, isActive && styles.active, sx]} />
```

## Theming

Every colour token is one `light-dark(<light>, <dark>)` value. `ThemeProvider`
sets `color-scheme` on `<html>` for the three modes through Kirana's `mode`
handles: `light dark` for system, which follows the OS with no JavaScript, so the
first paint is already correct, and `light` or `dark` to pin one. It needs
Chrome 123, Safari 17.5 or Firefox 120.

```tsx
import { ThemeProvider, useTheme } from "@workspace/shell/theme-provider"
```

The site keeps the reader's choice the way the Kirana site does: in the
`kirana-theme` cookie, read by the root route on the server, applied before the
first paint by a small inline script (so a prerendered page never flashes the
wrong mode), and shared between open tabs. The docs bar's theme menu and the
footer's toggle both answer the `D` key. The pieces are in `packages/shell`
(`theme-provider.tsx`, `theme-mode.ts`, `theme-document.ts`) and `packages/docs-ui`
(`theme-menu.tsx`, `theme-toggle.tsx`); [docs/catalogue.md](docs/catalogue.md)
shows how the root route wires them.

## Getting started

### 1. Install the prerequisites (once)

[Vite+](https://viteplus.dev) (`vp`) runs everything: it installs the Node.js
version in `.node-version` and the Bun version in `package.json`'s
`packageManager`, so nothing else is needed.

```bash
curl -fsSL https://vite.plus | bash
```

Then open a new terminal. Without the global CLI, `bunx vp …` runs the
workspace's copy. Kirana's engine is a prebuilt package for your platform; there
is no Rust to install.

### 2. Install dependencies

```bash
vp install
```

Run it again whenever `bun.lock` changes (after a pull or a branch switch). It
also installs the git hooks: formatting and lint on commit, `vp run prepush` on
push.

### 3. Run the apps

```bash
vp run dev       # the site :3000, the previews :3003 to :3007
```

The site runs inside workerd, the runtime Cloudflare uses, so a Node-only API
fails here rather than after deploying. It forwards `/preview/<framework>/` to
each preview's server, starting it on the first request.

### 4. Build for production

```bash
vp run build                         # every app → apps/*/dist
cd apps/site && bun run preview      # the built site as its Worker, on http://localhost:8787
```

The build prints every compiler diagnostic as `file:line:column`; it must report
0 errors.

## Commands

Every command runs from the repository root.

| Command                                            | What it does                                                                                                |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `vp install`                                       | installs every workspace and the git hooks                                                                  |
| `vp run dev`                                       | the site and the previews with hot reload                                                                   |
| `vp run build`                                     | every app into `dist/`; prints Kirana's diagnostics                                                         |
| `vp run check`                                     | Oxfmt, Oxlint with the Kirana rules, TypeScript (tsgolint); a lint warning fails it                         |
| `vp check --fix`                                   | the same, fixing what can be fixed                                                                          |
| `vp run licenses`                                  | every installed package's licence against `scripts/check-licenses.ts`                                       |
| `vp run registry`                                  | the registry's JSON into `apps/site/dist/client/r`, every item checked with Kirana                          |
| `vp run install`                                   | the slice installed with `kirana-style ui` into Kirana's example apps and built (needs network)             |
| `vp run upstream -- scan`                          | what changed in shadcn/ui since each item was ported (`upstream/report.md`)                                 |
| `vp run conformance`                               | the pages against shadcn/ui's own site, computed style for computed style (`conformance:pr`: changed ones)  |
| `vp run prepush`                                   | what the pre-push hook and CI run: check, licences, build                                                   |
| `bun scripts/use-kirana.ts 0.3.1`                  | pins every Kirana package to one release (`latest` for npm's latest), then `vp install`                     |
| `bunx kirana-style check <paths>`                  | every Kirana diagnostic with its source line, from an app's folder (it reads that app's `kirana.config.ts`) |
| `bunx kirana-style trace <file>:<line> <property>` | which entry wins for a property, and why                                                                    |
| `vp cache clean`                                   | forgets the task cache                                                                                      |

Skip the hooks once with `VP_GIT_HOOKS=0 git commit …` (CI still runs
everything).

### Troubleshooting

| Symptom                                                         | Fix                                                               |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| `vp: command not found`                                         | install Vite+ (above) and open a new terminal, or use `bunx vp`   |
| `lockfile had changes, but lockfile is frozen` / missing module | `vp install`                                                      |
| `vp run dev` starts the site on :3001 or later                  | another server holds :3000; stop it (`lsof -i :3000` shows which) |
| A task replays a stale result                                   | `vp cache clean`, and add the missing path to the task's `input`  |
| `defineTokens() ran without being compiled` on a page           | a Kirana library was pre-bundled; see `packages/vite-config`      |

## Editor

The Kirana extension (`kirana-style.kirana` on the VS Code Marketplace and Open
VSX) shows what a style compiles to on hover, a summary after each `sx`, the
compiler's diagnostics as you type, and which entry wins. It runs this project's
own `node_modules/.bin/kirana-style lsp`, so the editor and the build use the
same engine. Zed, Neovim and Helix are covered in Kirana's editor docs. Oxfmt and
Oxlint run through the Oxc extension, which reads the root `vite.config.ts`.

## Deployment

`apps/site` is the Cloudflare Worker `ui`, served at
`ui.kirana-style.workers.dev` until `ui.kirana.style` is attached.
`.github/workflows/site.yml` deploys every push to `main` and uploads a preview
version, `pr-<number>-ui.<subdomain>.workers.dev`, for every pull request from a
branch of this repository.

## Adding a component

`bunx shadcn add` does not apply yet, because its output is Tailwind. Take the
upstream component as a reference for structure and behaviour, then write the
styles against this design system; `bunx kirana-style migrate tailwind` drafts
the style objects from class strings. The process is in
[docs/workflows.md](docs/workflows.md) and the mapping table in
[docs/porting-from-tailwind.md](docs/porting-from-tailwind.md) is most of the
work.

## Licence

MIT, for the Kirana authors' work. The components, blocks and examples are
ported from [shadcn/ui](https://github.com/shadcn-ui/ui), MIT, Copyright (c)
2023 shadcn; its notice is in [`LICENSE`](LICENSE). This project is not
affiliated with or endorsed by shadcn/ui.
