/**
 * Calendar on Angular, the registry's own on `@internationalized/date` (its months, weeks and
 * calendar systems), drawn as react-day-picker draws React's: the same elements and attributes, so
 * the style module is React's. It takes React's API with `Date`s: `mode`, `[(selected)]`,
 * `defaultMonth`, `[(month)]`, `numberOfMonths`, `captionLayout`, `disabled` (dates, ranges or a
 * test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`, `fixedWeeks`,
 * `locale` (a BCP 47 tag), `weekStartsOn`, `createCalendar` (a Persian one) and `formatters`. A
 * `<ng-template kuiCalendarDay let-date let-outside="outside">` draws a day's content.
 */
import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  Directive,
  ElementRef,
  Injector,
  TemplateRef,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from "@angular/core"
import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  getWeeksInMonth,
  isSameDay,
  startOfMonth,
  startOfWeek,
  toCalendar,
  today,
} from "@internationalized/date"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
  DayOfWeek,
} from "@internationalized/date"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button, buttonLabel } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** A range of days, as react-day-picker's `DateRange`. */
export type DateRange = { from: Date | undefined; to?: Date | undefined }

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

const dayOf = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

/** Whether `date` is one the matcher, or any of the matchers, names. */
export function matches(date: Date, matcher: Matcher | Matcher[]): boolean {
  if (Array.isArray(matcher) && !(matcher[0] instanceof Date))
    return (matcher as Matcher[]).some((m) => matches(date, m))
  if (Array.isArray(matcher))
    return (matcher as Date[]).some((d) => dayOf(d) === dayOf(date))
  if (typeof matcher === "boolean") return matcher
  if (typeof matcher === "function") return matcher(date)
  if (matcher instanceof Date) return dayOf(matcher) === dayOf(date)
  const t = dayOf(date)
  if ("dayOfWeek" in matcher) return matcher.dayOfWeek.includes(date.getDay())
  if ("from" in matcher) {
    const { from, to } = matcher
    if (!from) return false
    return t >= dayOf(from) && t <= dayOf(to ?? from)
  }
  const before = "before" in matcher ? t < dayOf(matcher.before) : undefined
  const after = "after" in matcher ? t > dayOf(matcher.after) : undefined
  if (before !== undefined && after !== undefined) return before || after
  return !!(before ?? after)
}

/** react-day-picker's `addToRange`, without a minimum, maximum or required range. */
function addToRange(date: Date, range: DateRange | undefined) {
  const { from, to } = range ?? {}
  const same = (a: Date, b: Date) => dayOf(a) === dayOf(b)
  if (!from && !to) return { from: date, to: date }
  if (from && !to) {
    if (same(from, date)) return { from, to: date }
    return dayOf(date) < dayOf(from)
      ? { from: date, to: from }
      : { from, to: date }
  }
  if (from && to) {
    if (same(from, date) && same(to, date)) return undefined
    if (same(from, date)) return { from, to: date }
    if (same(to, date)) return { from: date, to: date }
    if (dayOf(date) < dayOf(from)) return { from: date, to }
    return { from, to: date }
  }
  return undefined
}

const WEEKDAYS: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const timeZone = getLocalTimeZone()
const toDate = (value: CalendarDate) => value.toDate(timeZone)
const iso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
/** English ordinals, as date-fns' `PPPP` writes a day ("November 5th"). */
const ordinal = (n: number) =>
  n +
  (n % 100 >= 11 && n % 100 <= 13
    ? "th"
    : (["th", "st", "nd", "rd"][n % 10] ?? "th"))

/** The sr-only caption beside the dropdowns, as react-day-picker writes it inline. */
const HIDDEN =
  "border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap; overflow-wrap: normal;"

type Day = {
  value: CalendarDate
  date: Date
  key: string
  outside: boolean
  today: boolean
  disabled: boolean
  empty: boolean
  selected: boolean
  rangeStart: boolean
  rangeEnd: boolean
  rangeMiddle: boolean
  classes: string
}

/** A day's content: `<ng-template kuiCalendarDay let-date let-outside="outside">`. */
@Directive({ selector: "ng-template[kuiCalendarDay]" })
class CalendarDayTemplate {}

// Each caption's chevron ends its line, so the formatter keeps `</svg>` whole: Kirana 0.4.0's
// `ui add` reads `</svg>` only, not the `</svg\n>` it writes for an `<svg>` a `<span>` hugs (KF-103).
// The whitespace between it and `</span>` is dropped by Angular's compiler.
@Component({
  selector: "[kuiCalendar]",
  imports: [IconPlaceholder, NgTemplateOutlet, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "calendar",
    "[attr.lang]": "locale() ?? 'en-US'",
    "[attr.data-mode]": "mode()",
    "[attr.data-multiple-months]": "numberOfMonths() > 1 ? 'true' : null",
    "[attr.data-week-numbers]": "showWeekNumber() ? 'true' : null",
    "[attr.dir]": "dir() ?? null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div [sx]="styles.months">
      <nav aria-label="Navigation bar" [sx]="styles.nav">
        <button
          type="button"
          aria-label="Go to the Previous Month"
          [sx]="navButton()"
          (click)="step(-1)"
        >
          <svg
            iconPlaceholder
            lucide="ChevronLeftIcon"
            tabler="IconChevronLeft"
            hugeicons="ArrowLeftIcon"
            phosphor="CaretLeftIcon"
            remixicon="RiArrowLeftSLine"
            [sx]="styles.chevron"
          ></svg>
        </button>
        <button
          type="button"
          aria-label="Go to the Next Month"
          [sx]="navButton()"
          (click)="step(1)"
        >
          <svg
            iconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRightIcon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
            [sx]="styles.chevron"
          ></svg>
        </button>
      </nav>
      @for (month of months(); track month.key; let first = $first) {
        <div [sx]="styles.month">
          <div [sx]="styles.monthCaption">
            @if (captionLayout() !== "label" && first) {
              <div [sx]="styles.dropdowns">
                <span data-disabled="false" [sx]="styles.dropdownRoot">
                  <select
                    aria-label="Choose the Month"
                    [sx]="styles.dropdown"
                    [value]="month.value.month - 1"
                    (change)="
                      goToMonth(month.value, +$any($event.target).value + 1)
                    "
                  >
                    @for (name of monthNames(); track $index) {
                      <option
                        [value]="$index"
                        [selected]="$index === month.value.month - 1"
                      >
                        {{ name }}
                      </option>
                    }
                  </select>
                  <span aria-hidden="true" [sx]="styles.captionLabel"
                    >{{ monthNames()[month.value.month - 1]
                    }}<svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      [sx]="styles.chevronDown"
                    ></svg>
                  </span>
                </span>
                <span data-disabled="false" [sx]="styles.dropdownRoot">
                  <select
                    aria-label="Choose the Year"
                    [sx]="styles.dropdown"
                    [value]="month.value.year"
                    (change)="goToYear(month.value, +$any($event.target).value)"
                  >
                    @for (year of years; track year) {
                      <option
                        [value]="year"
                        [selected]="year === month.value.year"
                      >
                        {{ year }}
                      </option>
                    }
                  </select>
                  <span aria-hidden="true" [sx]="styles.captionLabel"
                    >{{ month.value.year
                    }}<svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      [sx]="styles.chevronDown"
                    ></svg>
                  </span>
                </span>
                <span
                  role="status"
                  aria-live="polite"
                  [attr.style]="hiddenStyle"
                  >{{ month.caption }}</span
                >
              </div>
            } @else {
              <span role="status" aria-live="polite" [sx]="styles.caption">{{
                month.caption
              }}</span>
            }
          </div>
          <table
            role="grid"
            [attr.aria-multiselectable]="mode() === 'single' ? 'false' : 'true'"
            [attr.aria-label]="month.caption"
            [sx]="styles.monthGrid"
          >
            <thead aria-hidden="true">
              <tr [sx]="styles.weekdays">
                @if (showWeekNumber()) {
                  <th
                    aria-label="Week Number"
                    scope="col"
                    [sx]="styles.weekNumberHeader"
                  ></th>
                }
                @for (weekday of weekdays(); track $index) {
                  <th
                    [attr.aria-label]="weekday.long"
                    scope="col"
                    [sx]="styles.weekday"
                  >
                    {{ weekday.short }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of month.weeks; track $index) {
                <tr [sx]="styles.week">
                  @if (showWeekNumber()) {
                    <td
                      [attr.aria-label]="'Week ' + week.number"
                      scope="row"
                      role="rowheader"
                      [sx]="styles.weekNumber"
                    >
                      <div [sx]="styles.weekNumberCell">{{ week.label }}</div>
                    </td>
                  }
                  @for (day of week.days; track day.key) {
                    <td
                      role="gridcell"
                      [attr.aria-selected]="day.selected ? 'true' : null"
                      [attr.data-day]="day.key"
                      [attr.data-month]="
                        day.outside ? day.key.slice(0, 7) : null
                      "
                      [attr.data-selected]="day.selected ? 'true' : null"
                      [attr.data-today]="day.today ? 'true' : null"
                      [attr.data-outside]="day.outside ? 'true' : null"
                      [attr.data-disabled]="day.disabled ? 'true' : null"
                      [attr.data-hidden]="day.empty ? 'true' : null"
                      [attr.data-focused]="
                        focused() === day.key ? 'true' : null
                      "
                      [class]="day.classes"
                    >
                      @if (!day.empty) {
                        <button
                          type="button"
                          data-slot="button"
                          [attr.tabindex]="tabbable() === day.key ? 0 : -1"
                          [attr.data-day]="
                            day.date.toLocaleDateString(locale())
                          "
                          [attr.data-selected-single]="
                            day.selected && mode() !== 'range' ? 'true' : null
                          "
                          [attr.data-range-start]="
                            mode() === 'range' ? String(day.rangeStart) : null
                          "
                          [attr.data-range-end]="
                            mode() === 'range' ? String(day.rangeEnd) : null
                          "
                          [attr.data-range-middle]="
                            mode() === 'range' ? String(day.rangeMiddle) : null
                          "
                          [attr.aria-label]="label(day)"
                          [disabled]="day.disabled"
                          [class]="dayButton()"
                          (click)="choose(day)"
                          (focus)="focused.set(day.key)"
                          (blur)="focused.set(null)"
                          (keydown)="keydown($event, day)"
                        >
                          @if (dayTemplate(); as template) {
                            <ng-container
                              [ngTemplateOutlet]="template"
                              [ngTemplateOutletContext]="{
                                $implicit: day.date,
                                date: day.date,
                                outside: day.outside,
                                value: day.value,
                              }"
                            />
                          } @else {
                            <span
                              data-slot="button-label"
                              [class]="buttonLabel"
                              >{{ number(day.value.day) }}</span
                            >
                          }
                        </button>
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
class Calendar {
  readonly mode = input<"single" | "multiple" | "range">("single")
  /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
  readonly selected = model<Date | Date[] | DateRange | undefined>(undefined)
  /** The month shown first, while `month` is not given. */
  readonly defaultMonth = input<Date>()
  readonly month = model<Date | undefined>(undefined)
  readonly numberOfMonths = input(1, { transform: numberAttribute })
  readonly captionLayout = input<
    "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  >("label")
  readonly disabled = input<Matcher | Matcher[]>()
  /** Named days, and the classes they take (`modifiersClassNames`). */
  readonly modifiers = input<Record<string, Matcher | Matcher[]>>()
  readonly modifiersClassNames = input<Record<string, string>>()
  readonly showOutsideDays = input(true, { transform: booleanAttribute })
  readonly showWeekNumber = input(false, { transform: booleanAttribute })
  /** Always six weeks, so the height holds from month to month. */
  readonly fixedWeeks = input(false, { transform: booleanAttribute })
  readonly buttonVariant = input<ButtonVariants["variant"]>("ghost")
  /** A BCP 47 tag. */
  readonly locale = input<string>()
  /** The week's first day, 0 for Sunday; the locale's when not given. */
  readonly weekStartsOn = input<0 | 1 | 2 | 3 | 4 | 5 | 6>()
  /** The calendar system for a locale's identifier (`@internationalized/date`'s `createCalendar`). */
  readonly createCalendar =
    input<(identifier: CalendarIdentifier) => CalendarSystem>()
  readonly dir = input<"ltr" | "rtl">()
  /** React DayPicker's formatters: the month dropdown's names and the weekdays'. */
  readonly formatters = input<{
    formatMonthDropdown?: (date: Date) => string
    formatWeekdayName?: (date: Date) => string
  }>()
  readonly sx = input<SxInput>()

  protected readonly styles = calendar
  protected readonly hiddenStyle = HIDDEN
  protected readonly String = String
  protected readonly buttonLabel = partSx(buttonLabel, undefined).class
  protected readonly dayTemplate = contentChild(CalendarDayTemplate, {
    read: TemplateRef,
  })
  protected readonly focused = signal<string | null>(null)
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  readonly #injector = inject(Injector)
  /** The month shown first while `month` is not given, moved by the arrows and dropdowns. */
  readonly #shown = signal<Date | undefined>(undefined)

  protected readonly part = computed(() => partSx(calendar.root, this.sx()))
  protected readonly navButton = computed(
    () =>
      [button({ variant: this.buttonVariant() }), calendar.navButton] as SxInput
  )
  protected readonly dayButton = computed(
    () =>
      partSx(
        [
          button({ variant: "ghost", size: "icon" }),
          calendar.dayButton,
          this.showWeekNumber()
            ? calendar.dayButtonSecond
            : calendar.dayButtonFirst,
        ],
        undefined
      ).class
  )

  readonly #system = computed(() => {
    const create = this.createCalendar()
    const locale = this.locale()
    if (!create || !locale) return null
    const identifier = new Intl.DateTimeFormat(locale).resolvedOptions()
      .calendar as CalendarIdentifier
    return create(identifier)
  })
  readonly #localeTag = computed(() => this.locale() ?? "en-US")
  readonly #firstDay = computed(() => {
    const first = this.weekStartsOn()
    return first === undefined ? undefined : WEEKDAYS[first]
  })

  /** A date as a calendar date in the calendar's system. */
  #value(date: Date) {
    const gregorian = new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )
    const system = this.#system()
    return system ? toCalendar(gregorian, system) : gregorian
  }

  readonly #first = computed(() =>
    startOfMonth(
      this.#value(
        this.month() ?? this.#shown() ?? this.defaultMonth() ?? new Date()
      )
    )
  )

  protected readonly monthNames = computed(() => {
    const format = this.formatters()?.formatMonthDropdown
    return Array.from({ length: 12 }, (_, m) => {
      const date = new Date(2000, m, 1)
      return format
        ? format(date)
        : date.toLocaleString(this.locale(), { month: "short" })
    })
  })
  /** Years in the dropdown: the hundred before this one, as react-day-picker's. */
  protected readonly years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - 100 + i
  )

  protected readonly weekdays = computed(() => {
    const start = startOfWeek(
      this.#first(),
      this.#localeTag(),
      this.#firstDay()
    ) as CalendarDate
    const format = this.formatters()?.formatWeekdayName
    return Array.from({ length: 7 }, (_, i) => {
      const date = toDate(start.add({ days: i }))
      const long = date.toLocaleDateString(this.#localeTag(), {
        weekday: "long",
      })
      return { long, short: format ? format(date) : long.slice(0, 2) }
    })
  })

  readonly #today = today(timeZone)

  protected readonly months = computed(() => {
    const selected = this.selected()
    const mode = this.mode()
    const range = mode === "range" ? (selected as DateRange | undefined) : null
    const isSelected = (date: Date) => {
      if (selected === undefined) return false
      if (selected instanceof Date) return dayOf(selected) === dayOf(date)
      if (Array.isArray(selected))
        return selected.some((d) => dayOf(d) === dayOf(date))
      return matches(date, selected as DateRange)
    }
    const thisYear = new Date().getFullYear()
    return Array.from({ length: this.numberOfMonths() }, (_, index) => {
      const first = this.#first().add({ months: index })
      const start = startOfWeek(
        first,
        this.#localeTag(),
        this.#firstDay()
      ) as CalendarDate
      const count = this.fixedWeeks()
        ? 6
        : getWeeksInMonth(first, this.#localeTag(), this.#firstDay())
      const weeks = Array.from({ length: count }, (_week, w) => {
        const days: Day[] = Array.from({ length: 7 }, (_day, d) => {
          const value = start.add({ days: w * 7 + d })
          const date = toDate(value)
          const outside = value.month !== first.month
          const chosen = isSelected(date)
          const rangeStart =
            !!range?.from && dayOf(range.from) === dayOf(date) && chosen
          const rangeEnd =
            !!range?.from &&
            dayOf(range.to ?? range.from) === dayOf(date) &&
            chosen
          const rangeMiddle = !!range && chosen && !rangeStart && !rangeEnd
          const disabled =
            this.disabled() !== undefined && matches(date, this.disabled()!)
          const beyond =
            this.captionLayout() !== "label" &&
            (date.getFullYear() > thisYear ||
              date.getFullYear() < thisYear - 100)
          const empty = (outside && !this.showOutsideDays()) || beyond
          const own = Object.entries(this.modifiers() ?? {})
            .filter(([, matcher]) => matches(date, matcher))
            .map(([name]) => this.modifiersClassNames()?.[name])
            .filter(Boolean)
          const isToday = isSameDay(
            value,
            toCalendar(this.#today, value.calendar)
          )
          return {
            value,
            date,
            key: iso(date),
            outside,
            today: isToday,
            disabled,
            empty,
            selected: chosen,
            rangeStart,
            rangeEnd,
            rangeMiddle,
            classes: [
              partSx(
                [
                  calendar.day,
                  rangeStart && calendar.rangeStart,
                  rangeMiddle && calendar.rangeMiddle,
                  rangeEnd && calendar.rangeEnd,
                  isToday && calendar.today,
                  outside && calendar.outside,
                  disabled && calendar.disabled,
                  empty && calendar.hidden,
                ],
                undefined
              ).class,
              ...own,
            ].join(" "),
          }
        })
        const number = this.#weekNumber(days[0]!.date)
        return { days, number, label: String(number).padStart(2, "0") }
      })
      return {
        key: `${first.year}-${first.month}`,
        value: first,
        caption: this.#caption(first),
        weeks,
      }
    })
  })

  /** Which day takes Tab: the focused one, else the selected, today, or the month's first. */
  protected readonly tabbable = computed(() => {
    const days = this.months()
      .flatMap((m) => m.weeks.flatMap((w) => w.days))
      .filter((d) => !d.empty && !d.outside && !d.disabled)
    const focused = this.focused()
    return (
      (focused && days.find((d) => d.key === focused)?.key) ??
      days.find((d) => d.selected)?.key ??
      days.find((d) => d.today)?.key ??
      days[0]?.key ??
      null
    )
  })

  /** The month and its year, as day-picker's caption (`LLLL y`), each in the calendar's system. */
  #caption(first: CalendarDate) {
    const date = toDate(first)
    const options = this.#system()
      ? { calendar: first.calendar.identifier }
      : {}
    const month = date.toLocaleDateString(this.#localeTag(), {
      month: "long",
      ...options,
    })
    const year = date.toLocaleDateString(this.#localeTag(), {
      year: "numeric",
      ...options,
    })
    return `${month} ${year}`
  }

  /** The week's number, counted from the week holding January 1st, as date-fns' `getWeek`. */
  #weekNumber(weekStart: Date) {
    const end = new Date(weekStart)
    end.setDate(end.getDate() + 6)
    const year = end.getFullYear()
    const jan1 = new Date(year, 0, 1)
    const firstWeek = new Date(jan1)
    firstWeek.setDate(
      jan1.getDate() - ((jan1.getDay() - (this.weekStartsOn() ?? 0) + 7) % 7)
    )
    return Math.round((dayOf(weekStart) - dayOf(firstWeek)) / 604800000) + 1
  }

  protected number(n: number) {
    return new Intl.NumberFormat(this.locale()).format(n)
  }

  protected label(day: Day) {
    const english = this.#localeTag().startsWith("en") && !this.#system()
    const text = english
      ? `${day.date.toLocaleDateString("en-US", { weekday: "long" })}, ${day.date.toLocaleDateString("en-US", { month: "long" })} ${ordinal(day.date.getDate())}, ${day.date.getFullYear()}`
      : day.date.toLocaleDateString(this.#localeTag(), {
          dateStyle: "full",
          ...(this.#system()
            ? { calendar: day.value.calendar.identifier }
            : {}),
        })
    return `${day.today ? "Today, " : ""}${text}${day.selected ? ", selected" : ""}`
  }

  #show(first: CalendarDate) {
    const date = toDate(first)
    this.#shown.set(date)
    if (this.month() !== undefined) this.month.set(date)
  }

  protected step(months: number) {
    this.#show(this.#first().add({ months }))
  }

  protected goToMonth(current: CalendarDate, month: number) {
    this.#show(current.set({ month }))
  }

  protected goToYear(current: CalendarDate, year: number) {
    this.#show(current.set({ year }))
  }

  protected choose(day: Day) {
    if (day.disabled) return
    const mode = this.mode()
    const selected = this.selected()
    if (mode === "single") {
      const same =
        selected instanceof Date && dayOf(selected) === dayOf(day.date)
      this.selected.set(same ? undefined : day.date)
    } else if (mode === "multiple") {
      const list = (selected as Date[] | undefined) ?? []
      const has = list.some((d) => dayOf(d) === dayOf(day.date))
      this.selected.set(
        has
          ? list.filter((d) => dayOf(d) !== dayOf(day.date))
          : [...list, day.date]
      )
    } else
      this.selected.set(addToRange(day.date, selected as DateRange | undefined))
    // An outside day shows its own month, as react-day-picker does.
    if (day.outside) this.#show(startOfMonth(day.value))
  }

  /** The arrows, Home and End, Page Up and Down move the focus among the days, as day-picker's. */
  protected keydown(event: KeyboardEvent, day: Day) {
    const rtl =
      (this.dir() ?? getComputedStyle(this.#element).direction) === "rtl"
    const moves: Record<string, (v: CalendarDate) => CalendarDate> = {
      ArrowLeft: (v) => v.add({ days: rtl ? 1 : -1 }),
      ArrowRight: (v) => v.add({ days: rtl ? -1 : 1 }),
      ArrowUp: (v) => v.add({ days: -7 }),
      ArrowDown: (v) => v.add({ days: 7 }),
      PageUp: (v) => v.add(event.shiftKey ? { years: -1 } : { months: -1 }),
      PageDown: (v) => v.add(event.shiftKey ? { years: 1 } : { months: 1 }),
      Home: (v) =>
        v.add({
          days: -getDayOfWeek(v, this.#localeTag(), this.#firstDay()),
        }),
      End: (v) =>
        v.add({
          days: 6 - getDayOfWeek(v, this.#localeTag(), this.#firstDay()),
        }),
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    const target = move(day.value)
    const key = iso(toDate(target))
    const shown = this.months()
    const last = shown[shown.length - 1]!.value
    if (
      target.compare(this.#first()) < 0 ||
      target.compare(last.add({ months: 1 })) >= 0
    )
      this.#show(startOfMonth(target))
    this.focused.set(key)
    // Once drawn: a move into another month draws it first.
    afterNextRender(
      () =>
        this.#element
          .querySelector<HTMLButtonElement>(`td[data-day="${key}"] button`)
          ?.focus(),
      { injector: this.#injector }
    )
  }
}

export { Calendar, CalendarDayTemplate }
