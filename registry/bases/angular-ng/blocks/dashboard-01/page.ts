import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import data from "./data.json"
import { css } from "@kirana-style/core"
import { sidebarCtx } from "../../../../core/context"
import { breakpoint, space, spacing } from "../../../../core/scales"
import { SidebarInset, SidebarProvider } from "../../ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"
import { SectionCards } from "./components/section-cards"
import { SiteHeader } from "./components/site-header"

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

@Component({
  selector: "dashboard-01",
  imports: [
    AppSidebar,
    ChartAreaInteractive,
    DataTable,
    SectionCards,
    SidebarInset,
    SidebarProvider,
    SiteHeader,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider [sx]="styles.provider">
      <kui-app-sidebar variant="inset" />
      <main kuiSidebarInset>
        <kui-site-header />
        <div [sx]="styles.pageDiv">
          <div [sx]="styles.pageDiv2">
            <div [sx]="styles.pageDiv3">
              <kui-section-cards />
              <div [sx]="styles.pageDiv4">
                <kui-chart-area-interactive />
              </div>
              <kui-data-table [data]="data" />
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export default class Dashboard01 {
  protected readonly data = data
  protected readonly styles = styles
}
