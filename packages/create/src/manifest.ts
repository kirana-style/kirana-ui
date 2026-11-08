/**
 * `package.json` as the composer writes it: the fields in the order a reader expects, each
 * dependency list sorted, every package at the range `VERSIONS` gives it (Kirana's at the release
 * the site was built with).
 */
import type { Dependency } from "./app.ts"
import { VERSIONS } from "./versions.ts"

export type Manifest = {
  name: string
  private: true
  type?: "module"
  workspaces?: string[]
  scripts: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}

/** A dependency's name and range: a `VERSIONS` key, or its own. */
export function versioned(dependency: Dependency): [string, string] {
  return typeof dependency === "string"
    ? [dependency, VERSIONS[dependency]]
    : [dependency.name, dependency.version]
}

/** Kirana's packages, every one at the same release. */
export function kiranaPackages(
  names: readonly string[],
  release: string
): Dependency[] {
  return names.map((name) => ({ name, version: release }))
}

export function dependencyMap(
  dependencies: readonly Dependency[]
): Record<string, string> {
  return Object.fromEntries(
    dependencies.map(versioned).sort(([a], [b]) => a.localeCompare(b))
  )
}

export function renderManifest(manifest: Manifest): string {
  const ordered: Record<string, unknown> = {}
  for (const key of [
    "name",
    "private",
    "type",
    "packageManager",
    "workspaces",
    "scripts",
    "dependencies",
    "devDependencies",
  ])
    if (manifest[key] !== undefined) ordered[key] = manifest[key]
  for (const [key, value] of Object.entries(manifest))
    if (!(key in ordered)) ordered[key] = value
  for (const key of ["dependencies", "devDependencies"]) {
    const list = ordered[key] as Record<string, string> | undefined
    if (list && Object.keys(list).length === 0) delete ordered[key]
  }
  return `${JSON.stringify(ordered, null, 2)}\n`
}

export function renderJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`
}
