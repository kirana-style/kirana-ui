<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import SearchForm from "./SearchForm.svelte"
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
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../../../core/tokens"
  import { breakpoint, space } from "../../../../../core/scales"
  import { orientation, when } from "../../../../../core/states"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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

  const ctx = useSidebar()
</script>

<header sx={[styles.siteHeaderHeader, className as Sx]} {...rest}>
  <div sx={styles.siteHeaderDiv}>
    <Button sx={styles.siteHeaderButton} variant="ghost" size="icon" onclick={ctx.toggleSidebar}>
      <IconPlaceholder lucide="PanelLeftIcon" tabler="IconLayoutSidebar" hugeicons="SidebarLeftIcon" phosphor="SidebarIcon" remixicon="RiLayoutLeftLine" />
    </Button>
    <Separator orientation="vertical" sx={styles.siteHeaderSeparator} />
    <Breadcrumb sx={styles.siteHeaderBreadcrumb}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            Build Your Application
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            Data Fetching
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <SearchForm sx={styles.searchForm} />
  </div>
</header>
