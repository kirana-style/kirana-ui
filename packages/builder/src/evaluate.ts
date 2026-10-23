/**
 * Runs a style module without the compiler: `@kirana-style/core` loads as `kirana-stub.ts`, so
 * every `css()`, `recipe()`, token and relation becomes a description the builder can flatten.
 * The module's own helpers (`when()`, `focusRing()` …) run as written. Bun only.
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const STUB = fileURLToPath(new URL("./kirana-stub.ts", import.meta.url))

let installed = false

function installStub() {
  if (installed) return
  installed = true
  Bun.plugin({
    name: "kirana-stub",
    setup(build) {
      // Where the real module loads, it re-exports the stub: Bun's runtime plugins resolve
      // imports from installed packages before `onResolve` sees them.
      build.onLoad({ filter: /@kirana-style\/core\/src\/index\.js$/ }, () => ({
        contents: `export * from ${JSON.stringify(STUB)}`,
        loader: "js",
      }))
    },
  })
}

/**
 * A style module's exports, with Kirana's values as descriptions and markers, in the order its
 * source declares them (a module namespace lists them alphabetically, which would write a relation
 * after the style that reads it).
 */
export async function evaluate(path: string): Promise<Record<string, unknown>> {
  installStub()
  const namespace = (await import(path)) as Record<string, unknown>
  const source = readFileSync(path, "utf8")
  const position = (name: string) => {
    const at = source.search(
      new RegExp(`export\\s+(?:const|function|let)\\s+${name}\\b`)
    )
    return at < 0 ? Number.MAX_SAFE_INTEGER : at
  }
  return Object.fromEntries(
    Object.keys(namespace)
      .sort((a, b) => position(a) - position(b))
      .map((name) => [name, namespace[name]])
  )
}

const BASES = ["base", "aria", "ark"] as const

/**
 * Tags every state key in the registry's `core/states.ts` with its base, in place, before any style
 * module reads it: `when()` then spreads tagged keys, and the flattener keeps the target base's.
 * Call it before evaluating a style module; the module instance is shared.
 */
export async function tagStates(path: string) {
  const { marker } = await import("./markers")
  const exports = await evaluate(path)
  for (const group of Object.values(exports)) {
    if (typeof group !== "object" || group === null) continue
    for (const keys of Object.values(group as Record<string, unknown>)) {
      if (typeof keys !== "object" || keys === null) continue
      const record = keys as Record<string, unknown>
      for (const base of BASES) {
        const key = record[base]
        if (typeof key === "string" && !key.startsWith("\uE000")) {
          record[base] = marker({ kind: "state", base, key })
        }
      }
    }
  }
}
