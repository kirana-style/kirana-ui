import { createSignal, splitProps } from "solid-js"
import { Calendar } from "../../../ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function DatePicker(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    sidebarGroup: css({
      paddingInline: { "*": null, base: space["0"] },
    }),
    datePickerCalendar: css({
      backgroundColor: { "*": null, base: "transparent" },
      // Upstream's `[--cell-size:2.1rem]`, the calendar's own variable.
      [calendarCtx.cellSize]: { "*": null, base: "2.1rem" },
    }),
  }

  const [date, setDate] = createSignal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <SidebarGroup
      class={local.class}
      sx={[styles.sidebarGroup, local.sx]}
      {...rest}
    >
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={date()}
          onSelectedChange={(details: { selected: ReturnType<typeof date> }) =>
            setDate(details.selected)
          }
          captionLayout="dropdown"
          sx={styles.datePickerCalendar}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
