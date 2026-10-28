/**
 * `bun packages/builder/src/cli.ts [--out <dir>] [--skip-check]`: the registry, into the site's
 * static files by default (`apps/site/dist/client/r`), exiting non-zero on any problem:
 *
 * - in Kirana's format, which `kirana-style ui` reads: `<out>/<item>.json`, one item for every
 *   framework and base with its style modules as written, and `<out>/index.json`;
 * - for shadcn/ui's CLI, every combination flattened, checked against the live styles with Kirana
 *   (one session, `session.ts`), each handle and each composition of handles in the markup
 *   (`compose.ts`), and validated against shadcn/ui's schema:
 *   `<out>/shadcn/<combination>/<item>.json`, `<out>/shadcn/<combination>/registry.json` and
 *   `<out>/shadcn/index.json`.
 */
import { spawnSync } from "node:child_process"
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"
import { parseArgs } from "node:util"

import {
  checkWinners,
  clean,
  compileGenerated,
  exclusiveFrom,
  handlesOf,
  probesOf,
  roundTrip,
} from "./check"
import { compositionProbes, compositionsOf } from "./compose"
import { evaluate, installStub, tagStates } from "./evaluate"
import { classifier, flattenHandle, flattenRecipe } from "./flatten"
import { generate } from "./generate"
import { COMBINATIONS, FRAMEWORK_BASES, ITEMS } from "./items"
import { buildKiranaRegistry } from "./kirana-items"
import { checkDependencyFrameworks, checkKiranaItems } from "./kirana-check"
import { split } from "./markers"
import { loadNames } from "./names"
import {
  buildCombination,
  importsOf,
  sourcesOf,
  versionsFrom,
} from "./registry"
import { Session } from "./session"
import type { StyleHandle } from "./kirana-stub"

const ROOT = join(import.meta.dir, "..", "..", "..")
const REGISTRY = join(ROOT, "registry")

const { values } = parseArgs({
  options: {
    out: {
      type: "string",
      default: join(ROOT, "apps", "site", "dist", "client", "r"),
    },
    "skip-check": { type: "boolean", default: false },
  },
})

/**
 * The style modules each combination installs: those its items' files name, and the style modules
 * they import in turn. A module no item installs on a combination (Tabs on Angular, so far) is not
 * checked there.
 */
const shipped = new Map(
  COMBINATIONS.map((combination) => {
    const modules = new Set<string>()
    const add = (module: string) => {
      if (modules.has(module)) return
      modules.add(module)
      const code = readFileSync(join(REGISTRY, "styles", module), "utf8")
      for (const specifier of importsOf(code)) {
        const sibling = /^\.\/(.+\.styles)$/.exec(specifier)?.[1]
        if (sibling) add(`${sibling}.ts`)
      }
    }
    for (const item of ITEMS)
      for (const file of sourcesOf(REGISTRY, item, combination) ?? []) {
        const module = /^styles\/(.+\.styles\.ts)$/.exec(file)?.[1]
        if (module) add(module)
      }
    return [combination.id, modules] as const
  })
)

const BASE_NAMES = {
  base: "Base UI",
  aria: "React Aria",
  ark: "Ark UI",
  ng: "ng-primitives",
} as const

const started = performance.now()
// In this order: the stand-in first, then Kirana's session, whose configuration loads the registry's
// states before `tagStates` marks them (the session has already read them as plain keys).
installStub()
const session = values["skip-check"] ? undefined : await Session.open(REGISTRY)
await tagStates(join(REGISTRY, "core", "states.ts"))
const names = await loadNames(REGISTRY)

const modules = new Map<string, Record<string, unknown>>()
for (const file of readdirSync(join(REGISTRY, "styles")).sort()) {
  if (file.endsWith(".styles.ts")) {
    modules.set(file, await evaluate(join(REGISTRY, "styles", file)))
  }
}

const problems: string[] = []
let roundTrips = 0
let winnerChecks = 0
let compositionCount = 0
if (session) {
  const plainText = (text: string) =>
    split(text)
      .map((part) =>
        typeof part === "string" ? part : part.kind === "state" ? part.key : ""
      )
      .join("")
  const { registryConfig } = await evaluate(join(REGISTRY, "core", "kirana.ts"))
  const { conditions } = registryConfig as {
    conditions: { exclusive: string[][]; exclusiveAcross?: string[][] }
  }
  const plainGroups = (groups: string[][]) =>
    groups.map((group) => group.map(plainText))
  const exclusive = exclusiveFrom(
    plainGroups(conditions.exclusive),
    plainGroups(conditions.exclusiveAcross ?? [])
  )
  const context = { registry: REGISTRY, names, session }
  try {
    const trip = roundTrip(context, modules)
    problems.push(...trip.problems)
    roundTrips = trip.compared
    const handles = new Map<string, StyleHandle>()
    const probes = new Map<string, ReturnType<typeof probesOf>>()
    for (const [module, exports] of modules) {
      probes.set(module, probesOf(exports))
      for (const [path, h] of handlesOf(exports)) handles.set(path, h)
    }
    const compositions = compositionsOf(join(REGISTRY, "bases"), (path) =>
      handles.has(path)
    )
    compositionCount = compositions.size
    const check = (
      module: string,
      moduleProbes: ReturnType<typeof probesOf>,
      combinations: typeof COMBINATIONS
    ) => {
      if (!combinations.length || !moduleProbes.size) return
      const result = checkWinners(
        context,
        module,
        moduleProbes,
        combinations,
        (combination) => classifier(combination),
        exclusive
      )
      problems.push(...result.problems)
      winnerChecks += result.compared
    }
    // A module on the combinations that install it; a composition on the bases whose markup
    // writes it.
    for (const [module, moduleProbes] of probes)
      check(
        module,
        moduleProbes,
        COMBINATIONS.filter((combination) =>
          shipped.get(combination.id)!.has(module)
        )
      )
    for (const { bases } of FRAMEWORK_BASES) {
      const here = new Map(
        [...compositions].filter(([, { sites }]) =>
          [...sites].some((site) => site.startsWith(`${bases}/`))
        )
      )
      check(
        "compose.ts",
        compositionProbes(here, handles),
        COMBINATIONS.filter((combination) => combination.bases === bases)
      )
    }
    problems.push(...compileGenerated(context))
  } finally {
    clean(REGISTRY)
  }
}

// Every combination's flattened style modules, formatted as the repository formats its own code.
const flattened = new Map<string, string>()
const dist = join(REGISTRY, ".flat", "install")
const written: string[] = []
try {
  for (const combination of COMBINATIONS) {
    const classify = classifier(combination)
    for (const [module, exports] of modules) {
      const code = generate(exports, names, {
        flatten: (handle) => flattenHandle(handle, classify),
        flattenRecipe: (handle) => flattenRecipe(handle, classify),
        imports: (core) => `@/registry/${combination.id}/lib/kirana/${core}`,
        module,
        // Installed beside each other in `ui/`.
        relationsFrom: (owner) => ({
          specifier: `./${owner.replace(/\.ts$/, "")}`,
          own: false,
        }),
        header: `// ${module.replace(".styles.ts", "")}: the ${combination.style} style on ${BASE_NAMES[combination.base]}, flattened from Kirana UI's registry.`,
      }).code
      mkdirSync(join(dist, combination.id), { recursive: true })
      writeFileSync(join(dist, combination.id, module), code)
      written.push(join(dist, combination.id, module))
    }
  }
  // Named one by one: a folder the repository ignores is skipped.
  const formatted = spawnSync(
    join(ROOT, "node_modules", ".bin", "vp"),
    ["fmt", ...written.map((file) => relative(ROOT, file))],
    {
      cwd: ROOT,
      encoding: "utf8",
    }
  )
  if (formatted.status !== 0)
    throw new Error(
      `vp fmt failed (${formatted.status}):\n${formatted.stdout}${formatted.stderr}${formatted.error ?? ""}`
    )
  for (const combination of COMBINATIONS) {
    for (const module of modules.keys()) {
      flattened.set(
        `${combination.id}/${module}`,
        readFileSync(join(dist, combination.id, module), "utf8")
      )
    }
  }
} finally {
  clean(REGISTRY)
}

const versions = versionsFrom(ROOT)
let itemCount = 0
const index: { combinations: object[] } = { combinations: [] }
for (const combination of COMBINATIONS) {
  const contentOf = (source: string) => {
    const module = /^styles\/(.+\.styles\.ts)$/.exec(source)?.[1]
    return module
      ? flattened.get(`${combination.id}/${module}`)!
      : readFileSync(join(REGISTRY, source), "utf8")
  }
  const built = buildCombination(REGISTRY, combination, contentOf, versions)
  problems.push(...built.problems)
  const folder = join(values.out!, "shadcn", combination.id)
  mkdirSync(folder, { recursive: true })
  for (const item of built.items) {
    writeFileSync(
      join(folder, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`
    )
  }
  writeFileSync(
    join(folder, "registry.json"),
    `${JSON.stringify(built.index, null, 2)}\n`
  )
  itemCount += built.items.length
  index.combinations.push({
    id: combination.id,
    framework: combination.framework,
    base: combination.base,
    style: combination.style,
    items: built.items.map((item) => item.name),
  })
}
writeFileSync(
  join(values.out!, "shadcn", "index.json"),
  `${JSON.stringify(index, null, 2)}\n`
)

// Kirana's format: one item for every framework and base, at the registry's root.
const workspace = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"))
const kirana = workspace.workspaces.catalog["@kirana-style/compiler"] as string
const registryVersion = JSON.parse(
  readFileSync(join(REGISTRY, "package.json"), "utf8")
).version as string
const own = buildKiranaRegistry(
  REGISTRY,
  versions,
  registryVersion,
  kirana,
  (combination, module) => flattened.get(`${combination.id}/${module}`)
)
problems.push(...own.problems)
for (const item of own.items)
  writeFileSync(
    join(values.out!, `${item.name}.json`),
    `${JSON.stringify(item, null, 2)}\n`
  )
writeFileSync(
  join(values.out!, "index.json"),
  `${JSON.stringify(own.index, null, 2)}\n`
)
problems.push(
  ...checkKiranaItems([
    ["index", own.index],
    ...own.items.map((item) => [item.name, item] as const),
  ])
)
problems.push(
  ...checkDependencyFrameworks(
    own.items,
    FRAMEWORK_BASES.map(({ framework, base }) => [framework, base] as const)
  )
)

const seconds = ((performance.now() - started) / 1000).toFixed(1)
if (problems.length) {
  console.error(problems.join("\n"))
  console.error(
    `\nregistry: ${problems.length} problem(s), ${itemCount} item(s), ${seconds}s`
  )
  process.exit(1)
}
console.log(
  `registry: ${own.items.length} Kirana items, checked with @kirana-style/registry; for shadcn/ui, ${COMBINATIONS.length} combinations, ${itemCount} items; Kirana agreed on ${roundTrips} round trips and ${winnerChecks} flattened properties, ${compositionCount} compositions included (${session?.queries.count ?? 0} traces, one session); ${seconds}s`
)
