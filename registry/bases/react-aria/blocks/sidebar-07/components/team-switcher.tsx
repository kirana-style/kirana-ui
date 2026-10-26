"use client"

import * as React from "react"
import { css, props as styleProps } from "@kirana-style/core"

import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { radius, theme } from "../../../../../core/tokens"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"

const styles = {
  trigger: css({
    backgroundColor: { '[aria-expanded="true"]': theme.sidebarAccent },
    color: { '[aria-expanded="true"]': theme.sidebarAccentForeground },
  }),
  logo: css({
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
  // The team's name over its plan, each cut short to the room there is.
  text: css({
    display: "grid",
    flex: 1,
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  name: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  plan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  chevron: css({ marginInlineStart: "auto" }),
  menu: css({ width: "fit-content" }),
  label: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  // `gap-2 p-2`, which win over every style's.
  item: css({
    gap: { "*": null, base: space[2] },
    paddingBlock: { "*": null, base: space[2] },
    paddingInlineStart: { "*": null, base: space[2] },
    paddingInlineEnd: { "*": null, base: space[2] },
  }),
  badge: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  plus: css({ backgroundColor: "transparent" }),
  plusIcon: css({ width: space[4], height: space[4] }),
  add: css({ fontWeight: fontWeight.medium, color: theme.mutedForeground }),
}

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger>
          <SidebarMenuButton size="lg" sx={styles.trigger}>
            <div sx={styles.logo}>{activeTeam.logo}</div>
            <div sx={styles.text}>
              <span sx={styles.name}>{activeTeam.name}</span>
              <span sx={styles.plan}>{activeTeam.plan}</span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              {...styleProps(styles.chevron)}
            />
          </SidebarMenuButton>
          <DropdownMenu
            sx={styles.menu}
            placement={isMobile ? "bottom start" : "right top"}
            offset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.label}>Teams</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onAction={() => setActiveTeam(team)}
                  sx={styles.item}
                >
                  <div sx={styles.badge}>{team.logo}</div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem sx={styles.item}>
                <div sx={[styles.badge, styles.plus]}>
                  <IconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                    {...styleProps(styles.plusIcon)}
                  />
                </div>
                <div sx={styles.add}>Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
