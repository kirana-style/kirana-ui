import { FileTreeItem } from "../components/file-tree-item"
import { For, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, space } from "../../../core/scales"
import type { FileTreeEntry } from "../components/file-tree-item"

export default function CollapsibleExample() {
  const styles = {
    collapsibleFileTreeExample: css({
      alignItems: "center",
    }),
    collapsibleFileTreeCard: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: "16rem" },
      gap: { "*": null, base: space[2] },
    }),
    collapsibleFileTreeTabsList: css({
      width: { "*": null, base: "100%" },
    }),
    collapsibleFileTreeDiv: css({
      display: "flex",
      flexDirection: "column",
      gap: space[1],
    }),
    collapsibleSettingsExample: css({
      alignItems: "center",
    }),
    collapsibleSettingsCard: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.xs },
    }),
    collapsibleSettingsCollapsible: css({
      display: { "*": null, base: "flex" },
      alignItems: { "*": null, base: "flex-start" },
      gap: { "*": null, base: space[2] },
    }),
    collapsibleSettingsFieldGroup: css({
      display: { "*": null, base: "grid" },
      width: { "*": null, base: "100%" },
      gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
      gap: { "*": null, base: space[2] },
    }),
    collapsibleSettingsFieldLabel: css({
      borderWidth: { "*": null, base: "0" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderColor: theme.border,
      clipPath: { "*": null, base: "inset(50%)" },
      height: { "*": null, base: "1px" },
      margin: { "*": null, base: "-1px" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: "0" },
      position: { "*": null, base: "absolute" },
      whiteSpace: { "*": null, base: "nowrap" },
      width: { "*": null, base: "1px" },
    }),
    collapsibleSettingsFieldLabel2: css({
      borderWidth: { "*": null, base: "0" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderColor: theme.border,
      clipPath: { "*": null, base: "inset(50%)" },
      height: { "*": null, base: "1px" },
      margin: { "*": null, base: "-1px" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: "0" },
      position: { "*": null, base: "absolute" },
      whiteSpace: { "*": null, base: "nowrap" },
      width: { "*": null, base: "1px" },
    }),
    collapsibleSettingsCollapsibleContent: css({
      gridColumn: { "*": null, base: "1 / -1" },
      display: { "*": null, base: "grid" },
      gridTemplateColumns: { "*": null, base: "subgrid" },
      gap: { "*": null, base: space[2] },
    }),
    collapsibleSettingsFieldLabel3: css({
      borderWidth: { "*": null, base: "0" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderColor: theme.border,
      clipPath: { "*": null, base: "inset(50%)" },
      height: { "*": null, base: "1px" },
      margin: { "*": null, base: "-1px" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: "0" },
      position: { "*": null, base: "absolute" },
      whiteSpace: { "*": null, base: "nowrap" },
      width: { "*": null, base: "1px" },
    }),
    collapsibleSettingsFieldLabel4: css({
      borderWidth: { "*": null, base: "0" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderColor: theme.border,
      clipPath: { "*": null, base: "inset(50%)" },
      height: { "*": null, base: "1px" },
      margin: { "*": null, base: "-1px" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: "0" },
      position: { "*": null, base: "absolute" },
      whiteSpace: { "*": null, base: "nowrap" },
      width: { "*": null, base: "1px" },
    }),
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

  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <ExampleWrapper>
      <Example title="File Tree" sx={styles.collapsibleFileTreeExample}>
        <Card sx={styles.collapsibleFileTreeCard} size="sm">
          <CardHeader>
            <Tabs defaultValue="explorer">
              <TabsList sx={styles.collapsibleFileTreeTabsList}>
                <TabsTrigger value="explorer">Explorer</TabsTrigger>
                <TabsTrigger value="settings">Outline</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div sx={styles.collapsibleFileTreeDiv}>
              <For each={fileTree}>
                {(item) => (
                  <FileTreeItem
                    item={item}
                    folderIcon="Folder01Icon"
                    fileIcon="File01Icon"
                  />
                )}
              </For>
            </div>
          </CardContent>
        </Card>
      </Example>
      <Example title="Settings" sx={styles.collapsibleSettingsExample}>
        <Card sx={styles.collapsibleSettingsCard} size="sm">
          <CardHeader>
            <CardTitle>Radius</CardTitle>
            <CardDescription>
              Set the corner radius of the element.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={isOpen()}
              onOpenChange={(details: { open: ReturnType<typeof isOpen> }) =>
                setIsOpen(details.open)
              }
              sx={styles.collapsibleSettingsCollapsible}
            >
              <FieldGroup sx={styles.collapsibleSettingsFieldGroup}>
                <Field>
                  <FieldLabel
                    for="radius-x"
                    sx={styles.collapsibleSettingsFieldLabel}
                  >
                    Radius X
                  </FieldLabel>
                  <Input id="radius" placeholder="0" value={0} />
                </Field>
                <Field>
                  <FieldLabel
                    for="radius-y"
                    sx={styles.collapsibleSettingsFieldLabel2}
                  >
                    Radius Y
                  </FieldLabel>
                  <Input id="radius" placeholder="0" value={0} />
                </Field>
                <CollapsibleContent
                  sx={styles.collapsibleSettingsCollapsibleContent}
                >
                  <Field>
                    <FieldLabel
                      for="radius-x"
                      sx={styles.collapsibleSettingsFieldLabel3}
                    >
                      Radius X
                    </FieldLabel>
                    <Input id="radius" placeholder="0" value={0} />
                  </Field>
                  <Field>
                    <FieldLabel
                      for="radius-y"
                      sx={styles.collapsibleSettingsFieldLabel4}
                    >
                      Radius Y
                    </FieldLabel>
                    <Input id="radius" placeholder="0" value={0} />
                  </Field>
                </CollapsibleContent>
              </FieldGroup>
              <CollapsibleTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline" size="icon">
                    {isOpen() ? (
                      <IconPlaceholder
                        lucide="MinimizeIcon"
                        tabler="IconMinimize"
                        hugeicons="MinusSignIcon"
                        phosphor="MinusIcon"
                        remixicon="RiSubtractLine"
                      />
                    ) : (
                      <IconPlaceholder
                        lucide="MaximizeIcon"
                        tabler="IconMaximize"
                        hugeicons="PlusSignIcon"
                        phosphor="PlusIcon"
                        remixicon="RiAddLine"
                      />
                    )}
                  </Button>
                )}
              />
            </Collapsible>
          </CardContent>
        </Card>
      </Example>
    </ExampleWrapper>
  )
}
