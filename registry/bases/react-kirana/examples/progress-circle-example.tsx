/** Progress Circle's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import ProgressCircleDemo from "./progress-circle-demo"
import ProgressCircleAnimated from "./progress-circle-animated"
import ProgressCircleIndeterminate from "./progress-circle-indeterminate"
import ProgressCircleSizes from "./progress-circle-sizes"

export default function ProgressCircleExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <ProgressCircleDemo />
      </Example>
      <Example title="Animated" data-showcase>
        <ProgressCircleAnimated />
      </Example>
      <Example title="Indeterminate" data-showcase>
        <ProgressCircleIndeterminate />
      </Example>
      <Example title="Sizes" data-showcase>
        <ProgressCircleSizes />
      </Example>
    </ExampleWrapper>
  )
}
