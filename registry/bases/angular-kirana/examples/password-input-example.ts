/** Password Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import PasswordInputDemo from "./password-input-demo"
import PasswordInputControlled from "./password-input-controlled"
import PasswordInputDisabled from "./password-input-disabled"
import PasswordInputForm from "./password-input-form"
import PasswordInputLabels from "./password-input-labels"

@Component({
  selector: "password-input-example",
  imports: [
    Example,
    ExampleWrapper,
    PasswordInputDemo,
    PasswordInputControlled,
    PasswordInputDisabled,
    PasswordInputForm,
    PasswordInputLabels,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <password-input-demo />
      </div>
      <div kuiExample title="Controlled" data-showcase>
        <password-input-controlled />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <password-input-disabled />
      </div>
      <div kuiExample title="Form" data-showcase>
        <password-input-form />
      </div>
      <div kuiExample title="Labels" data-showcase>
        <password-input-labels />
      </div>
    </div>
  `,
})
export default class PasswordInputExample {}
