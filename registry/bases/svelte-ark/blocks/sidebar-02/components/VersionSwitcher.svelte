<script lang="ts">
  import { untrack } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu"
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { radius, theme } from "../../../../../core/tokens"
  import { fontWeight, space } from "../../../../../core/scales"

  let {
    versions, defaultVersion,
    class: className,
    ...rest
  }: {
    versions: string[]
    defaultVersion: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    sidebarMenuButton: css({
      backgroundColor: { "[data-open]": theme.sidebarAccent },
      color: { "[data-open]": theme.sidebarAccentForeground },
    }),
    versionSwitcherDiv: css({
      display: "flex",
      aspectRatio: "1 / 1",
      width: space[8],
      height: space[8],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.lg,
      backgroundColor: theme.sidebarPrimary,
      color: theme.sidebarPrimaryForeground,
    }),
    iconPlaceholder: css({
      width: space[4],
      height: space[4],
    }),
    div2: css({
      display: "flex",
      flexDirection: "column",
      gap: space["0.5"],
      lineHeight: "1",
    }),
    versionSwitcherSpan: css({
      fontWeight: fontWeight.medium,
    }),
    iconPlaceholder2: css({
      marginLeft: "auto",
    }),
    iconPlaceholder3: css({
      marginLeft: "auto",
    }),
  }

  let selectedVersion = $state(untrack(() => defaultVersion))
</script>

<SidebarMenu {...rest} sx={[className as Sx]}>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <SidebarMenuButton {...props()} class={props().class} style={props().style} size="lg" sx={styles.sidebarMenuButton}>
            <div sx={styles.versionSwitcherDiv}>
              <IconPlaceholder lucide="GalleryVerticalEndIcon" tabler="IconLayoutRows" hugeicons="LayoutBottomIcon" phosphor="RowsIcon" remixicon="RiGalleryLine" sx={styles.iconPlaceholder} />
            </div>
            <div sx={styles.div2}>
              <span sx={styles.versionSwitcherSpan}>
                Documentation
              </span>
              <span>
                v{selectedVersion}
              </span>
            </div>
            <IconPlaceholder lucide="ChevronsUpDownIcon" tabler="IconSelector" hugeicons="UnfoldMoreIcon" phosphor="CaretUpDownIcon" remixicon="RiArrowUpDownLine" sx={styles.iconPlaceholder2} />
          </SidebarMenuButton>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {#each versions as version (version)}
          <DropdownMenuItem onSelect={() => (selectedVersion = version)}>
            v{version}{" "}
            {#if version === selectedVersion}
              <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" sx={styles.iconPlaceholder3} />
            {/if}
          </DropdownMenuItem>
        {/each}
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</SidebarMenu>
