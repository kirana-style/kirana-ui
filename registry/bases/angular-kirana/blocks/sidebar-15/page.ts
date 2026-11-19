import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { orientation, when } from "../../../../core/states"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { containerSize, space } from "../../../../core/scales"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb"
import { Separator } from "../../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { SidebarLeft } from "./components/sidebar-left"
import { SidebarRight } from "./components/sidebar-right"

const styles = {
  pageHeader: css({
    position: "sticky",
    top: space["0"],
    display: "flex",
    height: space[14],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    backgroundColor: theme.background,
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
  }),
  pageBreadcrumbPage: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  pageDiv2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
  }),
  pageDiv3: css({
    marginInline: "auto",
    height: space[24],
    width: "100%",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  pageDiv4: css({
    marginInline: "auto",
    height: "100vh",
    width: "100%",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-15",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    Separator,
    SidebarInset,
    SidebarLeft,
    SidebarProvider,
    SidebarRight,
    SidebarTrigger,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider>
      <kui-sidebar-left />
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
        </header>
        <div [sx]="styles.pageDiv2">
          <div [sx]="styles.pageDiv3"></div>
          <div [sx]="styles.pageDiv4"></div>
        </div>
      </main>
      <kui-sidebar-right />
    </div>
  `,
})
export default class Sidebar15 {
  protected readonly styles = styles
  protected readonly orientation = orientation
}
