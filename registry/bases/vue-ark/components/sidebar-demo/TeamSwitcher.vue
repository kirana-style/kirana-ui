<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"

const styles = {
  teamSwitcherSidebarMenuButton: css({
    backgroundColor: { '[data-state="open"]': theme.sidebarAccent },
    color: { '[data-state="open"]': theme.sidebarAccentForeground },
  }),
  teamSwitcherDiv: css({
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
  teamSwitcherDiv2: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  teamSwitcherSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  teamSwitcherSpan2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  teamSwitcherIconPlaceholder: css({
    marginLeft: "auto",
  }),
  teamSwitcherDropdownMenuContent: css({
    width: { "*": null, base: "var(--radix-dropdown-menu-trigger-width)" },
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  teamSwitcherDropdownMenuLabel: css({
    fontSize: { "*": null, base: fontSize.xs },
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  teamSwitcherDropdownMenuItem: css({
    gap: space[2],
    padding: space[2],
  }),
  teamSwitcherDiv3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
  }),
  teamSwitcherDropdownMenuItem2: css({
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space[2] },
  }),
  teamSwitcherDiv4: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    backgroundColor: "transparent",
  }),
  teamSwitcherIconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
  teamSwitcherDiv5: css({
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
}

const { teams } = defineProps<{
  teams: {
    name: string
    logo: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
    plan: string
  }[]
}>()
const { isMobile } = useSidebar()
const activeTeam = ref(teams[0])
</script>

<template>
  <template v-if="!!activeTeam">
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton
              size="lg"
              :sx="styles.teamSwitcherSidebarMenuButton"
            >
              <div :sx="styles.teamSwitcherDiv">
                <IconPlaceholder
                  v-if="activeTeam.logo"
                  v-bind="activeTeam.logo"
                />
              </div>
              <div :sx="styles.teamSwitcherDiv2">
                <span :sx="styles.teamSwitcherSpan">
                  {{ activeTeam.name }}
                </span>
                <span :sx="styles.teamSwitcherSpan2">
                  {{ activeTeam.plan }}
                </span>
              </div>
              <IconPlaceholder
                lucide="ChevronsUpDownIcon"
                tabler="IconSelector"
                hugeicons="UnfoldMoreIcon"
                phosphor="CaretUpDownIcon"
                remixicon="RiArrowUpDownLine"
                :sx="styles.teamSwitcherIconPlaceholder"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            :sx="styles.teamSwitcherDropdownMenuContent"
            align="start"
            :side="isMobile ? 'bottom' : 'right'"
            :side-offset="4"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel :sx="styles.teamSwitcherDropdownMenuLabel">
                Teams
              </DropdownMenuLabel>
              <DropdownMenuItem
                v-for="(team, index) in teams"
                :key="team.name"
                @click="() => (activeTeam = team)"
                :sx="styles.teamSwitcherDropdownMenuItem"
              >
                <div :sx="styles.teamSwitcherDiv3">
                  <IconPlaceholder v-if="team.logo" v-bind="team.logo" />
                </div>
                {{ team.name }}
                <DropdownMenuShortcut> ⌘{{ index + 1 }} </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem :sx="styles.teamSwitcherDropdownMenuItem2">
                <div :sx="styles.teamSwitcherDiv4">
                  <IconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                    :sx="styles.teamSwitcherIconPlaceholder2"
                  />
                </div>
                <div :sx="styles.teamSwitcherDiv5">Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </template>
</template>
