import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"

@Component({
  selector: "native-select-disabled",
  imports: [NativeSelect, NativeSelectOption, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiNativeSelect disabled>
        <option kuiNativeSelectOption value="">Disabled</option>
        <option kuiNativeSelectOption value="apple">Apple</option>
        <option kuiNativeSelectOption value="banana">Banana</option>
        <option kuiNativeSelectOption value="blueberry">Blueberry</option>
      </div>
    </div>
  `,
})
export default class NativeSelectDisabled {
  protected readonly page = page
}
