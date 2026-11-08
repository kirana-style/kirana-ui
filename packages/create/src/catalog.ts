/**
 * What a project can be started as: the frameworks and their bases (the registry's), the templates
 * (each an app skeleton in `apps/`), the monorepos a template can sit in, the tooling that lints,
 * formats and type-checks it, and the runners (package managers, and Vite+'s `vp`) the commands are
 * written for. Get Code draws its cards from these lists, the composer builds a project from them,
 * and the install check runs them: adding a template, a monorepo or a tool is an entry here and its
 * layer, nothing in the dialog.
 */
import { FRAMEWORK_BASES } from "@workspace/registry/core/config"
import type { Base, Framework } from "@workspace/registry/core/config"

export { FRAMEWORK_BASES }
export type { Base, Framework }

export const FRAMEWORKS = [
  "react",
  "vue",
  "svelte",
  "solid",
  "angular",
] as const satisfies readonly Framework[]

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  solid: "Solid",
  angular: "Angular",
}

export const BASE_LABELS: Record<Base, string> = {
  base: "Base UI",
  aria: "React Aria",
  ark: "Ark UI",
  ng: "ng-primitives",
}

/**
 * The templates, named after Kirana's examples each was built from (`init --template` takes the
 * same names), in the order the dialog shows them: the framework's Vite app first.
 */
export const TEMPLATES = {
  react: ["vite-react", "tanstack-start", "next-turbopack"],
  vue: ["vite-vue"],
  svelte: ["vite-svelte"],
  solid: ["vite-solid", "solid-start"],
  angular: ["analog-angular", "angular-cli"],
} as const satisfies Record<Framework, readonly string[]>

export type Template = (typeof TEMPLATES)[Framework][number]

export const TEMPLATE_LABELS: Record<Template, string> = {
  "vite-react": "Vite",
  "tanstack-start": "TanStack Start",
  "next-turbopack": "Next.js",
  "vite-vue": "Vite",
  "vite-svelte": "Vite",
  "vite-solid": "Vite",
  "solid-start": "SolidStart",
  "analog-angular": "Analog",
  "angular-cli": "Angular CLI",
}

/** A template's framework. */
export function frameworkOf(template: Template): Framework {
  return FRAMEWORKS.find((framework) =>
    (TEMPLATES[framework] as readonly string[]).includes(template)
  )!
}

/** Where the app sits: alone, or as `apps/web` of a workspace. */
export const MONOREPOS = ["none", "turbo", "vite-plus"] as const
export type Monorepo = (typeof MONOREPOS)[number]

export const MONOREPO_LABELS: Record<Monorepo, string> = {
  none: "Single app",
  turbo: "Turborepo",
  "vite-plus": "Vite+ monorepo",
}

/**
 * What lints, formats and type-checks the project. Each is a layer: its configuration files, the
 * packages it needs and the `lint`, `format` and `typecheck` scripts, with Kirana's rules in each
 * (`@kirana-style/eslint-plugin` for ESLint and Oxlint, `@kirana-style/biome-plugin` for Biome;
 * Vite+'s `vp check` runs Oxlint and Oxfmt with the ESLint plugin's rules).
 */
export const TOOLINGS = ["eslint", "oxlint", "biome", "vite-plus"] as const
export type Tooling = (typeof TOOLINGS)[number]

export const TOOLING_LABELS: Record<Tooling, string> = {
  eslint: "ESLint + Prettier",
  oxlint: "Oxlint + Oxfmt",
  biome: "Biome",
  "vite-plus": "Vite+",
}

/** The command lines are written for one of these; `vp` is Vite+'s, which drives the project's package manager. */
export const RUNNERS = ["npm", "pnpm", "yarn", "bun", "vp"] as const
export type Runner = (typeof RUNNERS)[number]

/** The folder a new project is written to, and the app's name inside a workspace. */
export const PROJECT = { directory: "my-app", app: "web" } as const

/** Where the site serves the composed templates and the registry (CLI-10 attaches the domain). */
export const SITE = "https://ui.kirana-style.workers.dev"
export const REGISTRY = `${SITE}/r`
export const TEMPLATES_PATH = "templates"
