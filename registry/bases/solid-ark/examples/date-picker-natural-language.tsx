import { createSignal, untrack } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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

export default function DatePickerNaturalLanguage() {
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

  const [open, setOpen] = createSignal(false)
  const [value, setValue] = createSignal("In 2 days")
  const [date, setDate] = createSignal<Date | undefined>(
    untrack(() => parseDate(value()) || undefined)
  )

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel for="date-optional">Schedule Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-optional"
            value={value()}
            placeholder="Tomorrow or next week"
            onInput={(e: Event) => {
              setValue((e.target as HTMLInputElement).value)
              const parsed = parseDate((e.target as HTMLInputElement).value)
              if (parsed) {
                setDate(parsed)
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
                sideOffset={8}
              >
                <Calendar
                  mode="single"
                  selected={date()}
                  captionLayout="dropdown"
                  defaultMonth={date()}
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
        <div sx={styles.div}>
          Your post will be published on{" "}
          <span sx={styles.span2}>{formatDate(date())}</span> .
        </div>
      </Field>
    </div>
  )
}
