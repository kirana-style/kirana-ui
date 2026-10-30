import { defineConfig } from "vite-plus"

/**
 * The workspace's sources, named rather than traced. Tracing a task's file access makes starting
 * a native binary fail with EBUSY (tsgolint under `vp check`), and it can miss reads of workspace
 * packages; the Kirana repository found both (kirana's root vite.config.ts).
 */
const SOURCES = [
  "**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs,json,jsonc,md,css,yml,yaml,html}",
  "!**/node_modules/**",
  "!**/dist/**",
  "!**/coverage/**",
  "!**/.tanstack/**",
  "!**/.wrangler/**",
  // Generated from `apps/site/content`, which is in: the `content` task writes them.
  "!apps/site/src/generated/**",
  "!apps/site/public/llms*.txt",
  "!apps/site/public/docs/**",
  // Local agent files: never part of a build or a check.
  "!.agents/**",
  "!.claude/**",
  "bun.lock",
]

/**
 * The apps, each built by its own `build` script (`vp build`): the site, blocks and examples, and a
 * preview per framework, whose build is where the registry's components for it compile
 * (`react-base` and `react-aria`, `vue-ark`, `svelte-ark`, `solid-ark`, `angular-ng`). In this
 * order: each preview writes into the site's `dist/client/preview/<framework>/`, which the `ui`
 * Worker serves.
 */
const APPS = [
  "site",
  "blocks",
  "examples",
  "preview-react",
  "preview-vue",
  "preview-svelte",
  "preview-solid",
  "preview-angular",
]

export default defineConfig({
  // The workspace's tasks: `vp run <name>`. Each is cached (node_modules/.vite/task-cache) unless
  // it says otherwise; a hit replays its output and restores its files. `vp run prepush` is what
  // the pre-push hook runs, and CI runs the same tasks.
  run: {
    tasks: {
      // Every app into its dist/. The build prints Kirana's diagnostics as file:line:column; an
      // error fails it.
      build: {
        command: APPS.map((app) => `bun run --cwd apps/${app} build`).join(
          " && "
        ),
        cache: {
          input: SOURCES,
          output: APPS.map((app) => `apps/${app}/dist/**`),
        },
      },
      // The registry for every combination (`packages/builder`): each style module flattened to one
      // style and base, checked against the live module with Kirana (one `Driver` session), every
      // item validated against shadcn/ui's schema, written into the site's static files
      // (`apps/site/dist/client/r`), which the `ui` Worker serves at `/r`.
      registry: {
        command: "bun packages/builder/src/cli.ts",
        dependsOn: ["build"],
        cache: { input: SOURCES, output: ["apps/site/dist/client/r/**"] },
      },
      // The built site against `budgets.json` (`scripts/budgets.ts`): each page's JavaScript and
      // stylesheet, the registry's files and the Worker's static file limits, gzip as Kirana
      // measures.
      budgets: {
        command: "bun scripts/budgets.ts",
        dependsOn: ["build", "registry"],
        cache: false,
      },
      // The registry installed as a project installs it: a project from Kirana's example per
      // framework, `kirana-style ui init --preset` and `add`, built, its lockfile validated
      // (`scripts/install-smoke.ts`). Reads Kirana's release from GitHub, so it is not in prepush.
      install: {
        command: "bun scripts/install-smoke.ts",
        dependsOn: ["registry"],
        cache: false,
      },
      // The provenance manifest against shadcn/ui (`packages/builder/src/upstream-cli.ts`):
      // `vp run upstream -- scan [--ref main]` writes `upstream/report.md`, `-- accept [<item>…]`
      // stamps items. Reads upstream's repository, so it is not in prepush.
      upstream: {
        command: "bun packages/builder/src/upstream-cli.ts",
        cache: false,
      },
      // The registry's pages against shadcn/ui's own site, every example and block in every style
      // (`scripts/conformance.ts`, kirana-lab's harness); `conformance:pr` keeps the pages a change
      // since `origin/main` reaches. Needs the site's Worker, upstream's site and kirana-lab.
      conformance: { command: "bun scripts/conformance.ts", cache: false },
      "conformance:pr": {
        command: "bun scripts/conformance.ts --changed",
        cache: false,
      },
      // The site :3000, blocks :3001, examples :3002 and the previews, Vue :3003, Svelte :3004,
      // Solid :3005, Angular :3006 and React :3007, side by side; the site forwards
      // `/preview/<framework>/` to each.
      dev: {
        command: 'vp run --filter "./apps/*" --parallel dev',
        cache: false,
      },
      // Format, lint with the Kirana rules, and types. A lint warning fails it, as in CI, so
      // warnings cannot pile up.
      check: {
        command: "vp check --deny-warnings",
        dependsOn: ["content"],
        cache: { input: SOURCES, output: [] },
      },
      // The site's docs content from `apps/site/content` (docs-core's `generate()`): the manifest,
      // each page parsed, the search records, the code colours, `llms.txt` and the markdown twins.
      // Not committed; the types and the build read it.
      content: {
        command: "bun run --cwd apps/site generate:content",
        cache: {
          input: SOURCES,
          output: [
            "apps/site/src/generated/**",
            "apps/site/public/llms*.txt",
            "apps/site/public/docs/**",
          ],
        },
      },
      // The registry's style modules, compiled with its own `kirana.config.ts`: no app builds them
      // yet, so this is where a diagnostic in one shows. A warning fails it too.
      styles: {
        command: "bun run --cwd registry styles",
        cache: { input: SOURCES, output: [] },
      },
      // Vitest: the registry's codec, configuration and palettes (`registry/**/*.test.ts`).
      test: {
        command: "vp test run",
        cache: { input: SOURCES, output: [] },
      },
      // Every installed JavaScript dependency's licence against the policy in the script; it
      // changes only with the lockfile.
      licenses: {
        command: "bun scripts/check-licenses.ts",
        cache: { input: ["bun.lock", "scripts/check-licenses.ts"], output: [] },
      },
      // Everything CI requires of a pull request that runs on this machine; the pre-push hook.
      prepush: {
        command: "echo All checks passed.",
        dependsOn: [
          "check",
          "styles",
          "test",
          "licenses",
          "build",
          "registry",
          "budgets",
        ],
        cache: false,
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    endOfLine: "lf",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.output/**",
      "**/.nitro/**",
      "**/.tanstack/**",
      "**/.vinxi/**",
      "**/.wrangler/**",
      "**/routeTree.gen.ts",
      "bun.lock",
      ".agents/**",
      ".claude/**",
    ],
  },
  lint: {
    plugins: ["import", "typescript", "unicorn", "react", "oxc"],
    jsPlugins: [
      { name: "kirana", specifier: "@kirana-style/eslint-plugin" },
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
    ],
    categories: {
      correctness: "error",
    },
    env: {
      builtin: true,
      es2020: true,
      browser: true,
    },
    ignorePatterns: [
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.output/**",
      "**/.nitro/**",
      "**/.tanstack/**",
      "**/.vinxi/**",
      "**/.wrangler/**",
      "**/routeTree.gen.ts",
      // The builder's scratch modules, removed when it finishes.
      "**/.flat/**",
      "**/vite.config.*.timestamp-*.*",
    ],
    rules: {
      // Type-aware rules that only find deliberate patterns, turned off for the reasons the Kirana
      // repository gives: `String(value)` on bridged values and on `cx()`, which the compiler
      // replaces with a class string, and `useSyncExternalStore(store.subscribe, …)` members.
      "typescript/unbound-method": "off",
      "typescript/no-base-to-string": "off",
      "typescript/restrict-template-expressions": "off",
      "typescript/no-implied-eval": "off",
      "kirana/diagnostics": "error",
      "kirana/sx-last": "error",
      "kirana/no-conflicting-props": "error",
      "kirana/override-keeps-conditions": "error",
      "kirana/no-classname-on-sx": "error",
      "kirana/no-unused": "error",
      "for-direction": "error",
      "no-async-promise-executor": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-constant-binary-expression": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-empty-static-block": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": "error",
      "no-global-assign": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-shadow": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "no-useless-backreference": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-var": "error",
      "no-with": "error",
      "prefer-const": "error",
      "require-yield": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-commonjs": "error",
      "import/no-duplicates": "error",
      "unicorn/prefer-node-protocol": "error",
      "typescript/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": false,
          "ts-ignore": "allow-with-description",
        },
      ],
      "typescript/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "typescript/method-signature-style": ["error", "property"],
      "typescript/no-duplicate-enum-values": "error",
      "typescript/no-extra-non-null-assertion": "error",
      "typescript/no-inferrable-types": [
        "error",
        {
          ignoreParameters: true,
        },
      ],
      "typescript/no-misused-new": "error",
      "typescript/no-namespace": "error",
      "typescript/no-non-null-asserted-optional-chain": "error",
      "typescript/no-unsafe-function-type": "error",
      "typescript/no-wrapper-object-types": "error",
      "typescript/prefer-as-const": "error",
      "typescript/prefer-for-of": "error",
      "typescript/triple-slash-reference": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
})
