import { createSignal } from "solid-js"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DatePickerDob() {
  const styles = {
    datePickerSimpleField: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: space[44] },
    }),
    datePickerSimpleButton: css({
      justifyContent: { "*": null, base: "flex-start" },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    datePickerSimplePopoverContent: css({
      width: { "*": null, base: "auto" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | undefined>(undefined)

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel for="date">Date of birth</FieldLabel>
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
                id="date"
                sx={styles.datePickerSimpleButton}
              >
                {date() ? date()!.toLocaleDateString() : "Select date"}
              </Button>
            )}
          />
          <PopoverContent
            sx={styles.datePickerSimplePopoverContent}
            align="start"
          >
            <Calendar
              mode="single"
              selected={date()}
              defaultMonth={date()}
              captionLayout="dropdown"
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
    </div>
  )
}
