<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Dashboard01Icon from "./Dashboard01Icon.svelte"
  import { Button } from "../../../ui/button"
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { COLLAPSED } from "../../../../../styles/sidebar.styles"
  import { theme } from "../../../../../core/tokens"
  import { duration, space } from "../../../../../core/scales"

  let {
    items,
    class: className,
    ...rest
  }: {
    items: {
    title: string
    url: string
    icon?: {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
    }
    }[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    sidebarGroupContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[2] },
    }),
    sidebarMenuItem: css({
      display: { "*": null, base: "flex" },
      alignItems: { "*": null, base: "center" },
      gap: { "*": null, base: space[2] },
    }),
    sidebarMenuButton: css({
      minWidth: { "*": null, base: space[8] },
      backgroundColor: {
        base: theme.primary,
        ":hover": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
        ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      },
      color: {
        base: theme.primaryForeground,
        ":hover": theme.primaryForeground,
        ":active": theme.primaryForeground,
      },
      transitionDuration: duration[200],
      transitionTimingFunction: "linear",
    }),
    navMainButton: css({
      width: { "*": null, base: space[8] },
      height: { "*": null, base: space[8] },
      opacity: { [COLLAPSED]: "0%" },
    }),
    navMainSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
  }
</script>

<SidebarGroup {...rest} sx={className as Sx}>
  <SidebarGroupContent sx={styles.sidebarGroupContent}>
    <SidebarMenu>
      <SidebarMenuItem sx={styles.sidebarMenuItem}>
        <SidebarMenuButton tooltip="Quick Create" sx={styles.sidebarMenuButton}>
          <IconPlaceholder lucide="CirclePlusIcon" tabler="IconCirclePlusFilled" hugeicons="PlusSignCircleIcon" phosphor="PlusCircleIcon" remixicon="RiAddCircleFill" />
          <span>
            Quick Create
          </span>
        </SidebarMenuButton>
        <Button size="icon" sx={styles.navMainButton} variant="outline">
          <IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="Mail01Icon" phosphor="EnvelopeIcon" remixicon="RiMailLine" />
          <span sx={styles.navMainSpan}>
            Inbox
          </span>
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={item.title}>
            {#if item.icon}
              <Dashboard01Icon icon={item.icon} />
            {/if}
            <span>
              {item.title}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
