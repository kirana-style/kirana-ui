/**
 * The names a flattened module writes for the design system's values, read from the registry's own
 * modules: which export each variable token group is, which `axes` member each style-axis read is,
 * and each relation's identifier where a module exports it.
 */
import { readdirSync } from "node:fs"
import { join } from "node:path"

import { evaluate } from "./evaluate"
import type { CoreModule, Names } from "./generate"
import { only } from "./markers"

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

export async function loadNames(registry: string): Promise<Names> {
  const names: Names = {
    tokens: new Map(),
    axes: new Map(),
    relations: new Map(),
  }

  for (const module of ["tokens", "context"] as const satisfies CoreModule[]) {
    const exports = await evaluate(join(registry, "core", `${module}.ts`))
    for (const [name, value] of Object.entries(exports)) {
      if (!isObject(value)) continue
      const first = Object.values(value).find(
        (member) => typeof member === "string"
      )
      const marker = typeof first === "string" ? only(first) : undefined
      if (marker?.kind === "token")
        names.tokens.set(marker.group, { module, name })
    }
  }

  const { axes } = await evaluate(join(registry, "core", "axes.ts"))
  const walk = (value: unknown, path: string) => {
    if (typeof value === "string" && only(value)) names.axes.set(value, path)
    else if (isObject(value)) {
      for (const [key, member] of Object.entries(value))
        walk(member, `${path}.${key}`)
    }
  }
  walk(axes, "axes")

  for (const file of readdirSync(join(registry, "styles"))) {
    if (!file.endsWith(".ts")) continue
    for (const [name, value] of Object.entries(
      await evaluate(join(registry, "styles", file))
    )) {
      if (
        isObject(value) &&
        typeof value.name === "string" &&
        typeof value.within === "function"
      ) {
        names.relations.set(value.name, { module: file, name })
      }
    }
  }
  return names
}
