"use client"

import { SearchForm } from "./search-form"
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
import { useSidebar } from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"

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
    height: { "[data-vertical]": space[4] },
    alignSelf: { "[data-vertical]": "auto" },
  }),
  siteHeaderBreadcrumb: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "block" },
  }),
  searchForm: css({
    width: { base: "100%", [breakpoint.sm]: "auto" },
    marginLeft: { [breakpoint.sm]: "auto" },
  }),
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header sx={styles.siteHeaderHeader}>
      <div sx={styles.siteHeaderDiv}>
        <Button
          sx={styles.siteHeaderButton}
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <IconPlaceholder
            lucide="PanelLeftIcon"
            tabler="IconLayoutSidebar"
            hugeicons="SidebarLeftIcon"
            phosphor="SidebarIcon"
            remixicon="RiLayoutLeftLine"
          />
        </Button>
        <Separator orientation="vertical" sx={styles.siteHeaderSeparator} />
        <Breadcrumb sx={styles.siteHeaderBreadcrumb}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm {...styleProps(styles.searchForm)} />
      </div>
    </header>
  )
}
