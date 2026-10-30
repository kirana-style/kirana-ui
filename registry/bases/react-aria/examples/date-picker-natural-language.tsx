import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import {
  fromDate,
  getLocalTimeZone,
  toCalendarDate,
} from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"
import { parseDate as parseNaturalLanguage } from "chrono-node"

import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  field: css({
    marginInline: { "*": null, base: "auto" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  popover: css({
    width: { "*": null, base: "auto" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  div: css({
    paddingInline: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span2: css({
    fontWeight: fontWeight.medium,
  }),
}

function parseDate(value: string) {
  const date = parseNaturalLanguage(value)
  return date ? toCalendarDate(fromDate(date, getLocalTimeZone())) : undefined
}

function formatDate(calendarDate: CalendarDate | undefined) {
  if (!calendarDate) {
    return ""
  }

  const date = calendarDate?.toDate(getLocalTimeZone())
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export default function DatePickerNaturalLanguage() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")
  const [date, setDate] = React.useState<CalendarDate | undefined>(() =>
    parseDate(value)
  )

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel htmlFor="date-optional">Schedule Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-optional"
            value={value}
            placeholder="Tomorrow or next week"
            onChange={(e) => {
              setValue(e.target.value)
              const parsed = parseDate(e.target.value)
              if (parsed) {
                setDate(parsed)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
                <span sx={styles.span}>Select date</span>
              </InputGroupButton>
              <Popover sx={styles.popover} placement="bottom end" offset={8}>
                <Calendar
                  value={date}
                  captionLayout="dropdown"
                  onChange={(selected) => {
                    setDate(selected)
                    setValue(formatDate(selected))
                    setOpen(false)
                  }}
                />
              </Popover>
            </PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>
        <div sx={styles.div}>
          Your post will be published on{" "}
          <span sx={styles.span2}>{formatDate(date)}</span>.
        </div>
      </Field>
    </div>
  )
}
