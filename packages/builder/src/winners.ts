/**
 * Which value wins, in every combination of the conditions that can still vary, before and after
 * flattening. Before, the chosen style's condition always holds, another style's never does, and
 * another base's state key never appears; after, none of them is written. The two must agree in
 * every combination, or flattening changed what renders.
 */
import type { Ranked } from "./session"

/** A condition the target decides: `true` (its style), `false` (another style's or base's). */
export type Fixed = (condition: string) => boolean | undefined

/** Two conditions a single element cannot hold at once (`conditions.exclusive`, one attribute). */
export type Exclusive = (a: string, b: string) => boolean

export type Mismatch = { holding: string[]; before: string; after: string }

/** The style a condition reads (`relation within ui [data-style="lyra"]`), if it reads one. */
export const styleOf = (condition: string) =>
  /^relation within ui \[data-style="([^"]+)"\]$/.exec(condition)?.[1]

/** One attribute, two different values: `[data-size="sm"]` and `[data-size="lg"]`. */
export function sameAttribute(a: string, b: string) {
  const name = (condition: string) => /^\[([\w-]+)=/.exec(condition)?.[1]
  return name(a) !== undefined && name(a) === name(b) && a !== b
}

type Entry = { value: string | undefined; conditions: string[] }

/**
 * Where the winners differ, each difference as the least set of free conditions that shows it. An
 * entry applies when all its conditions hold, so holding more conditions only makes more entries
 * apply. For a live entry and a flattened one with different values (or no entry, when none
 * applies), the one assignment worth testing is their own conditions holding and no other free one:
 * an entry ranked above either that applies there applies wherever both do, and the pair never wins
 * together. This finds every difference that trying all 2ⁿ combinations would, pair by pair.
 */
export function compareWinners(
  before: Ranked[],
  after: Ranked[],
  fixed: Fixed,
  exclusive: Exclusive
): Mismatch[] {
  // A last entry that always applies: it wins only where no real entry does.
  const withNone = (ranked: Ranked[]): Entry[] => [
    ...ranked,
    { value: undefined, conditions: [] },
  ]
  const live = withNone(before)
  const flat = withNone(after)
  const free = (entry: Entry) =>
    entry.conditions.filter((condition) => fixed(condition) === undefined)
  const possible = (entry: Entry) =>
    entry.conditions.every((condition) => fixed(condition) !== false)
  const winner = (entries: Entry[], holding: Set<string>) =>
    entries.find((entry) =>
      entry.conditions.every(
        (condition) => fixed(condition) ?? holding.has(condition)
      )
    )
  const seen = new Set<string>()
  const mismatches: Mismatch[] = []
  for (const was of live) {
    for (const is of flat) {
      if (was.value === is.value || !possible(was) || !possible(is)) continue
      const holding = [...new Set([...free(was), ...free(is)])]
      if (
        holding.some((a, i) =>
          holding.slice(i + 1).some((b) => exclusive(a, b))
        )
      )
        continue
      const set = new Set(holding)
      if (winner(live, set) !== was || winner(flat, set) !== is) continue
      const key = [...holding].sort().join("\u0000")
      if (seen.has(key)) continue
      seen.add(key)
      mismatches.push({
        holding,
        before: String(was.value),
        after: String(is.value),
      })
    }
  }
  return mismatches
}
