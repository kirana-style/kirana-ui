/**
 * Which value wins, in every combination of the conditions that can still vary, before and after
 * flattening. Before, the chosen style's condition always holds, another style's never does, and
 * another base's state key never appears; after, none of them is written. The two must agree in
 * every combination, or flattening changed what renders.
 */
import type { Ranked } from "./trace"

/** A condition the target decides: `true` (its style), `false` (another style's or base's). */
export type Fixed = (condition: string) => boolean | undefined

/** Two conditions a single element cannot hold at once (`conditions.exclusive`, one attribute). */
export type Exclusive = (a: string, b: string) => boolean

export type Mismatch = { holding: string[]; before: string; after: string }

/** The style condition of a Kirana condition: `relation Within .kr…[data-style="lyra"]`. */
export const styleOf = (condition: string) =>
  /^relation Within \.\S+?\[data-style="([^"]+)"\]$/.exec(condition)?.[1]

/** One attribute, two different values: `[data-size="sm"]` and `[data-size="lg"]`. */
export function sameAttribute(a: string, b: string) {
  const name = (condition: string) => /^\[([\w-]+)=/.exec(condition)?.[1]
  return name(a) !== undefined && name(a) === name(b) && a !== b
}

function winner(ranked: Ranked[], holds: (condition: string) => boolean) {
  return ranked.find((entry) => entry.conditions.every(holds))?.value
}

/**
 * Every combination of the free conditions where the winners differ. More than `limit` free
 * conditions is reported rather than enumerated.
 */
export function compareWinners(
  before: Ranked[],
  after: Ranked[],
  fixed: Fixed,
  exclusive: Exclusive,
  limit = 14
): Mismatch[] {
  const free = [
    ...new Set(
      [...before, ...after].flatMap((entry) =>
        entry.conditions.filter((condition) => fixed(condition) === undefined)
      )
    ),
  ]
  if (free.length > limit) {
    throw new Error(
      `${free.length} free conditions is more than the check enumerates (${limit}).`
    )
  }
  const mismatches: Mismatch[] = []
  for (let mask = 0; mask < 1 << free.length; mask++) {
    const holding = free.filter((_, index) => mask & (1 << index))
    if (
      holding.some((a, i) => holding.slice(i + 1).some((b) => exclusive(a, b)))
    )
      continue
    const holds = (condition: string) =>
      fixed(condition) ?? holding.includes(condition)
    const was = winner(before, holds)
    const is = winner(after, holds)
    if (was !== is)
      mismatches.push({ holding, before: String(was), after: String(is) })
  }
  return mismatches
}
