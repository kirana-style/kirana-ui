<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"

const styles = {
  // `col-span-2`
  span2: css({ gridColumn: "span 2 / span 2" }),
  flexAspect205WFullItemsC: css({
    display: "flex",
    aspectRatio: "2 / 0.5",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  flexFlexWrapJustifyCente: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  flexAspect205ItemsCenter: css({
    display: "flex",
    aspectRatio: "2 / 0.5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
    padding: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textTransform: { "*": null, base: "capitalize" },
  }),
  w44: css({ width: { "*": null, base: space[44] } }),
}

const user = ref("pedro")

const colorTheme = ref("light")

const showBookmarks = ref(true)

const showUrls = ref(false)

const insetColorTheme = ref("system")
</script>

<template>
  <ExampleWrapper>
    <!-- ContextMenuBasic -->
    <Example title="Basic">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem disabled>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithIcons -->
    <Example title="With Icons">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="CopyIcon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ScissorsIcon"
                tabler="IconCut"
                hugeicons="ScissorIcon"
                phosphor="ScissorsIcon"
                remixicon="RiScissorsLine"
              />
              Cut
            </ContextMenuItem>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ClipboardPasteIcon"
                tabler="IconClipboard"
                hugeicons="ClipboardIcon"
                phosphor="ClipboardIcon"
                remixicon="RiClipboardLine"
              />
              Paste
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithSides -->
    <Example title="With Sides" :container-sx="styles.span2">
      <div :sx="styles.flexFlexWrapJustifyCente">
        <ContextMenu
          v-for="side in [
            'inline-start',
            'left',
            'top',
            'bottom',
            'right',
            'inline-end',
          ] as const"
          :key="side"
        >
          <ContextMenuTrigger :sx="styles.flexAspect205ItemsCenter">{{
            side.replace("-", " ")
          }}</ContextMenuTrigger>
          <ContextMenuContent :side="side">
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </Example>
    <!-- ContextMenuWithShortcuts -->
    <Example title="With Shortcuts">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Save
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Save As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithSubmenu -->
    <Example title="With Submenu">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithGroups -->
    <Example title="With Groups, Labels & Separators">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>File</ContextMenuLabel>
            <ContextMenuItem>
              New File
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Open File
              <ContextMenuShortcut>⌘O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Save
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Edit</ContextMenuLabel>
            <ContextMenuItem>
              Undo
              <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Redo
              <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Paste
              <ContextMenuShortcut>⌘V</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem variant="destructive">
              Delete
              <ContextMenuShortcut>⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithCheckboxes -->
    <Example title="With Checkboxes">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuCheckboxItem default-checked
              >Show Bookmarks Bar</ContextMenuCheckboxItem
            >
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem default-checked
              >Show Developer Tools</ContextMenuCheckboxItem
            >
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithRadio -->
    <Example title="With Radio Group">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuRadioGroup v-model="user">
              <ContextMenuRadioItem value="pedro"
                >Pedro Duarte</ContextMenuRadioItem
              >
              <ContextMenuRadioItem value="colm"
                >Colm Tuite</ContextMenuRadioItem
              >
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Theme</ContextMenuLabel>
            <ContextMenuRadioGroup v-model="colorTheme">
              <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
              <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
              <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuWithDestructive -->
    <Example title="With Destructive Items">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="PencilIcon"
                tabler="IconPencil"
                hugeicons="EditIcon"
                phosphor="PencilIcon"
                remixicon="RiPencilLine"
              />
              Edit
            </ContextMenuItem>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare"
                hugeicons="ShareIcon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              />
              Share
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ArchiveIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              />
              Archive
            </ContextMenuItem>
            <ContextMenuItem variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
    <!-- ContextMenuInDialog -->
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Open Dialog </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Context Menu Example</DialogTitle>
            <DialogDescription>
              Right click on the area below to see the context menu.
            </DialogDescription>
          </DialogHeader>
          <ContextMenu>
            <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
              >Right click here</ContextMenuTrigger
            >
            <ContextMenuContent>
              <ContextMenuGroup>
                <ContextMenuItem>
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                  Copy
                </ContextMenuItem>
                <ContextMenuItem>
                  <IconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  />
                  Cut
                </ContextMenuItem>
                <ContextMenuItem>
                  <IconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  />
                  Paste
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuGroup>
                    <ContextMenuItem>Save Page...</ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuItem>Name Window...</ContextMenuItem>
                  </ContextMenuGroup>
                  <ContextMenuSeparator />
                  <ContextMenuGroup>
                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                  </ContextMenuGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                  Delete
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        </DialogContent>
      </Dialog>
    </Example>
    <!-- ContextMenuWithInset -->
    <Example title="With Inset">
      <ContextMenu>
        <ContextMenuTrigger :sx="styles.flexAspect205WFullItemsC"
          >Right click here</ContextMenuTrigger
        >
        <ContextMenuContent :sx="styles.w44">
          <ContextMenuGroup>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="CopyIcon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ScissorsIcon"
                tabler="IconCut"
                hugeicons="ScissorIcon"
                phosphor="ScissorsIcon"
                remixicon="RiScissorsLine"
              />
              Cut
            </ContextMenuItem>
            <ContextMenuItem inset>Paste</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel inset>Appearance</ContextMenuLabel>
            <ContextMenuCheckboxItem inset v-model:checked="showBookmarks"
              >Bookmarks</ContextMenuCheckboxItem
            >
            <ContextMenuCheckboxItem inset v-model:checked="showUrls"
              >Full URLs</ContextMenuCheckboxItem
            >
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel inset>Theme</ContextMenuLabel>
            <ContextMenuRadioGroup v-model="insetColorTheme">
              <ContextMenuRadioItem inset value="light"
                >Light</ContextMenuRadioItem
              >
              <ContextMenuRadioItem inset value="dark"
                >Dark</ContextMenuRadioItem
              >
              <ContextMenuRadioItem inset value="system"
                >System</ContextMenuRadioItem
              >
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Options</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
  </ExampleWrapper>
</template>
