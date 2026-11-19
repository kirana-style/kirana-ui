import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { collapsibleScope } from "../../../../../styles/collapsible.styles"
import { duration, easing } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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

type TreeItem = string | TreeItem[]

@Component({
  selector: "kui-tree",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (!items().length) {
      <button
        kuiSidebarMenuButton
        [isActive]="name() === 'button.tsx'"
        [sx]="styles.treeSidebarMenuButton"
      >
        <svg
          iconPlaceholder
          lucide="FileIcon"
          tabler="IconFile"
          hugeicons="FileIcon"
          phosphor="FileIcon"
          remixicon="RiFileLine"
        ></svg>
        {{ name() }}
      </button>
    } @else {
      <li kuiSidebarMenuItem>
        <div
          kuiCollapsible
          [sx]="collapsibleAnchor"
          [defaultOpen]="name() === 'components' || name() === 'ui'"
        >
          <button
            kuiCollapsibleTrigger
            kuiSidebarMenuButton
            dataSlot="sidebar-menu-button"
            [sx]="styles.treeTrigger"
          >
            <svg
              iconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              [sx]="styles.treeIconPlaceholder"
            ></svg>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            {{ name() }}
          </button>
          <div kuiCollapsibleContent>
            <ul kuiSidebarMenuSub>
              @for (subItem of items(); track index; let index = $index) {
                <kui-tree [item]="subItem" />
              }
            </ul>
          </div>
        </div>
      </li>
    }
  `,
})
export class Tree {
  readonly item = input.required<TreeItem>()
  protected readonly styles = styles
  protected readonly name = computed(() => {
    const item = this.item()
    return Array.isArray(item) ? item[0] : item
  })
  protected readonly items = computed(() => {
    const item = this.item()
    return Array.isArray(item) ? item.slice(1) : []
  })
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
