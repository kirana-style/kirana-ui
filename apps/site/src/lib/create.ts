/**
 * `/create`'s logic, apart from its page: the history of designs (undo and redo), shuffling the
 * axes that are not locked, opening a preset from a code or a link, and the project's commands.
 * The design itself is the site's (`setDesign`), so every other page follows what `/create` makes.
 */
import { useState } from "react"

import { resolveDesignSystem } from "@workspace/registry/core/config"
import type { DesignSystem } from "@workspace/registry/core/config"
import {
  encodePreset,
  isPresetCode,
  readDesignSystem,
} from "@workspace/registry/core/preset"
import { namesDesign, readPageDesign } from "@workspace/registry/core/preview"

import { designChoices } from "./design-choices"
import type { DesignAxis } from "./design-choices"
import { setDesign } from "./page-design"

/** Designs went through, for undo and redo: the current one is `past`'s last. */
export function useDesignHistory(current: DesignSystem) {
  const [past, setPast] = useState<DesignSystem[]>([])
  const [future, setFuture] = useState<DesignSystem[]>([])

  const apply = (next: DesignSystem) => {
    const resolved = resolveDesignSystem(next).system
    if (encodePreset(resolved) === encodePreset(current)) return
    setPast([...past, current])
    setFuture([])
    setDesign(resolved)
  }
  const undo = () => {
    const previous = past.at(-1)
    if (!previous) return
    setPast(past.slice(0, -1))
    setFuture([current, ...future])
    setDesign(previous)
  }
  const redo = () => {
    const next = future[0]
    if (!next) return
    setFuture(future.slice(1))
    setPast([...past, current])
    setDesign(next)
  }
  return {
    apply,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  }
}

/**
 * A random value for every axis not locked, in the customizer's order, so a theme is one the
 * shuffled base colour allows; the rules between axes apply after (`resolveDesignSystem`).
 */
export function shuffle(
  system: DesignSystem,
  locked: ReadonlySet<DesignAxis>,
  random: () => number = Math.random
): DesignSystem {
  let next: DesignSystem = { ...system }
  for (const [axis] of designChoices(system)) {
    if (locked.has(axis)) continue
    const values = designChoices(next).find(([name]) => name === axis)![2]
    const pick = values[Math.floor(random() * values.length)]
    if (pick) next = { ...next, [axis]: pick.value }
  }
  return resolveDesignSystem(next).system
}

/**
 * The design a pasted preset names: a code (`k…`, or shadcn/ui's `a…` and `b…`), or a link whose
 * query names one, from this site or shadcn/ui's. `null` for anything else.
 */
export function openPreset(text: string): DesignSystem | null {
  const value = text.trim()
  if (isPresetCode(value))
    return readDesignSystem({
      get: (name) => (name === "preset" ? value : null),
    }).system
  try {
    const url = new URL(value)
    return namesDesign(url.searchParams)
      ? readPageDesign(url.search, "").system
      : null
  } catch {
    return null
  }
}

/** The templates checked with the registry, per framework (the docs' Installation page). */
export const TEMPLATES = {
  react: ["vite-react", "tanstack-start"],
  vue: ["vite-vue"],
} as const

/** Where the registry is served until `ui.kirana.style` is attached (CLI-10). */
const REGISTRY = "https://ui.kirana-style.workers.dev/r"

/** Get Code's switches: `data-pointer` and `dir="rtl"` on `<html>`, which `--pointer` and `--rtl` write. */
export type HtmlOptions = { pointer?: boolean; rtl?: boolean }

const htmlFlags = ({ pointer, rtl }: HtmlOptions = {}) =>
  [pointer ? "--pointer" : null, rtl ? "--rtl" : null].filter(Boolean)

/**
 * What starts a project in this design, after the package manager's runner (`npx`, `pnpm dlx` …):
 * `@kirana-style/registry init` with the template, the framework and base, the preset, the
 * pointer and right-to-left options, and the registry where it is served until `ui.kirana.style`
 * is attached.
 */
export function initRun(
  system: DesignSystem,
  template: string,
  options?: HtmlOptions
) {
  return [
    `@kirana-style/registry init --template ${template} my-app`,
    `--framework ${system.framework} --base ${system.base}`,
    `--preset ${encodePreset(system)}`,
    ...htmlFlags(options),
    `--registry @kirana=${REGISTRY}/{name}.json`,
  ].join(" ")
}

/** The same with npm's runner. */
export function initCommand(
  system: DesignSystem,
  template: string,
  options?: HtmlOptions
) {
  return `npx ${initRun(system, template, options)}`
}

/** What changes an existing project's design to this one: `kirana-style ui preset`. */
export function presetRun(system: DesignSystem, options?: HtmlOptions) {
  return [
    `kirana-style ui preset ${encodePreset(system)}`,
    ...htmlFlags(options),
  ].join(" ")
}

/**
 * A React project's `components.json` for shadcn/ui's CLI, at the export's combination: the shape
 * the install test proved (`tailwind` is required by the schema, unused by the components).
 */
export function componentsJson(system: DesignSystem) {
  return JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      style: `react-${system.base}-${system.style}`,
      rsc: false,
      tsx: true,
      tailwind: {
        config: "",
        css: "src/index.css",
        baseColor: system.baseColor,
        cssVariables: true,
        prefix: "",
      },
      iconLibrary: system.iconLibrary,
      menuColor: system.menuColor,
      menuAccent: system.menuAccent,
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      registries: { "@kirana": `${REGISTRY}/shadcn/{style}/{name}.json` },
    },
    null,
    2
  )
}

/** The registry item a preview shows: `button-demo` is Button's, a block is itself. */
export function itemOf(preview: string) {
  return preview.replace(/-(demo|example)$/, "")
}
