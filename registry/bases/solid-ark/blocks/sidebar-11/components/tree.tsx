import { For, splitProps } from "solid-js"
import { css, props as styleProps, select } from "@kirana-style/core"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { collapsibleScope } from "../../../../../styles/collapsible.styles"
import { duration, easing } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

type TreeItem = string | TreeItem[]

export function Tree(props: { item: TreeItem; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["item", "sx", "class"])
  const styles = {
    // `data-[active=true]:bg-transparent`: Base UI's button writes `data-active=""`, which it never
    // matches, so the current file keeps its highlight, as on upstream's site.
    treeSidebarMenuButton: css({
      backgroundColor: { '[data-active="true"]': "transparent" },
    }),
    // A folder's button: its chevron (the first icon) turned while the folder is open, upstream's
    // `[&[data-state=open]>button>svg:first-child]:rotate-90` (whose Radix attribute Base UI never
    // sets), read from the button itself so a closed folder inside an open one keeps its own.
    treeTrigger: css({
      [select.child("svg:first-child")]: {
        rotate: { '[aria-expanded="true"]': "90deg" },
      },
    }),
    treeIconPlaceholder: css({
      transitionDuration: duration[150],
      transitionProperty: "transform, translate, scale, rotate",
      transitionTimingFunction: easing.inOut,
    }),
  }

  // A file's name, or a folder's with what it holds.
  const parts = () => (Array.isArray(local.item) ? local.item : [local.item])
  const name = () => parts()[0]
  const items = () => parts().slice(1)

  return (
    <>
      {!items().length ? (
        <SidebarMenuButton
          isActive={name() === "button.tsx"}
          sx={styles.treeSidebarMenuButton}
        >
          <IconPlaceholder
            lucide="FileIcon"
            tabler="IconFile"
            hugeicons="FileIcon"
            phosphor="FileIcon"
            remixicon="RiFileLine"
          />{" "}
          {name()}
        </SidebarMenuButton>
      ) : (
        <SidebarMenuItem>
          <Collapsible
            sx={collapsibleScope.anchor}
            defaultOpen={name() === "components" || name() === "ui"}
          >
            <SidebarMenuButton
              sx={styles.treeTrigger}
              asChild={(childProps) => (
                <CollapsibleTrigger {...childProps()}>
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                    {...styleProps(styles.treeIconPlaceholder)}
                  />
                  <IconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  />{" "}
                  {name()}
                </CollapsibleTrigger>
              )}
            />
            <CollapsibleContent>
              <SidebarMenuSub>
                <For each={items()}>{(subItem) => <Tree item={subItem} />}</For>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      )}
    </>
  )
}
