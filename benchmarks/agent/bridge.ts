/**
 * The agent bridge as three commands, for an agent that has only a shell: `snapshot`, `act` and
 * `query`, each the bridge's method of the same name on the page the session has open
 * (`window.agent`, which the page makes with `createAgent()`). They go through the same browser
 * session the browser-tools runs use, so both pay the same cost per call.
 *
 *   bun benchmarks/agent/bridge.ts <session> snapshot
 *   bun benchmarks/agent/bridge.ts <session> act '{"steps":[{"ref":"Alerts","action":"toggle"}]}'
 *   bun benchmarks/agent/bridge.ts <session> query '{"within":"Region"}'
 */
import { spawnSync } from "node:child_process"

const [session, tool, input = "{}"] = process.argv.slice(2)
if (!session || !["snapshot", "act", "query"].includes(tool ?? "")) {
  console.error(
    "usage: bridge.ts <session> snapshot | act '<json>' | query '<json>'"
  )
  process.exit(2)
}
// The input is checked as JSON here, then written into the page's call as a literal.
const given = JSON.stringify(JSON.parse(input))
const call =
  tool === "snapshot"
    ? "() => JSON.stringify(window.agent.snapshot())"
    : `async () => JSON.stringify(await window.agent.${tool}(${given}))`
const ran = spawnSync(
  "npx",
  ["--yes", "@playwright/cli@latest", `-s=${session}`, "eval", call],
  { encoding: "utf8" }
)
// The tool prints the result as a JSON string under "### Result".
const printed = /### Result\n(.+)\n/.exec(ran.stdout)?.[1]
if (ran.status !== 0 || !printed) {
  console.error(ran.stdout || ran.stderr)
  process.exit(1)
}
console.log(JSON.parse(printed) as string)
