import { Sidebar07Icon } from "./sidebar07-icon"
import { For, Show, createSignal, splitProps, untrack } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { radius, theme } from "../../../../../core/tokens"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
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
    // `w-fit`, as upstream's bases write it.
    menu: css({ width: { "*": null, base: "fit-content" } }),
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

  const ctx = useSidebar()
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
                  size="lg"
                  sx={styles.trigger}
                >
                  <div sx={styles.logo}>
                    <Show when={activeTeam().logo}>
                      <Sidebar07Icon icon={activeTeam().logo} />
                    </Show>
                  </div>
                  <div sx={styles.text}>
                    <span sx={styles.name}>{activeTeam().name}</span>
                    <span sx={styles.plan}>{activeTeam().plan}</span>
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
              )}
            />
            <DropdownMenuContent
              sx={styles.menu}
              align="start"
              side={ctx.isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel sx={styles.label}>Teams</DropdownMenuLabel>
                <For each={local.teams}>
                  {(team, index) => (
                    <DropdownMenuItem
                      onClick={() => setActiveTeam(team)}
                      sx={styles.item}
                    >
                      <div sx={styles.badge}>
                        <Show when={team.logo}>
                          <Sidebar07Icon icon={team.logo} />
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
    </Show>
  )
}
