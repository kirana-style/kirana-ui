<script lang="ts">
  import AppSidebar from "./components/AppSidebar.svelte"
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
  import { breakpoint, space } from "../../../../core/scales"
  import { orientation, when } from "../../../../core/states"

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
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header sx={styles.pageHeader}>
      <SidebarTrigger sx={styles.pageSidebarTrigger} />
      <Separator orientation="vertical" sx={styles.pageSeparator} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              October 2024
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
    <div sx={styles.pageDiv}>
      <div sx={styles.pageDiv2}>
        {#each Array.from({ length: 20 }) as _, i (i)}
          <div sx={styles.pageDiv3}></div>
        {/each}
      </div>
    </div>
  </SidebarInset>
</SidebarProvider>
