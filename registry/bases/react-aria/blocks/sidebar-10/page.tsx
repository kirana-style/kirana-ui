import { AppSidebar } from "./components/app-sidebar"
import { NavActions } from "./components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb"
import { Separator } from "../../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { containerSize, space } from "../../../../core/scales"
import { orientation, when } from "../../../../core/states"

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
                <BreadcrumbItem>
                  <BreadcrumbPage sx={styles.pageBreadcrumbPage}>
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div sx={styles.pageDiv2}>
            <NavActions />
          </div>
        </header>
        <div sx={styles.pageDiv3}>
          <div sx={styles.pageDiv4} />
          <div sx={styles.pageDiv5} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
