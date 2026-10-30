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
    display: "flex",
    height: space[16],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
  }),
  pageDiv: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[3],
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
  pageDiv2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
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

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header sx={styles.pageHeader}>
          <div sx={styles.pageDiv}>
            <SidebarTrigger />
            <Separator orientation="vertical" sx={styles.pageSeparator} />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem sx={styles.pageBreadcrumbItem}>
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator sx={styles.pageBreadcrumbSeparator} />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div sx={styles.pageDiv2}>
          <div sx={styles.pageDiv3}>
            <div sx={styles.pageDiv4} />
            <div sx={styles.pageDiv5} />
            <div sx={styles.pageDiv6} />
          </div>
          <div sx={styles.pageDiv7} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
