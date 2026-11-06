import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, duration, space } from "../../../../core/scales"
import { orientation, when } from "../../../../core/states"
import { alpha, radius } from "../../../../core/tokens"
import { WRAPPER_COLLAPSED } from "../../../../styles/sidebar.styles"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb"
import { Separator } from "../../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

const styles = {
  // Shorter while the sidebar is collapsed to its icons.
  header: css({
    display: "flex",
    height: { base: space[16], [WRAPPER_COLLAPSED]: space[12] },
    flexShrink: 0,
    alignItems: "center",
    gap: space[2],
    transitionProperty: "width, height",
    transitionDuration: duration[150],
    transitionTimingFunction: "linear",
  }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  trigger: css({ marginInlineStart: `calc(${space[1]} * -1)` }),
  separator: css({
    marginInlineEnd: space[2],
    height: { ...when(orientation.vertical, space[4]) },
    alignSelf: { ...when(orientation.vertical, "auto") },
  }),
  wide: css({ display: { base: "none", [breakpoint.md]: "block" } }),
  body: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
    paddingTop: 0,
  }),
  grid: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  tile: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
  panel: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
}

@Component({
  selector: "sidebar-07",
  imports: [
    AppSidebar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Separator,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider>
      <kui-app-sidebar />
      <main kuiSidebarInset>
        <header [sx]="styles.header">
          <div [sx]="styles.bar">
            <button kuiSidebarTrigger [sx]="styles.trigger"></button>
            <div
              kuiSeparator
              orientation="vertical"
              [sx]="styles.separator"
            ></div>
            <nav kuiBreadcrumb>
              <ol kuiBreadcrumbList>
                <li kuiBreadcrumbItem [sx]="styles.wide">
                  <a kuiBreadcrumbLink href="#">Build Your Application</a>
                </li>
                <li kuiBreadcrumbSeparator [sx]="styles.wide"></li>
                <li kuiBreadcrumbItem>
                  <span kuiBreadcrumbPage>Data Fetching</span>
                </li>
              </ol>
            </nav>
          </div>
        </header>
        <div [sx]="styles.body">
          <div [sx]="styles.grid">
            <div [sx]="styles.tile"></div>
            <div [sx]="styles.tile"></div>
            <div [sx]="styles.tile"></div>
          </div>
          <div [sx]="styles.panel"></div>
        </div>
      </main>
    </div>
  `,
})
export default class Sidebar07 {
  protected readonly styles = styles
  protected readonly orientation = orientation
}
