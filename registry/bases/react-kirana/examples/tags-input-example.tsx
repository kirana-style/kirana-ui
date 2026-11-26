/** Tags Input's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import TagsInputDemo from "./tags-input-demo"
import TagsInputClear from "./tags-input-clear"
import TagsInputDisabled from "./tags-input-disabled"
import TagsInputForm from "./tags-input-form"
import TagsInputMax from "./tags-input-max"

export default function TagsInputExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <TagsInputDemo />
      </Example>
      <Example title="Clear" data-showcase>
        <TagsInputClear />
      </Example>
      <Example title="Disabled" data-showcase>
        <TagsInputDisabled />
      </Example>
      <Example title="Form" data-showcase>
        <TagsInputForm />
      </Example>
      <Example title="Max" data-showcase>
        <TagsInputMax />
      </Example>
    </ExampleWrapper>
  )
}
