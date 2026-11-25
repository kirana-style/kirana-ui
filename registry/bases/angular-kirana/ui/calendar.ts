/**
 * Calendar on Kirana UI's calendar (`KpCalendar` and its parts), drawn as react-day-picker draws
 * React's: the same elements and attributes, so the style module is React's. It takes React's API
 * with `Date`s: `mode`, `[(selected)]`, `defaultMonth`, `[(month)]`, `numberOfMonths`,
 * `captionLayout` (the month and year dropdowns are this file's own markup, moving the month the
 * calendar is given), `disabled` (dates, ranges or a test), `modifiers` with their classes,
 * `showOutsideDays`, `showWeekNumber` (counted here from each week's days), `fixedWeeks`, `locale`
 * (a BCP 47 tag), `weekStartsOn`, `createCalendar` (a Persian one) and `formatters`. A
 * `<ng-template kuiCalendarDay let-date let-outside="outside">` draws a day's content.
 */
import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  Directive,
  ElementRef,
  TemplateRef,
  afterEveryRender,
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
  KpCalendar,
  KpCalendarCell,
  KpCalendarDay,
  KpCalendarGrid,
  KpCalendarHeadCell,
  KpCalendarHeading,
  KpCalendarMonths,
  KpCalendarNext,
  KpCalendarPrevious,
  KpCalendarWeekdays,
  KpCalendarWeeks,
  hostInputs,
} from "@kirana-ui/angular"
import type {
  CalendarDay as PrimitiveDay,
  CalendarMonth,
} from "@kirana-ui/angular"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
} from "@internationalized/date"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button, buttonLabel } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
type CalendarMode = "single" | "multiple" | "range"

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

const pad = (n: number, width = 2) => String(n).padStart(width, "0")

/** A local `Date` as Kirana UI's calendar's `YYYY-MM-DD`. */
const toIso = (date: Date) =>
  `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

function fromIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y!, m! - 1, d)
}

/**
 * The week of the year a row's first day is in, as date-fns' `getWeek` counts it: weeks start on
 * the row's first weekday, and week 1 holds the year's `firstWeekContainsDate`.
 */
function weekNumber(date: Date, firstWeekContainsDate = 1) {
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
  return Math.round((dayOf(date) - start.getTime()) / 604_800_000) + 1
}

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

/** The sr-only caption beside the dropdowns, as react-day-picker writes it inline. */
const HIDDEN =
  "border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap; overflow-wrap: normal;"

/** A day as the template draws it: the primitive's, with day-picker's modifiers. */
type Day = {
  date: string
  label: string
  value: Date
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

@Component({
  selector: "[kuiCalendar]",
  imports: [
    IconPlaceholder,
    NgTemplateOutlet,
    SxDirective,
    KpCalendarCell,
    KpCalendarDay,
    KpCalendarGrid,
    KpCalendarHeadCell,
    KpCalendarHeading,
    KpCalendarMonths,
    KpCalendarNext,
    KpCalendarPrevious,
    KpCalendarWeekdays,
    KpCalendarWeeks,
  ],
  hostDirectives: [KpCalendar],
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
          kpCalendarPrevious
          type="button"
          aria-label="Go to the Previous Month"
          [attr.aria-disabled]="atStart() ? 'true' : null"
          [sx]="navButton()"
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
          kpCalendarNext
          type="button"
          aria-label="Go to the Next Month"
          [attr.aria-disabled]="atEnd() ? 'true' : null"
          [sx]="navButton()"
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
      <div *kpCalendarMonths="let month" [sx]="styles.month">
        <div [sx]="styles.monthCaption">
          @if (captionLayout() !== "label" && month.index === 0) {
            <div [sx]="styles.dropdowns">
              @if (captionLayout() !== "dropdown-years") {
                <span data-disabled="false" [sx]="styles.dropdownRoot">
                  <select
                    aria-label="Choose the Month"
                    [sx]="styles.dropdown"
                    (change)="goToMonth(month, +$any($event.target).value)"
                  >
                    @for (name of monthNames(); track $index) {
                      <option
                        [value]="$index"
                        [selected]="$index === monthOf(month)"
                      >
                        {{ name }}
                      </option>
                    }
                  </select>
                  <span aria-hidden="true" [sx]="styles.captionLabel"
                    >{{ monthNames()[monthOf(month)]
                    }}<svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      [sx]="styles.chevronDown"
                    ></svg
                  ></span>
                </span>
              }
              @if (captionLayout() !== "dropdown-months") {
                <span data-disabled="false" [sx]="styles.dropdownRoot">
                  <select
                    aria-label="Choose the Year"
                    [sx]="styles.dropdown"
                    (change)="goToYear(month, +$any($event.target).value)"
                  >
                    @for (year of years; track year) {
                      <option
                        [value]="year"
                        [selected]="year === yearOf(month)"
                      >
                        {{ year }}
                      </option>
                    }
                  </select>
                  <span aria-hidden="true" [sx]="styles.captionLabel"
                    >{{ yearOf(month)
                    }}<svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      [sx]="styles.chevronDown"
                    ></svg
                  ></span>
                </span>
              }
              <span
                kpCalendarHeading
                role="status"
                aria-live="polite"
                [attr.style]="hiddenStyle"
              ></span>
            </div>
          } @else {
            <!-- The heading says day-picker's caption (\`abril 2026\`), its own content, in place of
              the part's name of the month (\`abril de 2026\`). -->
            <span
              kpCalendarHeading
              role="status"
              aria-live="polite"
              [sx]="styles.caption"
              >{{ caption(month.month) }}</span
            >
          }
        </div>
        <table
          kpCalendarGrid
          [attr.aria-multiselectable]="mode() === 'single' ? 'false' : 'true'"
          [attr.aria-label]="caption(month.month)"
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
              <th
                *kpCalendarWeekdays="let weekday"
                kpCalendarHeadCell
                [weekday]="weekday"
                [attr.aria-label]="weekday.long"
                scope="col"
                [sx]="styles.weekday"
              >
                {{ weekdayName(month, weekday.index) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *kpCalendarWeeks="let week" [sx]="styles.week">
              @if (showWeekNumber()) {
                <td
                  [attr.aria-label]="'Week ' + weekOf(week)"
                  scope="row"
                  role="rowheader"
                  [sx]="styles.weekNumber"
                >
                  <div [sx]="styles.weekNumberCell">
                    {{ pad(weekOf(week)) }}
                  </div>
                </td>
              }
              @for (entry of week; track entry.date) {
                @let day = dayOf(entry);
                <td
                  kpCalendarCell
                  [date]="day.date"
                  role="gridcell"
                  [attr.aria-selected]="day.selected ? 'true' : null"
                  [attr.data-day]="day.date"
                  [attr.data-month]="day.outside ? day.date.slice(0, 7) : null"
                  [attr.data-selected]="day.selected ? 'true' : null"
                  [attr.data-today]="day.today ? 'true' : null"
                  [attr.data-outside]="day.outside ? 'true' : null"
                  [attr.data-disabled]="day.disabled ? 'true' : null"
                  [attr.data-hidden]="day.empty ? 'true' : null"
                  [attr.data-focused]="focused() === day.date ? 'true' : null"
                  [class]="day.classes"
                >
                  @if (!day.empty) {
                    <button
                      kpCalendarDay
                      [date]="day.date"
                      type="button"
                      data-slot="button"
                      [attr.data-day]="day.value.toLocaleDateString(locale())"
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
                      [class]="dayButton()"
                      (focus)="focused.set(day.date)"
                      (blur)="focused() === day.date && focused.set(null)"
                    >
                      @if (dayTemplate(); as template) {
                        <ng-container
                          [ngTemplateOutlet]="template"
                          [ngTemplateOutletContext]="{
                            $implicit: day.value,
                            date: day.value,
                            outside: day.outside,
                            value: day.date,
                          }"
                        />
                      } @else {
                        <span data-slot="button-label" [class]="buttonLabel">{{
                          day.label
                        }}</span>
                      }
                    </button>
                  }
                </td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
class Calendar {
  readonly mode = input<CalendarMode>("single")
  /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
  readonly selected = model<Date | Date[] | DateRange | undefined>(undefined)
  /**
   * A chosen day pressed again stays chosen, and with `mode: "multiple"` the last day stays;
   * without it, a second press takes the day away, as react-day-picker's.
   */
  readonly required = input(false, { transform: booleanAttribute })
  /** The month shown first, while `month` is not given. */
  readonly defaultMonth = input<Date>()
  readonly month = model<Date | undefined>(undefined)
  readonly numberOfMonths = input(1, { transform: numberAttribute })
  /** With several months: Previous and Next turn them all. */
  readonly pagedNavigation = input(false, { transform: booleanAttribute })
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
  /**
   * The week's first day, 0 for Sunday; the locale's when not given. It reaches the calendar as
   * the tag's `fw` extension.
   */
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
  protected readonly pad = pad
  protected readonly buttonLabel = partSx(buttonLabel, undefined).class
  protected readonly dayTemplate = contentChild(CalendarDayTemplate, {
    read: TemplateRef,
  })
  protected readonly focused = signal<string | null>(null)
  /** The month shown while `month` is not given, moved by the arrows, keys and dropdowns. */
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

  /** The locale's tag, its week starting on `weekStartsOn` when that is given. */
  readonly #tag = computed(() => {
    const locale = this.locale() ?? "en-US"
    const first = this.weekStartsOn()
    if (first === undefined) return locale
    const fw = `fw-${WEEKDAYS[first]}`
    return locale.includes("-u-") ? `${locale}-${fw}` : `${locale}-u-${fw}`
  })
  /** The locale's own calendar, laid out by `createCalendar`. */
  readonly #system = computed(() => {
    const create = this.createCalendar()
    if (!create) return undefined
    return create(
      new Intl.DateTimeFormat(this.locale()).resolvedOptions()
        .calendar as CalendarIdentifier
    )
  })

  readonly #shownMonth = computed(
    () => this.month() ?? this.#shown() ?? this.defaultMonth() ?? new Date()
  )

  /** The dropdowns' years, the hundred before this one, as react-day-picker's. */
  readonly #thisYear = new Date().getFullYear()
  protected readonly years = Array.from(
    { length: 101 },
    (_, i) => this.#thisYear - 100 + i
  )
  readonly #first = computed(() =>
    this.captionLayout() !== "label"
      ? new Date(this.#thisYear - 100, 0, 1)
      : undefined
  )
  readonly #lastDay = computed(() =>
    this.captionLayout() !== "label"
      ? new Date(this.#thisYear, 11, 31)
      : undefined
  )
  /** Whether Previous and Next are at the dropdowns' first and last month. */
  protected readonly atStart = computed(() => {
    const first = this.#first()
    const shown = this.#shownMonth()
    return (
      !!first &&
      shown.getFullYear() * 12 + shown.getMonth() <=
        first.getFullYear() * 12 + first.getMonth()
    )
  })
  protected readonly atEnd = computed(() => {
    const last = this.#lastDay()
    const shown = this.#shownMonth()
    const end = shown.getFullYear() * 12 + shown.getMonth()
    return (
      !!last &&
      end + this.numberOfMonths() - 1 >=
        last.getFullYear() * 12 + last.getMonth()
    )
  })

  protected readonly monthNames = computed(() => {
    const format = this.formatters()?.formatMonthDropdown
    return Array.from({ length: 12 }, (_, m) => {
      const date = new Date(2000, m, 1)
      return format
        ? format(date)
        : date.toLocaleString(this.locale(), { month: "short" })
    })
  })

  constructor() {
    const toValue = computed(() => {
      const selected = this.selected()
      const mode = this.mode()
      if (mode === "multiple") return ((selected as Date[]) ?? []).map(toIso)
      if (mode === "range") {
        const range = selected as DateRange | undefined
        if (!range?.from) return null
        return { start: toIso(range.from), end: toIso(range.to ?? range.from) }
      }
      return selected ? toIso(selected as Date) : null
    })
    hostInputs(KpCalendar, {
      mode: this.mode,
      required: this.required,
      value: toValue as never,
      month: computed(() => toIso(this.#shownMonth())),
      months: this.numberOfMonths,
      pagedNavigation: this.pagedNavigation,
      locale: this.#tag,
      calendarSystem: this.#system,
      min: computed(() => {
        const first = this.#first()
        return first ? toIso(first) : undefined
      }),
      max: computed(() => {
        const last = this.#lastDay()
        return last ? toIso(last) : undefined
      }),
      disabled: computed(() => this.disabled() === true),
      isDateUnavailable: computed(() => {
        const disabled = this.disabled()
        return disabled === undefined || typeof disabled === "boolean"
          ? undefined
          : (iso: string) => matches(fromIso(iso), disabled)
      }),
      fixedWeeks: this.fixedWeeks,
    })
    const root = inject(KpCalendar)
    root.valueChanged.subscribe(({ value }) => {
      const mode = this.mode()
      if (mode === "multiple")
        this.selected.set((value as string[]).map(fromIso))
      else if (mode === "range") {
        const range = value as { start: string; end: string } | null
        this.selected.set(
          range
            ? { from: fromIso(range.start), to: fromIso(range.end) }
            : undefined
        )
      } else this.selected.set(value ? fromIso(value as string) : undefined)
    })
    root.monthChanged.subscribe(({ month }) => this.#show(fromIso(month)))
    afterEveryRender(() => this.#writeDayPicker())
  }

  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement

  /**
   * day-picker's `data-selected="true"` on each chosen cell, and `data-range-start` and
   * `data-range-end` (`"true"` or `"false"`) on each day of a range, over the primitive's: a part's
   * own attribute (`data-selected=""`) wins over the element's binding of the same name (PF-049).
   * The bindings in the template hold where the part writes none (a copy of a day another month
   * shows).
   */
  #writeDayPicker() {
    const write = (element: Element, name: string, value: string | null) => {
      if (element.getAttribute(name) === value) return
      if (value === null) element.removeAttribute(name)
      else element.setAttribute(name, value)
    }
    const range = this.mode() === "range"
    for (const cell of this.#element.querySelectorAll("td[kpcalendarcell]")) {
      const chosen = this.#chosen(fromIso(cell.getAttribute("data-day")!))
      write(cell, "data-selected", chosen ? "true" : null)
      write(cell, "data-range-start", null)
      write(cell, "data-range-end", null)
      const day = cell.querySelector("button[kpcalendarday]")
      if (!day) continue
      write(day, "data-selected", null)
      write(day, "data-range-start", range ? String(!!chosen?.start) : null)
      write(day, "data-range-end", range ? String(!!chosen?.end) : null)
    }
  }

  #show(month: Date) {
    this.#shown.set(month)
    if (this.month() !== undefined) this.month.set(month)
  }

  protected monthOf(month: CalendarMonth) {
    return fromIso(month.month).getMonth()
  }

  protected yearOf(month: CalendarMonth) {
    return fromIso(month.month).getFullYear()
  }

  protected goToMonth(month: CalendarMonth, index: number) {
    this.#show(new Date(this.yearOf(month), index, 1))
  }

  protected goToYear(month: CalendarMonth, year: number) {
    this.#show(new Date(year, this.monthOf(month), 1))
  }

  protected weekOf(week: readonly PrimitiveDay[]) {
    return weekNumber(fromIso(week[0]!.date))
  }

  readonly #intl = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(
      `${this.locale() ?? "en-US"}-u-ca-${this.#system()?.identifier ?? "gregory"}`,
      options
    )

  /**
   * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
   * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
   */
  protected caption(iso: string) {
    const date = fromIso(iso)
    return `${this.#intl({ month: "long" }).format(date)} ${this.#intl({ year: "numeric" }).format(date)}`
  }

  /**
   * A weekday's heading: its first two letters, as date-fns' `cccccc` in English, unless that names
   * two weekdays alike (Arabic's article), where its narrow name.
   */
  protected weekdayName(month: CalendarMonth, index: number) {
    const date = fromIso(month.weeks[0]![index]!.date)
    const formatted = this.formatters()?.formatWeekdayName?.(date)
    if (formatted !== undefined) return formatted
    const two = month.weekdays.map((weekday) => weekday.long.slice(0, 2))
    return new Set(two).size === two.length
      ? two[index]
      : month.weekdays[index]!.narrow
  }

  /** Whether the selection holds `date`, and is a range that starts or ends there. */
  #chosen(date: Date) {
    const t = dayOf(date)
    const selected = this.selected()
    if (this.mode() === "range") {
      const range = selected as DateRange | undefined
      if (!range?.from) return null
      const start = dayOf(range.from)
      const end = dayOf(range.to ?? range.from)
      return t >= start && t <= end
        ? { start: t === start, end: t === end }
        : null
    }
    const days = ([] as (Date | undefined)[]).concat(selected as Date)
    return days.some((d) => d && dayOf(d) === t)
      ? { start: false, end: false }
      : null
  }

  readonly #today = toIso(new Date())

  /** A day of the primitive's week, with day-picker's modifiers and classes. */
  protected dayOf(entry: PrimitiveDay): Day {
    const value = fromIso(entry.date)
    const first = this.#first()
    const last = this.#lastDay()
    const beyond =
      (first !== undefined && value < first) ||
      (last !== undefined && value > last)
    const empty = (entry.outside && !this.showOutsideDays()) || beyond
    const disabled =
      this.disabled() !== undefined && matches(value, this.disabled()!)
    const chosen = this.#chosen(value)
    const range = this.mode() === "range"
    const rangeStart = range && !!chosen?.start
    const rangeEnd = range && !!chosen?.end
    const rangeMiddle = range && !!chosen && !rangeStart && !rangeEnd
    const today = entry.date === this.#today
    const own = Object.entries(this.modifiers() ?? {})
      .filter(([, matcher]) => matches(value, matcher))
      .map(([name]) => this.modifiersClassNames()?.[name])
      .filter(Boolean)
    const cls = (handle: SxInput) => partSx(handle, undefined).class
    return {
      date: entry.date,
      label: this.#system() ? entry.label : String(value.getDate()),
      value,
      outside: entry.outside,
      today,
      disabled,
      empty,
      selected: !!chosen,
      rangeStart,
      rangeEnd,
      rangeMiddle,
      // Each modifier's class beside the day's, as react-day-picker joins them.
      classes: [
        cls(calendar.day),
        rangeStart && cls(calendar.rangeStart),
        rangeMiddle && cls(calendar.rangeMiddle),
        rangeEnd && cls(calendar.rangeEnd),
        today && cls(calendar.today),
        entry.outside && cls(calendar.outside),
        disabled && cls(calendar.disabled),
        empty && cls(calendar.hidden),
        ...own,
      ]
        .filter(Boolean)
        .join(" "),
    }
  }
}

export { Calendar, CalendarDayTemplate }
