import { Sidebar10Icon } from "./sidebar10-icon"
import { For, Show, createSignal, splitProps, untrack } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function TeamSwitcher(props: {
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
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["teams", "sx", "class"])
  const styles = {
    sidebarMenuButton: css({
      width: { "*": null, base: "fit-content" },
      paddingInline: { "*": null, base: space["1.5"] },
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
    dropdownMenuContent: css({
      width: { "*": null, base: space[64] },
      borderRadius: { "*": null, base: radius.lg },
    }),
    dropdownMenuLabel: css({
      fontSize: { "*": null, base: fontSize.xs },
      lineHeight: lineHeight.xs,
      color: theme.mutedForeground,
    }),
    // `gap-2 p-2`, over the menu item's own.
    dropdownMenuItem: css({
      gap: { "*": null, base: space[2] },
      padding: { "*": null, base: space[2] },
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

  const [activeTeam, setActiveTeam] = createSignal(
    untrack(() => local.teams[0])
  )

  return (
    <Show when={!!activeTeam()}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild={(childProps) => (
                <SidebarMenuButton
                  {...childProps()}
                  sx={styles.sidebarMenuButton}
                >
                  <div sx={styles.teamSwitcherDiv}>
                    <Show when={activeTeam().logo}>
                      <Sidebar10Icon icon={activeTeam().logo} />
                    </Show>
                  </div>
                  <span sx={styles.teamSwitcherSpan}>{activeTeam().name}</span>
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    {...styleProps(styles.iconPlaceholder)}
                  />
                </SidebarMenuButton>
              )}
            />
            <DropdownMenuContent
              sx={styles.dropdownMenuContent}
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                  Teams
                </DropdownMenuLabel>
                <For each={local.teams}>
                  {(team, index) => (
                    <DropdownMenuItem
                      onClick={() => setActiveTeam(team)}
                      sx={styles.dropdownMenuItem}
                    >
                      <div sx={styles.div2}>
                        <Show when={team.logo}>
                          <Sidebar10Icon icon={team.logo} />
                        </Show>
                      </div>{" "}
                      {team.name}{" "}
                      <DropdownMenuShortcut>
                        ⌘{index() + 1}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                </For>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </Show>
  )
}
