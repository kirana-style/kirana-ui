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
