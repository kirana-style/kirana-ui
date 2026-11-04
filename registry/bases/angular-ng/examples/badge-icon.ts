import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Badge } from "../ui/badge"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "badge-icon",
  imports: [Badge, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap2">
        <span kuiBadge variant="secondary">
          <svg
            iconPlaceholder
            lucide="BadgeCheckIcon"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadgeIcon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          ></svg>
          Verified
        </span>
        <span kuiBadge variant="outline">
          Bookmark
          <svg
            iconPlaceholder
            lucide="BookmarkIcon"
            tabler="IconBookmark"
            hugeicons="BookmarkIcon"
            phosphor="BookmarkIcon"
            remixicon="RiBookmarkLine"
            data-icon="inline-end"
          ></svg>
        </span>
      </div>
    </div>
  `,
})
export default class BadgeIcon {
  protected readonly styles = styles
  protected readonly page = page
}
