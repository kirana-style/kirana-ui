/**
 * Upstream's `calendar-hijri`: the Persian (Jalali) calendar, read in Vazirmatn, as its site loads
 * it. As upstream's, the calendar is the registry's own with its `DayPicker` from the Persian
 * add-on, copied here for the example: for your own, edit `calendar.tsx`. React DayPicker 10 keeps
 * that calendar in `@daypicker/persian`, where upstream, on 9, imports `react-day-picker/persian`.
 */
import "@fontsource-variable/vazirmatn"
import * as React from "react"
import { css, props as styleProps } from "@kirana-style/core"
import { DayPicker } from "@daypicker/persian"
import { getDefaultClassNames } from "react-day-picker"

import type { Button } from "../ui/button"
import { CalendarDayButton } from "../ui/calendar"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { radius, theme } from "../../../core/tokens"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"
import { page } from "../../../styles/page.styles"

const styles = {
  // Vazirmatn, upstream's `Vazirmatn({ subsets: ["arabic"] })`.
  font: css({ fontFamily: '"Vazirmatn Variable", sans-serif' }),
  // `rounded-lg border`.
  calendar: css({
    borderRadius: { "*": null, base: radius.lg },
    borderWidth: { "*": null, base: "1px" },
    borderStyle: "solid",
    borderColor: theme.border,
  }),
}

export default function CalendarHijri() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <div sx={page.example}>
      <div sx={styles.font}>
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          sx={styles.calendar}
        />
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// The code below is for this example only.
// For your own calendar, you would edit the calendar.tsx component directly.
// ----------------------------------------------------------------------------
/**
 * react-day-picker takes a class name for each part and each day's modifiers, so each style here
 * is given as its class, beside the library's own default class.
 */
/** `Omit` over each member of a union: DayPicker's props are one per selection `mode`. */
type OmitEach<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

function cls(...values: Sx[]) {
  return styleProps(values).className ?? ""
}

function join(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(" ")
}

function Calendar({
  sx,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: OmitEach<React.ComponentProps<typeof DayPicker>, "className"> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  sx?: Sx
}) {
  const defaultClassNames = getDefaultClassNames()
  const weekNumbers = props.showWeekNumber

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cls(calendar.root, sx)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: defaultClassNames.root,
        months: join(cls(calendar.months), defaultClassNames.months),
        month: join(cls(calendar.month), defaultClassNames.month),
        nav: join(cls(calendar.nav), defaultClassNames.nav),
        button_previous: join(
          cls(button({ variant: buttonVariant }), calendar.navButton),
          defaultClassNames.button_previous
        ),
        button_next: join(
          cls(button({ variant: buttonVariant }), calendar.navButton),
          defaultClassNames.button_next
        ),
        month_caption: join(
          cls(calendar.monthCaption),
          defaultClassNames.month_caption
        ),
        dropdowns: join(cls(calendar.dropdowns), defaultClassNames.dropdowns),
        dropdown_root: join(
          cls(calendar.dropdownRoot),
          defaultClassNames.dropdown_root
        ),
        dropdown: join(cls(calendar.dropdown), defaultClassNames.dropdown),
        caption_label: join(
          cls(
            captionLayout === "label" ? calendar.caption : calendar.captionLabel
          ),
          defaultClassNames.caption_label
        ),
        month_grid: join(cls(calendar.monthGrid), defaultClassNames.month_grid),
        weekdays: join(cls(calendar.weekdays), defaultClassNames.weekdays),
        weekday: join(cls(calendar.weekday), defaultClassNames.weekday),
        week: join(cls(calendar.week), defaultClassNames.week),
        week_number_header: join(
          cls(calendar.weekNumberHeader),
          defaultClassNames.week_number_header
        ),
        week_number: join(
          cls(calendar.weekNumber),
          defaultClassNames.week_number
        ),
        day: join(cls(calendar.day), defaultClassNames.day),
        range_start: join(
          cls(calendar.rangeStart),
          defaultClassNames.range_start
        ),
        range_middle: join(
          cls(calendar.rangeMiddle),
          defaultClassNames.range_middle
        ),
        range_end: join(cls(calendar.rangeEnd), defaultClassNames.range_end),
        today: join(cls(calendar.today), defaultClassNames.today),
        outside: join(cls(calendar.outside), defaultClassNames.outside),
        disabled: join(cls(calendar.disabled), defaultClassNames.disabled),
        hidden: join(cls(calendar.hidden), defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={className}
              {...rootProps}
            />
          )
        },
        Chevron: ({ className, orientation, ...iconProps }) => {
          if (orientation === "left") {
            return (
              <IconPlaceholder
                lucide="ChevronLeftIcon"
                tabler="IconChevronLeft"
                hugeicons="ArrowLeftIcon"
                phosphor="CaretLeftIcon"
                remixicon="RiArrowLeftSLine"
                className={join(cls(calendar.chevron), className)}
                {...iconProps}
              />
            )
          }

          if (orientation === "right") {
            return (
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRightIcon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                className={join(cls(calendar.chevron), className)}
                {...iconProps}
              />
            )
          }

          return (
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDownIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              className={join(cls(calendar.chevronDown), className)}
              {...iconProps}
            />
          )
        },
        DayButton: ({ ...dayProps }) => (
          <CalendarDayButton
            locale={locale}
            firstCell={weekNumbers ? "second" : "first"}
            {...dayProps}
          />
        ),
        WeekNumber: ({ children, ...cellProps }) => {
          return (
            <td {...cellProps}>
              <div sx={calendar.weekNumberCell}>{children}</div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}
