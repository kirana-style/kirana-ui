/** A range of days, as react-day-picker's `DateRange`. */
export type DateRange = { from: Date | undefined; to?: Date | undefined }

/** A selection by mode: a date, a list of dates, or a range, as react-day-picker's. */
export type Selected<Mode extends "single" | "multiple" | "range"> =
  Mode extends "range"
    ? DateRange | undefined
    : Mode extends "multiple"
      ? Date[] | undefined
      : Date | undefined

/**
 * Which days a matcher names, as react-day-picker's: a date, a list of them, a range (`from`,
 * `to`), days before or after a date, days of the week, or a test.
 */
export type Matcher =
  | boolean
  | Date
  | Date[]
  | DateRange
  | { before: Date }
  | { after: Date }
  | { before: Date; after: Date }
  | { dayOfWeek: number[] }
  | ((date: Date) => boolean)

const day = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

/** Whether `date` is one the matcher, or any of the matchers, names. */
export function matches(date: Date, matcher: Matcher | Matcher[]): boolean {
  if (Array.isArray(matcher) && !(matcher[0] instanceof Date))
    return (matcher as Matcher[]).some((m) => matches(date, m))
  if (Array.isArray(matcher))
    return (matcher as Date[]).some((d) => day(d) === day(date))
  if (typeof matcher === "boolean") return matcher
  if (typeof matcher === "function") return matcher(date)
  if (matcher instanceof Date) return day(matcher) === day(date)
  const t = day(date)
  if ("dayOfWeek" in matcher) return matcher.dayOfWeek.includes(date.getDay())
  if ("from" in matcher) {
    const { from, to } = matcher
    if (!from) return false
    return t >= day(from) && t <= day(to ?? from)
  }
  const before = "before" in matcher ? t < day(matcher.before) : undefined
  const after = "after" in matcher ? t > day(matcher.after) : undefined
  if (before !== undefined && after !== undefined) return before || after
  return !!(before ?? after)
}
