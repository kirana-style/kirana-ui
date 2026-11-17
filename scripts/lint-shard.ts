/**
 * One shard of the lint, for CI's parallel lint jobs: `vp lint` with the Kirana rules on a share of
 * the files, where `vp run check` lints them all at once.
 *
 *   bun scripts/lint-shard.ts --shard 2/4      # the second of four shares
 *   bun scripts/lint-shard.ts --shard 2/4 --list   # what it would lint, without linting
 *
 * The Kirana rules read the whole project's diagnostics once per file (KF-123), on one thread, so
 * the lint takes minutes where the rest of `vp check` takes seconds; split across jobs, each takes
 * its share of them. The files Git tracks are grouped by folder (a base, an app, a package, the
 * registry's own folders; the root's files together), and the groups dealt out largest first to
 * the share with the fewest files, so every file falls in exactly one share and a new folder needs
 * no edit here. Each rule is per file, and the compiler still checks each project whole, so the
 * shares together report what one lint does.
 */
import { spawnSync } from "node:child_process"
import { join } from "node:path"

const ROOT = join(import.meta.dirname, "..")
const LINTED = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|vue|svelte)$/

/** The folder a file is grouped by: a base, an app, a package, or the folder it is in. */
function groupOf(file: string): string {
  const parts = file.split("/")
  if (parts.length === 1) return "."
  if (parts[0] === "registry" && parts[1] === "bases" && parts.length > 3)
    return parts.slice(0, 3).join("/")
  if (["apps", "packages", "registry"].includes(parts[0]!) && parts.length > 2)
    return parts.slice(0, 2).join("/")
  return parts[0]!
}

function shareOf(index: number, count: number): string[] {
  const listed = spawnSync("git", ["ls-files"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  if (listed.status !== 0) throw new Error(listed.stderr)
  const groups = new Map<string, string[]>()
  for (const file of listed.stdout.split("\n")) {
    if (!LINTED.test(file)) continue
    const group = groupOf(file)
    groups.set(group, [...(groups.get(group) ?? []), file])
  }
  // Largest first, each to the share with the fewest files so far; ties by name, so every job
  // computes the same split.
  const shares = Array.from({ length: count }, () => ({
    groups: [] as string[],
    files: 0,
  }))
  const ordered = [...groups].sort(
    ([a, aFiles], [b, bFiles]) =>
      bFiles.length - aFiles.length || a.localeCompare(b)
  )
  for (const [group, files] of ordered) {
    const share = shares.reduce((least, each) =>
      each.files < least.files ? each : least
    )
    share.groups.push(group)
    share.files += files.length
  }
  const mine = shares[index - 1]!
  // A group whose folder holds other groups (the root, `registry/`) names its own files one by one,
  // so the folder is not walked again with theirs.
  const names = [...groups.keys()]
  const parent = (group: string) =>
    group === "." || names.some((other) => other.startsWith(`${group}/`))
  return mine.groups.flatMap((group) =>
    parent(group) ? groups.get(group)! : [group]
  )
}

const flag = process.argv.indexOf("--shard")
const match = /^(\d+)\/(\d+)$/.exec(process.argv[flag + 1] ?? "")
if (flag < 0 || !match) {
  console.error(
    "usage: bun scripts/lint-shard.ts --shard <index>/<count> [--list]"
  )
  process.exit(2)
}
const [index, count] = [Number(match[1]), Number(match[2])]
if (index < 1 || index > count) {
  console.error(`lint-shard: no share ${index} of ${count}`)
  process.exit(2)
}
const paths = shareOf(index, count)
if (process.argv.includes("--list")) {
  console.log(paths.join("\n"))
  process.exit(0)
}
console.log(`lint-shard ${index}/${count}: ${paths.join(" ")}`)
const lint = spawnSync("vp", ["lint", "--deny-warnings", ...paths], {
  cwd: ROOT,
  stdio: "inherit",
})
process.exit(lint.status ?? 1)
