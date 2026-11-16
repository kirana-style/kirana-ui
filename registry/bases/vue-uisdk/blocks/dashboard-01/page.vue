<script setup lang="ts">
import AppSidebar from "./components/AppSidebar.vue"
import ChartAreaInteractive from "./components/ChartAreaInteractive.vue"
import DataTable from "./components/DataTable.vue"
import SectionCards from "./components/SectionCards.vue"
import SiteHeader from "./components/SiteHeader.vue"
import { SidebarInset, SidebarProvider } from "../../ui/sidebar"
import data from "./data.json"
import { css } from "@kirana-style/core"
import { sidebarCtx } from "../../../../core/context"
import { breakpoint, space, spacing } from "../../../../core/scales"

const styles = {
  // Upstream's `--sidebar-width: calc(var(--spacing) * 72)`; its `--header-height` is the header's
  // own (`site-header.tsx`).
  provider: css({ [sidebarCtx.width]: spacing(72) }),
  pageDiv: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
  }),
  pageDiv2: css({
    containerType: "inline-size",
    containerName: "main",
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[2],
  }),
  pageDiv3: css({
    display: "flex",
    flexDirection: "column",
    gap: { base: space[4], [breakpoint.md]: space[6] },
    paddingBlock: { base: space[4], [breakpoint.md]: space[6] },
  }),
  pageDiv4: css({
    paddingInline: { base: space[4], [breakpoint.lg]: space[6] },
  }),
}
</script>

<template>
  <SidebarProvider :sx="styles.provider">
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div :sx="styles.pageDiv">
        <div :sx="styles.pageDiv2">
          <div :sx="styles.pageDiv3">
            <SectionCards />
            <div :sx="styles.pageDiv4">
              <ChartAreaInteractive />
            </div>
            <DataTable :data="data" />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
