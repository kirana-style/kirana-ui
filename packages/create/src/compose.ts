/**
 * A project's files from its choices: the app skeleton, the tooling's layer over it, and the
 * workspace around it. The result is what the site serves as `templates/<id>.tgz` and what the
 * install check writes to disk; `kirana-style ui init` then installs the design system into it,
 * and `ui add` the components. Pure: the same choices and versions give the same files.
 */
import type { AppSkeleton, Dependency, ViteConfig } from "./app.ts"
import { APPS } from "./apps/index.ts"
import { PROJECT } from "./catalog.ts"
import type { Monorepo, Tooling } from "./catalog.ts"
import { skeletonId } from "./choices.ts"
import type { ProjectChoices } from "./choices.ts"
import {
  dependencyMap,
  kiranaPackages,
  renderJson,
  renderManifest,
} from "./manifest.ts"
import type { Manifest } from "./manifest.ts"
import { gitignore, workspaceLayer } from "./monorepo.ts"
import { ignored, toolingLayer, vitePlusOptions } from "./tooling.ts"
import type { PackageManagerName } from "./versions.ts"

export type Versions = {
  /** Kirana's release: `@kirana-style/*`, `kirana-style` and the lint plugins. */
  kirana: string
  /** Vite+'s. */
  vitePlus: string
}

export type Skeleton = Pick<ProjectChoices, "template" | "monorepo" | "tooling">

/** What a skeleton's files depend on besides its choices. */
export type ComposeOptions = {
  /** The package manager a Turborepo names in `packageManager` (turbo refuses to run without one); Bun unless the command's runner says. */
  packageManager?: PackageManagerName
}

/** `vite.config.ts`: Vite's or Vite+'s `defineConfig`, the plugins, and under Vite+ alone the format and lint settings. */
export function renderVite(
  config: ViteConfig,
  app: AppSkeleton,
  tooling: Tooling,
  monorepo: Monorepo
): string {
  const vitePlus = tooling === "vite-plus"
  const imports = [
    'import kirana from "@kirana-style/vite"',
    ...config.imports,
    `import { defineConfig } from "${vitePlus ? "vite-plus" : "vite"}"`,
  ]
    .filter((line) => !config.imports.includes(line) || true)
    .filter((line, index, all) => all.indexOf(line) === index)
    .sort((a, b) => {
      // Kirana first, the framework's next, `defineConfig` last: as the examples order them.
      const key = (line: string) =>
        line.includes("@kirana-style/vite")
          ? 0
          : line.startsWith("import { defineConfig }")
            ? 2
            : 1
      return key(a) - key(b) || a.localeCompare(b)
    })
  const needsKirana = config.plugins.some((plugin) =>
    plugin.startsWith("kirana(")
  )
  const lines = needsKirana
    ? imports
    : imports.filter((line) => !line.includes("@kirana-style/vite"))
  const options = [
    ...(config.options ?? []),
    ...(config.options?.some((option) => option.startsWith("resolve:"))
      ? []
      : ["resolve: { tsconfigPaths: true }"]),
    `plugins: [${config.plugins.join(", ")}]`,
    // A single Vite+ app checks itself here; in a Vite+ monorepo the root config does.
    ...(vitePlus && monorepo === "none" ? vitePlusOptions(ignored(app)) : []),
  ]
  return `${lines.join("\n")}

${config.note ? `// ${config.note}\n` : ""}export default defineConfig({
  ${options.join(",\n  ")},
})
`
}

/** The app's scripts under Vite+: `vp` in place of `vite`. */
function vitePlusScripts(scripts: Readonly<Record<string, string>>) {
  return Object.fromEntries(
    Object.entries(scripts).map(([name, command]) => [
      name,
      command.replace(/^vite(?= |$)/, "vp").replace(/^vp$/, "vp dev"),
    ])
  )
}

/**
 * The app's files, at `prefix` (`""` alone, `apps/web/` in a workspace).
 */
function appFiles(
  skeleton: Skeleton,
  versions: Versions,
  prefix: string
): Map<string, string> {
  const app = APPS[skeleton.template]
  const tooling = toolingLayer(skeleton.tooling, app)
  const vitePlus = skeleton.tooling === "vite-plus"
  const files = new Map<string, string>()
  for (const [path, content] of Object.entries(app.files))
    files.set(prefix + path, content)
  for (const [path, content] of Object.entries(tooling.files))
    files.set(prefix + path, content)
  // The alias every installed file imports by, and Vite told to read it.
  const source = app.source === "." ? "./*" : `./${app.source}/*`
  files.set(
    `${prefix}tsconfig.json`,
    renderJson({
      ...app.tsconfig,
      compilerOptions: {
        ...app.tsconfig.compilerOptions,
        paths: { "@/*": [source] },
      },
    })
  )
  if (app.vite)
    files.set(
      `${prefix}vite.config.ts`,
      renderVite(app.vite, app, skeleton.tooling, skeleton.monorepo)
    )
  if (skeleton.monorepo === "none")
    files.set(`${prefix}.gitignore`, gitignore(app))
  const kiranaRelease = (list: Dependency[]) =>
    list.map((entry) =>
      typeof entry !== "string" && entry.version === "kirana"
        ? { ...entry, version: versions.kirana }
        : entry
    )
  const dependencies: Dependency[] = [
    ...app.dependencies,
    ...kiranaPackages(
      ["@kirana-style/core", ...(app.kirana.dependencies ?? [])],
      versions.kirana
    ),
  ]
  const devDependencies: Dependency[] = [
    ...app.devDependencies.filter(
      (entry) => !(vitePlus && typeof entry === "string" && entry === "vite")
    ),
    ...(vitePlus
      ? [
          {
            name: "vite",
            version: `npm:@voidzero-dev/vite-plus-core@${versions.vitePlus}`,
          },
        ]
      : []),
    ...kiranaPackages(
      [
        "kirana-style",
        "@kirana-style/registry",
        ...(app.kirana.devDependencies ?? []),
      ],
      versions.kirana
    ),
    ...kiranaRelease(tooling.devDependencies),
  ]
  const manifest: Manifest = {
    name: skeleton.monorepo === "none" ? PROJECT.directory : PROJECT.app,
    private: true,
    type: "module",
    scripts: {
      ...(vitePlus ? vitePlusScripts(app.scripts) : app.scripts),
      ...tooling.scripts,
    },
    dependencies: dependencyMap(dependencies),
    devDependencies: dependencyMap(devDependencies),
  }
  files.set(`${prefix}package.json`, renderManifest(manifest))
  return files
}

/** Every file of the project, by path, sorted. */
export function composeProject(
  skeleton: Skeleton,
  versions: Versions,
  options: ComposeOptions = {}
): Map<string, string> {
  const app = APPS[skeleton.template]
  const prefix = skeleton.monorepo === "none" ? "" : `apps/${PROJECT.app}/`
  const files = new Map<string, string>([
    ...appFiles(skeleton, versions, prefix),
    ...Object.entries(
      workspaceLayer(skeleton.monorepo, skeleton.tooling, app, versions, {
        packageManager: options.packageManager ?? "bun",
      })
    ),
  ])
  return new Map([...files].sort(([a], [b]) => a.localeCompare(b)))
}

export { skeletonId }
