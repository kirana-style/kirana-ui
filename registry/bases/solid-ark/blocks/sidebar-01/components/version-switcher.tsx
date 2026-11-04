import { For, Show, createSignal, splitProps, untrack } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function VersionSwitcher(props: {
  versions: string[]
  defaultVersion: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "versions",
    "defaultVersion",
    "class",
    "sx",
  ])
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

  const [selectedVersion, setSelectedVersion] = createSignal(
    untrack(() => local.defaultVersion)
  )

  return (
    <SidebarMenu {...rest} class={local.class} sx={[local.sx]}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(childProps) => (
              <SidebarMenuButton
                {...childProps()}
                size="lg"
                sx={styles.sidebarMenuButton}
              >
                <div sx={styles.versionSwitcherDiv}>
                  <IconPlaceholder
                    lucide="GalleryVerticalEndIcon"
                    tabler="IconLayoutRows"
                    hugeicons="LayoutBottomIcon"
                    phosphor="RowsIcon"
                    remixicon="RiGalleryLine"
                    {...styleProps(styles.iconPlaceholder)}
                  />
                </div>
                <div sx={styles.div2}>
                  <span sx={styles.versionSwitcherSpan}>Documentation</span>
                  <span>v{selectedVersion()}</span>
                </div>
                <IconPlaceholder
                  lucide="ChevronsUpDownIcon"
                  tabler="IconSelector"
                  hugeicons="UnfoldMoreIcon"
                  phosphor="CaretUpDownIcon"
                  remixicon="RiArrowUpDownLine"
                  {...styleProps(styles.iconPlaceholder2)}
                />
              </SidebarMenuButton>
            )}
          />
          <DropdownMenuContent align="start">
            <For each={local.versions}>
              {(version) => (
                <DropdownMenuItem onSelect={() => setSelectedVersion(version)}>
                  v{version}{" "}
                  <Show when={version === selectedVersion()}>
                    <IconPlaceholder
                      lucide="CheckIcon"
                      tabler="IconCheck"
                      hugeicons="Tick02Icon"
                      phosphor="CheckIcon"
                      remixicon="RiCheckLine"
                      {...styleProps(styles.iconPlaceholder3)}
                    />
                  </Show>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
