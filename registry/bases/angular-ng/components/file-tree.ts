/**
 * `collapsible-file-tree`'s tree, on the element the caller writes (`<div kuiFileTree [items]="…">`):
 * a folder opens on its entries, a file is a link. Vue's is a component per entry; an Angular
 * component would draw an element of its own around each, so this one draws every entry from one
 * template that repeats itself (`ngTemplateOutlet`), as Vue's and React's draw no wrapper.
 */
import { NgTemplateOutlet } from "@angular/common"
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { fileTree } from "../../../styles/file-tree.styles"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

export type FileTreeEntry =
  | { name: string }
  | { name: string; items: FileTreeEntry[] }

@Component({
  selector: "[kuiFileTree]",
  imports: [
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    IconPlaceholder,
    NgTemplateOutlet,
    SxDirective,
  ],
  template: `
    <ng-template #entry let-item>
      @if (folder(item); as folder) {
        <div kuiCollapsible>
          <button
            kuiButton
            kuiCollapsibleTrigger
            variant="ghost"
            size="sm"
            [sx]="styles.folder"
          >
            <svg
              iconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              [sx]="styles.chevron"
            ></svg>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              [hugeicons]="folderIcon()"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            {{ item.name }}
          </button>
          <div kuiCollapsibleContent [sx]="styles.content">
            <div [sx]="styles.entries">
              @for (child of folder.items; track child.name) {
                <ng-container
                  *ngTemplateOutlet="entry; context: { $implicit: child }"
                />
              }
            </div>
          </div>
        </div>
      } @else {
        <button kuiButton variant="link" size="sm" [sx]="styles.file">
          <svg
            iconPlaceholder
            lucide="FileIcon"
            tabler="IconFile"
            [hugeicons]="fileIcon()"
            phosphor="FileIcon"
            remixicon="RiFileLine"
          ></svg>
          <span>{{ item.name }}</span>
        </button>
      }
    </ng-template>
    @for (item of items(); track item.name) {
      <ng-container *ngTemplateOutlet="entry; context: { $implicit: item }" />
    }
  `,
})
export class FileTree {
  readonly items = input.required<readonly FileTreeEntry[]>()
  /** The Hugeicons names, which upstream's two copies of the tree draw differently. */
  readonly folderIcon = input("FolderIcon")
  readonly fileIcon = input("FileIcon")
  protected readonly styles = fileTree

  protected folder(item: FileTreeEntry) {
    return "items" in item ? item : null
  }
}
