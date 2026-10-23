/**
 * Kirana's own answer to "which entry wins": `kirana-style trace <file>:<line> <property>` lists a
 * property's entries from the winner down, each with its condition set. The builder reads that
 * order rather than modelling the precedence ladder itself.
 *
 * The output is meant for people (there is no JSON form yet, KF-022), so the reader is strict: a line
 * it cannot take apart is an error, never a guess.
 */
import { spawn } from "node:child_process"

/** One entry: its compiled value and its conditions as Kirana prints them (`base` is none). */
export type Ranked = { value: string; conditions: string[] }

/** Splits on `separator` outside brackets, parentheses and quotes. */
export function splitTop(text: string, separator: string): string[] {
  const parts: string[] = []
  let depth = 0
  let quote = ""
  let start = 0
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      if (char === quote) quote = ""
      continue
    }
    if (char === '"' || char === "'") quote = char
    else if (char === "(" || char === "[") depth++
    else if (char === ")" || char === "]") depth--
    else if (depth === 0 && text.startsWith(separator, index)) {
      parts.push(text.slice(start, index))
      start = index + separator.length
      index += separator.length - 1
    }
  }
  parts.push(text.slice(start))
  return parts
}

const CONDITION = /^(\[|:|@|relation (Within|After|Before) )/

const balanced = (text: string) =>
  splitTop(`${text}\u0000`, "\u0000").length === 2

/** The conditions part of a line, or `undefined` when the text is not one. */
function readConditions(text: string): string[] | undefined {
  if (text === "base") return []
  const atoms = splitTop(text, " & ")
  return atoms.every((atom) => CONDITION.test(atom) && balanced(atom))
    ? atoms
    : undefined
}

/** One entry line of `trace`, without its marker, layer and step. */
export function readLine(line: string): Ranked {
  const body = line
    .trimEnd()
    .replace(/^ {2}(✓ | {2})/, "")
    .replace(/\s+step \d+ \(.*\)$/, "")
    .replace(/\s+kirana\.[\w.]+$/, "")
  for (let index = 1; index < body.length; index++) {
    if (body[index - 1] !== " " || body[index] === " ") continue
    const value = body.slice(0, index).trim()
    const conditions = readConditions(body.slice(index))
    if (value && balanced(value) && conditions) return { value, conditions }
  }
  throw new Error(`Cannot read this line of kirana-style trace: ${line}`)
}

/** The entries of `trace`'s output, from the winner down. */
export function readTrace(output: string): Ranked[] {
  const lines = output.split("\n")
  const header = lines.findIndex((line) => / at .+:\d+$/.test(line))
  if (header < 0) return []
  return lines
    .slice(header + 1)
    .filter((line) => /^ {2}(✓ | {2})\S/.test(line))
    .map(readLine)
}

/** How many times `trace` ran, for the summary. */
export const calls = { count: 0 }

/** Runs `kirana-style trace` from the registry, which loads its configuration. */
export function trace(
  cli: string,
  cwd: string,
  file: string,
  line: number,
  property: string
): Promise<Ranked[]> {
  calls.count++
  return new Promise((resolve, reject) => {
    const child = spawn(cli, ["trace", `${file}:${line}`, property], { cwd })
    let output = ""
    child.stdout.on("data", (chunk) => (output += chunk))
    child.stderr.on("data", (chunk) => (output += chunk))
    child.on("error", reject)
    child.on("close", () => {
      try {
        resolve(readTrace(output))
      } catch (error) {
        reject(error)
      }
    })
  })
}

/** Runs `tasks` with at most `limit` at once. */
export async function pooled<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = []
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, async () => {
      while (next < tasks.length) {
        const index = next++
        results[index] = await tasks[index]()
      }
    })
  )
  return results
}
