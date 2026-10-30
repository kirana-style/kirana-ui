import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { getLocalTimeZone } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverTrigger } from "../ui/popover"
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
  popover: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <div sx={page.example}>
      <PopoverTrigger>
        <Button variant={"outline"} data-empty={!date} sx={styles.button}>
          {date ? (
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString(undefined, { dateStyle: "long" })
          ) : (
            <span>Pick a date</span>
          )}
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            data-icon="inline-end"
          />
        </Button>
        <Popover sx={styles.popover} placement="bottom start">
          <Calendar value={date} onChange={setDate} />
        </Popover>
      </PopoverTrigger>
    </div>
  )
}
