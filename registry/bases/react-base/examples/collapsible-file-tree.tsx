import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { css, relation, props as styleProps } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { theme } from "../../../core/tokens"
import { duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const group = relation("file-tree-group-base")

const styles = {
  renderItemButton: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    transitionProperty: "none",
    transitionDuration: "0s",
    transitionTimingFunction: "ease",
    backgroundColor: { ":hover": theme.accent },
    color: { ":hover": theme.accentForeground },
  }),
  renderItemIconPlaceholder: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [group.within('[data-state="open"]')]: "90deg" },
  }),
  renderItemCollapsibleContent: css({
    marginTop: { "*": null, base: space[1] },
    marginLeft: { "*": null, base: space[5], [axes.style.lyra]: space[4] },
  }),
  renderItemDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  renderItemButton2: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
    color: theme.foreground,
  }),
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: "16rem" },
    gap: { "*": null, base: space[2] },
  }),
  tabsList: css({
    width: { "*": null, base: "100%" },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
}

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

export default function CollapsibleFileTree() {
  const fileTree: FileTreeItem[] = [
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

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                sx={[group.anchor, styles.renderItemButton]}
              />
            }
          >
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              {...styleProps(styles.renderItemIconPlaceholder)}
            />
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
            {fileItem.name}
          </CollapsibleTrigger>
          <CollapsibleContent sx={styles.renderItemCollapsibleContent}>
            <div sx={styles.renderItemDiv}>
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        sx={styles.renderItemButton2}
      >
        <IconPlaceholder
          lucide="FileIcon"
          tabler="IconFile"
          hugeicons="FileIcon"
          phosphor="FileIcon"
          remixicon="RiFileLine"
        />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

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
          <div sx={styles.div}>{fileTree.map((item) => renderItem(item))}</div>
        </CardContent>
      </Card>
    </div>
  )
}
