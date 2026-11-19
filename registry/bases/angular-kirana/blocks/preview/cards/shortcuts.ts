import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Card, CardContent } from "../../../ui/card"
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "../../../ui/item"
import { Kbd } from "../../../ui/kbd"

const styles = {
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  div2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  itemGroup: css({
    gap: { "*": null, base: space[2] },
    color: theme.mutedForeground,
  }),
  item: css({
    borderWidth: { "*": null, base: "0px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    padding: { "*": null, base: space["0"] },
  }),
  itemTitle: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  div3: css({
    display: "flex",
    gap: space[1],
  }),
}

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] },
] as const

@Component({
  selector: "kui-shortcuts",
  imports: [
    Card,
    CardContent,
    Item,
    ItemActions,
    ItemGroup,
    ItemHeader,
    ItemSeparator,
    ItemTitle,
    Kbd,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div [sx]="styles.div">
          <div [sx]="styles.div2">Shortcuts</div>
          <div kuiItemGroup [sx]="styles.itemGroup" data-size="xs">
            @for (entry of shortcuts; track entry; let i = $index) {
              @let label = entry.label;
              @let keys = entry.keys;
              @if (i > 0) {
                <div kuiItemSeparator></div>
              }
              <div kuiItem variant="default" size="xs" [sx]="styles.item">
                <div kuiItemHeader>
                  <div kuiItemTitle [sx]="styles.itemTitle">{{ label }}</div>
                  <div kuiItemActions>
                    <div [sx]="styles.div3">
                      @for (key of keys; track key) {
                        <kbd kuiKbd>{{ key }}</kbd>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Shortcuts {
  protected readonly styles = styles
  protected readonly shortcuts = shortcuts
}
