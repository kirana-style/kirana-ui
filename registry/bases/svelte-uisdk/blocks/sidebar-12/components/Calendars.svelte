<script lang="ts">
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../ui/collapsible"
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css, select } from "@kirana-style/core"
  import {
    OPEN,
    collapsibleScope,
  } from "../../../../../styles/collapsible.styles"
  import { radius, theme } from "../../../../../core/tokens"
  import {
    duration,
    easing,
    fontSize,
    lineHeight,
    space,
  } from "../../../../../core/scales"

  let {
    calendars
  }: {
    calendars: {
    name: string
    items: string[]
    }[]
  } = $props()

  const styles = {
    sidebarGroupLabel: css({
      width: "100%",
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: {
        base: theme.sidebarForeground,
        ":hover": theme.sidebarAccentForeground,
      },
      backgroundColor: { ":hover": theme.sidebarAccent },
    }),
    iconPlaceholder: css({
      marginLeft: "auto",
      transitionDuration: duration[150],
      transitionProperty: "transform, translate, scale, rotate",
      transitionTimingFunction: easing.inOut,
      rotate: { [OPEN.base]: "90deg" },
    }),
    calendarsDiv: css({
      display: "flex",
      aspectRatio: "1 / 1",
      width: space[4],
      height: space[4],
      flexShrink: "0",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.sm,
      borderWidth: "1px",
      borderColor: {
        base: theme.sidebarBorder,
        '[data-active="true"]': theme.sidebarPrimary,
      },
      color: theme.sidebarPrimaryForeground,
      backgroundColor: { '[data-active="true"]': theme.sidebarPrimary },
      // Its check, shown while the calendar is chosen (upstream's `group/calendar-item`).
      [select.child("svg")]: {
        display: { base: "none", '[data-active="true"]': "block" },
      },
    }),
    iconPlaceholder2: css({
      width: space[3],
      height: space[3],
    }),
    sidebarSeparator: css({
      marginInline: { "*": null, base: space["0"] },
    }),
  }
</script>

{#each calendars as calendar, index (calendar.name)}
  <SidebarGroup>
    <Collapsible defaultOpen={index === 0} sx={collapsibleScope.anchor}>
      <SidebarGroupLabel sx={styles.sidebarGroupLabel}>
        {#snippet asChild(props)}
          <CollapsibleTrigger {...props()}>
            {calendar.name}{" "}
            <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={styles.iconPlaceholder} />
          </CollapsibleTrigger>
        {/snippet}
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {#each calendar.items as item, itemIndex (item)}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div data-active={itemIndex < 2} sx={styles.calendarsDiv}>
                    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" sx={styles.iconPlaceholder2} />
                  </div>
                  {item}
                </SidebarMenuButton>
              </SidebarMenuItem>
            {/each}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </Collapsible>
  </SidebarGroup>
  <SidebarSeparator sx={styles.sidebarSeparator} />
{/each}
