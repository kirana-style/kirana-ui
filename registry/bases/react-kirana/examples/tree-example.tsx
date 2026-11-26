/** Tree's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import TreeDemo from "./tree-demo"
import TreeControlled from "./tree-controlled"
import TreeDisabled from "./tree-disabled"
import TreeMultiple from "./tree-multiple"

export default function TreeExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <TreeDemo />
      </Example>
      <Example title="Controlled" data-showcase>
        <TreeControlled />
      </Example>
      <Example title="Disabled" data-showcase>
        <TreeDisabled />
      </Example>
      <Example title="Multiple" data-showcase>
        <TreeMultiple />
      </Example>
    </ExampleWrapper>
  )
}
