import { AppSidebar } from "./components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
    display: { "*": null, base: "none", [breakpoint.md]: "inline-flex" },
  }),
  pageBreadcrumbItem2: css({
    display: { "*": null, base: "none", [breakpoint.md]: "inline-flex" },
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
                <BreadcrumbLink href="#">components</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem sx={styles.pageBreadcrumbItem2}>
                <BreadcrumbLink href="#">ui</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbPage>button.tsx</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div sx={styles.pageDiv}>
          <div sx={styles.pageDiv2}>
            <div sx={styles.pageDiv3} />
            <div sx={styles.pageDiv4} />
            <div sx={styles.pageDiv5} />
          </div>
          <div sx={styles.pageDiv6} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
