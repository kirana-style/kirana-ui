import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { FileTree } from "../components/file-tree"
import type { FileTreeEntry } from "../components/file-tree"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: "16rem" },
    gap: { "*": null, base: space[2] },
  }),
  tabsList: css({ width: { "*": null, base: "100%" } }),
  div: css({ display: "flex", flexDirection: "column", gap: space[1] }),
}

const fileTree: FileTreeEntry[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
          { name: "select.tsx" },
          { name: "table.tsx" },
        ],
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
  },
  {
    name: "hooks",
    items: [
      { name: "use-media-query.ts" },
      { name: "use-debounce.ts" },
      { name: "use-local-storage.ts" },
    ],
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
  },
  {
    name: "public",
    items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }],
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "globals.css" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" },
]

@Component({
  selector: "collapsible-file-tree",
  imports: [
    FileTree,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    TabsList,
    TabsTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card" size="sm">
        <div kuiCardHeader>
          <div kuiTabs defaultValue="explorer">
            <div kuiTabsList [sx]="styles.tabsList">
              <button kuiTabsTrigger value="explorer">Explorer</button>
              <button kuiTabsTrigger value="settings">Outline</button>
            </div>
          </div>
        </div>
        <div kuiCardContent>
          <div kuiFileTree [items]="fileTree" [sx]="styles.div"></div>
        </div>
      </div>
    </div>
  `,
})
export default class CollapsibleFileTree {
  protected readonly styles = styles
  protected readonly fileTree = fileTree
  protected readonly page = page
}
