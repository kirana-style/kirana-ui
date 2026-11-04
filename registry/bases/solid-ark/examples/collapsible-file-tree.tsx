import { FileTreeItem } from "../components/file-tree-item"
import { For } from "solid-js"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import type { FileTreeEntry } from "../components/file-tree-item"

export default function CollapsibleFileTree() {
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
      items: [
        { name: "favicon.ico" },
        { name: "logo.svg" },
        { name: "images" },
      ],
    },
    { name: "app.tsx" },
    { name: "layout.tsx" },
    { name: "globals.css" },
    { name: "package.json" },
    { name: "tsconfig.json" },
    { name: "README.md" },
    { name: ".gitignore" },
  ]

  return (
    <div sx={page.example}>
      <Card sx={styles.card} size="sm">
        <CardHeader>
          <Tabs defaultValue="explorer">
            <TabsList sx={styles.tabsList}>
              <TabsTrigger value="explorer">Explorer</TabsTrigger>
              <TabsTrigger value="settings">Outline</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div sx={styles.div}>
            <For each={fileTree}>{(item) => <FileTreeItem item={item} />}</For>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
