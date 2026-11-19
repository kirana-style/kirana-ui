import { createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DatePickerDemo() {
  const styles = {
    button: css({
      width: { "*": null, base: "212px" },
      justifyContent: { "*": null, base: "space-between" },
      textAlign: { "*": null, base: "left" },
      fontWeight: { "*": null, base: fontWeight.normal },
      color: { '[data-empty="true"]': theme.mutedForeground },
    }),
    popoverContent: css({
      width: { "*": null, base: "auto" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  const [date, setDate] = createSignal<Date>()

  return (
    <div sx={page.example}>
      <Popover>
        <PopoverTrigger
          asChild={(props) => (
            <Button
              {...props()}
              variant="outline"
              data-empty={!date()}
              sx={styles.button}
            >
              {date() ? format(date()!, "PPP") : <span>Pick a date()</span>}
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
            onSelectedChange={(details: {
              selected: ReturnType<typeof date>
            }) => setDate(details.selected)}
            defaultMonth={date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
