/** Editable's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import EditableDemo from "./editable-demo"
import EditableDisabled from "./editable-disabled"
import EditableDoubleClick from "./editable-double-click"
import EditableTriggers from "./editable-triggers"

@Component({
  selector: "editable-example",
  imports: [
    Example,
    ExampleWrapper,
    EditableDemo,
    EditableDisabled,
    EditableDoubleClick,
    EditableTriggers,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <editable-demo />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <editable-disabled />
      </div>
      <div kuiExample title="Double Click" data-showcase>
        <editable-double-click />
      </div>
      <div kuiExample title="Triggers" data-showcase>
        <editable-triggers />
      </div>
    </div>
  `,
})
export default class EditableExample {}
