/**
 * The workspace layers: a Turborepo or a Vite+ monorepo around the app, which becomes `apps/web`,
 * with the components in `packages/ui`, as shadcn/ui's monorepo has them: `kirana-style ui init
 * --workspace packages/ui`, run in the app, makes the package the Kirana project the components
 * install into, and the app imports them as `@workspace/ui/components/button`. The skeleton gives
 * the package its `package.json` and a `tsconfig.json` with the framework's options, so it
 * type-checks on its own; `init` writes its `kirana.config.ts`, the components and the lockfile.
 * The tooling's configuration sits at the root, over `apps/*` and `packages/*` alike.
 */
import type { AppSkeleton, Dependency } from "./app.ts"
import type { Framework, Monorepo, Tooling } from "./catalog.ts"
import { PROJECT, WORKSPACE } from "./catalog.ts"
import {
  dependencyMap,
  kiranaPackages,
  renderJson,
  renderManifest,
  withKiranaRelease,
} from "./manifest.ts"
import type { Manifest } from "./manifest.ts"
import {
  KIRANA_RULES,
  ignored,
  toolingLayer,
  vitePlusOptions,
} from "./tooling.ts"
import { PACKAGE_MANAGER } from "./versions.ts"

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

/** The font items' packages (`font-<name>`: `@fontsource-variable/inter` …). */
const FONT_PACKAGES = ["@fontsource-variable/*", "@fontsource/*"]

/**
 * What `packages/ui` needs of its own to hold and type-check the framework's components: the
 * framework at runtime, its types and type checker, and the compiler options its components are
 * written for (the same the apps have). `ui add` adds each component's own packages to it.
 */
const UI_PACKAGE: Record<
  Framework,
  {
    dependencies: Dependency[]
    devDependencies: Dependency[]
    typecheck: string
    compilerOptions: Record<string, unknown>
    /** Files the checker needs beside the manifest and the tsconfig. */
    files?: Record<string, string>
    [key: string]: unknown
  }
> = {
  react: {
    dependencies: ["react", "react-dom"],
    devDependencies: ["@types/react", "@types/react-dom", "typescript"],
    typecheck: "tsc --noEmit",
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "react-jsx",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/react"],
    },
  },
  vue: {
    dependencies: ["vue"],
    devDependencies: ["typescript", "vue-tsc"],
    typecheck: "vue-tsc --noEmit",
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/vue"],
    },
    include: ["src/**/*.ts", "src/**/*.vue"],
  },
  svelte: {
    dependencies: ["svelte"],
    devDependencies: [
      "@sveltejs/vite-plugin-svelte",
      "svelte-check",
      "typescript",
    ],
    typecheck: "svelte-check --tsconfig ./tsconfig.json",
    // svelte-check reads the Svelte config, or a Vite config with the plugin; the package has
    // no build of its own, so it gets the former (a plain Svelte package, not SvelteKit).
    files: {
      "svelte.config.js": `import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

export default { preprocess: vitePreprocess() }
`,
    },
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      verbatimModuleSyntax: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/svelte"],
    },
    include: ["src/**/*.ts", "src/**/*.svelte"],
  },
  solid: {
    dependencies: ["solid-js"],
    devDependencies: ["typescript"],
    typecheck: "tsc --noEmit",
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "preserve",
      jsxImportSource: "solid-js",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/solid"],
    },
  },
  angular: {
    dependencies: ["@angular/common", "@angular/core", "rxjs", "tslib"],
    devDependencies: ["typescript"],
    // The components' TypeScript; their templates are checked where an app compiles them.
    typecheck: "tsc --noEmit",
    compilerOptions: {
      ignoreDeprecations: "6.0",
      strict: true,
      experimentalDecorators: true,
      moduleResolution: "bundler",
      isolatedModules: true,
      importHelpers: true,
      target: "ES2022",
      module: "ES2022",
      lib: ["ES2022", "dom"],
      useDefineForClassFields: false,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
    },
  },
}

/** `packages/ui`'s own files, before `init` fills it. */
function uiPackage(
  app: AppSkeleton,
  versions: { kirana: string }
): Record<string, string> {
  const spec = UI_PACKAGE[app.framework]
  const {
    compilerOptions,
    typecheck,
    dependencies,
    devDependencies,
    files = {},
    ...rest
  } = spec
  const manifest: Manifest = {
    name: WORKSPACE.ui,
    private: true,
    type: "module",
    scripts: { typecheck },
    dependencies: dependencyMap([
      ...dependencies,
      ...kiranaPackages(["@kirana-style/core"], versions.kirana),
    ]),
    devDependencies: dependencyMap(devDependencies),
  }
  return {
    [`${WORKSPACE.uiPath}/package.json`]: renderManifest(manifest),
    [`${WORKSPACE.uiPath}/tsconfig.json`]: renderJson({
      ...rest,
      compilerOptions: {
        ...compilerOptions,
        paths: { [`${WORKSPACE.ui}/*`]: ["./src/*"] },
      },
      include: rest.include ?? ["src"],
    }),
    [`${WORKSPACE.uiPath}/src/.gitkeep`]: "",
    ...Object.fromEntries(
      Object.entries(files).map(([path, content]) => [
        `${WORKSPACE.uiPath}/${path}`,
        content,
      ])
    ),
  }
}

/**
 * The root files of a workspace holding the app at `apps/web` and the components in
 * `packages/ui`; none for a single app. `kirana` is Kirana's release, for the root's lint plugin.
 */
export function workspaceLayer(
  monorepo: Monorepo,
  tooling: Tooling,
  app: AppSkeleton,
  versions: { kirana: string; vitePlus: string }
): Record<string, string> {
  if (monorepo === "none") return {}
  const ignores = ignored(app)
  const common = {
    // A font's package goes into `packages/ui` with the components, but its stylesheet is
    // imported by the app, which pnpm's and Bun's isolated installs then cannot resolve: the
    // font packages are hoisted to the root until `init` and `add` put them in the app (KF-111,
    // 0.4.1).
    "pnpm-workspace.yaml": `packages:\n${WORKSPACES.map((entry) => `  - "${entry}"`).join("\n")}\npublicHoistPattern:\n${FONT_PACKAGES.map((entry) => `  - "${entry}"`).join("\n")}\n`,
    "bunfig.toml": `[install]\npublicHoistPattern = [${FONT_PACKAGES.map((entry) => `"${entry}"`).join(", ")}]\n`,
    ".gitignore": `${GITIGNORE}\n# What the app writes\n${ignores
      .filter((entry) => !GITIGNORE.includes(`${entry}\n`))
      .map((entry) => `apps/${PROJECT.app}/${entry}`)
      .join("\n")}\n.turbo\n`,
    ...uiPackage(app, versions),
  }
  // `init --template` reads which folder it goes on in from the root.
  const template = { "kirana-template": { project: `apps/${PROJECT.app}` } }
  const add = `cd apps/${PROJECT.app} && ${tooling === "vite-plus" ? "vpx" : "npx"} kirana-style ui add button`
  const about = `The app is \`apps/${PROJECT.app}\`; the components live in \`${WORKSPACE.uiPath}\` (\`${WORKSPACE.ui}\`), which the app imports as \`${WORKSPACE.ui}/components/button\`. Add components from the app: \`${add}\`.`
  if (monorepo === "turbo") {
    // The tooling's configuration at the root reads every package; turbo runs the rest.
    const layer = toolingLayer(tooling, app)
    const manifest: Manifest = {
      name: PROJECT.directory,
      private: true,
      // turbo resolves the workspace from `packageManager`: the one `init` runs with.
      packageManager: PACKAGE_MANAGER,
      workspaces: WORKSPACES,
      ...template,
      scripts: {
        dev: "turbo dev",
        build: "turbo build",
        typecheck: "turbo typecheck",
        ...layer.scripts,
      },
      devDependencies: dependencyMap([
        "turbo",
        ...withKiranaRelease(layer.devDependencies, versions.kirana),
      ]),
    }
    return {
      ...common,
      ...layer.files,
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
          typecheck: { dependsOn: ["^typecheck"] },
          dev: { cache: false, persistent: true },
        },
      }),
      "README.md": `# ${PROJECT.directory}

A Turborepo workspace with a Kirana app. From the root:

\`\`\`sh
npm run dev
npm run build
npm run lint
npm run format
npm run typecheck
\`\`\`

${about}
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
    ...template,
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

A Vite+ monorepo with a Kirana app. From the root:

\`\`\`sh
vp run dev
vp run -r build
vp check
\`\`\`

${about}
`,
  }
}

export { KIRANA_RULES }
