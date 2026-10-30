import { AppSidebar } from "./components/app-sidebar"
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
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { breakpoint, space } from "../../../../core/scales"

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
    height: { "[data-vertical]": space[4] },
    alignSelf: { "[data-vertical]": "auto" },
  }),
  pageBreadcrumbItem: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  pageBreadcrumbSeparator: css({
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
    aspectRatio: "16 / 9",
    height: space[12],
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header sx={styles.pageHeader}>
          <SidebarTrigger sx={styles.pageSidebarTrigger} />
          <Separator orientation="vertical" sx={styles.pageSeparator} />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem sx={styles.pageBreadcrumbItem}>
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator sx={styles.pageBreadcrumbSeparator} />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div sx={styles.pageDiv}>
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} sx={styles.pageDiv2} />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
