import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { parseDate } from "chrono-node"

import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
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
  popoverContent: css({
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

export default function DatePickerNaturalLanguage() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <InputGroupButton
                    id="date-picker"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Select date"
                  />
                }
              >
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
                <span sx={styles.span}>Select date</span>
              </PopoverTrigger>
              <PopoverContent
                sx={styles.popoverContent}
                align="end"
                sideOffset={8}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  defaultMonth={date}
                  onSelect={(selected) => {
                    setDate(selected)
                    setValue(formatDate(selected))
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
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
