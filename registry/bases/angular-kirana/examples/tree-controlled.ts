import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "../ui/tree"

const styles = {
  column: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[3],
  }),
  actions: css({ display: "flex", gap: space[2] }),
}

type Node = { name: string; children?: Node[] }

const DOCS: Node[] = [
  {
    name: "Getting started",
    children: [{ name: "Installation" }, { name: "Configuration" }],
  },
  {
    name: "Guides",
    children: [
      { name: "Theming" },
      {
        name: "Forms",
        children: [{ name: "Validation" }, { name: "Server actions" }],
      },
    ],
  },
  { name: "Changelog" },
]

/** The value of every branch under `nodes`. */
function branches(nodes: Node[], parent = ""): string[] {
  return nodes.flatMap((node) =>
    node.children
      ? [
          `${parent}${node.name}`,
          ...branches(node.children, `${parent}${node.name}/`),
        ]
      : []
  )
}

/**
 * The nodes, written out to the depth of `DOCS`: each item is written inside the one around it, so
 * Kirana UI's item knows its depth from where it stands.
 */
@Component({
  selector: "tree-controlled",
  imports: [
    Button,
    IconPlaceholder,
    SxDirective,
    Tree,
    TreeGroup,
    TreeItem,
    TreeItemContent,
    TreeItemText,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div [sx]="styles.actions">
          <button
            kuiButton
            variant="outline"
            size="sm"
            (click)="expanded.set(all)"
          >
            Expand all
          </button>
          <button
            kuiButton
            variant="outline"
            size="sm"
            (click)="expanded.set([])"
          >
            Collapse all
          </button>
        </div>
        <div
          kuiTree
          aria-label="Documentation"
          [expandedValue]="expanded()"
          (expandedChanged)="expanded.set($event.value)"
        >
          @for (node of docs; track node.name) {
            <div kuiTreeItem [value]="node.name" [branch]="!!node.children">
              <div kuiTreeItemContent>
                @if (node.children) {
                  <svg
                    iconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  ></svg>
                } @else {
                  <svg
                    iconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  ></svg>
                }
                <span kuiTreeItemText>{{ node.name }}</span>
              </div>
              @if (node.children) {
                <div kuiTreeGroup>
                  @for (child of node.children; track child.name) {
                    <div
                      kuiTreeItem
                      [value]="node.name + '/' + child.name"
                      [branch]="!!child.children"
                    >
                      <div kuiTreeItemContent>
                        @if (child.children) {
                          <svg
                            iconPlaceholder
                            lucide="FolderIcon"
                            tabler="IconFolder"
                            hugeicons="FolderIcon"
                            phosphor="FolderIcon"
                            remixicon="RiFolderLine"
                          ></svg>
                        } @else {
                          <svg
                            iconPlaceholder
                            lucide="FileTextIcon"
                            tabler="IconFileText"
                            hugeicons="FileIcon"
                            phosphor="FileTextIcon"
                            remixicon="RiFileTextLine"
                          ></svg>
                        }
                        <span kuiTreeItemText>{{ child.name }}</span>
                      </div>
                      @if (child.children) {
                        <div kuiTreeGroup>
                          @for (leaf of child.children; track leaf.name) {
                            <div
                              kuiTreeItem
                              [value]="
                                node.name + '/' + child.name + '/' + leaf.name
                              "
                              [branch]="!!leaf.children"
                            >
                              <div kuiTreeItemContent>
                                @if (leaf.children) {
                                  <svg
                                    iconPlaceholder
                                    lucide="FolderIcon"
                                    tabler="IconFolder"
                                    hugeicons="FolderIcon"
                                    phosphor="FolderIcon"
                                    remixicon="RiFolderLine"
                                  ></svg>
                                } @else {
                                  <svg
                                    iconPlaceholder
                                    lucide="FileTextIcon"
                                    tabler="IconFileText"
                                    hugeicons="FileIcon"
                                    phosphor="FileTextIcon"
                                    remixicon="RiFileTextLine"
                                  ></svg>
                                }
                                <span kuiTreeItemText>{{ leaf.name }}</span>
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export default class TreeControlled {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly docs = DOCS
  protected readonly all = branches(DOCS)
  protected readonly expanded = signal<readonly string[]>(["Guides"])
}
