import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../ui/native-select"

const styles = {
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "native-select-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldLabel,
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- NativeSelectBasic -->
      <div kuiExample title="Basic">
        <div kuiNativeSelect>
          <option kuiNativeSelectOption value="">Select a fruit</option>
          <option kuiNativeSelectOption value="apple">Apple</option>
          <option kuiNativeSelectOption value="banana">Banana</option>
          <option kuiNativeSelectOption value="blueberry">Blueberry</option>
          <option kuiNativeSelectOption value="grapes" disabled>Grapes</option>
          <option kuiNativeSelectOption value="pineapple">Pineapple</option>
        </div>
      </div>
      <!-- NativeSelectWithGroups -->
      <div kuiExample title="With Groups">
        <div kuiNativeSelect>
          <option kuiNativeSelectOption value="">Select a food</option>
          <optgroup kuiNativeSelectOptGroup label="Fruits">
            <option kuiNativeSelectOption value="apple">Apple</option>
            <option kuiNativeSelectOption value="banana">Banana</option>
            <option kuiNativeSelectOption value="blueberry">Blueberry</option>
          </optgroup>
          <optgroup kuiNativeSelectOptGroup label="Vegetables">
            <option kuiNativeSelectOption value="carrot">Carrot</option>
            <option kuiNativeSelectOption value="broccoli">Broccoli</option>
            <option kuiNativeSelectOption value="spinach">Spinach</option>
          </optgroup>
        </div>
      </div>
      <!-- NativeSelectSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiNativeSelect size="sm">
            <option kuiNativeSelectOption value="">Select a fruit</option>
            <option kuiNativeSelectOption value="apple">Apple</option>
            <option kuiNativeSelectOption value="banana">Banana</option>
            <option kuiNativeSelectOption value="blueberry">Blueberry</option>
          </div>
          <div kuiNativeSelect size="default">
            <option kuiNativeSelectOption value="">Select a fruit</option>
            <option kuiNativeSelectOption value="apple">Apple</option>
            <option kuiNativeSelectOption value="banana">Banana</option>
            <option kuiNativeSelectOption value="blueberry">Blueberry</option>
          </div>
        </div>
      </div>
      <!-- NativeSelectWithField -->
      <div kuiExample title="With Field">
        <div kuiField>
          <label kuiFieldLabel for="native-select-country">Country</label>
          <div kuiNativeSelect id="native-select-country">
            <option kuiNativeSelectOption value="">Select a country</option>
            <option kuiNativeSelectOption value="us">United States</option>
            <option kuiNativeSelectOption value="uk">United Kingdom</option>
            <option kuiNativeSelectOption value="ca">Canada</option>
            <option kuiNativeSelectOption value="au">Australia</option>
          </div>
          <p kuiFieldDescription>Select your country of residence.</p>
        </div>
      </div>
      <!-- NativeSelectDisabled -->
      <div kuiExample title="Disabled">
        <div kuiNativeSelect disabled>
          <option kuiNativeSelectOption value="">Disabled</option>
          <option kuiNativeSelectOption value="apple">Apple</option>
          <option kuiNativeSelectOption value="banana">Banana</option>
          <option kuiNativeSelectOption value="blueberry">Blueberry</option>
        </div>
      </div>
      <!-- NativeSelectInvalid -->
      <div kuiExample title="Invalid">
        <div kuiNativeSelect aria-invalid="true">
          <option kuiNativeSelectOption value="">Error state</option>
          <option kuiNativeSelectOption value="apple">Apple</option>
          <option kuiNativeSelectOption value="banana">Banana</option>
          <option kuiNativeSelectOption value="blueberry">Blueberry</option>
        </div>
      </div>
    </div>
  `,
})
export default class NativeSelectExample {
  protected readonly styles = styles
}
