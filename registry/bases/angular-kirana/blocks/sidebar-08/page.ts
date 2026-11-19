import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { breakpoint, space } from "../../../../core/scales"
import { orientation, when } from "../../../../core/states"
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
  pageHeader: css({
    display: "flex",
    height: space[16],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
  }),
  pageDiv: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  pageSidebarTrigger: css({
    marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
  }),
  pageSeparator: css({
    marginRight: { "*": null, base: space[2] },
    height: { ...when(orientation.vertical, space[4]) },
    alignSelf: { ...when(orientation.vertical, "auto") },
  }),
  pageBreadcrumbItem: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  pageBreadcrumbSeparator: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  pageDiv2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
    paddingTop: space["0"],
  }),
  pageDiv3: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  pageDiv4: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
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
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: "1 1 0%",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-08",
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
        <header [sx]="styles.pageHeader">
          <div [sx]="styles.pageDiv">
            <button kuiSidebarTrigger [sx]="styles.pageSidebarTrigger"></button>
            <div
              kuiSeparator
              orientation="vertical"
              [sx]="styles.pageSeparator"
            ></div>
            <nav kuiBreadcrumb>
              <ol kuiBreadcrumbList>
                <li kuiBreadcrumbItem [sx]="styles.pageBreadcrumbItem">
                  <a kuiBreadcrumbLink href="#">Build Your Application</a>
                </li>
                <li
                  kuiBreadcrumbSeparator
                  [sx]="styles.pageBreadcrumbSeparator"
                ></li>
                <li kuiBreadcrumbItem>
                  <span kuiBreadcrumbPage>Data Fetching</span>
                </li>
              </ol>
            </nav>
          </div>
        </header>
        <div [sx]="styles.pageDiv2">
          <div [sx]="styles.pageDiv3">
            <div [sx]="styles.pageDiv4"></div>
            <div [sx]="styles.pageDiv5"></div>
            <div [sx]="styles.pageDiv6"></div>
          </div>
          <div [sx]="styles.pageDiv7"></div>
        </div>
      </main>
    </div>
  `,
})
export default class Sidebar08 {
  protected readonly styles = styles
  protected readonly orientation = orientation
}
