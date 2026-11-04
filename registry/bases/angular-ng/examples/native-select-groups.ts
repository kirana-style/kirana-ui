import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../ui/native-select"

@Component({
  selector: "native-select-groups",
  imports: [
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiNativeSelect>
        <option kuiNativeSelectOption value="">Select department</option>
        <optgroup kuiNativeSelectOptGroup label="Engineering">
          <option kuiNativeSelectOption value="frontend">Frontend</option>
          <option kuiNativeSelectOption value="backend">Backend</option>
          <option kuiNativeSelectOption value="devops">DevOps</option>
        </optgroup>
        <optgroup kuiNativeSelectOptGroup label="Sales">
          <option kuiNativeSelectOption value="sales-rep">Sales Rep</option>
          <option kuiNativeSelectOption value="account-manager">
            Account Manager
          </option>
          <option kuiNativeSelectOption value="sales-director">
            Sales Director
          </option>
        </optgroup>
        <optgroup kuiNativeSelectOptGroup label="Operations">
          <option kuiNativeSelectOption value="support">
            Customer Support
          </option>
          <option kuiNativeSelectOption value="product-manager">
            Product Manager
          </option>
          <option kuiNativeSelectOption value="ops-manager">
            Operations Manager
          </option>
        </optgroup>
      </div>
    </div>
  `,
})
export default class NativeSelectGroups {
  protected readonly page = page
}
