import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Badge } from "../ui/badge"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function BadgeIcon() {
  const styles = {
    flexFlexWrapGap2: css({
      display: "flex",
      flexWrap: "wrap",
      gap: { "*": null, base: space[2] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap2}>
        <Badge variant="secondary">
          <IconPlaceholder
            lucide="BadgeCheckIcon"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadgeIcon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />{" "}
          Verified
        </Badge>
        <Badge variant="outline">
          Bookmark{" "}
          <IconPlaceholder
            lucide="BookmarkIcon"
            tabler="IconBookmark"
            hugeicons="BookmarkIcon"
            phosphor="BookmarkIcon"
            remixicon="RiBookmarkLine"
            data-icon="inline-end"
          />
        </Badge>
      </div>
    </div>
  )
}
