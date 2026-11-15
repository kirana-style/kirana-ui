import { css, props as styleProps, select } from "@kirana-style/core"

import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { es } from "react-day-picker/locale"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Calendar, CalendarDayButton } from "../ui/calendar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { breakpoint, fontWeight, space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { calendarCtx, cardCtx } from "../../../core/context"

const styles = {
  // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
  booked: css({
    opacity: { '[data-disabled="true"]': 1 },
    [select.child("button")]: { textDecorationLine: "line-through" },
  }),
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
  justifyCenter: css({ justifyContent: "center" }),
}

export default function CalendarExample() {
  return (
    <ExampleWrapper>
      <CalendarSingle />
      <CalendarMultiple />
      <CalendarWeekNumbers />
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
          <Calendar mode="single" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarInPopover() {
  return (
    <Example title="In Popover">
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" sx={styles.px25FontNormal} />}
        >
          <IconPlaceholder
            lucide="CalendarIcon"
            tabler="IconCalendar"
            hugeicons="CalendarIcon"
            phosphor="CalendarBlankIcon"
            remixicon="RiCalendarLine"
            data-icon="inline-start"
          />
          Open Calendar
        </PopoverTrigger>
        <PopoverContent sx={styles.wAutoP0} align="start">
          <Calendar mode="single" />
        </PopoverContent>
      </Popover>
    </Example>
  )
}

function CalendarSingle() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  return (
    <Example title="Single">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
          />
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
          <Calendar mode="multiple" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => ({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    })
  )

  return (
    <Example title="Range" containerSx={styles.fullRow} sx={styles.p12}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRangeMultipleMonths() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 3, 12),
    to: addDays(new Date(new Date().getFullYear(), 3, 12), 60),
  }))

  return (
    <Example
      title="Range Multiple Months"
      containerSx={styles.fullRow}
      sx={styles.p12}
    >
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={3}
            locale={es}
            fixedWeeks
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarBookedDates() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), 1, 3)
  )
  const [bookedDates] = React.useState(() =>
    Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
    )
  )

  return (
    <Example title="Booked Dates">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: styleProps(styles.booked).className ?? "",
            }}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Example title="With Time">
      <Card size="sm" sx={styles.mxAutoWFit}>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            sx={styles.p0}
          />
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
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  }))

  return (
    <Example title="Custom Days">
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.cellSizeSpacing10MdCellS}
            formatters={{
              formatMonthDropdown: (date) => {
                return date.toLocaleString("default", { month: "long" })
              },
            }}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                const isWeekend =
                  day.date.getDay() === 0 || day.date.getDay() === 6

                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {!modifiers.outside && (
                      <span>{isWeekend ? "$120" : "$100"}</span>
                    )}
                  </CalendarDayButton>
                )
              },
            }}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), 1, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  return (
    <Example title="With Presets">
      <Card sx={styles.mxAutoWFitMaxW300Px} size="sm">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
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
              onClick={() => {
                const newDate = addDays(new Date(), preset.value)
                setDate(newDate)
                setCurrentMonth(
                  new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                )
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
  const [date, setDate] = React.useState<Date>()

  return (
    <Example title="Date Picker Simple">
      <Field sx={styles.w72}>
        <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-simple"
                sx={styles.justifyStartPx25FontNorm}
              />
            }
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  }))

  return (
    <Example title="Date Picker Range">
      <Field sx={styles.w72}>
        <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-range"
                sx={styles.justifyStartPx25FontNorm}
              />
            }
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </PopoverTrigger>
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function DataPickerWithDropdowns() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="Date Picker with Dropdowns">
      <Field sx={styles.w72}>
        <Popover open={open} onOpenChange={setOpen}>
          <FieldLabel htmlFor="date-picker-with-dropdowns-desktop">
            Date
          </FieldLabel>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-with-dropdowns-desktop"
                sx={styles.justifyStartPx25FontNorm}
              />
            }
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDownIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              data-icon="inline-start"
              {...styleProps(styles.mlAuto)}
            />
          </PopoverTrigger>
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
            />
            <div sx={styles.flexGap2BorderTP2}>
              <Button
                variant="outline"
                size="sm"
                sx={styles.full}
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), 1, 3)
  )

  return (
    <Example title="Week Numbers" sx={styles.justifyCenter}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showWeekNumber
          />
        </CardContent>
      </Card>
    </Example>
  )
}
