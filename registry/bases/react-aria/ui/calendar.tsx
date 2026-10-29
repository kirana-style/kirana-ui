"use client"

import * as React from "react"
import { css, props as styleProps } from "@kirana-style/core"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarMonthPicker,
  CalendarYearPicker,
} from "react-aria-components"
import type {
  CalendarCellRenderProps,
  CalendarProps,
  DateValue,
  RangeCalendarProps,
} from "react-aria-components"

import { Button } from "./button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

type Shared = {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  captionLayout?: "label" | "dropdown"
  numberOfMonths?: number
  showWeekNumber?: boolean
  headerFormat?: Intl.DateTimeFormatOptions
  renderCell?: (
    renderProps: CalendarCellRenderProps & { defaultChildren: React.ReactNode }
  ) => React.ReactNode
  sx?: Sx
}

/** `relative` on the dropdowns' selects, `min-w-0` on their lists. */
const styles = {
  picker: css({ position: "relative" }),
  pickerList: css({ minWidth: { "*": null, base: "0" } }),
}

/** A cell's style from its state, as upstream's `cellVariants`. */
function cellSx(renderProps: CalendarCellRenderProps): Sx {
  return [
    calendar.day,
    calendar.dayAria,
    renderProps.isToday && calendar.today,
    renderProps.isSelectionStart && calendar.rangeStart,
    renderProps.isSelectionEnd && calendar.rangeEnd,
    renderProps.isUnavailable && calendar.unavailable,
    renderProps.isDisabled && calendar.disabled,
    renderProps.isOutsideMonth && calendar.outside,
  ]
}

function Calendar<
  T extends DateValue,
  M extends "single" | "multiple" = "single",
>({
  sx,
  ...props
}: Omit<CalendarProps<T, M>, "visibleDuration" | "className" | "style"> &
  Shared) {
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      {...styleProps(calendar.root, sx)}
    >
      <CalendarInner {...props} />
    </AriaCalendar>
  )
}

function RangeCalendar<T extends DateValue>({
  sx,
  ...props
}: Omit<RangeCalendarProps<T>, "visibleDuration" | "className" | "style"> &
  Shared) {
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      {...styleProps(calendar.root, sx)}
    >
      <CalendarInner {...props} isRange />
    </AriaRangeCalendar>
  )
}

function CalendarInner({
  captionLayout = "label",
  buttonVariant = "ghost",
  numberOfMonths = 1,
  showWeekNumber = false,
  headerFormat,
  renderCell,
  isRange,
}: Omit<Shared, "sx"> & { isRange?: boolean }) {
  return (
    <div sx={calendar.months}>
      <header sx={calendar.nav}>
        <Button variant={buttonVariant} slot="previous" sx={calendar.navButton}>
          <IconPlaceholder
            lucide="ChevronLeftIcon"
            tabler="IconChevronLeft"
            hugeicons="ArrowLeftIcon"
            phosphor="CaretLeftIcon"
            remixicon="RiArrowLeftSLine"
            {...styleProps(calendar.chevron)}
          />
        </Button>
        <Button variant={buttonVariant} slot="next" sx={calendar.navButton}>
          <IconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRightIcon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
            {...styleProps(calendar.chevron)}
          />
        </Button>
      </header>
      {Array.from({ length: numberOfMonths }, (_, i) => (
        <div key={i} sx={calendar.month}>
          <div sx={[calendar.monthCaption, calendar.monthCaptionAria]}>
            {captionLayout === "dropdown" ? (
              <>
                <MonthDropdown format={headerFormat} />
                <YearDropdown format={headerFormat} />
              </>
            ) : (
              <CalendarHeading
                offset={{ months: i }}
                format={headerFormat}
                {...styleProps(calendar.caption)}
              />
            )}
          </div>
          <CalendarGrid
            offset={{ months: i }}
            {...styleProps(calendar.monthGrid)}
          >
            <AriaCalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell {...styleProps(calendar.weekday)}>
                  {day}
                </CalendarHeaderCell>
              )}
            </AriaCalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={(renderProps) =>
                    styleProps(cellSx(renderProps)).className ?? ""
                  }
                >
                  {(renderProps) => (
                    <div
                      data-selected-single={renderProps.isSelected && !isRange}
                      data-range-start={renderProps.isSelectionStart && isRange}
                      data-range-end={renderProps.isSelectionEnd && isRange}
                      data-range-middle={
                        renderProps.isSelected &&
                        !renderProps.isSelectionStart &&
                        !renderProps.isSelectionEnd &&
                        isRange
                      }
                      sx={[
                        button({ variant: "ghost", size: "icon" }),
                        calendar.dayButton,
                        showWeekNumber
                          ? calendar.dayButtonSecond
                          : calendar.dayButtonFirst,
                      ]}
                    >
                      {renderCell
                        ? renderCell(renderProps)
                        : renderProps.defaultChildren}
                    </div>
                  )}
                </CalendarCell>
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      ))}
    </div>
  )
}

function MonthDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarMonthPicker format={format?.month}>
      {(props) => (
        <Select {...props} sx={styles.picker}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent sx={styles.pickerList}>
            <SelectGroup>
              {props.items.map((item) => (
                <SelectItem key={item.id} id={item.id}>
                  {item.formatted}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </CalendarMonthPicker>
  )
}

function YearDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarYearPicker format={format}>
      {(props) => (
        <Select {...props} sx={styles.picker}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent sx={styles.pickerList}>
            {props.items.map((item) => (
              <SelectItem key={item.id} id={item.id}>
                {item.formatted}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </CalendarYearPicker>
  )
}

export { Calendar, RangeCalendar }
