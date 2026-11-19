import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { FileTreeNode } from "../components/file-tree-demo/file-tree-node"
import type { FileNode } from "../components/file-tree-demo/file-tree-node"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" },
    ],
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx",
          },
        ],
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx",
      },
    ],
  },
]

@Component({
  selector: "file-tree-demo",
  imports: [FileTreeNode, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (node of files; track node.path) {
          <kui-file-tree-node
            [node]="node"
            [selected]="selected()"
            (select)="selected.set($event)"
          />
        }
      </div>
    </div>
  `,
})
export default class FileTreeDemo {
  protected readonly selected = signal("components/ui/button.tsx")
  protected readonly styles = styles
  protected readonly files = files
  protected readonly page = page
}
