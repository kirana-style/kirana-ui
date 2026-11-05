import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"

const styles = {
  flexWFullMaxWLgFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}

@Component({
  selector: "item-icon",
  imports: [
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWLgFlexColGa">
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="ShieldAlertIcon"
              tabler="IconShieldExclamation"
              hugeicons="ShieldIcon"
              phosphor="ShieldWarningIcon"
              remixicon="RiShieldLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Security Alert</div>
            <p kuiItemDescription>New login detected from unknown device.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm" variant="outline">Review</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ItemIcon {
  protected readonly styles = styles
  protected readonly page = page
}
