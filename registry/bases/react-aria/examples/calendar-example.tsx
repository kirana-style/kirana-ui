import { css, props as styleProps } from "@kirana-style/core"

import * as React from "react"
import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  isWeekend,
  today,
} from "@internationalized/date"
import { I18nProvider, useLocale } from "react-aria-components"
import type { DateRange } from "react-aria-components"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Calendar, RangeCalendar } from "../ui/calendar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Popover, PopoverTrigger } from "../ui/popover"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { breakpoint, fontWeight, space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { calendarCtx, cardCtx } from "../../../core/context"

const styles = {
  // `lg:col-span-full 2xl:col-span-full`, on an example's container.
  fullRow: css({
    gridColumn: {
      [breakpoint.lg]: "1 / -1",
      [breakpoint["2xl"]]: "1 / -1",
    },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  px25FontNormal: css({
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
  p12: css({ padding: space[12] }),
  mxAutoWFit: css({ marginInline: "auto", width: "fit-content" }),
  borderTBgCard: css({
    borderTopWidth: { "*": null, base: "1px" },
    borderTopColor: theme.border,
    backgroundColor: { "*": null, base: theme.card },
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  appearanceNoneWebkitCale: css({
    appearance: "none",
    "::-webkit-calendar-picker-indicator": {
      display: "none",
      appearance: "none",
    },
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  cellSizeSpacing10MdCellS: css({
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(10),
      [breakpoint.md]: spacing(12),
    },
  }),
  mxAutoWFitMaxW300Px: css({
    marginInline: "auto",
    width: "fit-content",
    maxWidth: { "*": null, base: "300px" },
  }),
  p0CellSizeSpacing95: css({
    padding: { "*": null, base: "0" },
    [calendarCtx.cellSize]: { "*": null, base: spacing(9.5) },
  }),
  flexFlexWrapGap2BorderT: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  flex1: css({ flex: 1 }),
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
  justifyStartPx25FontNorm: css({
    justifyContent: "flex-start",
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  mlAuto: css({ marginLeft: "auto" }),
  flexGap2BorderTP2: css({
    display: "flex",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    padding: space[2],
  }),
  full: css({ width: "100%" }),
}

export default function CalendarExample() {
  return (
    <ExampleWrapper>
      <CalendarSingle />
      <CalendarMultiple />
      <CalendarBookedDates />
      <CalendarRange />
      <CalendarRangeMultipleMonths />
      <CalendarWithTime />
      <CalendarWithPresets />
      <CalendarCustomDays />
      <DatePickerSimple />
      <DataPickerWithDropdowns />
      <DatePickerWithRange />
      <CalendarInCard />
      <CalendarInPopover />
    </ExampleWrapper>
  )
}

function CalendarInCard() {
  return (
    <Example title="In Card">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarInPopover() {
  return (
    <Example title="In Popover">
      <PopoverTrigger>
        <Button variant="outline" sx={styles.px25FontNormal}>
          <IconPlaceholder
            lucide="CalendarIcon"
            tabler="IconCalendar"
            hugeicons="CalendarIcon"
            phosphor="CalendarBlankIcon"
            remixicon="RiCalendarLine"
            data-icon="inline-start"
          />
          Open Calendar
        </Button>
        <Popover sx={styles.wAutoP0} placement="bottom start">
          <Calendar />
        </Popover>
      </PopoverTrigger>
    </Example>
  )
}

function CalendarSingle() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () =>
      new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 12)
  )
  return (
    <Example title="Single">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar value={date} onChange={setDate} captionLayout="dropdown" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarMultiple() {
  return (
    <Example title="Multiple">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar selectionMode="multiple" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => ({
      start: new CalendarDate(new Date().getFullYear(), 1, 12),
      end: new CalendarDate(new Date().getFullYear(), 1, 12).add({ days: 30 }),
    })
  )

  return (
    <Example title="Range" containerSx={styles.fullRow} sx={styles.p12}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <RangeCalendar
            value={dateRange}
            onChange={setDateRange}
            numberOfMonths={2}
            maxValue={today(getLocalTimeZone())}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRangeMultipleMonths() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    start: new CalendarDate(new Date().getFullYear(), 4, 12),
    end: new CalendarDate(new Date().getFullYear(), 4, 12).add({ days: 60 }),
  }))

  return (
    <Example
      title="Range Multiple Months"
      containerSx={styles.fullRow}
      sx={styles.p12}
    >
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <I18nProvider locale="es">
            <RangeCalendar
              value={range}
              onChange={setRange}
              numberOfMonths={3}
              weeksInMonth={6}
            />
          </I18nProvider>
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarBookedDates() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () => new CalendarDate(new Date().getFullYear(), 2, 3)
  )
  const [bookedDates] = React.useState(() =>
    Array.from(
      { length: 15 },
      (_, i) => new CalendarDate(new Date().getFullYear(), 2, 12 + i)
    )
  )

  return (
    <Example title="Booked Dates">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            value={date}
            onChange={setDate}
            isDateUnavailable={(day) =>
              bookedDates.some((d) => isSameDay(day, d))
            }
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithTime() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () =>
      new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 12)
  )

  return (
    <Example title="With Time">
      <Card size="sm" sx={styles.mxAutoWFit}>
        <CardContent>
          <Calendar value={date} onChange={setDate} sx={styles.p0} />
        </CardContent>
        <CardFooter sx={styles.borderTBgCard}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-from"
                  type="time"
                  step="1"
                  defaultValue="10:30:00"
                  sx={styles.appearanceNoneWebkitCale}
                />
                <InputGroupAddon>
                  <IconPlaceholder
                    lucide="Clock2Icon"
                    tabler="IconClockHour2"
                    hugeicons="Clock03Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                    {...styleProps(styles.textMutedForeground)}
                  />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="time-to">End Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-to"
                  type="time"
                  step="1"
                  defaultValue="12:30:00"
                  sx={styles.appearanceNoneWebkitCale}
                />
                <InputGroupAddon>
                  <IconPlaceholder
                    lucide="Clock2Icon"
                    tabler="IconClockHour2"
                    hugeicons="Clock03Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                    {...styleProps(styles.textMutedForeground)}
                  />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CalendarCustomDays() {
  const { locale } = useLocale()
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    start: new CalendarDate(new Date().getFullYear(), 12, 8),
    end: new CalendarDate(new Date().getFullYear(), 12, 8).add({ days: 10 }),
  }))

  return (
    <Example title="Custom Days">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <RangeCalendar
            value={range}
            onChange={setRange}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.cellSizeSpacing10MdCellS}
            headerFormat={{ month: "long" }}
            renderCell={({ isOutsideMonth, date, defaultChildren }) => (
              <>
                {defaultChildren}
                {!isOutsideMonth && (
                  <span>{isWeekend(date, locale) ? "$120" : "$100"}</span>
                )}
              </>
            )}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithPresets() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () => new CalendarDate(new Date().getFullYear(), 2, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<CalendarDate>(
    () =>
      new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1)
  )

  return (
    <Example title="With Presets">
      <Card sx={styles.mxAutoWFitMaxW300Px} size="sm">
        <CardContent>
          <Calendar
            value={date}
            onChange={setDate}
            focusedValue={currentMonth}
            onFocusChange={setCurrentMonth}
            weeksInMonth={6}
            sx={styles.p0CellSizeSpacing95}
          />
        </CardContent>
        <CardFooter sx={styles.flexFlexWrapGap2BorderT}>
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              sx={styles.flex1}
              onPress={() => {
                const newDate = today(getLocalTimeZone()).add({
                  days: preset.value,
                })
                setDate(newDate)
                setCurrentMonth(newDate)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </Example>
  )
}

function DatePickerSimple() {
  const [date, setDate] = React.useState<CalendarDate>()

  return (
    <Example title="Date Picker Simple">
      <Field sx={styles.w72}>
        <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
        <PopoverTrigger>
          <Button
            variant="outline"
            id="date-picker-simple"
            sx={styles.justifyStartPx25FontNorm}
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            />
            {date ? (
              date
                .toDate(getLocalTimeZone())
                .toLocaleDateString(undefined, { dateStyle: "long" })
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <Popover sx={styles.wAutoP0} placement="bottom start">
            <Calendar value={date} onChange={setDate} />
          </Popover>
        </PopoverTrigger>
      </Field>
    </Example>
  )
}

function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>(() => ({
    start: new CalendarDate(new Date().getFullYear(), 1, 20),
    end: new CalendarDate(new Date().getFullYear(), 1, 20).add({ days: 20 }),
  }))

  return (
    <Example title="Date Picker Range">
      <Field sx={styles.w72}>
        <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
        <PopoverTrigger>
          <Button
            variant="outline"
            id="date-picker-range"
            sx={styles.justifyStartPx25FontNorm}
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            />
            {date?.start && date.end ? (
              // The prerender's ICU spaces a range unlike the browser's: the prerendered label stays.
              <span suppressHydrationWarning>
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "long",
                }).formatRange(
                  date.start.toDate(getLocalTimeZone()),
                  date.end.toDate(getLocalTimeZone())
                )}
              </span>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <Popover sx={styles.wAutoP0} placement="bottom start">
            <RangeCalendar value={date} onChange={setDate} numberOfMonths={2} />
          </Popover>
        </PopoverTrigger>
      </Field>
    </Example>
  )
}

function DataPickerWithDropdowns() {
  const [date, setDate] = React.useState<CalendarDate>()
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="Date Picker with Dropdowns">
      <Field sx={styles.w72}>
        <FieldLabel htmlFor="date-picker-with-dropdowns-desktop">
          Date
        </FieldLabel>
        <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            id="date-picker-with-dropdowns-desktop"
            sx={styles.justifyStartPx25FontNorm}
          >
            {date ? (
              date
                .toDate(getLocalTimeZone())
                .toLocaleDateString(undefined, { dateStyle: "long" })
            ) : (
              <span>Pick a date</span>
            )}
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDownIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              data-icon="inline-start"
              {...styleProps(styles.mlAuto)}
            />
          </Button>
          <Popover sx={styles.wAutoP0} placement="bottom start">
            <Calendar
              value={date}
              onChange={setDate}
              captionLayout="dropdown"
            />
            <div sx={styles.flexGap2BorderTP2}>
              <Button
                variant="outline"
                size="sm"
                sx={styles.full}
                onPress={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </Popover>
        </PopoverTrigger>
      </Field>
    </Example>
  )
}
