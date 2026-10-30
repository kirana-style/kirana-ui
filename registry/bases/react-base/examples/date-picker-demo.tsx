import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { format } from "date-fns"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <div sx={page.example}>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant={"outline"} data-empty={!date} sx={styles.button} />
          }
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            data-icon="inline-end"
          />
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
