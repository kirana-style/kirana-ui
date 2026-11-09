# File Tree

<!-- ::preview item="file-tree-demo" height="370" combinations="angular/ng" -->

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<!-- ::installation name="collapsible button" combinations="angular/ng" -->

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

See [Collapsible](/docs/components/collapsible#file-tree).

The example draws each step with its own parts, which you copy beside it:

```ts showLineNumbers title="file-tree-node.ts"
import { Component, computed, forwardRef, input, output } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { theme } from "@/lib/kirana/tokens"
import { duration, easing, fontWeight, space } from "@/lib/kirana/scales"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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
```
