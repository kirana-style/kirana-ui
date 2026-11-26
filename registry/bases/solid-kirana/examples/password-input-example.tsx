/** Password Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import PasswordInputDemo from "./password-input-demo"
import PasswordInputControlled from "./password-input-controlled"
import PasswordInputDisabled from "./password-input-disabled"
import PasswordInputForm from "./password-input-form"
import PasswordInputLabels from "./password-input-labels"

export default function PasswordInputExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <PasswordInputDemo />
      </Example>
      <Example title="Controlled" data-showcase>
        <PasswordInputControlled />
      </Example>
      <Example title="Disabled" data-showcase>
        <PasswordInputDisabled />
      </Example>
      <Example title="Form" data-showcase>
        <PasswordInputForm />
      </Example>
      <Example title="Labels" data-showcase>
        <PasswordInputLabels />
      </Example>
    </ExampleWrapper>
  )
}
