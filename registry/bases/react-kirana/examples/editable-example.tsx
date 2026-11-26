/** Editable's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import EditableDemo from "./editable-demo"
import EditableDisabled from "./editable-disabled"
import EditableDoubleClick from "./editable-double-click"
import EditableTriggers from "./editable-triggers"

export default function EditableExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <EditableDemo />
      </Example>
      <Example title="Disabled" data-showcase>
        <EditableDisabled />
      </Example>
      <Example title="Double Click" data-showcase>
        <EditableDoubleClick />
      </Example>
      <Example title="Triggers" data-showcase>
        <EditableTriggers />
      </Example>
    </ExampleWrapper>
  )
}
