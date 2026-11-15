"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import type { DayButton, Locale } from "react-day-picker"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

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

function CalendarDayButton({
  sx,
  day,
  modifiers,
  locale,
  firstCell = "first",
  ...props
}: Omit<React.ComponentProps<typeof DayButton>, "className"> & {
  locale?: Partial<Locale>
  /** The row's first day: its first cell, or its second beside week numbers. */
  firstCell?: "first" | "second"
  sx?: Sx
}) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      {...props}
      sx={[
        calendar.dayButton,
        firstCell === "second"
          ? calendar.dayButtonSecond
          : calendar.dayButtonFirst,
        sx,
      ]}
    />
  )
}

export { Calendar, CalendarDayButton }
