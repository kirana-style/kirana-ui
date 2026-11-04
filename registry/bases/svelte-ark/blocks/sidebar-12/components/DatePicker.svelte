<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { Calendar } from "../../../ui/calendar"
  import { SidebarGroup, SidebarGroupContent } from "../../../ui/sidebar"
  import { css } from "@kirana-style/core"
  import { calendarCtx } from "../../../../../core/context"
  import { space } from "../../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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

  let date = $state<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
</script>

<SidebarGroup sx={[styles.sidebarGroup, className as Sx]} {...rest}>
  <SidebarGroupContent>
    <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} captionLayout="dropdown" sx={styles.datePickerCalendar} />
  </SidebarGroupContent>
</SidebarGroup>
