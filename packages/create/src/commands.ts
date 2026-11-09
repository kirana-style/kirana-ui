/**
 * What a reader runs to start the project, for each runner: one `kirana-style ui init --template`
 * from the registry's package, which fetches the skeleton the site serves (`@kirana/<id>`, listed
 * in `templates/index.json` beside the registry), installs it with the package manager running it,
 * and installs the design system in the app (`apps/web` of a workspace, the components into
 * `packages/ui`); or the command that brings an existing project to a design.
 */
import { installLines } from "@workspace/docs-core/package-managers.ts"
import type { PackageManager } from "@workspace/docs-core/package-managers.ts"
import { encodePreset } from "@workspace/registry/core/preset"
import type { DesignSystem } from "@workspace/registry/core/config"

import { PROJECT, REGISTRY, REGISTRY_NAMESPACE, WORKSPACE } from "./catalog.ts"
import type { Runner } from "./catalog.ts"
import { skeletonId } from "./choices.ts"
import type { ProjectChoices } from "./choices.ts"

export type Step = {
  /** Where the line runs, from the previous step's place. */
  cd?: string
  /** The runner's install, before `exec`. */
  install?: boolean
  /** A package run once (`npx <package> …`). */
  run?: string
  /** A binary the project has (`npx kirana-style …`). */
  exec?: string
}

/** The package `init --template` runs from, where no project has it yet. */
export const REGISTRY_PACKAGE = "@kirana-style/registry"

/** The template's reference in the registry: `@kirana/<template>--<monorepo>--<tooling>`. */
export function templateReference(
  choices: Pick<ProjectChoices, "template" | "monorepo" | "tooling">
): string {
  return `${REGISTRY_NAMESPACE}/${skeletonId(choices)}`
}

/**
 * `init`'s arguments for the design system: the registry's with the design's preset, the `<html>`
 * options, and in a workspace the package the components go into.
 */
export function initArguments(
  choices: Pick<
    ProjectChoices,
    "framework" | "base" | "pointer" | "rtl" | "monorepo"
  >,
  design: DesignSystem,
  registry = REGISTRY
): string {
  return [
    `--framework ${choices.framework} --base ${choices.base}`,
    `--preset ${encodePreset(design)}`,
    ...(choices.pointer ? ["--pointer"] : []),
    ...(choices.rtl ? ["--rtl"] : []),
    ...(choices.monorepo === "none" ? [] : [`--workspace ${WORKSPACE.uiPath}`]),
    `--registry ${REGISTRY_NAMESPACE}=${registry}/{name}.json`,
  ].join(" ")
}

/** The one step: the registry package's `init` from the template, into `my-app`. */
export function projectSteps(
  choices: ProjectChoices,
  design: DesignSystem,
  registry = REGISTRY
): Step[] {
  return [
    {
      run: `${REGISTRY_PACKAGE} init --template ${templateReference(choices)} ${PROJECT.directory} ${initArguments(choices, design, registry)}`,
    },
  ]
}

/** The steps as the runner's lines. */
export function commandLines(steps: readonly Step[], runner: Runner): string[] {
  const manager = runner as PackageManager
  return steps.map((step) => {
    const parts = [
      ...(step.cd ? [`cd ${step.cd}`] : []),
      ...(step.install ? installLines(manager, { install: true }) : []),
      ...(step.run ? installLines(manager, { run: step.run }) : []),
      ...(step.exec ? installLines(manager, { exec: step.exec }) : []),
    ]
    return parts.join(" && ")
  })
}

/** What changes an existing project's design: `kirana-style ui preset`, with the `<html>` options. */
export function presetCommand(
  choices: Pick<ProjectChoices, "pointer" | "rtl">,
  design: DesignSystem
): string {
  return [
    `kirana-style ui preset ${encodePreset(design)}`,
    ...(choices.pointer ? ["--pointer"] : []),
    ...(choices.rtl ? ["--rtl"] : []),
  ].join(" ")
}
