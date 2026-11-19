import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  size4: css({
    width: { "*": null, base: space[4] },
    height: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "item-link",
  imports: [
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <a kuiItem href="#">
          <div kuiItemContent>
            <div kuiItemTitle>Visit our documentation</div>
            <p kuiItemDescription>
              Learn how to get started with our components.
            </p>
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
        <a
          kuiItem
          variant="outline"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div kuiItemContent>
            <div kuiItemTitle>External resource</div>
            <p kuiItemDescription>
              Opens in a new tab with security attributes.
            </p>
          </div>
          <div kuiItemActions>
            <svg
              iconPlaceholder
              lucide="ExternalLinkIcon"
              tabler="IconExternalLink"
              hugeicons="LinkSquare02Icon"
              phosphor="ArrowSquareOutIcon"
              remixicon="RiExternalLinkLine"
              [sx]="styles.size4"
            ></svg>
          </div>
        </a>
      </div>
    </div>
  `,
})
export default class ItemLink {
  protected readonly styles = styles
  protected readonly page = page
}
