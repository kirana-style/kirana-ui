/** Steps's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import StepsDemo from "./steps-demo"
import StepsIcons from "./steps-icons"
import StepsLinear from "./steps-linear"
import StepsVertical from "./steps-vertical"

export default function StepsExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <StepsDemo />
      </Example>
      <Example title="Icons" data-showcase>
        <StepsIcons />
      </Example>
      <Example title="Linear" data-showcase>
        <StepsLinear />
      </Example>
      <Example title="Vertical" data-showcase>
        <StepsVertical />
      </Example>
    </ExampleWrapper>
  )
}
