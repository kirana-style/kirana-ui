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
  selector: "item-size",
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
            <div kuiItemTitle>Default Size</div>
            <p kuiItemDescription>The standard size for most use cases.</p>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
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
            <div kuiItemTitle>Small Size</div>
            <p kuiItemDescription>A compact size for dense layouts.</p>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
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
            <div kuiItemTitle>Extra Small Size</div>
            <p kuiItemDescription>The most compact size available.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ItemSize {
  protected readonly styles = styles
  protected readonly page = page
}
