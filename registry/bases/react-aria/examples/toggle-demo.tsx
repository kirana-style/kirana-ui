import { css, props as styleProps } from "@kirana-style/core"

import { IN_PRESSED_TOGGLE } from "../../../styles/toggle.styles"

import { theme } from "../../../core/tokens"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Toggle } from "../ui/toggle"
import { page } from "../../../styles/page.styles"

const styles = {
  groupAriaPressedToggleFi: css({
    // `group-aria-pressed/toggle:fill-foreground`: the icon fills while the toggle is pressed.
    fill: { [IN_PRESSED_TOGGLE]: theme.foreground },
  }),
}

export default function ToggleDemo() {
  return (
    <div sx={page.example}>
      <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
        <IconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="BookmarkIcon"
          phosphor="BookmarkIcon"
          remixicon="RiBookmarkLine"
          {...styleProps(styles.groupAriaPressedToggleFi)}
        />
        Bookmark
      </Toggle>
    </div>
  )
}
