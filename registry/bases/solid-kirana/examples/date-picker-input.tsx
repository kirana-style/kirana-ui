import { createSignal, untrack } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DatePickerInput() {
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
    popoverContent: css({
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

  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | undefined>(new Date("2025-06-01"))
  const [month, setMonth] = createSignal<Date | undefined>(
    untrack(() => date())
  )
  const [value, setValue] = createSignal(untrack(() => formatDate(date())))

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel for="date-required">Subscription Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-required"
            value={value()}
            placeholder="June 01, 2025"
            onInput={(e: Event) => {
              const parsed = new Date((e.target as HTMLInputElement).value)
              setValue((e.target as HTMLInputElement).value)
              if (isValidDate(parsed)) {
                setDate(parsed)
                setMonth(parsed)
              }
            }}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <Popover
              open={open()}
              onOpenChange={(details: { open: ReturnType<typeof open> }) =>
                setOpen(details.open)
              }
            >
              <PopoverTrigger
                asChild={(props) => (
                  <InputGroupButton
                    {...props()}
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
                    <span sx={styles.span}>Select date()</span>
                  </InputGroupButton>
                )}
              />
              <PopoverContent
                sx={styles.popoverContent}
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={date()}
                  month={month()}
                  onMonthChange={(details: {
                    month: ReturnType<typeof month>
                  }) => setMonth(details.month)}
                  onSelectedChange={({
                    selected,
                  }: {
                    selected: Date | undefined
                  }) => {
                    setDate(selected)
                    setValue(formatDate(selected))
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}
