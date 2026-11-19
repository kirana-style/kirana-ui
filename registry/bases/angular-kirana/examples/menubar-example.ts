import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../styles/example.styles"
import { space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

const styles = {
  // `col-span-2`
  span2: css({ gridColumn: "span 2 / span 2" }),
  flexWrapCenter2: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
  w64: css({ width: { "*": null, base: space[64] } }),
  w44: css({ width: { "*": null, base: space[44] } }),
  w40: css({ width: { "*": null, base: space[40] } }),
}

@Component({
  selector: "menubar-example",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Basic">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>File</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                New Tab
                <span kuiMenubarShortcut>⌘T</span>
              </div>
              <div kuiMenubarItem>
                New Window
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem disabled>New Incognito Window</div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>
                Print...
                <span kuiMenubarShortcut>⌘P</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Edit</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                Undo
                <span kuiMenubarShortcut>⌘Z</span>
              </div>
              <div kuiMenubarItem>
                Redo
                <span kuiMenubarShortcut>⇧⌘Z</span>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>Cut</div>
              <div kuiMenubarItem>Copy</div>
              <div kuiMenubarItem>Paste</div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="With Submenu">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>File</button>
            <div kuiMenubarContent>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>Share</div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarItem>Email link</div>
                  <div kuiMenubarItem>Messages</div>
                  <div kuiMenubarItem>Notes</div>
                </div>
              </ng-container>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>
                Print...
                <span kuiMenubarShortcut>⌘P</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Edit</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                Undo
                <span kuiMenubarShortcut>⌘Z</span>
              </div>
              <div kuiMenubarItem>
                Redo
                <span kuiMenubarShortcut>⇧⌘Z</span>
              </div>
              <div kuiMenubarSeparator></div>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>Find</div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarItem>Find...</div>
                  <div kuiMenubarItem>Find Next</div>
                  <div kuiMenubarItem>Find Previous</div>
                </div>
              </ng-container>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>Cut</div>
              <div kuiMenubarItem>Copy</div>
              <div kuiMenubarItem>Paste</div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="Sides" [containerSx]="styles.span2">
        <div [sx]="[styles.flexWrapCenter2, example.row]">
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
            <div kuiMenubar>
              <ng-container kuiMenubarMenu>
                <button kuiMenubarTrigger [sx]="styles.capitalize">
                  {{ side.replace("-", " ") }}
                </button>
                <div kuiMenubarContent [side]="$any(side)">
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>New Tab</div>
                    <div kuiMenubarItem>New Window</div>
                    <div kuiMenubarItem>New Incognito Window</div>
                  </div>
                </div>
              </ng-container>
            </div>
          }
        </div>
      </div>
      <div kuiExample title="With Checkboxes">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>View</button>
            <div kuiMenubarContent [sx]="styles.w64">
              <div kuiMenubarCheckboxItem>Always Show Bookmarks Bar</div>
              <div kuiMenubarCheckboxItem checked>Always Show Full URLs</div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem inset>
                Reload
                <span kuiMenubarShortcut>⌘R</span>
              </div>
              <div kuiMenubarItem disabled inset>
                Force Reload
                <span kuiMenubarShortcut>⇧⌘R</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Format</button>
            <div kuiMenubarContent>
              <div kuiMenubarCheckboxItem checked>Strikethrough</div>
              <div kuiMenubarCheckboxItem>Code</div>
              <div kuiMenubarCheckboxItem>Superscript</div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="With Radio">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Profiles</button>
            <div kuiMenubarContent>
              <div
                kuiMenubarRadioGroup
                [value]="user()"
                (valueChange)="user.set($any($event))"
              >
                <div kuiMenubarRadioItem value="andy">Andy</div>
                <div kuiMenubarRadioItem value="benoit">Benoit</div>
                <div kuiMenubarRadioItem value="luis">Luis</div>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem inset>Edit...</div>
              <div kuiMenubarItem inset>Add Profile...</div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Theme</button>
            <div kuiMenubarContent>
              <div
                kuiMenubarRadioGroup
                [value]="theme()"
                (valueChange)="theme.set($any($event))"
              >
                <div kuiMenubarRadioItem value="light">Light</div>
                <div kuiMenubarRadioItem value="dark">Dark</div>
                <div kuiMenubarRadioItem value="system">System</div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="With Icons">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>File</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="FileIcon"
                  tabler="IconFile"
                  hugeicons="FileIcon"
                  phosphor="FileIcon"
                  remixicon="RiFileLine"
                ></svg>
                New File
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                Open Folder
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="SaveIcon"
                  tabler="IconDeviceFloppy"
                  hugeicons="FloppyDiskIcon"
                  phosphor="FloppyDiskIcon"
                  remixicon="RiSaveLine"
                ></svg>
                Save
                <span kuiMenubarShortcut>⌘S</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>More</button>
            <div kuiMenubarContent>
              <div kuiMenubarGroup>
                <div kuiMenubarItem>
                  <svg
                    iconPlaceholder
                    lucide="CircleDashedIcon"
                    tabler="IconCircleDashed"
                    hugeicons="DashedLineCircleIcon"
                    phosphor="CircleDashedIcon"
                    remixicon="RiLoaderLine"
                  ></svg>
                  Settings
                </div>
                <div kuiMenubarItem>
                  <svg
                    iconPlaceholder
                    lucide="CircleDashedIcon"
                    tabler="IconCircleDashed"
                    hugeicons="DashedLineCircleIcon"
                    phosphor="CircleDashedIcon"
                    remixicon="RiLoaderLine"
                  ></svg>
                  Help
                </div>
                <div kuiMenubarSeparator></div>
                <div kuiMenubarItem variant="destructive">
                  <svg
                    iconPlaceholder
                    lucide="CircleDashedIcon"
                    tabler="IconCircleDashed"
                    hugeicons="DashedLineCircleIcon"
                    phosphor="CircleDashedIcon"
                    remixicon="RiLoaderLine"
                  ></svg>
                  Delete
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="With Shortcuts">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>File</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                New Tab
                <span kuiMenubarShortcut>⌘T</span>
              </div>
              <div kuiMenubarItem>
                New Window
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem>
                Print...
                <span kuiMenubarShortcut>⌘P</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Edit</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                Undo
                <span kuiMenubarShortcut>⌘Z</span>
              </div>
              <div kuiMenubarItem>
                Redo
                <span kuiMenubarShortcut>⇧⌘Z</span>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>
                Cut
                <span kuiMenubarShortcut>⌘X</span>
              </div>
              <div kuiMenubarItem>
                Copy
                <span kuiMenubarShortcut>⌘C</span>
              </div>
              <div kuiMenubarItem>
                Paste
                <span kuiMenubarShortcut>⌘V</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="Format">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Format</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="BoldIcon"
                  tabler="IconBold"
                  hugeicons="TextBoldIcon"
                  phosphor="TextBIcon"
                  remixicon="RiBold"
                ></svg>
                Bold
                <span kuiMenubarShortcut>⌘B</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="ItalicIcon"
                  tabler="IconItalic"
                  hugeicons="TextItalicIcon"
                  phosphor="TextItalicIcon"
                  remixicon="RiItalic"
                ></svg>
                Italic
                <span kuiMenubarShortcut>⌘I</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="UnderlineIcon"
                  tabler="IconUnderline"
                  hugeicons="TextUnderlineIcon"
                  phosphor="TextUnderlineIcon"
                  remixicon="RiUnderline"
                ></svg>
                Underline
                <span kuiMenubarShortcut>⌘U</span>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarCheckboxItem checked>Strikethrough</div>
              <div kuiMenubarCheckboxItem>Code</div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>View</button>
            <div kuiMenubarContent>
              <div kuiMenubarCheckboxItem>Show Ruler</div>
              <div kuiMenubarCheckboxItem checked>Show Grid</div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem inset>Zoom In</div>
              <div kuiMenubarItem inset>Zoom Out</div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="Insert">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Insert</button>
            <div kuiMenubarContent>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>
                  <svg
                    iconPlaceholder
                    lucide="ImageIcon"
                    tabler="IconPhoto"
                    hugeicons="ImageIcon"
                    phosphor="ImageIcon"
                    remixicon="RiImageLine"
                  ></svg>
                  Media
                </div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarItem>Image</div>
                  <div kuiMenubarItem>Video</div>
                  <div kuiMenubarItem>Audio</div>
                </div>
              </ng-container>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="LinkIcon"
                  tabler="IconLink"
                  hugeicons="LinkIcon"
                  phosphor="LinkIcon"
                  remixicon="RiLinksLine"
                ></svg>
                Link
                <span kuiMenubarShortcut>⌘K</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="TableIcon"
                  tabler="IconTable"
                  hugeicons="TableIcon"
                  phosphor="TableIcon"
                  remixicon="RiTableLine"
                ></svg>
                Table
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Tools</button>
            <div kuiMenubarContent [sx]="styles.w44">
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                ></svg>
                Find & Replace
                <span kuiMenubarShortcut>⌘F</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
                Spell Check
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div kuiExample title="Destructive">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>File</button>
            <div kuiMenubarContent [sx]="styles.w40">
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="FileIcon"
                  tabler="IconFile"
                  hugeicons="FileIcon"
                  phosphor="FileIcon"
                  remixicon="RiFileLine"
                ></svg>
                New File
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                Open Folder
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                ></svg>
                Delete File
                <span kuiMenubarShortcut>⌘⌫</span>
              </div>
            </div>
          </ng-container>
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>Account</button>
            <div kuiMenubarContent>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                ></svg>
                Profile
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="GearIcon"
                  remixicon="RiSettingsLine"
                ></svg>
                Settings
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="LogOutIcon"
                  tabler="IconLogout"
                  hugeicons="LogoutIcon"
                  phosphor="SignOutIcon"
                  remixicon="RiLogoutBoxLine"
                ></svg>
                Sign out
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem variant="destructive">
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
          </ng-container>
        </div>
      </div>
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Menubar Example</h2>
              <p kuiDialogDescription>
                Use the menubar below to see the menu options.
              </p>
            </div>
            <div kuiMenubar>
              <ng-container kuiMenubarMenu>
                <button kuiMenubarTrigger>File</button>
                <div kuiMenubarContent>
                  <div kuiMenubarItem>
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
                  <div kuiMenubarItem>
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
                  <div kuiMenubarItem>
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
                  <div kuiMenubarSeparator></div>
                  <ng-container kuiMenubarSub>
                    <div kuiMenubarSubTrigger>More Options</div>
                    <div kuiMenubarSubContent>
                      <div kuiMenubarItem>Save Page...</div>
                      <div kuiMenubarItem>Create Shortcut...</div>
                      <div kuiMenubarItem>Name Window...</div>
                      <div kuiMenubarSeparator></div>
                      <div kuiMenubarItem>Developer Tools</div>
                    </div>
                  </ng-container>
                  <div kuiMenubarSeparator></div>
                  <div kuiMenubarItem variant="destructive">
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
              </ng-container>
              <ng-container kuiMenubarMenu>
                <button kuiMenubarTrigger>Edit</button>
                <div kuiMenubarContent>
                  <div kuiMenubarItem>
                    Undo
                    <span kuiMenubarShortcut>⌘Z</span>
                  </div>
                  <div kuiMenubarItem>
                    Redo
                    <span kuiMenubarShortcut>⇧⌘Z</span>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </ng-container>
      </div>
      <div kuiExample title="With Inset">
        <div kuiMenubar [sx]="example.row">
          <ng-container kuiMenubarMenu>
            <button kuiMenubarTrigger>View</button>
            <div kuiMenubarContent [sx]="styles.w44">
              <div kuiMenubarGroup>
                <div kuiMenubarLabel>Actions</div>
                <div kuiMenubarItem>
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
                <div kuiMenubarItem>
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
                <div kuiMenubarItem inset>Paste</div>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarGroup>
                <div kuiMenubarLabel inset>Appearance</div>
                <div
                  kuiMenubarCheckboxItem
                  inset
                  [checked]="showBookmarks()"
                  (checkedChange)="showBookmarks.set($any($event))"
                >
                  Bookmarks
                </div>
                <div
                  kuiMenubarCheckboxItem
                  inset
                  [checked]="showUrls()"
                  (checkedChange)="showUrls.set($any($event))"
                >
                  Full URLs
                </div>
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarGroup>
                <div kuiMenubarLabel inset>Theme</div>
                <div
                  kuiMenubarRadioGroup
                  [value]="themeWithInset()"
                  (valueChange)="themeWithInset.set($any($event))"
                >
                  <div kuiMenubarRadioItem inset value="light">Light</div>
                  <div kuiMenubarRadioItem inset value="dark">Dark</div>
                  <div kuiMenubarRadioItem inset value="system">System</div>
                </div>
              </div>
              <div kuiMenubarSeparator></div>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger inset>More Options</div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>Save Page...</div>
                    <div kuiMenubarItem>Create Shortcut...</div>
                  </div>
                </div>
              </ng-container>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export default class MenubarExample {
  protected readonly user = signal("benoit")
  protected readonly theme = signal("system")
  protected readonly showBookmarks = signal(true)
  protected readonly showUrls = signal(false)
  protected readonly themeWithInset = signal("system")
  protected readonly styles = styles
  protected readonly example = example
}
