import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { CopyButton } from "../ui/copy-button"

@Component({
  selector: "copy-button-text",
  imports: [CopyButton, SxDirective],
  template: `
    <div [sx]="page.example">
      <button
        kuiCopyButton
        value="https://ui.kirana.style/docs/components/copy-button"
        variant="outline"
        size="sm"
        copiedLabel="Link copied"
      >
        Copy link
      </button>
    </div>
  `,
})
export default class CopyButtonText {
  protected readonly page = page
}
