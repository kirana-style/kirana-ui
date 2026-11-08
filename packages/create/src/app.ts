/**
 * An app skeleton, as data: the files a template writes, its manifest's own parts, and how its
 * `vite.config.ts` is drawn (so the same app renders with Vite or Vite+). Each lives in `apps/`,
 * built from Kirana's example of the same name (its configuration, as Kirana's CI checks it)
 * with a page in place of the example's probe. The composer adds the aliases, Kirana's packages
 * and the tooling's scripts; `kirana-style ui init` then installs the design system into it.
 */
import type { Framework, Template } from "./catalog.ts"
import type { Versioned } from "./versions.ts"

/** A package the skeleton names: a key of `VERSIONS`, or a name with its own range. */
export type Dependency = Versioned | { name: string; version: string }

export type ViteConfig = {
  /** Import lines besides `defineConfig`'s (`import react from "@vitejs/plugin-react"`). */
  imports: readonly string[]
  /** The plugin calls, in order: Kirana's first unless the framework compiles from disk (Analog). */
  plugins: readonly string[]
  /** Other top-level options, as written (`build: { target: ["es2022"] }`). */
  options?: readonly string[]
  /** A comment above the config. */
  note?: string
}

export type AppSkeleton = {
  template: Template
  framework: Framework
  /** The page's title. */
  title: string
  /** The folder the `@/*` alias maps to (`src`, or the root for Next.js's `app/`). */
  source: "src" | "."
  /** The file `init` writes `<html>`'s attributes and styles into. */
  document: string
  /** Where the build lands, for the install check. */
  output: string
  files: Readonly<Record<string, string>>
  dependencies: readonly Dependency[]
  devDependencies: readonly Dependency[]
  /** Kirana's packages besides `@kirana-style/core`, `kirana-style` and `@kirana-style/registry`, which every skeleton has. */
  kirana: {
    dependencies?: readonly string[]
    devDependencies?: readonly string[]
  }
  scripts: Readonly<Record<string, string>>
  /** The type check: `tsc --noEmit`, `vue-tsc`, `svelte-check`… */
  typecheck: string
  /** Rendered as `vite.config.ts`; none for Next.js and the Angular CLI. */
  vite?: ViteConfig
  /** `tsconfig.json`'s compiler options and `include`, the alias paths added by the composer. */
  tsconfig: {
    compilerOptions: Readonly<Record<string, unknown>>
    include?: readonly string[]
    [key: string]: unknown
  }
  /** Files only one tooling or monorepo needs, by path (`.gitignore` lines the template adds). */
  ignore?: readonly string[]
}

/** The welcome page's one style, in the framework's spelling. */
export const WELCOME = {
  heading: "Hello, Kirana.",
  text: "Your design system is installed. Add a component:",
  command: "kirana-style ui add button",
}
