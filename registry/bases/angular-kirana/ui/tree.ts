import { Component, Directive, computed, inject, input } from "@angular/core"
import {
  KpTree,
  KpTreeGroup,
  KpTreeItem,
  KpTreeItemIndicator,
  KpTreeItemRow,
  KpTreeItemText,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { menuRowBase, menuRowPadding } from "../../../styles/menu.styles"
import { tree } from "../../../styles/tree.styles"

/**
 * A tree of nodes: `<div kuiTree aria-label="Files" [defaultExpandedValue]="['src']">`, on Kirana
 * UI's (`KpTree`): its `[(expandedValue)]`, `defaultExpandedValue`, `selectionMode`,
 * `[(selectedValue)]`, `defaultSelectedValue` and `expandOnClick` are the primitive's,
 * `(expandedChanged)` and `(selectedChanged)` its outputs.
 */
@Directive({
  selector: "[kuiTree]",
  hostDirectives: [
    {
      directive: KpTree,
      inputs: [
        "expandedValue",
        "defaultExpandedValue",
        "selectionMode",
        "selectedValue",
        "defaultSelectedValue",
        "expandOnClick",
      ],
      outputs: [
        "expandedValueChange",
        "selectedValueChange",
        "expandedChanged",
        "selectedChanged",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tree",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Tree {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tree.root, this.sx()))
}

/**
 * One node: `<div kuiTreeItem [value]="'src'" [branch]="true">`, Kirana UI's (`KpTreeItem`), its
 * `value`, `branch` (false unless told), `disabled`, `loading` and `label` the primitive's.
 */
@Directive({
  selector: "[kuiTreeItem]",
  hostDirectives: [
    {
      directive: KpTreeItem,
      inputs: ["value", "branch", "disabled", "loading", "label"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tree-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TreeItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tree.item, this.sx()))
}

/** The chevron that turns while its branch is open. Without content it draws a chevron. */
@Component({
  selector: "[kuiTreeItemIndicator]",
  imports: [IconPlaceholder],
  hostDirectives: [KpTreeItemIndicator],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tree-item-indicator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content
    ><svg
      iconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
    ></svg
  ></ng-content>`,
})
class TreeItemIndicator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tree.indicator, this.sx()))
}

/**
 * A node's row: `<div kuiTreeItemContent>`, Kirana UI's (`KpTreeItemRow`). It draws the chevron
 * first on a branch (its item's `branch`), and the same room on a leaf, then its content: an icon
 * and the `TreeItemText`.
 */
@Component({
  selector: "[kuiTreeItemContent]",
  imports: [SxDirective, TreeItemIndicator],
  hostDirectives: [KpTreeItemRow],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tree-item-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (branch()) {
      <span kuiTreeItemIndicator></span>
    } @else {
      <span
        aria-hidden="true"
        data-slot="tree-item-indicator-space"
        [sx]="indicatorSpace"
      ></span>
    }
    <ng-content />
  `,
})
class TreeItemContent {
  readonly sx = input<SxInput>()
  private readonly item = inject(KpTreeItem, { optional: true })
  protected readonly branch = computed(() => this.item?.branch() ?? false)
  protected readonly indicatorSpace = tree.indicatorSpace
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuRowPadding, tree.row], this.sx())
  )
}

/** The node's name: `<span kuiTreeItemText>`, Kirana UI's (`KpTreeItemText`). */
@Directive({
  selector: "[kuiTreeItemText]",
  hostDirectives: [KpTreeItemText],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tree-item-text",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TreeItemText {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tree.text, this.sx()))
}

/**
 * A branch's children: `<div kuiTreeGroup>`. Kirana UI's group is structural (`*kpTreeGroup`, in
 * the page while its branch is open), which an attribute cannot put around its own element: the
 * part draws it around the caller's content, its own element drawing nothing.
 */
@Component({
  selector: "[kuiTreeGroup]",
  imports: [KpTreeGroup],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpTreeGroup
      data-slot="tree-group"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class TreeGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tree.group, this.sx()))
}

export {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemIndicator,
  TreeItemText,
}
