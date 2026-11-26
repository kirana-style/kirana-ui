/** Marquee's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import MarqueeDemo from "./marquee-demo"
import MarqueeFade from "./marquee-fade"
import MarqueePause from "./marquee-pause"
import MarqueeReverse from "./marquee-reverse"
import MarqueeVertical from "./marquee-vertical"

@Component({
  selector: "marquee-example",
  imports: [
    Example,
    ExampleWrapper,
    MarqueeDemo,
    MarqueeFade,
    MarqueePause,
    MarqueeReverse,
    MarqueeVertical,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <marquee-demo />
      </div>
      <div kuiExample title="Fade" data-showcase>
        <marquee-fade />
      </div>
      <div kuiExample title="Pause" data-showcase>
        <marquee-pause />
      </div>
      <div kuiExample title="Reverse" data-showcase>
        <marquee-reverse />
      </div>
      <div kuiExample title="Vertical" data-showcase>
        <marquee-vertical />
      </div>
    </div>
  `,
})
export default class MarqueeExample {}
