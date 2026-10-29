---
title: Calendar
description: A calendar component that allows users to select a date or a range of dates.
section: components
variants: [react/base, react/aria]
keywords: [calendar, date, range, day picker, component, base, aria]
---

# Calendar

<!-- ::preview item="calendar-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="calendar" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import { Calendar } from "@/components/ui/calendar"
```

```tsx
const [date, setDate] = React.useState<Date | undefined>(() => new Date())

return <Calendar mode="single" selected={date} onSelect={setDate} />
```

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information.

## About

The `Calendar` component is built on top of [React DayPicker](https://react-day-picker.js.org).

## Selected Date (With TimeZone)

The Calendar component accepts a `timeZone` prop to ensure dates are displayed and selected in the user's local timezone.

```tsx
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  )
}
```

**Note:** If you notice a selected date offset (for example, selecting the 20th highlights the 19th), make sure the `timeZone` prop is set to the user's local timezone.

**Why client-side?** The timezone is detected using `Intl.DateTimeFormat().resolvedOptions().timeZone` inside a `useEffect` to ensure compatibility with server-side rendering. Detecting the timezone during render would cause hydration mismatches, as the server and client may be in different timezones.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { getLocalTimeZone, today } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

import { Calendar } from "@/components/ui/calendar"
```

```tsx
const [date, setDate] = React.useState<CalendarDate | null>(() =>
  today(getLocalTimeZone())
)

return <Calendar value={date} onChange={setDate} />
```

See the [React Aria](https://react-aria.adobe.com/Calendar) documentation for more information.

<!-- ::end:only -->

## Basic

<!-- ::preview item="calendar-basic" height="360" combinations="react/base,react/aria" -->

## Range Calendar

<!-- ::preview item="calendar-range" height="380" combinations="react/base,react/aria" -->

## Month and Year Selector

<!-- ::preview item="calendar-caption" height="380" combinations="react/base,react/aria" -->

## Presets

<!-- ::preview item="calendar-presets" height="480" combinations="react/base,react/aria" -->

## Date and Time Picker

<!-- ::preview item="calendar-time" height="480" combinations="react/base,react/aria" -->

## Booked dates

<!-- ::preview item="calendar-booked-dates" height="384" combinations="react/base,react/aria" -->

## Custom Cell Size

<!-- ::preview item="calendar-custom-days" height="560" combinations="react/base,react/aria" -->

The calendar's cells are `calendarCtx.cellSize` (`--cell-size` upstream). Set it through `sx`, and
make it responsive with breakpoint-specific values:

```tsx
const cells = css({
  [calendarCtx.cellSize]: { base: spacing(11), [breakpoint.md]: spacing(12) },
})

<Calendar mode="single" selected={date} onSelect={setDate} sx={cells} />
```

Or use fixed values:

```tsx
const cells = css({
  [calendarCtx.cellSize]: { base: "2.75rem", [breakpoint.md]: "3rem" },
})
```

<!-- ::start:only react/base -->

## Week Numbers

Use `showWeekNumber` to show week numbers.

<!-- ::preview item="calendar-week-numbers" height="384" combinations="react/base" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information on the `Calendar` component.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Calendar) documentation for more information on the `Calendar` component.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
