import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Toggle } from "../ui/toggle"

const styles = {
  flexFlexWrapItemsCenterG: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "toggle-outline",
  imports: [Toggle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapItemsCenterG">
        <button kuiToggle variant="outline" aria-label="Toggle italic">
          <svg
            iconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          ></svg>
          Italic
        </button>
        <button kuiToggle variant="outline" aria-label="Toggle bold">
          <svg
            iconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          ></svg>
          Bold
        </button>
      </div>
    </div>
  `,
})
export default class ToggleOutline {
  protected readonly styles = styles
  protected readonly page = page
}
