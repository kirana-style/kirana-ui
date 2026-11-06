import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { containerSize, space } from "../../../../core/scales"
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
import { NavActions } from "./components/nav-actions"

const styles = {
  pageHeader: css({
    display: "flex",
    height: space[14],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
  }),
  pageDiv: css({
    display: "flex",
    flex: "1 1 0%",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[3],
  }),
  pageSeparator: css({
    marginRight: { "*": null, base: space[2] },
    height: { ...when(orientation.vertical, space[4]) },
    alignSelf: { ...when(orientation.vertical, "auto") },
  }),
  pageBreadcrumbPage: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  pageDiv2: css({
    marginLeft: "auto",
    paddingInline: space[3],
  }),
  pageDiv3: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    paddingInline: space[4],
    paddingBlock: space[10],
  }),
  pageDiv4: css({
    marginInline: "auto",
    height: space[24],
    width: "100%",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  pageDiv5: css({
    marginInline: "auto",
    height: "100%",
    width: "100%",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-10",
  imports: [
    AppSidebar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    NavActions,
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
            <button kuiSidebarTrigger></button>
            <div
              kuiSeparator
              orientation="vertical"
              [sx]="styles.pageSeparator"
            ></div>
            <nav kuiBreadcrumb>
              <ol kuiBreadcrumbList>
                <li kuiBreadcrumbItem>
                  <span kuiBreadcrumbPage [sx]="styles.pageBreadcrumbPage"
                    >Project Management & Task Tracking</span
                  >
                </li>
              </ol>
            </nav>
          </div>
          <div [sx]="styles.pageDiv2">
            <kui-nav-actions />
          </div>
        </header>
        <div [sx]="styles.pageDiv3">
          <div [sx]="styles.pageDiv4"></div>
          <div [sx]="styles.pageDiv5"></div>
        </div>
      </main>
    </div>
  `,
})
export default class Sidebar10 {
  protected readonly styles = styles
  protected readonly orientation = orientation
}
