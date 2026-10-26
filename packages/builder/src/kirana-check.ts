/**
 * Kirana's items checked with Kirana's own checks (`@kirana-style/registry`'s `check`: the schema,
 * every file's hash), so the registry and the installer read one definition of the format.
 */
import { check } from "@kirana-style/registry"

/** Each document's problems, by its name (`button`, `index`). */
export function checkKiranaItems(
  documents: readonly (readonly [string, unknown])[],
  checkDocument: typeof check = check
): string[] {
  return documents.flatMap(([name, document]) =>
    checkDocument(document).problems.map(
      (problem) =>
        `kirana/${name}: ${problem.pointer || "/"} ${problem.message}`
    )
  )
}

type Placed = {
  name: string
  registryDependencies?: string[]
  frameworks?: Partial<
    Record<string, Record<string, { registryDependencies?: string[] }>>
  >
}

/**
 * Every item an item needs where that one has no markup: on each framework and base an item is
 * installed for, each item it depends on must be installable there too, or `kirana-style ui add`
 * stops (`select` once named `field` for Vue, which has no Field). An item that lists no
 * frameworks is installed for every one of `targets`.
 */
export function checkDependencyFrameworks(
  items: readonly Placed[],
  targets: readonly (readonly [string, string])[]
): string[] {
  const byName = new Map(items.map((item) => [item.name, item]))
  const has = (item: Placed, framework: string, base: string) =>
    !item.frameworks || Boolean(item.frameworks[framework]?.[base])
  const problems: string[] = []
  for (const item of items) {
    for (const [framework, base] of targets) {
      if (!has(item, framework, base)) continue
      const needs = [
        ...(item.registryDependencies ?? []),
        ...(item.frameworks?.[framework]?.[base]?.registryDependencies ?? []),
      ]
      for (const name of needs) {
        const dependency = byName.get(name)
        if (dependency && !has(dependency, framework, base))
          problems.push(
            `kirana/${item.name}: needs ${name} on ${framework} (${base}), which has no markup there.`
          )
      }
    }
  }
  return problems
}
