<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

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
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../../../core/tokens"
  import { space } from "../../../../../core/scales"

  let {
    workspaces,
    class: className,
    ...rest
  }: {
    workspaces: {
    name: string
    emoji: unknown
    pages: {
    name: string
    emoji: unknown
    }[]
    }[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    sidebarMenuAction: css({
      left: space[2],
      backgroundColor: theme.sidebarAccent,
      color: theme.sidebarAccentForeground,
      rotate: { "[data-open]": "90deg" },
    }),
    sidebarMenuButton: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
  }
</script>

<SidebarGroup {...rest} sx={className as Sx}>
  <SidebarGroupLabel>
    Workspaces
  </SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each workspaces as workspace (workspace.name)}
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {#snippet asChild(props)}
                <a {...props()} href="#">
                  <span>
                    {workspace.emoji}
                  </span>
                  <span>
                    {workspace.name}
                  </span>
                </a>
              {/snippet}
            </SidebarMenuButton>
            <SidebarMenuAction sx={styles.sidebarMenuAction} showOnHover>
              {#snippet asChild(props)}
                <CollapsibleTrigger {...props()}>
                  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
                </CollapsibleTrigger>
              {/snippet}
            </SidebarMenuAction>
            <SidebarMenuAction showOnHover>
              <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="PlusSignIcon" phosphor="PlusIcon" remixicon="RiAddLine" />
            </SidebarMenuAction>
            <CollapsibleContent>
              <SidebarMenuSub>
                {#each workspace.pages as page (page.name)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      {#snippet asChild(props)}
                        <a {...props()} href="#">
                          <span>
                            {page.emoji}
                          </span>
                          <span>
                            {page.name}
                          </span>
                        </a>
                      {/snippet}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                {/each}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      {/each}
      <SidebarMenuItem>
        <SidebarMenuButton sx={styles.sidebarMenuButton}>
          <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
          <span>
            More
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
