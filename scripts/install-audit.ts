/**
 * What an installed project holds, read as its owner reads it: nothing of a framework, a headless
 * library, an icon library, a linter or a workspace tool the project did not choose, and no file
 * nothing in the project reads. `scripts/install-smoke.ts` runs it on every project it installs;
 * a finding fails the install.
 *
 *   bun scripts/install-audit.ts <root> --framework react --base kirana --icons lucide \
 *     --tooling eslint --monorepo none          # a project on disk
 *
 * It reads source text only, so it is fast and says where each finding is; it does not replace the
 * project's own lint, type check and build, which the install test runs after it.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { basename, dirname, join, relative } from "node:path"

import { BASE_NAMES, JOURNEY } from "../packages/builder/src/comments"
import { APPS } from "../packages/create/src/apps/index"
import type { Template } from "../packages/create/src/catalog"

export type AuditChoices = {
  framework: string
  base: string
  iconLibrary: string
  tooling: string
  monorepo: string
}

export type Finding = {
  /** The rule's name: `icons`, `base`, `framework`, `states`, `unused`, `comments`, `tooling`, `leftover`, `choices`. */
  rule: string
  file: string
  detail: string
}

/** Each base's packages, as an import names them. */
const BASE_PACKAGES: Record<string, RegExp> = {
  base: /^@base-ui\//,
  // Not `@internationalized/date`: every base's calendar reads dates with it.
  aria: /^(react-aria-components|react-aria|react-stately|@react-aria\/|@react-stately\/)/,
  ark: /^@ark-ui\//,
  ng: /^ng-primitives(\/|$)/,
  reka: /^reka-ui(\/|$)/,
  bits: /^bits-ui(\/|$)/,
  uisdk: /^@ui-sdk\//,
  kirana: /^@kirana-ui\//,
}

/** The state vocabulary each base's styles are written with (`@kirana-style/states/<name>`). */
const VOCABULARY: Record<string, string[]> = {
  base: ["base-ui"],
  aria: ["react-aria"],
  ark: ["ark-ui"],
  ng: ["ng-primitives", "base-ui"],
  reka: ["reka-ui"],
  bits: ["bits-ui"],
  uisdk: ["ui-sdk"],
  // Kirana UI Primitives write Base UI's vocabulary, with a few keys of their own.
  kirana: ["kirana-ui", "base-ui"],
}

/** Each icon library's packages. */
const ICON_PACKAGES: Record<string, RegExp> = {
  lucide: /^(lucide(-[a-z]+)*|@lucide\/[\w-]+)(\/|$)/,
  hugeicons: /^@hugeicons\//,
  tabler: /^@tabler\//,
  phosphor: /^(@phosphor-icons\/|phosphor-[a-z]+)/,
  remixicon: /^(@remixicon\/|remixicon)/,
}

/** Whether a line ends a block comment: a script's, or a template's (`-->`, and `--!>`). */
const closes = (line: string) =>
  line.includes("*/") || line.includes("-->") || line.includes("--!>")

/** A file's comment lines: `//`, a block's lines, a JSX or template comment. */
function commentLines(text: string): string[] {
  const lines: string[] = []
  let block = false
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    const opens =
      line.startsWith("/*") || line.startsWith("{/*") || line.startsWith("<!--")
    if (block || opens || line.startsWith("//")) lines.push(line)
    if (opens) block = !closes(line)
    else if (block && closes(line)) block = false
  }
  return lines
}

/** The files only one framework writes. */
const FRAMEWORK_FILES: Record<string, RegExp> = {
  vue: /\.vue$/,
  svelte: /\.svelte(\.ts)?$/,
  react: /\.tsx$/,
  solid: /\.tsx$/,
  angular: /\.(component|directive)\.ts$/,
}

/** The packages only one framework's code imports. */
const FRAMEWORK_PACKAGES: Record<string, RegExp> = {
  react: /^(react|react-dom)(\/|$)/,
  vue: /^(vue|@vue\/)(\/|$)?/,
  svelte: /^svelte(\/|$)/,
  solid: /^(solid-js|@solidjs\/)/,
  angular: /^@angular\//,
}

/** Each tooling's own files, at the root or in a package. */
const TOOLING_FILES: Record<string, RegExp> = {
  eslint:
    /^(eslint\.config\.[cm]?[jt]s|\.eslintrc(\..+)?|\.prettierrc(\..+)?|prettier\.config\.[cm]?[jt]s|\.prettierignore)$/,
  oxlint:
    /^(\.oxlintrc\.json|\.oxfmtrc\.json|oxlint\.config\.ts|oxfmt\.config\.ts)$/,
  biome: /^biome\.jsonc?$/,
  // Vite+ keeps lint and format in `vite.config.ts`, which every Vite project has.
  "vite-plus": /^$/,
}

const MONOREPO_FILES: Record<string, RegExp> = {
  turbo: /^turbo\.jsonc?$/,
  "vite-plus": /^$/,
  none: /^$/,
}

const SKIP = new Set([
  "node_modules",
  "dist",
  "build",
  ".git",
  ".output",
  ".nuxt",
  ".svelte-kit",
  ".angular",
  ".vinxi",
  ".tanstack",
  ".turbo",
  ".vite",
  ".nitro",
  ".react-router",
  ".astro",
  "vendor",
  "storage",
  "public",
])

const SOURCE = /\.(tsx?|jsx?|mjs|cjs|vue|svelte|astro)$/

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return []
    const path = join(dir, name)
    // A dangling link (a browser profile's lock) is no file of the project's.
    if (!existsSync(path)) return []
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

/** Every module a source names: `from "x"`, `import "x"`, `import("x")`, `require("x")`. */
function specifiers(text: string): string[] {
  const found: string[] = []
  const pattern =
    /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["']([^"'\n]+)["']/g
  for (const [, specifier] of text.matchAll(pattern)) found.push(specifier!)
  return found
}

const bare = (specifier: string) =>
  !specifier.startsWith(".") && !specifier.startsWith("/")

/** A file's name as an import ends: `lib/kirana/states`, without its extension or `/index`. */
function importTail(file: string): string {
  const stem = file.replace(/\.(tsx?|jsx?|vue|svelte)$/, "")
  const parts = stem.split("/")
  if (parts.at(-1) === "index") parts.pop()
  return parts.slice(-2).join("/")
}

export function audit(root: string, choices: AuditChoices): Finding[] {
  const findings: Finding[] = []
  const add = (rule: string, file: string, detail: string) =>
    findings.push({ rule, file: relative(root, file), detail })
  const files = walk(root)
  const sources = files.filter((file) => SOURCE.test(file))
  const texts = new Map(
    sources.map((file) => [file, readFileSync(file, "utf8")])
  )

  // What the installer wrote, by the project's lockfile: only those files are the registry's to
  // answer for. A template's own files answer to the tooling and workspace rules alone.
  const installed = new Set<string>()
  for (const lock of files.filter(
    (file) => basename(file) === "kirana-style.lock.json"
  )) {
    const items = (
      JSON.parse(readFileSync(lock, "utf8")) as {
        items?: Record<string, { files?: Record<string, unknown> }>
      }
    ).items
    for (const item of Object.values(items ?? {}))
      for (const file of Object.keys(item.files ?? {}))
        installed.add(join(dirname(lock), file))
  }
  if (installed.size === 0)
    add("leftover", root, "no kirana-style.lock.json lists an installed file")

  const otherBases = Object.entries(BASE_PACKAGES).filter(
    ([base]) => base !== choices.base
  )
  const otherIcons = Object.entries(ICON_PACKAGES).filter(
    ([library]) => library !== choices.iconLibrary
  )
  const vocabularies = VOCABULARY[choices.base] ?? []

  for (const [file, text] of texts) {
    const mine = installed.has(file)
    for (const specifier of specifiers(text)) {
      if (!bare(specifier)) continue
      for (const [library, pattern] of otherIcons)
        if (pattern.test(specifier))
          add(
            "icons",
            file,
            `imports ${specifier} (${library}); the project draws ${choices.iconLibrary}`
          )
      if (!mine) continue
      for (const [base, pattern] of otherBases)
        // React Aria has no drawer of this kind: its Drawer is Base UI's, as the docs page says.
        if (
          pattern.test(specifier) &&
          !ALLOWED_ELSEWHERE.has(`${choices.base}:${specifier}`)
        )
          add(
            "base",
            file,
            `imports ${specifier} (${base}); the project is on ${choices.base}`
          )
      const vocabulary = /^@kirana-style\/states\/([\w-]+)/.exec(specifier)?.[1]
      if (vocabulary && !vocabularies.includes(vocabulary))
        add(
          "states",
          file,
          `imports the ${vocabulary} state vocabulary; ${choices.base} writes ${vocabularies.join(" and ")}`
        )
      for (const [framework, pattern] of Object.entries(FRAMEWORK_PACKAGES))
        if (framework !== choices.framework && pattern.test(specifier))
          add("framework", file, `imports ${specifier} (${framework})`)
    }
    if (!mine) continue
    // The placeholder, Angular's directive on an `<svg>`, or its run-time base class (`IconDrawing`).
    if (
      /\bIconPlaceholder\b|icon-placeholder|\bIconDrawing\b|<svg\b[^>]*\siconPlaceholder[\s>]/.test(
        text
      )
    )
      add("icons", file, "an icon placeholder was left unresolved")
    else if (/[\\/]kirana[\\/]icons[\\/]/.test(file))
      add("icons", file, "the icon placeholder's data")
    // A list of every framework or every base, written out in a project that has one of each.
    const named = (list: string[]) =>
      list.filter((name) => new RegExp(`["'\`]${name}["'\`]`).test(text))
    const frameworks = named(["react", "vue", "svelte", "solid", "angular"])
    if (frameworks.length >= 4)
      add(
        "framework",
        file,
        `names ${frameworks.length} frameworks (${frameworks.join(", ")})`
      )
    const bases = [...text.matchAll(/^\s*(aria|ark|ng|reka|bits|uisdk)\??:/gm)]
    if (bases.length >= 3)
      add(
        "states",
        file,
        `holds ${bases.length} state keys written for other bases (aria:, ark:, reka: …)`
      )
    if (/\bexclusiveAcross\s*\(/.test(text))
      add(
        "states",
        file,
        `tells Kirana the states of several bases never meet (exclusiveAcross); the project is on ${choices.base} alone`
      )
    // One finding per file and kind, with the first line that shows it and how many do.
    const comments = commentLines(text)
    const kinds: (readonly [string, RegExp])[] = [
      ...JOURNEY,
      ...Object.entries(BASE_NAMES)
        .filter(
          ([base]) =>
            base !== choices.base &&
            // Kirana UI Primitives write Base UI's vocabulary, which a comment may say.
            !(choices.base === "kirana" && base === "base")
        )
        .map(([, pattern]): [string, RegExp] => [
          "a headless library the project does not use",
          pattern,
        ]),
    ]
    const told = new Map<string, string[]>()
    for (const line of comments)
      for (const [what, pattern] of kinds)
        if (pattern.test(line))
          told.set(what, [...(told.get(what) ?? []), line])
    for (const [what, lines] of told)
      add(
        "comments",
        file,
        `${lines.length} comment line(s) about ${what}: ${lines[0]!.slice(0, 110)}`
      )
    if (/@workspace\/registry|registry\/(core|styles|bases)\//.test(text))
      add("leftover", file, "names a path of the registry's own repository")
  }
  // What the skeleton carried for the installer, which `init --template` should have used up.
  for (const file of files) {
    const name = basename(file)
    if (name === "package.json") {
      const text = readFileSync(file, "utf8")
      for (const field of ["kirana-template", "kirana-example"])
        if (text.includes(`"${field}"`))
          add("leftover", file, `keeps the template's "${field}" field`)
      if (text.includes("{packageManager}"))
        add(
          "leftover",
          file,
          "keeps the template's {packageManager} placeholder"
        )
    }
    if (
      name === ".gitkeep" &&
      installed.size > 0 &&
      readdirSync(dirname(file)).length > 1
    )
      add(
        "leftover",
        file,
        "a placeholder in a folder the installer has filled"
      )
  }

  // An installed file under a library folder that nothing in the project imports, in an item the
  // project uses: an item no other file imports was installed on purpose (named to `ui add`, or
  // every item with `--all`), as a hook the reader will call.
  const itemOf = new Map<string, string>()
  for (const lock of files.filter(
    (file) => basename(file) === "kirana-style.lock.json"
  ))
    for (const [key, item] of Object.entries(
      (
        JSON.parse(readFileSync(lock, "utf8")) as {
          items?: Record<string, { files?: Record<string, unknown> }>
        }
      ).items ?? {}
    ))
      for (const file of Object.keys(item.files ?? {}))
        itemOf.set(join(dirname(lock), file), key)
  // Each import's tail, with the items of the files that write it ("" for the project's own).
  const importers = new Map<string, Set<string>>()
  const note = (tail: string, item: string) =>
    (importers.get(tail) ?? importers.set(tail, new Set()).get(tail)!).add(item)
  for (const [file, text] of texts)
    for (const specifier of specifiers(text)) {
      if (bare(specifier) && !/[/]/.test(specifier)) continue
      const stem = specifier.replace(/\.(tsx?|jsx?|vue|svelte)$/, "")
      const item = itemOf.get(file) ?? ""
      note(stem.split("/").slice(-2).join("/"), item)
      // A sibling import, `./tokens`, names its folder by where it is written.
      if (/^\.\/[^/]+$/.test(stem))
        note(`${basename(dirname(file))}/${stem.slice(2)}`, item)
    }
  const importersOf = (file: string) => [
    ...(importers.get(importTail(file)) ?? []),
    ...(importers.get(importTail(dirname(file) + "/index.ts")) ?? []),
  ]
  const inUse = new Set<string>()
  for (const file of installed) {
    const item = itemOf.get(file)
    if (item && importersOf(file).some((other) => other !== item))
      inUse.add(item)
  }
  for (const file of installed) {
    if (!SOURCE.test(file) || !existsSync(file)) continue
    if (!/[/](lib|hooks|utils)[/]/.test(file)) continue
    const item = itemOf.get(file)
    if (importersOf(file).length === 0 && item && inUse.has(item))
      add(
        "unused",
        file,
        `nothing in the project imports this file, which ${item} installed beside files the project uses`
      )
  }

  // Files and packages of a framework, a tooling or a workspace tool the project did not choose.
  for (const file of files) {
    const name = basename(file)
    for (const [framework, pattern] of Object.entries(FRAMEWORK_FILES)) {
      if (framework === choices.framework) continue
      if (FRAMEWORK_FILES[choices.framework]?.source === pattern.source)
        continue
      if (installed.has(file) && pattern.test(name))
        add("framework", file, `a ${framework} file`)
    }
    for (const [tooling, pattern] of Object.entries(TOOLING_FILES))
      if (tooling !== choices.tooling && pattern.test(name))
        add(
          "tooling",
          file,
          `${tooling}'s file; the project lints with ${choices.tooling}`
        )
    for (const [monorepo, pattern] of Object.entries(MONOREPO_FILES))
      if (monorepo !== choices.monorepo && pattern.test(name))
        add(
          "tooling",
          file,
          `${monorepo}'s file; the workspace is ${choices.monorepo}`
        )
    if (name !== "package.json") continue
    const manifest = JSON.parse(readFileSync(file, "utf8")) as Record<
      string,
      Record<string, string> | undefined
    >
    const packages = Object.keys({
      ...manifest.dependencies,
      ...manifest.devDependencies,
    })
    for (const dependency of packages) {
      for (const [library, pattern] of otherIcons)
        if (pattern.test(dependency))
          add("icons", file, `depends on ${dependency} (${library})`)
      for (const [base, pattern] of otherBases)
        if (
          pattern.test(dependency) &&
          !ALLOWED_ELSEWHERE.has(`${choices.base}:${dependency}`)
        )
          add("base", file, `depends on ${dependency} (${base})`)
      const lint: Record<string, RegExp> = {
        eslint: /^(eslint|prettier|@eslint\/|typescript-eslint|eslint-)/,
        oxlint: /^(oxlint|oxfmt)$/,
        biome: /^@biomejs\//,
      }
      for (const [tooling, pattern] of Object.entries(lint))
        if (tooling !== choices.tooling && pattern.test(dependency))
          // The Kirana plugin for ESLint is what Oxlint loads too.
          if (dependency !== "@kirana-style/eslint-plugin")
            add("tooling", file, `depends on ${dependency} (${tooling})`)
    }
  }
  toolingAsChosen(root, files, choices, (file, detail) =>
    add("tooling", file, detail)
  )
  return findings
}

/** The packages each tooling needs at the root of the project (a workspace's root included). */
const TOOLING_PACKAGES: Record<string, string[]> = {
  eslint: ["eslint", "prettier", "@kirana-style/eslint-plugin"],
  oxlint: ["oxlint", "oxfmt", "@kirana-style/eslint-plugin"],
  biome: ["@biomejs/biome", "@kirana-style/biome-plugin"],
  "vite-plus": ["vite-plus", "@kirana-style/eslint-plugin"],
}

/** The tool a script's command runs, by its first word (`vp lint` is Vite+'s). */
const SCRIPT_TOOLS: [RegExp, string][] = [
  [/(^|&&\s*|\s)(eslint|prettier)(\s|$)/, "eslint"],
  [/(^|&&\s*|\s)(oxlint|oxfmt)(\s|$)/, "oxlint"],
  [/(^|&&\s*|\s)biome(\s|$)/, "biome"],
  [/(^|&&\s*|\s)vp\s+(check|lint|fmt)(\s|$)/, "vite-plus"],
]

/** Each tooling's configuration at the project's root, and what in it names Kirana's rules. */
const TOOLING_CONFIGS: Record<string, { file: string; kirana: RegExp[] }[]> = {
  eslint: [
    {
      file: "eslint.config.js",
      kirana: [
        /from "@kirana-style\/eslint-plugin"/,
        /kirana\.configs\.recommended/,
      ],
    },
    { file: ".prettierrc", kirana: [] },
  ],
  oxlint: [
    {
      file: ".oxlintrc.json",
      kirana: [
        /"specifier": "@kirana-style\/eslint-plugin"/,
        /"kirana\/diagnostics"/,
      ],
    },
    { file: ".oxfmtrc.json", kirana: [] },
  ],
  biome: [
    {
      file: "biome.json",
      kirana: [/@kirana-style\/biome-plugin\/rules\/sx-last\.grit/],
    },
  ],
  "vite-plus": [
    {
      file: "vite.config.ts",
      kirana: [
        /from "vite-plus"/,
        /specifier: "@kirana-style\/eslint-plugin"/,
        /"kirana\/diagnostics"/,
        /\bfmt:/,
      ],
    },
  ],
}

/**
 * The tooling and the workspace as a reader checks them, against what was asked: the chosen
 * linter's configuration at the root, naming Kirana's rules, and no other's anywhere; every
 * package's scripts calling the chosen tool and no other, the lint and format scripts at the root
 * alone; the tool's packages at the root; a workspace with the app in `apps/web`, the components in
 * `packages/ui` and the tooling at the root, a single app with none of it.
 */
function toolingAsChosen(
  root: string,
  files: string[],
  asked: AuditChoices,
  add: (file: string, detail: string) => void
) {
  const workspace = asked.monorepo !== "none"
  const at = (path: string) => join(root, path)
  const read = (path: string) =>
    existsSync(at(path)) ? readFileSync(at(path), "utf8") : undefined
  for (const { file, kirana } of TOOLING_CONFIGS[asked.tooling] ?? []) {
    const text = read(file)
    if (text === undefined) {
      add(
        at(file),
        `missing: ${asked.tooling}'s configuration is not at the root`
      )
      continue
    }
    for (const pattern of kirana)
      if (!pattern.test(text))
        add(
          at(file),
          `does not name Kirana's rules for ${asked.tooling} (${pattern.source})`
        )
  }
  // Vite+'s lint settings in a Vite config the project does not lint with.
  for (const file of files.filter((path) =>
    /^vite\.config\.[cm]?[jt]s$/.test(basename(path))
  )) {
    const text = readFileSync(file, "utf8")
    const lints = /\blint:\s*\{/.test(text) || /from "vite-plus"/.test(text)
    const own = asked.tooling === "vite-plus" && file === at("vite.config.ts")
    if (lints && !own)
      add(
        file,
        `carries Vite+'s lint settings; the project lints with ${asked.tooling}${asked.tooling === "vite-plus" ? " from the root" : ""}`
      )
  }
  // Each linter's configuration once, at the root.
  for (const file of files) {
    const name = basename(file)
    const isConfig = Object.values(TOOLING_FILES).some(
      (pattern) => pattern.source !== "^$" && pattern.test(name)
    )
    if (isConfig && dirname(file) !== root)
      add(file, "a linter's or formatter's configuration below the root")
  }
  const manifests = files.filter((file) => basename(file) === "package.json")
  for (const file of manifests) {
    const manifest = JSON.parse(readFileSync(file, "utf8")) as {
      scripts?: Record<string, string>
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
      workspaces?: string[]
    }
    const isRoot = file === at("package.json")
    for (const [script, command] of Object.entries(manifest.scripts ?? {})) {
      for (const [pattern, tool] of SCRIPT_TOOLS)
        if (pattern.test(command) && tool !== asked.tooling)
          add(
            file,
            `script ${script} runs ${tool} ("${command}"); the project lints with ${asked.tooling}`
          )
      if (!isRoot && /^(lint|format|format:check|check)$/.test(script))
        add(
          file,
          `script ${script} below the root; the workspace's tooling is at its root`
        )
    }
    const packages = {
      ...manifest.dependencies,
      ...manifest.devDependencies,
    }
    if (isRoot) {
      for (const script of ["lint", "format"]) {
        const command = manifest.scripts?.[script]
        if (!command) add(file, `no ${script} script`)
        else if (
          !SCRIPT_TOOLS.some(
            ([pattern, tool]) => tool === asked.tooling && pattern.test(command)
          )
        )
          add(
            file,
            `script ${script} ("${command}") does not run ${asked.tooling}`
          )
      }
      for (const name of TOOLING_PACKAGES[asked.tooling] ?? [])
        if (!(name in packages))
          add(file, `does not depend on ${name}, which ${asked.tooling} needs`)
      if (workspace !== Array.isArray(manifest.workspaces))
        add(
          file,
          workspace ? "lists no workspaces" : `lists workspaces in a single app`
        )
    } else {
      for (const name of Object.values(TOOLING_PACKAGES).flat())
        if (name in packages && name !== "vite-plus")
          add(
            file,
            `depends on ${name} below the root; the workspace's tooling is at its root`
          )
    }
    if ("turbo" in packages && asked.monorepo !== "turbo")
      add(file, `depends on turbo; the workspace is ${asked.monorepo}`)
    if ("vite-plus" in packages && asked.tooling !== "vite-plus")
      add(file, `depends on vite-plus; the project lints with ${asked.tooling}`)
  }
  if (workspace) {
    for (const path of [
      "apps/web/package.json",
      "packages/ui/package.json",
      "packages/ui/kirana-style.lock.json",
    ])
      if (!existsSync(at(path)))
        add(
          at(path),
          "missing: a workspace has the app in apps/web and the components in packages/ui"
        )
    for (const path of [
      "kirana-style.lock.json",
      "apps/web/kirana-style.lock.json",
      "apps/web/src/components/ui",
    ])
      if (existsSync(at(path)))
        add(at(path), "the components belong in packages/ui")
    if (asked.monorepo === "turbo" && !existsSync(at("turbo.json")))
      add(at("turbo.json"), "missing: a Turborepo has turbo.json at its root")
  } else {
    for (const path of ["apps", "packages", "turbo.json"])
      if (existsSync(at(path)))
        add(at(path), "a workspace's folder in a single app")
    if (!existsSync(at("kirana-style.lock.json")))
      add(
        at("kirana-style.lock.json"),
        "missing: a single app holds its components itself"
      )
  }
}

/** What `choices` reads besides `audit`'s: the rest of what Get Code and the customizer asked. */
export type AskedChoices = AuditChoices & {
  template: string
  /** The design system the preset encodes: `style`, `iconLibrary`, the colours … */
  design: Record<string, string>
  preset: string
  /** The runner Get Code's command was run with: `bun`, `npm`, `pnpm`, `yarn`, `vp`. */
  runner: string
}

/** Each runner's lockfile; `vpx` runs a package through pnpm. */
const LOCKFILES: Record<string, string> = {
  bun: "bun.lock",
  npm: "package-lock.json",
  pnpm: "pnpm-lock.yaml",
  yarn: "yarn.lock",
  vp: "pnpm-lock.yaml",
  deno: "deno.lock",
}

/** Each framework's runtime package, which only its projects have. */
const FRAMEWORK_RUNTIME: Record<string, string> = {
  react: "react",
  vue: "vue",
  svelte: "svelte",
  solid: "solid-js",
  angular: "@angular/core",
}

/** A package a skeleton names: a name, or `{ name, version }`. */
const nameOf = (dependency: string | { name: string }) =>
  typeof dependency === "string" ? dependency : dependency.name

/** The `ui` settings `init` writes into `kirana.config.ts`, as JSON. */
function uiSettings(text: string): Record<string, unknown> | undefined {
  const start = /\bui:\s*\{/.exec(text)
  if (!start) return undefined
  let depth = 0
  const from = start.index + start[0].length - 1
  for (let at = from; at < text.length; at++) {
    if (text[at] === "{") depth++
    else if (text[at] === "}" && --depth === 0) {
      try {
        return JSON.parse(text.slice(from, at + 1)) as Record<string, unknown>
      } catch {
        return undefined
      }
    }
  }
  return undefined
}

/**
 * Each choice as it was asked, read where a reader would look for it: the runner's lockfile and
 * no other package manager's file; the framework's, the template's and the icon
 * library's packages; and the `ui` settings `init` records in `kirana.config.ts` (the framework,
 * the base, the icon library and the design the preset gives).
 */
export function choicesAsAsked(root: string, asked: AskedChoices): Finding[] {
  const findings: Finding[] = []
  const add = (file: string, detail: string) =>
    findings.push({
      rule: "choices",
      file: relative(root, file) || ".",
      detail,
    })
  const workspace = asked.monorepo !== "none"
  const app = workspace ? join(root, "apps", "web") : root
  const project = workspace ? join(root, "packages", "ui") : root
  const files = walk(root)
  const manifests = new Map(
    files
      .filter((file) => basename(file) === "package.json")
      .map((file) => [
        file,
        JSON.parse(readFileSync(file, "utf8")) as {
          packageManager?: string
          dependencies?: Record<string, string>
          devDependencies?: Record<string, string>
        },
      ])
  )
  const packagesOf = (file: string) => {
    const manifest = manifests.get(file)
    return Object.keys({
      ...manifest?.dependencies,
      ...manifest?.devDependencies,
    })
  }

  // The runner: its lockfile at the root alone, and no other package manager's file.
  const lockfile = LOCKFILES[asked.runner]
  for (const [runner, name] of Object.entries(LOCKFILES)) {
    for (const file of files.filter((path) => basename(path) === name)) {
      if (name === lockfile && dirname(file) === root) continue
      add(
        file,
        name === lockfile
          ? `${name} below the root`
          : `${runner}'s lockfile; the project was started with ${asked.runner}`
      )
    }
  }
  if (lockfile && !existsSync(join(root, lockfile)))
    add(
      join(root, lockfile),
      `missing: the project was started with ${asked.runner}`
    )
  const managerOf = asked.runner === "vp" ? "pnpm" : asked.runner
  for (const [file, manifest] of manifests)
    if (
      manifest.packageManager &&
      !manifest.packageManager.startsWith(`${managerOf}@`)
    )
      add(
        file,
        `packageManager is ${manifest.packageManager}; the project was started with ${asked.runner}`
      )
  // A Vite+ monorepo runs on pnpm whatever started it; any other project on the runner.
  if (
    asked.monorepo !== "vite-plus" &&
    managerOf !== "pnpm" &&
    existsSync(join(root, "pnpm-workspace.yaml"))
  )
    add(
      join(root, "pnpm-workspace.yaml"),
      `pnpm's workspace file; the project was started with ${asked.runner}`
    )

  // The framework: its runtime in the app and the components' package, no other's anywhere.
  const runtime = FRAMEWORK_RUNTIME[asked.framework]
  for (const manifest of new Set([
    join(app, "package.json"),
    join(project, "package.json"),
  ]))
    if (runtime && !packagesOf(manifest).includes(runtime))
      add(
        manifest,
        `does not depend on ${runtime}; the project is on ${asked.framework}`
      )
  for (const [framework, name] of Object.entries(FRAMEWORK_RUNTIME))
    if (framework !== asked.framework)
      for (const file of manifests.keys())
        if (packagesOf(file).includes(name))
          add(
            file,
            `depends on ${name} (${framework}); the project is on ${asked.framework}`
          )

  // The template: its own packages in the app.
  const skeleton = APPS[asked.template as Template]
  if (!skeleton) add(root, `${asked.template} is not a template`)
  else
    for (const dependency of skeleton.dependencies.map(nameOf))
      if (!packagesOf(join(app, "package.json")).includes(dependency))
        add(
          join(app, "package.json"),
          `does not depend on ${dependency}, which ${asked.template} needs`
        )

  // The icon library's package is not asked for: where a library has none for the framework the
  // installer writes its drawing inline, and the `icons` rule finds another library's.

  // What `init` recorded: the settings the next `ui add` and `ui preset` read.
  const config = [
    "kirana.config.ts",
    "kirana.config.js",
    "kirana.config.mjs",
    "kirana.config.json",
  ]
    .map((name) => join(project, name))
    .find((file) => existsSync(file))
  if (!config)
    add(project, "no kirana.config: init recorded none of the choices")
  else {
    const ui = uiSettings(readFileSync(config, "utf8"))
    if (!ui) add(config, "no ui settings: init recorded none of the choices")
    else {
      const expect = (key: string, value: unknown, got: unknown) => {
        if (got !== value)
          add(
            config,
            `ui.${key} is ${JSON.stringify(got)}; asked for ${JSON.stringify(value)}`
          )
      }
      expect("framework", asked.framework, ui.framework)
      expect("base", asked.base, ui.base)
      expect("iconLibrary", asked.iconLibrary, ui.iconLibrary)
      const design = ui.design
      if (design !== undefined) {
        if (typeof design === "string") expect("design", asked.preset, design)
        else if (typeof design === "object" && design) {
          const recorded = design as Record<string, unknown>
          const values = (recorded.values ?? recorded) as Record<
            string,
            unknown
          >
          for (const [axis, value] of Object.entries(asked.design))
            if (axis in values && values[axis] !== value)
              add(
                config,
                `ui.design's ${axis} is ${JSON.stringify(values[axis])}; the preset gives ${JSON.stringify(value)}`
              )
        }
      }
    }
  }
  return findings
}

/**
 * The rules a finding of which fails an install today. The others are reported until the registry
 * is clean of them (each is a fault being fixed); a rule moves here in the change that clears it.
 */
export const ENFORCED: readonly string[] = [
  "tooling",
  "leftover",
  "comments",
  "choices",
  "icons",
  "base",
  "states",
  "framework",
  "unused",
]

/** A part that is another base's library by decision, as `<the project's base>:<the import>`. */
const ALLOWED_ELSEWHERE = new Set([
  "aria:@base-ui/react/drawer",
  // Its package: any other import from it is still found, by its path.
  "aria:@base-ui/react",
])

/** The findings as lines, grouped by rule; `limit` lines per rule, then a count. */
export function report(findings: Finding[], limit = 12): string {
  const rules = new Map<string, Finding[]>()
  for (const finding of findings)
    rules.set(finding.rule, [...(rules.get(finding.rule) ?? []), finding])
  const lines: string[] = []
  for (const [rule, found] of rules) {
    lines.push(`  ${rule}: ${found.length}`)
    for (const finding of found.slice(0, limit))
      lines.push(`    ${finding.file}: ${finding.detail}`)
    if (found.length > limit) lines.push(`    … ${found.length - limit} more`)
  }
  return lines.join("\n")
}

if (import.meta.main) {
  const [root, ...rest] = process.argv.slice(2)
  const option = (name: string, fallback: string) => {
    const at = rest.indexOf(`--${name}`)
    return at === -1 ? fallback : (rest[at + 1] ?? fallback)
  }
  if (!root || !existsSync(root)) {
    console.error("install-audit: <root> --framework … --base … --icons …")
    process.exit(2)
  }
  const findings = audit(root, {
    framework: option("framework", "react"),
    base: option("base", "base"),
    iconLibrary: option("icons", "lucide"),
    tooling: option("tooling", "eslint"),
    monorepo: option("monorepo", "none"),
  })
  console.log(
    findings.length ? report(findings, 40) : "install-audit: nothing found"
  )
  process.exit(findings.length ? 1 : 0)
}
