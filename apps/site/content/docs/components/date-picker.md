---
title: Date Picker
description: A date picker component with range and presets.
section: components
variants: [react/base, react/aria]
keywords: [date picker, calendar, popover, range, component, base, aria]
---

# Date Picker

<!-- ::preview item="date-picker-demo" height="640" combinations="react/base,react/aria" -->

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Calendar](/docs/components/calendar#installation) components.

## Usage

<!-- ::start:only react/base -->

```tsx showLineNumbers title="components/date-picker-demo.tsx"
import * as React from "react"
import { css } from "@kirana-style/core"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fontWeight, space } from "@/lib/kirana/scales"
import { theme } from "@/lib/kirana/tokens"

const styles = {
  button: css({
    width: { "*": null, base: "212px" },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: { '[data-empty="true"]': theme.mutedForeground },
  }),
  content: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" data-empty={!date} sx={styles.button} />
        }
      >
        {date ? format(date, "PPP") : <span>Pick a date</span>}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent sx={styles.content} align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/base -->

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="components/date-picker-demo.tsx"
import * as React from "react"
import { getLocalTimeZone } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"
import { css } from "@kirana-style/core"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { fontWeight, space } from "@/lib/kirana/scales"
import { theme } from "@/lib/kirana/tokens"

const styles = {
  button: css({
    width: { "*": null, base: "212px" },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: { '[data-empty="true"]': theme.mutedForeground },
  }),
  popover: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <PopoverTrigger>
      <Button variant="outline" data-empty={!date} sx={styles.button}>
        {date ? (
          date
            .toDate(getLocalTimeZone())
            .toLocaleDateString(undefined, { dateStyle: "long" })
        ) : (
          <span>Pick a date</span>
        )}
        <ChevronDownIcon data-icon="inline-end" />
      </Button>
      <Popover sx={styles.popover} placement="bottom start">
        <Calendar value={date} onChange={setDate} />
      </Popover>
    </PopoverTrigger>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Calendar) documentation for more information.

<!-- ::end:only -->

## Composition

A date picker is built from `Popover` and `Calendar`; there is no `DatePicker` component:

<!-- ::start:only react/base -->

```text
Popover
├── PopoverTrigger
└── PopoverContent
    └── Calendar
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
PopoverTrigger
├── Button
└── Popover
    └── Calendar
```

<!-- ::end:only -->

## Basic

A basic date picker component.

<!-- ::preview item="date-picker-basic" height="668" combinations="react/base,react/aria" -->

## Range Picker

A date picker component for selecting a range of dates.

<!-- ::preview item="date-picker-range" height="760" combinations="react/base,react/aria" -->

## Date of Birth

A date picker component for selecting a date of birth. This component includes a dropdown caption layout for date and month selection.

<!-- ::preview item="date-picker-dob" height="668" combinations="react/base,react/aria" -->

## Input

A date picker component with an input field for selecting a date.

<!-- ::preview item="date-picker-input" height="672" combinations="react/base,react/aria" -->

## Time Picker

A date picker component with a time input field for selecting a time.

<!-- ::preview item="date-picker-time" height="668" combinations="react/base,react/aria" -->

## Natural Language Picker

This one parses natural language dates with [`chrono-node`](https://github.com/wanasit/chrono) (MIT).

<!-- ::preview item="date-picker-natural-language" height="620" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="date-picker-rtl" height="640" combinations="react/base,react/aria" direction="rtl" -->

A date picker takes Kirana's `sx` where upstream's takes `className`, on each of its parts.
