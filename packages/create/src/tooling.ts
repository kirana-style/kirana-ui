/**
 * The tooling layers: what each adds to an app (or a workspace root) to lint, format and type-check
 * it, Kirana's rules included. ESLint and Oxlint run `@kirana-style/eslint-plugin` (the compiler's
 * diagnostics in the editor, `sx` last, no `className` beside `sx` …), Biome the GritQL rules of
 * `@kirana-style/biome-plugin`; Vite+ runs Oxlint and Oxfmt itself (`vp check`), with the ESLint
 * plugin's rules through `lint.jsPlugins` in `vite.config.ts`.
 */
import type { AppSkeleton, Dependency } from "./app.ts"
import type { Framework, Tooling } from "./catalog.ts"
import { renderJson } from "./manifest.ts"
import { BIOME_SCHEMA, BIOME_VERSION } from "./versions.ts"

export type Layer = {
  files: Record<string, string>
  scripts: Record<string, string>
  devDependencies: Dependency[]
}

/**
 * Kirana's rules as this repository runs them on the registry, which the installed components
 * must pass: the recommended set but `no-dark-variant` (a few ports keep upstream's
 * `prefers-color-scheme` for an effect that follows the system on purpose), and the compiler's
 * diagnostics without `relation-unused`, since a relation anchored by one component is read by
 * another the project may not have installed.
 */
export const KIRANA_RULES: Record<string, "error" | ["error", object]> = {
  "kirana/diagnostics": ["error", { ignore: ["relation-unused"] }],
  "kirana/sx-last": "error",
  "kirana/no-conflicting-props": "error",
  "kirana/override-keeps-conditions": "error",
  "kirana/no-classname-on-sx": "error",
  "kirana/no-unused": "error",
}

/**
 * ESLint's spelling: Kirana's recommended config, then what this repository turns off; and the
 * rules the registry's components mark for Oxlint where they break them on purpose (an `any` at a
 * library's boundary, a state set in an effect as upstream does), which ESLint cannot read.
 */
const ESLINT_RULES = `rules: {
      "kirana/diagnostics": ["error", { ignore: ["relation-unused"] }],
      "kirana/no-dark-variant": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },`
const ESLINT_REACT_RULES = `rules: {
      "kirana/diagnostics": ["error", { ignore: ["relation-unused"] }],
      "kirana/no-dark-variant": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
      // A component's file exports its variants and hooks too, as shadcn/ui's do.
      "react-refresh/only-export-components": "off",
    },`

/** What no linter or formatter should read: builds, caches, generated files. */
export function ignored(app: AppSkeleton): string[] {
  return [
    "node_modules",
    "dist",
    ...(app.ignore ?? []).map((entry) => entry.replace(/\/$/, "")),
  ]
}

const PRETTIER = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
}

/** ESLint's flat config for the framework, Kirana's rules last. */
function eslintConfig(framework: Framework, app: AppSkeleton): string {
  // eslint-disable-next-line typescript/switch-exhaustiveness-check -- every framework returns.
  const ignores = JSON.stringify(
    ignored(app).filter((e) => e !== "node_modules")
  )
  const head = [
    'import js from "@eslint/js"',
    'import kirana from "@kirana-style/eslint-plugin"',
  ]
  const common = ["js.configs.recommended", "tseslint.configs.recommended"]
  switch (framework) {
    case "react": {
      const next = app.template === "next-turbopack"
      return `${head.join("\n")}
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(${ignores}),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ${common.join(",\n      ")},
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.${next ? "next" : "vite"},
      kirana.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    ${ESLINT_REACT_RULES}
  },
])
`
    }
    case "vue":
      return `${head.join("\n")}
import pluginVue from "eslint-plugin-vue"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(${ignores}),
  {
    files: ["**/*.{ts,vue}"],
    extends: [
      ${common.join(",\n      ")},
      pluginVue.configs["flat/recommended"],
      kirana.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { parser: tseslint.parser },
    },
    ${ESLINT_RULES}
  },
])
`
    case "svelte":
      return `${head.join("\n")}
import svelte from "eslint-plugin-svelte"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(${ignores}),
  {
    files: ["**/*.{ts,svelte}"],
    extends: [
      ${common.join(",\n      ")},
      svelte.configs.recommended,
      kirana.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    ${ESLINT_RULES}
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
])
`
    case "solid":
      return `${head.join("\n")}
import solid from "eslint-plugin-solid/configs/typescript"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(${ignores}),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ${common.join(",\n      ")},
      solid,
      kirana.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    ${ESLINT_RULES}
  },
])
`
    case "angular":
      return `${head.join("\n")}
import angular from "angular-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(${ignores}),
  {
    files: ["**/*.ts"],
    extends: [
      ${common.join(",\n      ")},
      angular.configs.tsRecommended,
      kirana.configs.recommended,
    ],
    // Inline templates are not run through angular-eslint's processor: it reads a template's
    // \`{\` as an ICU expression, which Angular's own compiler does not. Two of its rules name the
    // registry's API, which mirrors React's (an output named like a DOM event, an aliased input).
    rules: {
      "kirana/diagnostics": ["error", { ignore: ["relation-unused"] }],
      "kirana/no-dark-variant": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@angular-eslint/no-output-native": "off",
      "@angular-eslint/no-input-rename": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [angular.configs.templateRecommended],
  },
])
`
  }
}

/** ESLint's packages for the framework. */
function eslintPackages(framework: Framework): Dependency[] {
  const base: Dependency[] = [
    "eslint",
    "@eslint/js",
    "globals",
    "typescript-eslint",
    "prettier",
  ]
  const byFramework: Record<Framework, Dependency[]> = {
    react: ["eslint-plugin-react-hooks", "eslint-plugin-react-refresh"],
    vue: ["eslint-plugin-vue"],
    svelte: ["eslint-plugin-svelte", "prettier-plugin-svelte"],
    solid: ["eslint-plugin-solid"],
    angular: ["angular-eslint"],
  }
  return [...base, ...byFramework[framework]]
}

/** Oxlint's built-in plugins the framework's code wants: React's rules for React alone. */
function oxlintPlugins(framework: Framework): string[] {
  const base = ["typescript", "unicorn", "oxc", "import"]
  return framework === "react" ? [...base, "react"] : base
}

/**
 * The tooling's layer for an app: its files at the app's root, the scripts it adds beside the
 * app's `dev` and `build`, and its packages.
 */
export function toolingLayer(tooling: Tooling, app: AppSkeleton): Layer {
  const ignores = ignored(app)
  switch (tooling) {
    case "eslint":
      return {
        files: {
          "eslint.config.js": eslintConfig(app.framework, app),
          ".prettierrc": renderJson(
            app.framework === "svelte"
              ? { ...PRETTIER, plugins: ["prettier-plugin-svelte"] }
              : PRETTIER
          ),
          ".prettierignore": `${ignores.join("\n")}\n`,
        },
        scripts: {
          lint: "eslint .",
          format: "prettier --write .",
          "format:check": "prettier --check .",
          typecheck: app.typecheck,
        },
        devDependencies: [
          ...eslintPackages(app.framework),
          { name: "@kirana-style/eslint-plugin", version: "kirana" },
        ],
      }
    case "oxlint":
      return {
        files: {
          ".oxlintrc.json": renderJson({
            $schema: "./node_modules/oxlint/configuration_schema.json",
            plugins: oxlintPlugins(app.framework),
            jsPlugins: [
              { name: "kirana", specifier: "@kirana-style/eslint-plugin" },
            ],
            categories: { correctness: "error" },
            env: { builtin: true, browser: true },
            ignorePatterns: ignores.map((entry) => `${entry}/**`),
            rules: KIRANA_RULES,
          }),
          ".oxfmtrc.json": renderJson({
            $schema: "./node_modules/oxfmt/configuration_schema.json",
            ...PRETTIER,
            ignorePatterns: ignores.map((entry) => `${entry}/**`),
          }),
        },
        scripts: {
          lint: "oxlint",
          format: "oxfmt",
          "format:check": "oxfmt --check",
          typecheck: app.typecheck,
        },
        devDependencies: [
          "oxlint",
          "oxfmt",
          { name: "@kirana-style/eslint-plugin", version: "kirana" },
        ],
      }
    case "biome":
      return {
        files: {
          // The plugin's rule files named one by one, not its `recommended` preset: the preset
          // pins Biome 2.5's schema, which 2.6 refuses as a configuration error (KF-110), and this
          // repository leaves `no-dark-variant` out. Biome's recommended lint rules are its default.
          "biome.json": renderJson({
            $schema: BIOME_SCHEMA,
            plugins: ["sx-last", "no-conflicting-props"].map(
              (rule) =>
                `./node_modules/@kirana-style/biome-plugin/rules/${rule}.grit`
            ),
            // Single-file components are left to `vue-tsc` and `svelte-check`: Biome reads their
            // script, not their template, and calls what the template uses unused.
            files: {
              includes: [
                "**",
                ...ignores.map((entry) => `!${entry}`),
                ...(app.framework === "vue" || app.framework === "svelte"
                  ? [`!**/*.${app.framework}`]
                  : []),
              ],
            },
            formatter: { indentStyle: "space" },
            javascript: {
              formatter: { semicolons: "asNeeded", trailingCommas: "es5" },
            },
            // The installed components keep the import order this repository's formatter gives
            // them; Biome's sorting would rewrite every file `check` reads.
            assist: {
              actions: { source: { organizeImports: "off" } },
            },
          }),
        },
        scripts: {
          lint: "biome lint .",
          format: "biome format --write .",
          check: "biome check .",
          typecheck: app.typecheck,
        },
        devDependencies: [
          { name: "@biomejs/biome", version: BIOME_VERSION },
          { name: "@kirana-style/biome-plugin", version: "kirana" },
        ],
      }
    case "vite-plus":
      return {
        // `vite.config.ts` carries `fmt` and `lint` (`renderVite`); `vp check` runs both and types.
        files: {},
        scripts: {
          check: "vp check",
          lint: "vp lint",
          format: "vp fmt",
          typecheck: app.typecheck,
        },
        devDependencies: [
          "vite-plus",
          { name: "@kirana-style/eslint-plugin", version: "kirana" },
        ],
      }
  }
}

/** Vite+'s `fmt` and `lint` options, as `defineConfig` from `vite-plus` takes them. */
export function vitePlusOptions(ignores: readonly string[]): string[] {
  const patterns = JSON.stringify(ignores.map((entry) => `**/${entry}/**`))
  return [
    `fmt: ${JSON.stringify({ ...PRETTIER })
      .replace(/"(\w+)":/g, "$1: ")
      .replace(/,/g, ", ")
      .replace(/\{/, "{ ")
      .replace(/\}$/, " }")}`,
    `lint: {
    jsPlugins: [{ name: "kirana", specifier: "@kirana-style/eslint-plugin" }],
    categories: { correctness: "error" },
    env: { builtin: true, browser: true },
    ignorePatterns: ${patterns},
    rules: ${JSON.stringify(KIRANA_RULES, null, 6).replace(/\n\s*\}$/, "\n    }")},
  }`,
  ]
}
