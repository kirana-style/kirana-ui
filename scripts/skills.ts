/**
 * The agent skills in `skills/`, which `npx skills add kirana-style/kirana-ui` installs:
 *
 *   skills/kirana-ui              written here: the registry's components in a project
 *   skills/kirana-ui-agent        written here: the agent bridge
 *   skills/kirana-ui-primitives   copied from the installed `@kirana-ui/core` (`skills/`), the
 *                                 primitives' own skill at the version this repository pins
 *
 *   bun scripts/skills.ts           copy the primitives' skill, then check every skill
 *   bun scripts/skills.ts --check   check only: fails when the copy is behind the package
 *
 * A skill is checked as `npx skills` reads it: `SKILL.md` with `name` (its folder's) and a
 * `description` of at most 1024 characters, and every `references/…` file it names present.
 */
import { cpSync, existsSync, readFileSync, readdirSync, rmSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(import.meta.dirname, "..")
const SKILLS = join(ROOT, "skills")
const PRIMITIVES = "kirana-ui-primitives"

/** The installed `@kirana-ui/core`'s skill folder, resolved as the site resolves the package. */
export function packagedSkill() {
  const manifest = fileURLToPath(
    import.meta.resolve(
      "@kirana-ui/core/package.json",
      `file://${join(ROOT, "apps/site/package.json")}`
    )
  )
  return join(dirname(manifest), "skills", PRIMITIVES)
}

/** Every file under `dir`, relative to it, sorted. */
function files(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort()
}

/** What is wrong with the skills, each as a sentence: none is an empty list. */
export function problems(): string[] {
  const out: string[] = []
  for (const name of readdirSync(SKILLS).filter((entry) =>
    existsSync(join(SKILLS, entry, "SKILL.md"))
  )) {
    const text = readFileSync(join(SKILLS, name, "SKILL.md"), "utf8")
    const front = /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1]
    if (!front) {
      out.push(`${name}: SKILL.md has no frontmatter`)
      continue
    }
    const field = (key: string) =>
      new RegExp(`^${key}:\\s*(.+)$`, "m").exec(front)?.[1]?.trim()
    if (field("name") !== name)
      out.push(`${name}: its name is ${field("name")}, not its folder's`)
    const description = field("description") ?? ""
    if (!description) out.push(`${name}: no description`)
    if (description.length > 1024)
      out.push(
        `${name}: the description is ${description.length} characters (at most 1024)`
      )
    for (const [, reference] of text.matchAll(/`(references\/[\w./-]+\.md)`/g))
      if (!existsSync(join(SKILLS, name, reference!)))
        out.push(`${name}: names ${reference}, which is not there`)
  }
  // The primitives' skill is the package's, file for file.
  const source = packagedSkill()
  const copy = join(SKILLS, PRIMITIVES)
  const theirs = files(source)
  const ours = existsSync(copy) ? files(copy) : []
  if (theirs.join() !== ours.join())
    out.push(
      `${PRIMITIVES}: its files are not the package's (${relative(ROOT, source)}): run bun scripts/skills.ts`
    )
  else
    for (const file of theirs)
      if (
        !readFileSync(join(source, file)).equals(readFileSync(join(copy, file)))
      )
        out.push(
          `${PRIMITIVES}/${file}: behind the package's: run bun scripts/skills.ts`
        )
  return out
}

if (import.meta.main) {
  if (!process.argv.includes("--check")) {
    const copy = join(SKILLS, PRIMITIVES)
    rmSync(copy, { recursive: true, force: true })
    cpSync(packagedSkill(), copy, { recursive: true })
  }
  const found = problems()
  for (const problem of found) console.error(`skills: ${problem}`)
  if (found.length) process.exit(1)
  console.log(
    `skills: ${readdirSync(SKILLS).filter((entry) => existsSync(join(SKILLS, entry, "SKILL.md"))).length} skills checked`
  )
}
