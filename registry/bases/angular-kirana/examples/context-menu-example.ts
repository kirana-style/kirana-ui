import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "context-menu-example",
  imports: [
    Button,
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ContextMenuBasic -->
      <div kuiExample title="Basic">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>Back</div>
              <div kuiContextMenuItem disabled>Forward</div>
              <div kuiContextMenuItem>Reload</div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithIcons -->
      <div kuiExample title="With Icons">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
                Copy
              </div>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsLine"
                ></svg>
                Cut
              </div>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ClipboardPasteIcon"
                  tabler="IconClipboard"
                  hugeicons="ClipboardIcon"
                  phosphor="ClipboardIcon"
                  remixicon="RiClipboardLine"
                ></svg>
                Paste
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                ></svg>
                Delete
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithSides -->
      <div kuiExample title="With Sides" [containerSx]="styles.span2">
        <div [sx]="styles.flexFlexWrapJustifyCente">
          @for (
            side of [
              "inline-start",
              "left",
              "top",
              "bottom",
              "right",
              "inline-end",
            ];
            track side
          ) {
            <ng-container kuiContextMenu>
              <div kuiContextMenuTrigger [sx]="styles.flexAspect205ItemsCenter">
                {{ side.replace("-", " ") }}
              </div>
              <div kuiContextMenuContent [side]="$any(side)">
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem>Back</div>
                  <div kuiContextMenuItem>Forward</div>
                  <div kuiContextMenuItem>Reload</div>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- ContextMenuWithShortcuts -->
      <div kuiExample title="With Shortcuts">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                Back
                <span kuiContextMenuShortcut>⌘[</span>
              </div>
              <div kuiContextMenuItem disabled>
                Forward
                <span kuiContextMenuShortcut>⌘]</span>
              </div>
              <div kuiContextMenuItem>
                Reload
                <span kuiContextMenuShortcut>⌘R</span>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                Save
                <span kuiContextMenuShortcut>⌘S</span>
              </div>
              <div kuiContextMenuItem>
                Save As...
                <span kuiContextMenuShortcut>⇧⌘S</span>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithSubmenu -->
      <div kuiExample title="With Submenu">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                Copy
                <span kuiContextMenuShortcut>⌘C</span>
              </div>
              <div kuiContextMenuItem>
                Cut
                <span kuiContextMenuShortcut>⌘X</span>
              </div>
            </div>
            <ng-container kuiContextMenuSub>
              <div kuiContextMenuSubTrigger>More Tools</div>
              <div kuiContextMenuSubContent>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem>Save Page...</div>
                  <div kuiContextMenuItem>Create Shortcut...</div>
                  <div kuiContextMenuItem>Name Window...</div>
                </div>
                <div kuiContextMenuSeparator></div>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem>Developer Tools</div>
                </div>
                <div kuiContextMenuSeparator></div>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem variant="destructive">Delete</div>
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithGroups -->
      <div kuiExample title="With Groups, Labels & Separators">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel>File</div>
              <div kuiContextMenuItem>
                New File
                <span kuiContextMenuShortcut>⌘N</span>
              </div>
              <div kuiContextMenuItem>
                Open File
                <span kuiContextMenuShortcut>⌘O</span>
              </div>
              <div kuiContextMenuItem>
                Save
                <span kuiContextMenuShortcut>⌘S</span>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel>Edit</div>
              <div kuiContextMenuItem>
                Undo
                <span kuiContextMenuShortcut>⌘Z</span>
              </div>
              <div kuiContextMenuItem>
                Redo
                <span kuiContextMenuShortcut>⇧⌘Z</span>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                Cut
                <span kuiContextMenuShortcut>⌘X</span>
              </div>
              <div kuiContextMenuItem>
                Copy
                <span kuiContextMenuShortcut>⌘C</span>
              </div>
              <div kuiContextMenuItem>
                Paste
                <span kuiContextMenuShortcut>⌘V</span>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem variant="destructive">
                Delete
                <span kuiContextMenuShortcut>⌫</span>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithCheckboxes -->
      <div kuiExample title="With Checkboxes">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuCheckboxItem defaultChecked>
                Show Bookmarks Bar
              </div>
              <div kuiContextMenuCheckboxItem>Show Full URLs</div>
              <div kuiContextMenuCheckboxItem defaultChecked>
                Show Developer Tools
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithRadio -->
      <div kuiExample title="With Radio Group">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel>People</div>
              <div kuiContextMenuRadioGroup [(value)]="user">
                <div kuiContextMenuRadioItem value="pedro">Pedro Duarte</div>
                <div kuiContextMenuRadioItem value="colm">Colm Tuite</div>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel>Theme</div>
              <div kuiContextMenuRadioGroup [(value)]="colorTheme">
                <div kuiContextMenuRadioItem value="light">Light</div>
                <div kuiContextMenuRadioItem value="dark">Dark</div>
                <div kuiContextMenuRadioItem value="system">System</div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithDestructive -->
      <div kuiExample title="With Destructive Items">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="PencilIcon"
                  tabler="IconPencil"
                  hugeicons="EditIcon"
                  phosphor="PencilIcon"
                  remixicon="RiPencilLine"
                ></svg>
                Edit
              </div>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ShareIcon"
                  tabler="IconShare"
                  hugeicons="ShareIcon"
                  phosphor="ShareIcon"
                  remixicon="RiShareLine"
                ></svg>
                Share
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ArchiveIcon"
                  tabler="IconArchive"
                  hugeicons="Archive02Icon"
                  phosphor="ArchiveIcon"
                  remixicon="RiArchiveLine"
                ></svg>
                Archive
              </div>
              <div kuiContextMenuItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                ></svg>
                Delete
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuInDialog -->
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Context Menu Example</h2>
              <p kuiDialogDescription>
                Right click on the area below to see the context menu.
              </p>
            </div>
            <ng-container kuiContextMenu>
              <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
                Right click here
              </div>
              <div kuiContextMenuContent>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="CopyIcon"
                      tabler="IconCopy"
                      hugeicons="CopyIcon"
                      phosphor="CopyIcon"
                      remixicon="RiFileCopyLine"
                    ></svg>
                    Copy
                  </div>
                  <div kuiContextMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="ScissorsIcon"
                      tabler="IconCut"
                      hugeicons="ScissorIcon"
                      phosphor="ScissorsIcon"
                      remixicon="RiScissorsLine"
                    ></svg>
                    Cut
                  </div>
                  <div kuiContextMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="ClipboardPasteIcon"
                      tabler="IconClipboard"
                      hugeicons="ClipboardIcon"
                      phosphor="ClipboardIcon"
                      remixicon="RiClipboardLine"
                    ></svg>
                    Paste
                  </div>
                </div>
                <div kuiContextMenuSeparator></div>
                <ng-container kuiContextMenuSub>
                  <div kuiContextMenuSubTrigger>More Options</div>
                  <div kuiContextMenuSubContent>
                    <div kuiContextMenuGroup>
                      <div kuiContextMenuItem>Save Page...</div>
                      <div kuiContextMenuItem>Create Shortcut...</div>
                      <div kuiContextMenuItem>Name Window...</div>
                    </div>
                    <div kuiContextMenuSeparator></div>
                    <div kuiContextMenuGroup>
                      <div kuiContextMenuItem>Developer Tools</div>
                    </div>
                  </div>
                </ng-container>
                <div kuiContextMenuSeparator></div>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem variant="destructive">
                    <svg
                      iconPlaceholder
                      lucide="TrashIcon"
                      tabler="IconTrash"
                      hugeicons="DeleteIcon"
                      phosphor="TrashIcon"
                      remixicon="RiDeleteBinLine"
                    ></svg>
                    Delete
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
      <!-- ContextMenuWithInset -->
      <div kuiExample title="With Inset">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspect205WFullItemsC">
            Right click here
          </div>
          <div kuiContextMenuContent [sx]="styles.w44">
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel>Actions</div>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
                Copy
              </div>
              <div kuiContextMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsLine"
                ></svg>
                Cut
              </div>
              <div kuiContextMenuItem inset>Paste</div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel inset>Appearance</div>
              <div kuiContextMenuCheckboxItem inset [(checked)]="showBookmarks">
                Bookmarks
              </div>
              <div kuiContextMenuCheckboxItem inset [(checked)]="showUrls">
                Full URLs
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuLabel inset>Theme</div>
              <div kuiContextMenuRadioGroup [(value)]="insetColorTheme">
                <div kuiContextMenuRadioItem inset value="light">Light</div>
                <div kuiContextMenuRadioItem inset value="dark">Dark</div>
                <div kuiContextMenuRadioItem inset value="system">System</div>
              </div>
            </div>
            <div kuiContextMenuSeparator></div>
            <ng-container kuiContextMenuSub>
              <div kuiContextMenuSubTrigger inset>More Options</div>
              <div kuiContextMenuSubContent>
                <div kuiContextMenuGroup>
                  <div kuiContextMenuItem>Save Page...</div>
                  <div kuiContextMenuItem>Create Shortcut...</div>
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ContextMenuExample {
  protected readonly user = signal("pedro")
  protected readonly colorTheme = signal("light")
  protected readonly showBookmarks = signal(true)
  protected readonly showUrls = signal(false)
  protected readonly insetColorTheme = signal("system")
  protected readonly styles = styles
}
