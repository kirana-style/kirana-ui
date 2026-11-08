/**
 * What a reader runs to start the project, one line per step, for each runner: fetch the
 * skeleton from the site (`giget`, which unpacks a tarball URL), install its packages, and
 * `kirana-style ui init` the design in it (in `apps/web` of a workspace). One command for all of
 * it is Kirana's to add (`ui init --template` reading a registry's templates, KF-108); until
 * then these three are what works.
 */
import { installLines } from "@workspace/docs-core/package-managers.ts"
import type { PackageManager } from "@workspace/docs-core/package-managers.ts"
import { encodePreset } from "@workspace/registry/core/preset"
import type { DesignSystem } from "@workspace/registry/core/config"

import { PROJECT, REGISTRY, SITE, TEMPLATES_PATH } from "./catalog.ts"
import type { Runner } from "./catalog.ts"
import { skeletonId } from "./choices.ts"
import type { ProjectChoices } from "./choices.ts"
import { VERSIONS } from "./versions.ts"
import type { PackageManagerName } from "./versions.ts"

export type Step = {
  /** Where the line runs, from the previous step's place. */
  cd?: string
  /** The runner's install, before `exec`. */
  install?: boolean
  run?: string
  exec?: string
}

/** The design system `init` installs: the registry's with the design's preset, and the `<html>` options. */
export function initArguments(
  choices: Pick<ProjectChoices, "framework" | "base" | "pointer" | "rtl">,
  design: DesignSystem
): string {
  return [
    `--framework ${choices.framework} --base ${choices.base}`,
    `--preset ${encodePreset(design)}`,
    ...(choices.pointer ? ["--pointer"] : []),
    ...(choices.rtl ? ["--rtl"] : []),
    `--registry @kirana=${REGISTRY}/{name}.json`,
  ].join(" ")
}

/** A Turborepo names its package manager, so it is packed once per runner; `vp` drives Bun's. */
export function packageManagerOf(runner: Runner): PackageManagerName {
  return runner === "vp" ? "bun" : runner
}

/** The skeleton's file on the site: a Turborepo's carries the runner's package manager. */
export function skeletonFile(
  choices: Pick<ProjectChoices, "template" | "monorepo" | "tooling">,
  runner: Runner
): string {
  const id = skeletonId(choices)
  return choices.monorepo === "turbo"
    ? `${id}.${packageManagerOf(runner)}.tgz`
    : `${id}.tgz`
}

/** The skeleton's URL on the site. */
export function skeletonUrl(
  choices: Pick<ProjectChoices, "template" | "monorepo" | "tooling">,
  runner: Runner,
  site = SITE
): string {
  return `${site}/${TEMPLATES_PATH}/${skeletonFile(choices, runner)}`
}

export function projectSteps(
  choices: ProjectChoices,
  design: DesignSystem,
  runner: Runner,
  site = SITE
): Step[] {
  const init = `kirana-style ui init ${initArguments(choices, design)}`
  const fetch: Step = {
    run: `giget@${VERSIONS.giget} ${skeletonUrl(choices, runner, site)} ${PROJECT.directory}`,
  }
  if (choices.monorepo === "none")
    return [fetch, { cd: PROJECT.directory, install: true, exec: init }]
  return [
    fetch,
    { cd: PROJECT.directory, install: true },
    { cd: `apps/${PROJECT.app}`, exec: init },
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
