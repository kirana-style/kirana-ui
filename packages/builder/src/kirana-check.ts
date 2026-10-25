/**
 * Kirana's items checked with Kirana's own checks (`@kirana-style/registry`'s `check`: the schema,
 * every file's hash), so the registry and the installer read one definition of the format.
 *
 * The package is not in a Kirana release yet (0.3.2 has a placeholder that throws on load), so until
 * the project moves to the release that carries it, the builder says the items were not checked
 * instead of failing.
 */
type Check = (document: unknown) => {
  kind: string
  problems: { pointer: string; message: string }[]
}

/** Not a dependency yet: named at run time, so the types do not ask for it. */
const PACKAGE = "@kirana-style/registry"

/** Each document's problems, by its name (`button`, `index`), and what was done. */
export async function checkKiranaItems(
  documents: readonly (readonly [string, unknown])[],
  load: () => Promise<unknown> = () => import(PACKAGE)
): Promise<{ problems: string[]; note: string }> {
  let check: Check | undefined
  try {
    check = ((await load()) as { check?: Check }).check
  } catch {
    check = undefined
  }
  if (typeof check !== "function")
    return {
      problems: [],
      note: "not checked: this Kirana release has no @kirana-style/registry",
    }
  const problems = documents.flatMap(([name, document]) =>
    check(document).problems.map(
      (problem) =>
        `kirana/${name}: ${problem.pointer || "/"} ${problem.message}`
    )
  )
  return { problems, note: "checked with @kirana-style/registry" }
}
