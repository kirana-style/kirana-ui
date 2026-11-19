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
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
  size5: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
  }),
  size4: css({
    width: { "*": null, base: space[4] },
    height: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "item-demo",
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
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Basic Item</div>
            <p kuiItemDescription>A simple item with title and description.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <a kuiItem variant="outline" size="sm" href="#">
          <div kuiItemMedia>
            <svg
              iconPlaceholder
              lucide="BadgeCheckIcon"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadgeIcon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              [sx]="styles.size5"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Your profile has been verified.</div>
          </div>
          <div kuiItemActions>
            <svg
              iconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              [sx]="styles.size4"
            ></svg>
          </div>
        </a>
      </div>
    </div>
  `,
})
export default class ItemDemo {
  protected readonly styles = styles
  protected readonly page = page
}
