import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"

@Component({
  selector: "native-select-demo",
  imports: [NativeSelect, NativeSelectOption, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiNativeSelect>
        <option kuiNativeSelectOption value="">Select status</option>
        <option kuiNativeSelectOption value="todo">Todo</option>
        <option kuiNativeSelectOption value="in-progress">In Progress</option>
        <option kuiNativeSelectOption value="done">Done</option>
        <option kuiNativeSelectOption value="cancelled">Cancelled</option>
      </div>
    </div>
  `,
})
export default class NativeSelectDemo {
  protected readonly page = page
}
