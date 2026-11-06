import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { breakpoint, space } from "../../../../core/scales"
import { SidebarInset, SidebarProvider } from "../../ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { SiteHeader } from "./components/site-header"

const styles = {
  pageSidebarProvider: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
  }),
  pageDiv2: css({
    display: "flex",
    flex: "1 1 0%",
  }),
  pageDiv3: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
  }),
  pageDiv4: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  pageDiv5: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  pageDiv6: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  pageDiv7: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  pageDiv8: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: "1 1 0%",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-16",
  imports: [AppSidebar, SidebarInset, SidebarProvider, SiteHeader, SxDirective],
  template: `
    <div>
      <div kuiSidebarProvider [sx]="styles.pageSidebarProvider">
        <kui-site-header />
        <div [sx]="styles.pageDiv2">
          <kui-app-sidebar />
          <main kuiSidebarInset>
            <div [sx]="styles.pageDiv3">
              <div [sx]="styles.pageDiv4">
                <div [sx]="styles.pageDiv5"></div>
                <div [sx]="styles.pageDiv6"></div>
                <div [sx]="styles.pageDiv7"></div>
              </div>
              <div [sx]="styles.pageDiv8"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
})
export default class Sidebar16 {
  protected readonly styles = styles
}
