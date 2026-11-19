import { Component, computed, forwardRef, input, output } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import { duration, easing, fontWeight, space } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Button } from "../../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"

const styles = {
  fileTreeNodeButton: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    fontWeight: { "*": null, base: fontWeight.normal },
    backgroundColor: {
      '[aria-expanded="true"]': {
        base: "transparent",
        ":hover": `light-dark(${theme.muted}, color-mix(in oklab, ${theme.muted} 50%, transparent))`,
      },
    },
  }),
  // The chevron of an open folder, upstream's `group-data-panel-open/button:rotate-90` (React Aria's
  // `group-data-expanded/folder:`): the trigger's `aria-expanded`, which both bases set.
  fileTreeNodeTrigger: css({
    [select.child("svg:first-child")]: {
      rotate: { '[aria-expanded="true"]': "90deg" },
    },
  }),
  fileTreeNodeIconPlaceholder: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
  }),
  // The file that is open: `bg-accent text-accent-foreground` (a hover keeps the ghost button's).
  selected: css({
    backgroundColor: theme.accent,
    color: theme.accentForeground,
  }),
  fileTreeNodeDiv: css({
    marginLeft: space[4],
    display: "flex",
    flexDirection: "column",
  }),
}

export type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

@Component({
  selector: "kui-file-tree-node",
  imports: [
    forwardRef(() => FileTreeNode),
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (node().type === "folder") {
      <div kuiCollapsible defaultOpen>
        <button
          kuiButton
          kuiCollapsibleTrigger
          variant="ghost"
          size="sm"
          [sx]="[styles.fileTreeNodeButton, styles.fileTreeNodeTrigger]"
        >
          <svg
            iconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRight01Icon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
            [sx]="styles.fileTreeNodeIconPlaceholder"
          ></svg>
          <svg
            iconPlaceholder
            lucide="FolderIcon"
            tabler="IconFolder"
            hugeicons="FolderIcon"
            phosphor="FolderIcon"
            remixicon="RiFolderLine"
          ></svg>
          {{ node().name }}
        </button>
        <div kuiCollapsibleContent>
          <div [sx]="styles.fileTreeNodeDiv">
            @for (child of children(); track child.path) {
              <kui-file-tree-node
                [node]="child"
                [selected]="selected()"
                (select)="select.emit($event)"
              />
            }
          </div>
        </div>
      </div>
    } @else {
      <button
        kuiButton
        variant="ghost"
        size="sm"
        [sx]="[
          styles.fileTreeNodeButton,
          selected() === node().path && styles.selected,
        ]"
        [attr.aria-current]="selected() === node().path ? 'true' : undefined"
        (click)="select.emit(node().path)"
      >
        <svg
          iconPlaceholder
          lucide="FileIcon"
          tabler="IconFile"
          hugeicons="FileIcon"
          phosphor="FileIcon"
          remixicon="RiFileLine"
        ></svg>
        {{ node().name }}
      </button>
    }
  `,
})
export class FileTreeNode {
  readonly node = input.required<FileNode>()
  readonly selected = input.required<string>()
  readonly select = output<string>()
  protected readonly children = computed(() => {
    const node = this.node()
    return node.type === "folder" ? node.children : []
  })
  protected readonly styles = styles
}
