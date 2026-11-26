/** Marquee's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import MarqueeDemo from "./marquee-demo"
import MarqueeFade from "./marquee-fade"
import MarqueePause from "./marquee-pause"
import MarqueeReverse from "./marquee-reverse"
import MarqueeVertical from "./marquee-vertical"

export default function MarqueeExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <MarqueeDemo />
      </Example>
      <Example title="Fade" data-showcase>
        <MarqueeFade />
      </Example>
      <Example title="Pause" data-showcase>
        <MarqueePause />
      </Example>
      <Example title="Reverse" data-showcase>
        <MarqueeReverse />
      </Example>
      <Example title="Vertical" data-showcase>
        <MarqueeVertical />
      </Example>
    </ExampleWrapper>
  )
}
