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
  // Local agent files: never part of a build or a check.
  "!.agents/**",
  "!.claude/**",
  "bun.lock",
]

/**
 * The apps, each built by its own `build` script (`vp build`): the demo, blocks and examples, and
 * the Vue preview, whose build is where the registry's `vue-ark` components compile.
 */
const APPS = ["web", "blocks", "examples", "preview-vue"]

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
      // The demo :3000, blocks :3001, examples :3002 and the Vue preview :3003, side by side.
      dev: {
        command: 'vp run --filter "./apps/*" --parallel dev',
        cache: false,
      },
      // Format, lint with the Kirana rules, and types.
      check: {
        command: "vp check",
        cache: { input: SOURCES, output: [] },
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
        dependsOn: ["check", "styles", "test", "licenses", "build"],
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
