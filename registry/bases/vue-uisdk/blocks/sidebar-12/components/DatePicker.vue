<script setup lang="ts">
import { ref } from "vue"
import { Calendar } from "../../../ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { space } from "../../../../../core/scales"

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

const date = ref<Date | undefined>(
  new Date(new Date().getFullYear(), new Date().getMonth(), 12)
)
</script>

<template>
  <SidebarGroup :sx="styles.sidebarGroup">
    <SidebarGroupContent>
      <Calendar
        mode="single"
        v-model:selected="date"
        caption-layout="dropdown"
        :sx="styles.datePickerCalendar"
      />
    </SidebarGroupContent>
  </SidebarGroup>
</template>
