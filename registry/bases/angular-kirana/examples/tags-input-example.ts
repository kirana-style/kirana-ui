/** Tags Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import TagsInputDemo from "./tags-input-demo"
import TagsInputClear from "./tags-input-clear"
import TagsInputDisabled from "./tags-input-disabled"
import TagsInputForm from "./tags-input-form"
import TagsInputMax from "./tags-input-max"

@Component({
  selector: "tags-input-example",
  imports: [
    Example,
    ExampleWrapper,
    TagsInputDemo,
    TagsInputClear,
    TagsInputDisabled,
    TagsInputForm,
    TagsInputMax,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <tags-input-demo />
      </div>
      <div kuiExample title="Clear" data-showcase>
        <tags-input-clear />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <tags-input-disabled />
      </div>
      <div kuiExample title="Form" data-showcase>
        <tags-input-form />
      </div>
      <div kuiExample title="Max" data-showcase>
        <tags-input-max />
      </div>
    </div>
  `,
})
export default class TagsInputExample {}
