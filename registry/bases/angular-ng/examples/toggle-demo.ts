import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { IN_PRESSED_TOGGLE } from "../../../styles/toggle.styles"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Toggle } from "../ui/toggle"

const styles = {
  groupAriaPressedToggleFi: css({
    // `group-aria-pressed/toggle:fill-foreground`: the icon fills while the toggle is pressed.
    fill: { [IN_PRESSED_TOGGLE]: theme.foreground },
  }),
}

@Component({
  selector: "toggle-demo",
  imports: [Toggle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <button
        kuiToggle
        aria-label="Toggle bookmark"
        size="sm"
        variant="outline"
      >
        <svg
          iconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="BookmarkIcon"
          phosphor="BookmarkIcon"
          remixicon="RiBookmarkLine"
          [sx]="styles.groupAriaPressedToggleFi"
        ></svg>
        Bookmark
      </button>
    </div>
  `,
})
export default class ToggleDemo {
  protected readonly styles = styles
  protected readonly page = page
}
