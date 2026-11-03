<script setup lang="ts">
import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import FileTreeItem from "../components/FileTreeItem.vue"
import type { FileTreeEntry } from "../components/FileTreeItem.vue"
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
</script>

<template>
  <div :sx="page.example">
    <Card :sx="styles.card" size="sm">
      <CardHeader>
        <Tabs default-value="explorer">
          <TabsList :sx="styles.tabsList">
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="settings">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div :sx="styles.div">
          <FileTreeItem
            v-for="item in fileTree"
            :key="item.name"
            :item="item"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
