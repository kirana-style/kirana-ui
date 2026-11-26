/** Segmented Control's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import SegmentedControlDemo from "./segmented-control-demo"
import SegmentedControlDisabled from "./segmented-control-disabled"
import SegmentedControlForm from "./segmented-control-form"
import SegmentedControlIcons from "./segmented-control-icons"
import SegmentedControlSizes from "./segmented-control-sizes"

export default function SegmentedControlExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <SegmentedControlDemo />
      </Example>
      <Example title="Disabled" data-showcase>
        <SegmentedControlDisabled />
      </Example>
      <Example title="Form" data-showcase>
        <SegmentedControlForm />
      </Example>
      <Example title="Icons" data-showcase>
        <SegmentedControlIcons />
      </Example>
      <Example title="Sizes" data-showcase>
        <SegmentedControlSizes />
      </Example>
    </ExampleWrapper>
  )
}
