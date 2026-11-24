/**
 * The agent bridge on every base, measured: for each framework and base the site has built, opens
 * a demo of each kind of control the bridge reads, adds the bridge to the page as a stranger's
 * script would, and asks three things. Is the control found? Does it have a name an agent can use?
 * Does one action on it change what the next snapshot says?
 *
 *   bun scripts/agent-bridge-bases.ts            every base that is built, as a Markdown table
 *   bun scripts/agent-bridge-bases.ts react/base one base
 *   bun scripts/agent-bridge-bases.ts --json     the rows, for another script
 *
 * It needs the built site (`vp run build`) and a display (Bun's webview drives headless Chrome).
 * The bridge is `@kirana-ui/core/agent` at the version the site pins. It reads a page by its ARIA
 * roles, so nothing is registered: what this prints is how far each headless library's markup says
 * enough for it. A gap is the bridge's to close or the base's markup to name, never hidden here.
 */
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

/** Bun's runtime, as far as this script uses it: the repository installs no types for it. */
type View = AsyncDisposable & {
  navigate: (url: string) => Promise<void>
  evaluate: (script: string) => Promise<unknown>
}
declare const Bun: {
  argv: string[]
  write: (path: string, text: string) => Promise<number>
  file: (path: string) => Blob & { exists: () => Promise<boolean> }
  sleep: (ms: number) => Promise<void>
  build: (options: { entrypoints: string[]; format: "iife" }) => Promise<{
    success: boolean
    logs: unknown[]
    outputs: { text: () => Promise<string> }[]
  }>
  serve: (options: {
    port: number
    fetch: (request: Request) => Promise<Response>
  }) => { url: URL; stop: (force?: boolean) => Promise<void> }
  WebView: new (size: { width: number; height: number }) => View
}

const ROOT = new URL("..", import.meta.url).pathname
const CLIENT = join(ROOT, "apps/site/dist/client")

/** The bases the site previews, by framework. */
const BASES: Record<string, readonly string[]> = {
  react: ["kirana", "base", "aria", "uisdk"],
  vue: ["kirana", "ark", "reka", "uisdk"],
  svelte: ["kirana", "ark", "bits", "uisdk"],
  solid: ["kirana", "ark", "uisdk"],
  angular: ["kirana", "ng"],
}

/** A kind of control, the demo that shows one, and the step that should change it. */
const PROBES = [
  { kind: "input", item: "input-demo" },
  { kind: "switch", item: "switch-demo" },
  { kind: "checkbox", item: "checkbox-demo" },
  { kind: "toggle", item: "toggle-demo" },
  { kind: "radio-group", item: "radio-group-demo" },
  { kind: "select", item: "select-demo" },
  { kind: "tabs", item: "tabs-demo" },
  { kind: "slider", item: "slider-demo" },
  { kind: "disclosure", item: "accordion-demo" },
  { kind: "dialog", item: "dialog-demo" },
] as const

type Cell = { found: boolean; named: boolean; acted: boolean; note?: string }

if (!existsSync(join(CLIENT, "index.html"))) {
  console.error("bridge: no apps/site/dist/client; run `vp run build` first")
  process.exit(2)
}

// The bridge as one script, as a page that did not build it would load it.
const entry = join(ROOT, "apps/site/node_modules/.agent-bridge-entry.ts")
await Bun.write(
  entry,
  `import { createAgent } from "@kirana-ui/core/agent"\n;(globalThis as { __bridge?: unknown }).__bridge = createAgent\n`
)
const built = await Bun.build({ entrypoints: [entry], format: "iife" })
if (!built.success) {
  console.error(built.logs.join("\n"))
  process.exit(1)
}
const bridge = await built.outputs[0]!.text()

/** `_redirects`' rewrites: a path's start, and the folder whose page answers it. */
const REWRITES = readFileSync(join(CLIENT, "_redirects"), "utf8")
  .split("\n")
  .map((line) => /^(\S+)\/\* (\S+) 200$/.exec(line))
  .filter((rule) => rule !== null)
  .map((rule) => [`${rule[1]}/`, rule[2]!] as const)

/** The built site, each framework's one page behind its previews (`_redirects`). */
const server = Bun.serve({
  port: 0,
  async fetch(request) {
    const path = new URL(request.url).pathname
    for (const candidate of [path, `${path}.html`, `${path}/index.html`]) {
      const file = Bun.file(join(CLIENT, candidate))
      if (await file.exists()) return new Response(file)
    }
    // The site's own rewrites: `/preview/solid/uisdk/*` is the Solid 2 app's page.
    for (const [from, to] of REWRITES)
      if (path.startsWith(from)) {
        const page = Bun.file(join(CLIENT, to, "index.html"))
        if (await page.exists()) return new Response(page)
      }
    return new Response("not found", { status: 404 })
  },
})

/** In the page: find the first control of the kind, act on it, and say what changed. */
const probe = (kind: string) => `(async () => {
  const agent = globalThis.__bridge()
  const first = () => agent.snapshot().find((each) => each.component === kind)
  const kind = ${JSON.stringify(kind)}
  if (kind === "dialog") {
    // A dialog's trigger says it opens something (aria-expanded), so it reads as a disclosure.
    const opener = agent.snapshot().find((each) => each.actions.includes("open") || each.actions.includes("press"))
    if (!opener) return { found: false, named: false, acted: false, note: "no trigger" }
    const pressed = await agent.act({ steps: [{ ref: opener.ref, action: opener.actions.includes("open") ? "open" : "press" }] })
    await new Promise((resolve) => setTimeout(resolve, 600))
    const open = first()
    if (!open) return { found: false, named: !!opener.label, acted: false, note: pressed.error ?? "the trigger opened nothing the bridge reads" }
    const closed = await agent.act({ steps: [{ ref: open.ref, action: "close" }] })
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { found: true, named: !!open.label, acted: closed.ok && !first(), note: closed.error }
  }
  const before = first()
  if (!before) return { found: false, named: false, acted: false }
  let step = { ref: before.ref, action: "toggle" }
  if (kind === "input") step = { ref: before.ref, action: "setValue", args: ["Atlas"] }
  if (kind === "slider") step = { ref: before.ref, action: "setValue", args: [Number(before.value) + 5] }
  if (kind === "radio-group" || kind === "tabs" || kind === "select") {
    let items = before.items ?? []
    if (!items.length) items = (await agent.query({ within: before.ref }))[0]?.items ?? []
    const other = items.find((item) => item.value !== before.value && item.label !== before.value)
    if (!other) return { found: true, named: !!before.label, acted: false, note: "no items read" }
    step = { ref: before.ref, action: "setValue", args: [other.value] }
  }
  const result = await agent.act({ steps: [step] })
  await new Promise((resolve) => setTimeout(resolve, 400))
  const after = first()
  const state = (each) => JSON.stringify([each?.value, each?.checked, each?.open])
  const wanted = kind === "slider" ? after?.value === step.args[0] : state(after) !== state(before)
  return { found: true, named: !!before.label, acted: result.ok && wanted, note: result.ok ? (wanted ? undefined : "reported ok, " + (kind === "slider" ? "holds " + after?.value + " not " + step.args[0] : "nothing changed")) : result.error }
})()`

async function measure(
  framework: string,
  base: string
): Promise<Record<string, Cell>> {
  const cells: Record<string, Cell> = {}
  for (const { kind, item } of PROBES) {
    await using view = new Bun.WebView({ width: 1100, height: 800 })
    await view.navigate(`${server.url}preview/${framework}/${base}/${item}`)
    // The page's own app mounts the demo after it loads.
    let ready = false
    for (let tries = 0; tries < 40 && !ready; tries++) {
      await Bun.sleep(250)
      ready = Boolean(
        await view.evaluate(
          `!!document.querySelector('[data-slot], [role], input, button')`
        )
      )
    }
    if (!ready) {
      cells[kind] = {
        found: false,
        named: false,
        acted: false,
        note: "no page",
      }
      continue
    }
    await Bun.sleep(500)
    // As a statement inside a function: the webview evaluates an expression.
    await view.evaluate(`(function () {\n${bridge}\n})()`)
    try {
      cells[kind] = (await view.evaluate(probe(kind))) as Cell
    } catch (error) {
      cells[kind] = {
        found: false,
        named: false,
        acted: false,
        note: String(error),
      }
    }
  }
  return cells
}

const asked = Bun.argv.slice(2).filter((arg) => !arg.startsWith("--"))
const rows: { combination: string; cells: Record<string, Cell> }[] = []
for (const [framework, bases] of Object.entries(BASES)) {
  if (!existsSync(join(CLIENT, "preview", framework))) continue
  for (const base of bases) {
    const combination = `${framework}/${base}`
    if (asked.length && !asked.includes(combination)) continue
    console.error(`bridge: ${combination}`)
    rows.push({ combination, cells: await measure(framework, base) })
  }
}
await server.stop(true)

if (Bun.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2))
} else {
  const mark = (cell: Cell) =>
    !cell.found
      ? "not found"
      : cell.acted
        ? cell.named
          ? "yes"
          : "yes, unnamed"
        : cell.named
          ? "no effect"
          : "unnamed, no effect"
  console.log(`| Base | ${PROBES.map((each) => each.kind).join(" | ")} |`)
  console.log(`| --- | ${PROBES.map(() => "---").join(" | ")} |`)
  for (const row of rows)
    console.log(
      `| ${row.combination} | ${PROBES.map((each) => mark(row.cells[each.kind]!)).join(" | ")} |`
    )
  console.log("")
  for (const row of rows)
    for (const each of PROBES) {
      const note = row.cells[each.kind]!.note
      if (note) console.log(`- ${row.combination}, ${each.kind}: ${note}`)
    }
}
