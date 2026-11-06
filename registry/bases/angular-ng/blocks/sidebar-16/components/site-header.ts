import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useSidebar } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"
import { orientation, when } from "../../../../../core/states"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../ui/breadcrumb"
import { Button } from "../../../ui/button"
import { Separator } from "../../../ui/separator"
import { SearchForm } from "./search-form"

const styles = {
  siteHeaderHeader: css({
    position: "sticky",
    top: space["0"],
    zIndex: "50",
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
  }),
  siteHeaderDiv: css({
    display: "flex",
    // Upstream's `--header-height`.
    height: space[14],
    width: "100%",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  siteHeaderButton: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
  }),
  siteHeaderSeparator: css({
    marginRight: { "*": null, base: space[2] },
    height: { ...when(orientation.vertical, space[4]) },
    alignSelf: { ...when(orientation.vertical, "auto") },
  }),
  siteHeaderBreadcrumb: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "block" },
  }),
  searchForm: css({
    width: { base: "100%", [breakpoint.sm]: "auto" },
    marginLeft: { [breakpoint.sm]: "auto" },
  }),
}

@Component({
  selector: "kui-site-header",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    SearchForm,
    Separator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <header [sx]="styles.siteHeaderHeader">
      <div [sx]="styles.siteHeaderDiv">
        <button
          kuiButton
          [sx]="styles.siteHeaderButton"
          variant="ghost"
          size="icon"
          (click)="toggleSidebar()"
        >
          <svg
            iconPlaceholder
            lucide="PanelLeftIcon"
            tabler="IconLayoutSidebar"
            hugeicons="SidebarLeftIcon"
            phosphor="SidebarIcon"
            remixicon="RiLayoutLeftLine"
          ></svg>
        </button>
        <div
          kuiSeparator
          orientation="vertical"
          [sx]="styles.siteHeaderSeparator"
        ></div>
        <nav kuiBreadcrumb [sx]="styles.siteHeaderBreadcrumb">
          <ol kuiBreadcrumbList>
            <li kuiBreadcrumbItem>
              <a kuiBreadcrumbLink href="#">Build Your Application</a>
            </li>
            <li kuiBreadcrumbSeparator></li>
            <li kuiBreadcrumbItem>
              <span kuiBreadcrumbPage>Data Fetching</span>
            </li>
          </ol>
        </nav>
        <kui-search-form [sx]="styles.searchForm" />
      </div>
    </header>
  `,
})
export class SiteHeader {
  protected readonly sidebar = useSidebar()
  protected readonly toggleSidebar = this.sidebar.toggleSidebar
  protected readonly styles = styles
  protected readonly orientation = orientation
}
