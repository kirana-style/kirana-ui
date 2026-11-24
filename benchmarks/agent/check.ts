/**
 * Whether a run did the task: reads what the form saved (`data-saved` on the page's output) from
 * the session and compares it with what the task asked for.
 *
 *   bun benchmarks/agent/check.ts <session>
 */
import { spawnSync } from "node:child_process"

const WANTED = {
  name: "Atlas",
  description: "Internal analytics",
  region: "singapore",
  visibility: "team",
  alerts: true,
  digest: false,
  review: true,
  retention: "90",
}

const session = process.argv[2]
const ran = spawnSync(
  "npx",
  [
    "--yes",
    "@playwright/cli@latest",
    `-s=${session}`,
    "eval",
    "() => document.querySelector('[data-saved]')?.getAttribute('data-saved') ?? 'null'",
  ],
  { encoding: "utf8" }
)
const printed = /### Result\n(.+)\n/.exec(ran.stdout)?.[1]
const saved = printed
  ? (JSON.parse(JSON.parse(printed) as string) as Record<
      string,
      unknown
    > | null)
  : null
if (!saved) {
  console.log("FAILED: nothing was saved")
  process.exit(1)
}
const wrong = Object.entries(WANTED).filter(
  ([key, value]) => saved[key] !== value
)
if (wrong.length) {
  console.log(
    `FAILED: ${wrong.map(([key, value]) => `${key} is ${JSON.stringify(saved[key])}, not ${JSON.stringify(value)}`).join("; ")}`
  )
  process.exit(1)
}
console.log("PASSED: the form saved what the task asked for")
