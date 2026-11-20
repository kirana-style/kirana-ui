/**
 * A project's choices and the rules between them: Vite+'s monorepo and tooling go with Vite's
 * build (not Next.js's, React Router's, Nuxt's, Astro's or the Angular CLI's, each with a CLI of
 * its own over Vite or none), a Vite+ monorepo is checked by Vite+ itself, and
 * Turborepo runs one of the other three. `resolveChoices` applies them the way the design's
 * `resolveDesignSystem` applies the rules between axes: a choice that no longer fits moves to the
 * first one that does, and the dialog shows what it offers from `allowed`.
 */
import {
  BASE_RUNTIMES,
  FRAMEWORK_BASES,
  MONOREPOS,
  TEMPLATES,
  TEMPLATE_RUNTIMES,
  TOOLINGS,
  frameworkOf,
} from "./catalog.ts"
import type { Base, Framework, Monorepo, Template, Tooling } from "./catalog.ts"

export type ProjectChoices = {
  framework: Framework
  template: Template
  base: Base
  monorepo: Monorepo
  tooling: Tooling
  /** `data-pointer` on `<html>`: the pointer cursor on buttons (`init --pointer`). */
  pointer: boolean
  /** `dir="rtl"` on `<html>` (`init --rtl`). */
  rtl: boolean
}

/** Whether a base and a template run on the same major of their framework (`RUNTIMES`). */
export function fits(framework: Framework, base: Base, template: Template) {
  return BASE_RUNTIMES[framework]?.[base] === TEMPLATE_RUNTIMES[template]
}

/** The framework's templates a base runs on: Solid on ui-sdk on the Solid 2 one alone. */
export function templatesFor(
  framework: Framework,
  base: Base
): readonly Template[] {
  return (TEMPLATES[framework] as readonly Template[]).filter((template) =>
    fits(framework, base, template)
  )
}

/** The framework's bases a template runs: the Solid 2 one ui-sdk alone. */
export function basesFor(
  framework: Framework,
  template: Template
): readonly Base[] {
  return FRAMEWORK_BASES[framework].filter((base) =>
    fits(framework, base, template)
  )
}

/** Templates built by Vite: the ones Vite+ (`vp build`, its monorepo) can run. */
const VITE_TEMPLATES: readonly Template[] = [
  "vite-react",
  "tanstack-start",
  "laravel-inertia",
  "vite-vue",
  "vite-svelte",
  "sveltekit",
  "vite-solid",
  "solid-start",
  "tanstack-start-solid",
  "vite-solid2",
  "analog-angular",
]

export function isViteTemplate(template: Template): boolean {
  return VITE_TEMPLATES.includes(template)
}

/**
 * Templates whose type checker reads `vite.config.ts` for the framework's plugin (svelte-check on
 * SvelteKit 3, which refuses a `svelte.config.js`) and cannot load Vite+'s configuration: Vite+
 * checks them from a monorepo's root, not as the app's own tooling.
 */
const CHECKER_READS_VITE_CONFIG: readonly Template[] = ["sveltekit"]

/** The monorepos a template can sit in. */
export function monoreposFor(template: Template): readonly Monorepo[] {
  return MONOREPOS.filter(
    (monorepo) => monorepo !== "vite-plus" || isViteTemplate(template)
  )
}

/** Whether Vite+ as the app's own tooling is ruled out by the template's type checker alone. */
export function checkerReadsViteConfig(template: Template): boolean {
  return CHECKER_READS_VITE_CONFIG.includes(template)
}

/** The tooling a template in a monorepo can take. */
export function toolingsFor(
  template: Template,
  monorepo: Monorepo
): readonly Tooling[] {
  if (monorepo === "vite-plus") return ["vite-plus"]
  return TOOLINGS.filter((tooling) =>
    tooling === "vite-plus"
      ? monorepo === "none" &&
        isViteTemplate(template) &&
        !CHECKER_READS_VITE_CONFIG.includes(template)
      : true
  )
}

export const DEFAULT_CHOICES: ProjectChoices = {
  framework: "react",
  template: "vite-react",
  base: "base",
  monorepo: "none",
  tooling: "eslint",
  pointer: false,
  rtl: false,
}

/**
 * Every rule applied, in order: the base follows the framework (or, given none, the template asked
 * for), the template the base, then the monorepo and the tooling. The base is the design's, so it
 * wins over a template it does not run on.
 */
export function resolveChoices(
  partial: Partial<ProjectChoices>
): ProjectChoices {
  const framework = partial.framework ?? DEFAULT_CHOICES.framework
  const asked =
    partial.template &&
    (TEMPLATES[framework] as readonly Template[]).includes(partial.template)
      ? partial.template
      : undefined
  const bases = FRAMEWORK_BASES[framework]
  const base =
    partial.base && bases.includes(partial.base)
      ? partial.base
      : ((asked && basesFor(framework, asked)[0]) ?? bases[0]!)
  const templates = templatesFor(framework, base)
  const template = asked && templates.includes(asked) ? asked : templates[0]!
  const monorepos = monoreposFor(template)
  const monorepo =
    partial.monorepo && monorepos.includes(partial.monorepo)
      ? partial.monorepo
      : monorepos[0]!
  const toolings = toolingsFor(template, monorepo)
  const tooling =
    partial.tooling && toolings.includes(partial.tooling)
      ? partial.tooling
      : toolings[0]!
  return {
    framework,
    template,
    base,
    monorepo,
    tooling,
    pointer: partial.pointer ?? false,
    rtl: partial.rtl ?? false,
  }
}

/** Whether the choices hold together as `resolveChoices` would leave them. */
export function isResolved(choices: ProjectChoices): boolean {
  const resolved = resolveChoices(choices)
  return (
    resolved.framework === choices.framework &&
    resolved.template === choices.template &&
    resolved.base === choices.base &&
    resolved.monorepo === choices.monorepo &&
    resolved.tooling === choices.tooling
  )
}

/**
 * The skeleton's name, which is its file on the site: the template, where it sits and what checks
 * it. The base, the design and the `<html>` options are `init`'s, so they are not in it.
 */
export function skeletonId(
  choices: Pick<ProjectChoices, "template" | "monorepo" | "tooling">
): string {
  return `${choices.template}--${choices.monorepo}--${choices.tooling}`
}

export function parseSkeletonId(
  id: string
):
  | Pick<ProjectChoices, "framework" | "template" | "monorepo" | "tooling">
  | undefined {
  const [template, monorepo, tooling] = id.split("--")
  if (!template || !monorepo || !tooling) return undefined
  const framework = Object.keys(TEMPLATES).find((name) =>
    (TEMPLATES[name as Framework] as readonly string[]).includes(template)
  ) as Framework | undefined
  if (
    !framework ||
    !(MONOREPOS as readonly string[]).includes(monorepo) ||
    !(TOOLINGS as readonly string[]).includes(tooling)
  )
    return undefined
  const choices = {
    framework,
    template: template as Template,
    monorepo: monorepo as Monorepo,
    tooling: tooling as Tooling,
  }
  return toolingsFor(choices.template, choices.monorepo).includes(
    choices.tooling
  ) && monoreposFor(choices.template).includes(choices.monorepo)
    ? choices
    : undefined
}

/** Every skeleton there is: each template in each monorepo it can sit in, with each tooling. */
export function everySkeleton(): Pick<
  ProjectChoices,
  "framework" | "template" | "monorepo" | "tooling"
>[] {
  const all: Pick<
    ProjectChoices,
    "framework" | "template" | "monorepo" | "tooling"
  >[] = []
  for (const framework of Object.keys(TEMPLATES) as Framework[])
    for (const template of TEMPLATES[framework] as readonly Template[])
      for (const monorepo of monoreposFor(template))
        for (const tooling of toolingsFor(template, monorepo))
          all.push({ framework, template, monorepo, tooling })
  return all
}

export { frameworkOf }
