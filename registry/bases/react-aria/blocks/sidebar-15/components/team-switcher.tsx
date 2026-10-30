"use client"

import * as React from "react"

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
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  sidebarMenuButton: css({
    width: { "*": null, base: "fit-content" },
    paddingInline: { "*": null, base: space["1.5"] },
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
    color: { '[aria-expanded="true"]': theme.foreground },
  }),
  teamSwitcherDiv: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[5],
    height: space[5],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  teamSwitcherSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder: css({
    opacity: "50%",
  }),
  dropdownMenu: css({
    width: { "*": null, base: space[64] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  dropdownMenuLabel: css({
    fontSize: { "*": null, base: fontSize.xs },
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  dropdownMenuItem: css({
    gap: space[2],
    padding: space[2],
  }),
  div2: css({
    // Tailwind's `rounded-xs`, outside the radius scale.
    borderRadius: "0.125rem",
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  dropdownMenuItem2: css({
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space[2] },
  }),
  div3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
  div4: css({
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
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
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger>
          <SidebarMenuButton sx={styles.sidebarMenuButton}>
            <div sx={styles.teamSwitcherDiv}>{activeTeam.logo}</div>
            <span sx={styles.teamSwitcherSpan}>{activeTeam.name}</span>
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </SidebarMenuButton>
          <DropdownMenu
            sx={styles.dropdownMenu}
            placement="bottom start"
            offset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onAction={() => setActiveTeam(team)}
                  sx={styles.dropdownMenuItem}
                >
                  <div sx={styles.div2}>{team.logo}</div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem sx={styles.dropdownMenuItem2}>
                <div sx={styles.div3}>
                  <IconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                    {...styleProps(styles.iconPlaceholder2)}
                  />
                </div>
                <div sx={styles.div4}>Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
