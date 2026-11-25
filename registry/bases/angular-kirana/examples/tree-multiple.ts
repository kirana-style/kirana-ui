import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "../ui/tree"

const styles = {
  column: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[3],
  }),
  count: css({ color: theme.mutedForeground }),
}

const PHOTOS = {
  "2026-summer": ["beach.jpg", "harbour.jpg", "sunset.jpg"],
  "2026-winter": ["snow.jpg", "cabin.jpg"],
}

@Component({
  selector: "tree-multiple",
  imports: [
    IconPlaceholder,
    SxDirective,
    Tree,
    TreeGroup,
    TreeItem,
    TreeItemContent,
    TreeItemText,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div
          kuiTree
          aria-label="Photos"
          [selectionMode]="'multiple'"
          [defaultExpandedValue]="albums"
          [selectedValue]="selected()"
          (selectedChanged)="selected.set($event.value)"
        >
          @for (album of albums; track album) {
            <div kuiTreeItem [value]="album" [branch]="true">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                <span kuiTreeItemText>{{ album }}</span>
              </div>
              <div kuiTreeGroup>
                @for (photo of photos[album]; track photo) {
                  <div kuiTreeItem [value]="album + '/' + photo">
                    <div kuiTreeItemContent>
                      <svg
                        iconPlaceholder
                        lucide="ImageIcon"
                        tabler="IconPhoto"
                        hugeicons="ImageIcon"
                        phosphor="ImageIcon"
                        remixicon="RiImageLine"
                      ></svg>
                      <span kuiTreeItemText>{{ photo }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <p [sx]="styles.count" aria-live="polite">
          {{ selected().length }} selected
        </p>
      </div>
    </div>
  `,
})
export default class TreeMultiple {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly photos = PHOTOS
  protected readonly albums = Object.keys(PHOTOS) as (keyof typeof PHOTOS)[]
  protected readonly selected = signal<readonly string[]>([
    "2026-summer/beach.jpg",
    "2026-summer/sunset.jpg",
    "2026-winter/cabin.jpg",
  ])
}
