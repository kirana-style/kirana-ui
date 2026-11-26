/** Segmented Control's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import SegmentedControlDemo from "./segmented-control-demo"
import SegmentedControlDisabled from "./segmented-control-disabled"
import SegmentedControlForm from "./segmented-control-form"
import SegmentedControlIcons from "./segmented-control-icons"
import SegmentedControlSizes from "./segmented-control-sizes"

@Component({
  selector: "segmented-control-example",
  imports: [
    Example,
    ExampleWrapper,
    SegmentedControlDemo,
    SegmentedControlDisabled,
    SegmentedControlForm,
    SegmentedControlIcons,
    SegmentedControlSizes,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <segmented-control-demo />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <segmented-control-disabled />
      </div>
      <div kuiExample title="Form" data-showcase>
        <segmented-control-form />
      </div>
      <div kuiExample title="Icons" data-showcase>
        <segmented-control-icons />
      </div>
      <div kuiExample title="Sizes" data-showcase>
        <segmented-control-sizes />
      </div>
    </div>
  `,
})
export default class SegmentedControlExample {}
