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

## Date Picker

You can use the `<Calendar>` component to build a date picker. See the
[Date Picker](/docs/components/date-picker) page for more information.

## Persian / Hijri / Jalali Calendar

To use the Persian calendar, install React DayPicker's Persian add-on, `@daypicker/persian`, then edit `components/ui/calendar.tsx` and import `DayPicker` from it. (React DayPicker 9, which shadcn/ui uses, has it at `react-day-picker/persian`.)

```diff
- import { DayPicker } from "react-day-picker"
+ import { DayPicker } from "@daypicker/persian"
```

<!-- ::preview item="calendar-hijri" height="400" combinations="react/base" -->

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

## Date Picker

You can use the `<Calendar>` component to build a date picker. See the
[Date Picker](/docs/components/date-picker) page for more information.

## International Calendars

To use international calendar systems such as Persian, Islamic, or Buddhist, use React Aria's `I18nProvider` to set the locale.

<!-- ::preview item="calendar-hijri" height="400" combinations="react/aria" -->

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

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::start:only react/base -->

See also the [Hijri Guide](#persian--hijri--jalali-calendar) for enabling the Persian / Hijri / Jalali calendar.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See also the [International Calendars Guide](#international-calendars) for enabling the international calendars such as Persian / Hijri / Jalali.

<!-- ::end:only -->

<!-- ::preview item="calendar-rtl" height="384" combinations="react/base,react/aria" direction="rtl" -->

<!-- ::start:only react/base -->

When using RTL, import the locale from `react-day-picker/locale` and pass both the `locale` and `dir` props to the Calendar component:

```tsx showLineNumbers
import { arSA } from "react-day-picker/locale"

;<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>
```

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information on the `Calendar` component.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Calendar) documentation for more information on the `Calendar` component.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
