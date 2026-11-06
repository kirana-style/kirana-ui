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
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
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
  pageBreadcrumbItem2: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  pageBreadcrumbSeparator2: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
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
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  pageDiv3: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
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
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: "1 1 0%",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

@Component({
  selector: "sidebar-11",
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
          <button kuiSidebarTrigger [sx]="styles.pageSidebarTrigger"></button>
          <div
            kuiSeparator
            orientation="vertical"
            [sx]="styles.pageSeparator"
          ></div>
          <nav kuiBreadcrumb>
            <ol kuiBreadcrumbList>
              <li kuiBreadcrumbItem [sx]="styles.pageBreadcrumbItem">
                <a kuiBreadcrumbLink href="#">components</a>
              </li>
              <li
                kuiBreadcrumbSeparator
                [sx]="styles.pageBreadcrumbSeparator"
              ></li>
              <li kuiBreadcrumbItem [sx]="styles.pageBreadcrumbItem2">
                <a kuiBreadcrumbLink href="#">ui</a>
              </li>
              <li
                kuiBreadcrumbSeparator
                [sx]="styles.pageBreadcrumbSeparator2"
              ></li>
              <li kuiBreadcrumbItem>
                <span kuiBreadcrumbPage>button.tsx</span>
              </li>
            </ol>
          </nav>
        </header>
        <div [sx]="styles.pageDiv">
          <div [sx]="styles.pageDiv2">
            <div [sx]="styles.pageDiv3"></div>
            <div [sx]="styles.pageDiv4"></div>
            <div [sx]="styles.pageDiv5"></div>
          </div>
          <div [sx]="styles.pageDiv6"></div>
        </div>
      </main>
    </div>
  `,
})
export default class Sidebar11 {
  protected readonly styles = styles
  protected readonly orientation = orientation
}
