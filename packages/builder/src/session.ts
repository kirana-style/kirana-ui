/**
 * Kirana's answers, from one session over the registry: `Driver` from `@kirana-style/compiler`,
 * opened once. Every "which entry wins" is asked in batches and each file compiled once, and the
 * conditions arrive as data instead of being parsed out of `kirana-style trace`'s text (Kirana 0.3.2,
 * KF-022 in its feedback log). The builder still evaluates the style modules itself (`evaluate.ts`):
 * since 0.3.3 Kirana's definitions give each entry's key path and written value (KF-027), but not
 * which base a state key came from, and Base UI and Ark UI share keys (`[data-orientation]`), so
 * only running `when()` with tagged keys tells which ones flattening for a base keeps.
 */
import { Driver, formatDiagnostic } from "@kirana-style/compiler"
import type {
  ConditionInfo,
  RecipePart,
  TraceEntry,
  TraceQuery,
} from "@kirana-style/compiler"

/**
 * One entry of a trace, strongest first: its compiled value, its conditions as text, and, in a
 * recipe, the part that declares it (`size=sm`; `""` for the base).
 */
export type Ranked = { value: string; conditions: string[]; part?: string }

/**
 * A condition as one string: a relation read with its placement and name (`relation within ui
 * [data-style="lyra"]`), an at-rule with its keyword (`@media (width >= 48rem)`), anything else as
 * CSS writes it.
 */
export function conditionText(condition: ConditionInfo): string {
  switch (condition.kind) {
    case "relation":
      return `relation ${condition.placement} ${condition.relation} ${condition.text}`.trimEnd()
    case "media":
    case "container":
    case "supports":
      return `@${condition.kind} ${condition.text}`
    default:
      return condition.text
  }
}

/** A recipe part as text: its options in order, `!` for a compound variant. */
export function partText(part: RecipePart): string {
  const options = Object.entries(part.options)
    .map(([group, option]) => `${group}=${option}`)
    .join(",")
  return `${part.slot ? `${part.slot}:` : ""}${options}${part.compound ? "!" : ""}`
}

export function ranked(entry: TraceEntry): Ranked {
  return {
    value: entry.value,
    conditions: entry.conditions.map(conditionText),
    ...(entry.part ? { part: partText(entry.part) } : {}),
  }
}

export class Session {
  /** How many questions the session has answered. */
  readonly queries = { count: 0 }

  private constructor(private readonly driver: Driver) {}

  /** A session over the project at `root`, with its `kirana.config.ts`. */
  static async open(root: string): Promise<Session> {
    return new Session(await Driver.create({ root }))
  }

  /**
   * Each question's entries, strongest first, every file compiled once. A file Kirana could not
   * trace is an error, never an empty answer.
   */
  trace(queries: TraceQuery[]): Ranked[][] {
    if (queries.length === 0) return []
    this.queries.count += queries.length
    return this.driver.trace(queries).map((answer) => {
      if (answer.error)
        throw new Error(
          `kirana could not trace ${answer.file}:${answer.line} ${answer.property}: ${answer.error}`
        )
      return answer.entries.map(ranked)
    })
  }

  /** A file the builder wrote or rewrote: compiled again the next time it is asked about. */
  changed(file: string) {
    this.driver.invalidate(file)
  }

  /** Every warning and error in the files under `paths` (relative to the root), as Kirana prints them. */
  problems(paths: string[]): string[] {
    return this.driver
      .check(paths)
      .filter((diagnostic) => diagnostic.severity !== "info")
      .map((diagnostic) => formatDiagnostic(diagnostic))
  }
}
