import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Toggle } from "../ui/toggle"

@Component({
  selector: "toggle-text",
  imports: [Toggle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiToggle aria-label="Toggle italic">
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
    </div>
  `,
})
export default class ToggleText {
  protected readonly page = page
}
