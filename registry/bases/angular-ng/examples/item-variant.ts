import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}

@Component({
  selector: "item-variant",
  imports: [
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <div kuiItem>
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Default Variant</div>
            <p kuiItemDescription>Transparent background with no border.</p>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Outline Variant</div>
            <p kuiItemDescription>Outlined style with a visible border.</p>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Muted Variant</div>
            <p kuiItemDescription>Muted background for secondary content.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ItemVariant {
  protected readonly styles = styles
  protected readonly page = page
}
