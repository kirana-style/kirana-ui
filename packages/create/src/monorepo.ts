/**
 * The workspace layers: a Turborepo or a Vite+ monorepo around the app, which becomes `apps/web`.
 * Components install into the app for now: `kirana-style ui` reads one project at a time, so a
 * shared `packages/ui` waits on a workspace-aware installer (KF-108); the `packages/*` workspace
 * is there for it and for the reader's own packages.
 */
import type { AppSkeleton, Dependency } from "./app.ts"
import type { Monorepo, Tooling } from "./catalog.ts"
import { PROJECT } from "./catalog.ts"
import { dependencyMap, renderJson, renderManifest } from "./manifest.ts"
import type { Manifest } from "./manifest.ts"
import { KIRANA_RULES, ignored, vitePlusOptions } from "./tooling.ts"
import { PACKAGE_MANAGERS } from "./versions.ts"
import type { PackageManagerName } from "./versions.ts"

export const GITIGNORE = `node_modules
dist
.cache
*.log
.env
.env.*
!.env.example
.DS_Store
`

/** `.gitignore` for an app, with what its framework writes. */
export function gitignore(app: AppSkeleton): string {
  const extra = (app.ignore ?? []).filter(
    (entry) => !GITIGNORE.includes(`${entry.replace(/\/$/, "")}\n`)
  )
  return extra.length
    ? `${GITIGNORE}\n# ${app.title.replace("Kirana on ", "")}\n${extra.join("\n")}\n`
    : GITIGNORE
}

const WORKSPACES = ["apps/*", "packages/*"]

/** The task every workspace package offers, so the root can run it. */
const TASKS = ["dev", "build", "lint", "format", "typecheck"]

/**
 * The root files of a workspace holding the app at `apps/web`; none for a single app. `kirana`
 * is Kirana's release, for the root's own lint plugin.
 */
export function workspaceLayer(
  monorepo: Monorepo,
  tooling: Tooling,
  app: AppSkeleton,
  versions: { kirana: string; vitePlus: string },
  options: { packageManager: PackageManagerName }
): Record<string, string> {
  if (monorepo === "none") return {}
  const ignores = ignored(app)
  const common = {
    "pnpm-workspace.yaml": `packages:\n${WORKSPACES.map((entry) => `  - "${entry}"`).join("\n")}\n`,
    ".gitignore": `${GITIGNORE}\n# What the app writes\n${ignores
      .filter((entry) => !GITIGNORE.includes(`${entry}\n`))
      .map((entry) => `apps/${PROJECT.app}/${entry}`)
      .join("\n")}\n.turbo\n`,
  }
  if (monorepo === "turbo") {
    // turbo resolves the workspace from `packageManager`: the runner's, pinned.
    const manifest: Manifest = {
      name: PROJECT.directory,
      private: true,
      packageManager: PACKAGE_MANAGERS[options.packageManager],
      workspaces: WORKSPACES,
      scripts: Object.fromEntries(TASKS.map((task) => [task, `turbo ${task}`])),
      devDependencies: dependencyMap(["turbo"]),
    }
    return {
      ...common,
      "package.json": renderManifest(manifest),
      "turbo.json": renderJson({
        $schema: "https://turbo.build/schema.json",
        ui: "tui",
        tasks: {
          build: {
            dependsOn: ["^build"],
            inputs: ["$TURBO_DEFAULT$", ".env*"],
            outputs: [`${app.output.split("/")[0]}/**`],
          },
          lint: { dependsOn: ["^lint"] },
          format: { dependsOn: ["^format"] },
          typecheck: { dependsOn: ["^build", "^typecheck"] },
          dev: { cache: false, persistent: true },
        },
      }),
      "README.md": `# ${PROJECT.directory}

A Turborepo workspace with a Kirana app in \`apps/${PROJECT.app}\`. Run the app from the root:

\`\`\`sh
${tooling === "biome" ? "" : ""}npm run dev
npm run build
npm run lint
npm run format
npm run typecheck
\`\`\`

Add components inside the app: \`cd apps/${PROJECT.app} && npx kirana-style ui add button\`.
`,
    }
  }
  // Vite+: the root runs the tasks of every package (`vp run -r`), and holds the format and lint
  // settings, Kirana's rules among them.
  const devDependencies: Dependency[] = [
    "vite-plus",
    {
      name: "vite",
      version: `npm:@voidzero-dev/vite-plus-core@${versions.vitePlus}`,
    },
    { name: "@kirana-style/eslint-plugin", version: versions.kirana },
  ]
  const manifest: Manifest = {
    name: PROJECT.directory,
    private: true,
    type: "module",
    workspaces: WORKSPACES,
    scripts: {
      dev: `vp run ${PROJECT.app}#dev`,
      build: "vp run -r build",
      check: "vp check",
      lint: "vp lint",
      format: "vp fmt",
      typecheck: "vp run -r typecheck",
    },
    devDependencies: dependencyMap(devDependencies),
  }
  return {
    ...common,
    "package.json": renderManifest(manifest),
    "vite.config.ts": `import { defineConfig } from "vite-plus"

// The workspace's format and lint settings (\`vp check\`), Kirana's rules through its ESLint plugin;
// each package builds with its own \`vite.config.ts\`.
export default defineConfig({
  ${vitePlusOptions(ignores).join(",\n  ")},
  run: { cache: true },
})
`,
    "tsconfig.json": renderJson({
      compilerOptions: {
        noEmit: true,
        module: "nodenext",
        moduleResolution: "nodenext",
        allowImportingTsExtensions: true,
        esModuleInterop: true,
        skipLibCheck: true,
      },
      include: ["vite.config.ts"],
    }),
    "README.md": `# ${PROJECT.directory}

A Vite+ monorepo with a Kirana app in \`apps/${PROJECT.app}\`. From the root:

\`\`\`sh
vp run dev
vp run -r build
vp check
\`\`\`

Add components inside the app: \`cd apps/${PROJECT.app} && vpx kirana-style ui add button\`.
`,
  }
}

export { KIRANA_RULES }
