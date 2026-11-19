import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  inputTypesDiv: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[6],
  }),
  inputWithSelectDiv: css({
    display: "flex",
    width: "100%",
    gap: space[2],
  }),
  inputWithSelectInput: css({
    flex: "1 1 0%",
  }),
  inputWithSelectSelectTrigger: css({
    width: { "*": null, base: space[32] },
  }),
  inputWithButtonDiv: css({
    display: "flex",
    width: "100%",
    gap: space[2],
  }),
  inputWithButtonInput: css({
    flex: "1 1 0%",
  }),
  inputWithNativeSelectDiv: css({
    display: "flex",
    width: "100%",
    gap: space[2],
  }),
  inputWithNativeSelectInput: css({
    flex: "1 1 0%",
  }),
  inputFormForm: css({
    width: "100%",
  }),
  inputFormDiv: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
}

@Component({
  selector: "input-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    NativeSelect,
    NativeSelectOption,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- InputBasic -->
      <div kuiExample title="Basic">
        <input kuiInput type="email" placeholder="Email" />
      </div>
      <!-- InputInvalid -->
      <div kuiExample title="Invalid">
        <input kuiInput type="text" placeholder="Error" aria-invalid="true" />
      </div>
      <!-- InputWithLabel -->
      <div kuiExample title="With Label">
        <div kuiField>
          <label kuiFieldLabel for="input-demo-email">Email</label>
          <input
            kuiInput
            id="input-demo-email"
            type="email"
            placeholder="name@example.com"
          />
        </div>
      </div>
      <!-- InputWithDescription -->
      <div kuiExample title="With Description">
        <div kuiField>
          <label kuiFieldLabel for="input-demo-username">Username</label>
          <input
            kuiInput
            id="input-demo-username"
            type="text"
            placeholder="Enter your username"
          />
          <p kuiFieldDescription>Choose a unique username for your account.</p>
        </div>
      </div>
      <!-- InputDisabled -->
      <div kuiExample title="Disabled">
        <div kuiField>
          <label kuiFieldLabel for="input-demo-disabled">Email</label>
          <input
            kuiInput
            id="input-demo-disabled"
            type="email"
            placeholder="Email"
            disabled
          />
        </div>
      </div>
      <!-- InputTypes -->
      <div kuiExample title="Input Types">
        <div [sx]="styles.inputTypesDiv">
          <div kuiField>
            <label kuiFieldLabel for="input-demo-password">Password</label>
            <input
              kuiInput
              id="input-demo-password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-tel">Phone</label>
            <input
              kuiInput
              id="input-demo-tel"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-url">URL</label>
            <input
              kuiInput
              id="input-demo-url"
              type="url"
              placeholder="https://example.com"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-search">Search</label>
            <input
              kuiInput
              id="input-demo-search"
              type="search"
              placeholder="Search"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-number">Number</label>
            <input
              kuiInput
              id="input-demo-number"
              type="number"
              placeholder="123"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-date">Date</label>
            <input kuiInput id="input-demo-date" type="date" />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-time">Time</label>
            <input kuiInput id="input-demo-time" type="time" />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-demo-file">File</label>
            <input kuiInput id="input-demo-file" type="file" />
          </div>
        </div>
      </div>
      <!-- InputWithSelect -->
      <div kuiExample title="With Select">
        <div [sx]="styles.inputWithSelectDiv">
          <input
            kuiInput
            type="text"
            placeholder="Enter amount"
            [sx]="styles.inputWithSelectInput"
          />
          <ng-container kuiSelect defaultValue="usd">
            <button kuiSelectTrigger [sx]="styles.inputWithSelectSelectTrigger">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                <div kuiSelectItem value="usd">USD</div>
                <div kuiSelectItem value="eur">EUR</div>
                <div kuiSelectItem value="gbp">GBP</div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- InputWithButton -->
      <div kuiExample title="With Button">
        <div [sx]="styles.inputWithButtonDiv">
          <input
            kuiInput
            type="search"
            placeholder="Search..."
            [sx]="styles.inputWithButtonInput"
          />
          <button kuiButton>Search</button>
        </div>
      </div>
      <!-- InputWithNativeSelect -->
      <div kuiExample title="With Native Select">
        <div [sx]="styles.inputWithNativeSelectDiv">
          <input
            kuiInput
            type="tel"
            placeholder="(555) 123-4567"
            [sx]="styles.inputWithNativeSelectInput"
          />
          <div kuiNativeSelect value="+1">
            <option kuiNativeSelectOption value="+1">+1</option>
            <option kuiNativeSelectOption value="+44">+44</option>
            <option kuiNativeSelectOption value="+46">+46</option>
          </div>
        </div>
      </div>
      <!-- InputForm -->
      <div kuiExample title="Form">
        <form [sx]="styles.inputFormForm">
          <div kuiFieldGroup>
            <div kuiField>
              <label kuiFieldLabel for="form-name">Name</label>
              <input
                kuiInput
                id="form-name"
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="form-email">Email</label>
              <input
                kuiInput
                id="form-email"
                type="email"
                placeholder="john@example.com"
              />
              <p kuiFieldDescription>
                We'll never share your email with anyone.
              </p>
            </div>
            <div [sx]="styles.inputFormDiv">
              <div kuiField>
                <label kuiFieldLabel for="form-phone">Phone</label>
                <input
                  kuiInput
                  id="form-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div kuiField>
                <label kuiFieldLabel for="form-country">Country</label>
                <ng-container kuiSelect defaultValue="us">
                  <button kuiSelectTrigger id="form-country">
                    <span kuiSelectValue></span>
                  </button>
                  <div kuiSelectContent>
                    <div kuiSelectGroup>
                      <div kuiSelectItem value="us">United States</div>
                      <div kuiSelectItem value="uk">United Kingdom</div>
                      <div kuiSelectItem value="ca">Canada</div>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="form-address">Address</label>
              <input
                kuiInput
                id="form-address"
                type="text"
                placeholder="123 Main St"
              />
            </div>
            <div kuiField orientation="horizontal">
              <button kuiButton type="button" variant="outline">Cancel</button>
              <button kuiButton type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export default class InputExample {
  protected readonly styles = styles
}
