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

/** A local date's day, as a time: two dates of one day are equal. */
export const startOfDay = day

export const pad = (n: number, width = 2) => String(n).padStart(width, "0")

/** A local `Date` as Kirana UI's calendar's `YYYY-MM-DD`. */
export const toIso = (date: Date) =>
  `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export function fromIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

type CalendarMode = "single" | "multiple" | "range"

/** A selection as the calendar's value: a day, a list of days, or a range (`start`, `end`). */
export function toValue(mode: CalendarMode, selected: unknown) {
  if (mode === "multiple") return ((selected as Date[]) ?? []).map(toIso)
  if (mode === "range") {
    const range = selected as DateRange | undefined
    if (!range?.from) return null
    return { start: toIso(range.from), end: toIso(range.to ?? range.from) }
  }
  return selected ? toIso(selected as Date) : null
}

/** The calendar's value as a selection. */
export function fromValue(mode: CalendarMode, value: unknown): unknown {
  if (mode === "multiple") return (value as string[]).map(fromIso)
  if (mode === "range") {
    const range = value as { start: string; end: string } | null
    return range
      ? { from: fromIso(range.start), to: fromIso(range.end) }
      : undefined
  }
  return value ? fromIso(value as string) : undefined
}

/**
 * The week of the year a row's first day is in, as date-fns' `getWeek` counts it: weeks start on
 * the row's first weekday, and week 1 holds the year's `firstWeekContainsDate`.
 */
export function weekNumber(date: Date, firstWeekContainsDate = 1) {
  const weekStartsOn = date.getDay()
  const startOfWeek = (d: Date) => {
    const diff = (d.getDay() - weekStartsOn + 7) % 7
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - diff)
  }
  const startOfWeekYear = (year: number) =>
    startOfWeek(new Date(year, 0, firstWeekContainsDate))
  const year = date.getFullYear()
  const start =
    date >= startOfWeekYear(year + 1)
      ? startOfWeekYear(year + 1)
      : date >= startOfWeekYear(year)
        ? startOfWeekYear(year)
        : startOfWeekYear(year - 1)
  return Math.round((day(date) - start.getTime()) / 604_800_000) + 1
}

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
