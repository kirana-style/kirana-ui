import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { breakpoint, space } from "../../../../core/scales"
import { orientation, when } from "../../../../core/states"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb"
import { Separator } from "../../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

const styles = {
  pageHeader: css({
    position: "sticky",
    top: space["0"],
    display: "flex",
    height: space[16],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
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
  pageDiv: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
  }),
  pageDiv2: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(5, minmax(0, 1fr))" },
  }),
  pageDiv3: css({
    aspectRatio: "1 / 1",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-12",
  imports: [
    AppSidebar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
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
          <button kuiSidebarTrigger [sx]="styles.pageSidebarTrigger"></button>
          <div
            kuiSeparator
            orientation="vertical"
            [sx]="styles.pageSeparator"
          ></div>
          <nav kuiBreadcrumb>
            <ol kuiBreadcrumbList>
              <li kuiBreadcrumbItem>
                <span kuiBreadcrumbPage>October 2024</span>
              </li>
            </ol>
          </nav>
        </header>
        <div [sx]="styles.pageDiv">
          <div [sx]="styles.pageDiv2">
            @for (_ of Array.from({ length: 20 }); track i; let i = $index) {
              <div [sx]="styles.pageDiv3"></div>
            }
          </div>
        </div>
      </main>
    </div>
  `,
})
export default class Sidebar12 {
  protected readonly styles = styles
  protected readonly orientation = orientation
  protected readonly Array = Array
}
