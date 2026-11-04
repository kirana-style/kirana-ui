import { createSignal } from "solid-js"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DatePickerBasic() {
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
      padding: { "*": null, base: space["0"] },
    }),
  }

  const [date, setDate] = createSignal<Date>()

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel for="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                id="date-picker-simple"
                sx={styles.datePickerSimpleButton}
              >
                {date() ? format(date()!, "PPP") : <span>Pick a date()</span>}
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
              onSelectedChange={(details: {
                selected: ReturnType<typeof date>
              }) => setDate(details.selected)}
              defaultMonth={date()}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </div>
  )
}
