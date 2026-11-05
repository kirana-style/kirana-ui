import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

@Component({
  selector: "toggle-group-demo",
  imports: [ToggleGroup, ToggleGroupItem, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiToggleGroup variant="outline" multiple>
        <button kuiToggleGroupItem value="bold" aria-label="Toggle bold">
          <svg
            iconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          ></svg>
        </button>
        <button kuiToggleGroupItem value="italic" aria-label="Toggle italic">
          <svg
            iconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          ></svg>
        </button>
        <button
          kuiToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
        >
          <svg
            iconPlaceholder
            lucide="UnderlineIcon"
            tabler="IconUnderline"
            hugeicons="TextUnderlineIcon"
            phosphor="TextUnderlineIcon"
            remixicon="RiUnderline"
          ></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ToggleGroupDemo {
  protected readonly page = page
}
