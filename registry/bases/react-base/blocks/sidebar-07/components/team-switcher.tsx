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
  DropdownMenuContent,
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
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
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
  // The trigger's width, at least 14rem, as shadcn/ui's blocks page draws it (its `new-york-v4`
  // copy, `w-(--radix-dropdown-menu-trigger-width) min-w-56`); upstream's Base UI copy writes `w-fit`.
  menu: css({ minWidth: { "*": null, base: space[56] } }),
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
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" sx={styles.trigger} />}
          >
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sx={styles.menu}
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.label}>Teams</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
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
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
