/**
 * A project's files from its choices: the app skeleton, the tooling's layer over it (at the app's
 * root alone, at the workspace's root otherwise), and the workspace around it. The result is what
 * the site serves as `templates/<id>.tgz`, which `kirana-style ui init --template` unpacks and
 * installs before it installs the design system; `ui add` then adds the components. Pure: the
 * same choices and versions give the same files.
 */
import type { AppSkeleton, Dependency, ViteConfig } from "./app.ts"
import { APPS } from "./apps/index.ts"
import { PROJECT, WORKSPACE } from "./catalog.ts"
import type { Monorepo, Tooling } from "./catalog.ts"
import { skeletonId } from "./choices.ts"
import type { ProjectChoices } from "./choices.ts"
import {
  dependencyMap,
  kiranaPackages,
  renderJson,
  renderManifest,
  withKiranaRelease,
} from "./manifest.ts"
import type { Manifest } from "./manifest.ts"
import { gitignore, workspaceLayer } from "./monorepo.ts"
import { ignored, toolingLayer, vitePlusOptions } from "./tooling.ts"

export type Versions = {
  /** Kirana's release: `@kirana-style/*`, `kirana-style` and the lint plugins. */
  kirana: string
  /** Vite+'s. */
  vitePlus: string
}

export type Skeleton = Pick<ProjectChoices, "template" | "monorepo" | "tooling">

/**
 * `vite.config.ts`: the plugins, and for a single Vite+ app the format and lint settings with
 * Vite+'s `defineConfig`; every other app, a Vite+ monorepo's included, uses Vite's, which a type
 * checker reading the config (svelte-check) can load.
 */
export function renderVite(
  config: ViteConfig,
  app: AppSkeleton,
  tooling: Tooling,
  monorepo: Monorepo
): string {
  const vitePlus = tooling === "vite-plus" && monorepo === "none"
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
    ...(vitePlus ? vitePlusOptions(ignored(app)) : []),
  ]
  return `${lines.join("\n")}

${config.note ? `// ${config.note}\n` : ""}export default defineConfig({
  ${options.join(",\n  ")},
})
`
}

/**
 * A skeleton file's imports of what `init` installs, written for a single app (`@/components/ui/…`,
 * `@/lib/…`), as the workspace's package exports them (`@workspace/ui/components/…`): the aliases
 * `init --workspace` sets, `ui`, `lib` and `hook`.
 */
function workspaceAliases(content: string): string {
  return content
    .replaceAll('"@/components/ui/', `"${WORKSPACE.ui}/components/`)
    .replaceAll('"@/lib/', `"${WORKSPACE.ui}/lib/`)
    .replaceAll('"@/hooks/', `"${WORKSPACE.ui}/hooks/`)
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
  const alone = skeleton.monorepo === "none"
  // A single app carries its tooling; a workspace's root does (`workspaceLayer`).
  const tooling = alone
    ? toolingLayer(skeleton.tooling, app)
    : { files: {}, scripts: {}, devDependencies: [] }
  const vitePlus = skeleton.tooling === "vite-plus"
  const files = new Map<string, string>()
  for (const [path, content] of Object.entries(app.files))
    files.set(prefix + path, alone ? content : workspaceAliases(content))
  for (const [path, content] of Object.entries(tooling.files))
    files.set(prefix + path, content)
  // The alias every installed file imports by, and Vite told to read it; a framework that maps it
  // itself keeps its generated tsconfig's paths.
  files.set(
    `${prefix}tsconfig.json`,
    renderJson(
      app.source === null
        ? app.tsconfig
        : {
            ...app.tsconfig,
            compilerOptions: {
              ...app.tsconfig.compilerOptions,
              paths: {
                "@/*": [app.source === "." ? "./*" : `./${app.source}/*`],
              },
            },
          }
    )
  )
  if (app.vite)
    files.set(
      `${prefix}vite.config.ts`,
      renderVite(app.vite, app, skeleton.tooling, skeleton.monorepo)
    )
  if (alone) files.set(`${prefix}.gitignore`, gitignore(app))
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
    ...withKiranaRelease(tooling.devDependencies, versions.kirana),
  ]
  const scripts = { ...app.scripts, typecheck: app.typecheck }
  const manifest: Manifest = {
    name: alone ? PROJECT.directory : PROJECT.app,
    private: true,
    type: "module",
    scripts: {
      ...(vitePlus ? vitePlusScripts(scripts) : scripts),
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
  versions: Versions
): Map<string, string> {
  const app = APPS[skeleton.template]
  const prefix = skeleton.monorepo === "none" ? "" : `apps/${PROJECT.app}/`
  const files = new Map<string, string>([
    ...appFiles(skeleton, versions, prefix),
    ...Object.entries(
      workspaceLayer(skeleton.monorepo, skeleton.tooling, app, versions)
    ),
  ])
  return new Map([...files].sort(([a], [b]) => a.localeCompare(b)))
}

export { skeletonId }
