/** Time Field's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import TimeFieldDemo from "./time-field-demo"
import TimeField24Hour from "./time-field-24-hour"
import TimeFieldDisabled from "./time-field-disabled"
import TimeFieldForm from "./time-field-form"
import TimeFieldSeconds from "./time-field-seconds"

export default function TimeFieldExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <TimeFieldDemo />
      </Example>
      <Example title="24 Hour" data-showcase>
        <TimeField24Hour />
      </Example>
      <Example title="Disabled" data-showcase>
        <TimeFieldDisabled />
      </Example>
      <Example title="Form" data-showcase>
        <TimeFieldForm />
      </Example>
      <Example title="Seconds" data-showcase>
        <TimeFieldSeconds />
      </Example>
    </ExampleWrapper>
  )
}
