/** Tour's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import TourDemo from "./tour-demo"
import TourControlled from "./tour-controlled"
import TourPlacement from "./tour-placement"

@Component({
  selector: "tour-example",
  imports: [Example, ExampleWrapper, TourDemo, TourControlled, TourPlacement],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <tour-demo />
      </div>
      <div kuiExample title="Controlled" data-showcase>
        <tour-controlled />
      </div>
      <div kuiExample title="Placement" data-showcase>
        <tour-placement />
      </div>
    </div>
  `,
})
export default class TourExample {}
