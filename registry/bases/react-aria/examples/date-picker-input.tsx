import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import {
  fromDate,
  getLocalTimeZone,
  parseDate,
  toCalendarDate,
} from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  field: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[48] },
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
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export default function DatePickerInput() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    parseDate("2025-06-01")
  )
  const [month, setMonth] = React.useState<CalendarDate>(date!)
  const [value, setValue] = React.useState(
    formatDate(date?.toDate(getLocalTimeZone()))
  )

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-required"
            value={value}
            placeholder="June 01, 2025"
            onChange={(e) => {
              const parsed = new Date(e.target.value)
              setValue(e.target.value)
              if (isValidDate(parsed)) {
                setDate(toCalendarDate(fromDate(parsed, getLocalTimeZone())))
                setMonth(toCalendarDate(fromDate(parsed, getLocalTimeZone())))
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
              <Popover
                sx={styles.popover}
                placement="bottom end"
                crossOffset={-8}
                offset={10}
              >
                <Calendar
                  value={date}
                  focusedValue={month}
                  onFocusChange={setMonth}
                  onChange={(selected) => {
                    setDate(selected)
                    setValue(formatDate(selected?.toDate(getLocalTimeZone())))
                    setOpen(false)
                  }}
                />
              </Popover>
            </PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}
