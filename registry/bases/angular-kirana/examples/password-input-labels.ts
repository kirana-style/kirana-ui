import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"

/** The show/hide button named in the page's language, as the label is. */
const TOGGLE_LABELS = {
  show: "Tampilkan kata sandi",
  hide: "Sembunyikan kata sandi",
}

@Component({
  selector: "password-input-labels",
  imports: [Field, FieldLabel, PasswordInput, SxDirective],
  template: `
    <div [sx]="page.example" lang="id">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="password-input-labels">Kata sandi</label>
        <div
          kuiPasswordInput
          id="password-input-labels"
          autocomplete="current-password"
          placeholder="Masukkan kata sandi Anda"
          [toggleLabels]="toggleLabels"
        ></div>
      </div>
    </div>
  `,
})
export default class PasswordInputLabels {
  protected readonly page = page
  protected readonly toggleLabels = TOGGLE_LABELS
}
