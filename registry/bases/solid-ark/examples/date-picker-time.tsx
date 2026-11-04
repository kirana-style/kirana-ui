import { createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DatePickerTime() {
  const styles = {
    fieldGroup: css({
      marginInline: { "*": null, base: "auto" },
      maxWidth: { "*": null, base: containerSize.xs },
      flexDirection: { "*": null, base: "row" },
    }),
    button: css({
      width: { "*": null, base: space[32] },
      justifyContent: { "*": null, base: "space-between" },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    popoverContent: css({
      width: { "*": null, base: "auto" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: space["0"] },
    }),
    field: css({
      width: { "*": null, base: space[32] },
    }),
    input: css({
      appearance: { "*": null, base: "none" },
      backgroundColor: theme.background,
      "::-webkit-calendar-picker-indicator": {
        display: "none",
        appearance: "none",
      },
    }),
  }

  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | undefined>(undefined)

  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.fieldGroup}>
        <Field>
          <FieldLabel for="date-picker-optional">Date</FieldLabel>
          <Popover
            open={open()}
            onOpenChange={(details: { open: ReturnType<typeof open> }) =>
              setOpen(details.open)
            }
          >
            <PopoverTrigger
              asChild={(props) => (
                <Button
                  {...props()}
                  variant="outline"
                  id="date-picker-optional"
                  sx={styles.button}
                >
                  {date() ? format(date()!, "PPP") : "Select date"}{" "}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    data-icon="inline-end"
                  />
                </Button>
              )}
            />
            <PopoverContent sx={styles.popoverContent} align="start">
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
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field sx={styles.field}>
          <FieldLabel for="time-picker-optional">Time</FieldLabel>
          <Input
            type="time"
            id="time-picker-optional"
            step="1"
            value="10:30:00"
            sx={styles.input}
          />
        </Field>
      </FieldGroup>
    </div>
  )
}
