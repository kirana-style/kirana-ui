import { Slider } from "@kirana-ui/react/slider"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "header"
    | "label"
    | "value"
    | "control"
    | "track"
    | "indicator"
    | "thumb"
  >
}) {
  return (
    <Slider.Root defaultValue={40} name="volume" {...s.root}>
      <div {...s.header}>
        <span {...s.label}>Volume</span>
        <Slider.Value {...s.value} />
      </div>
      <Slider.Control {...s.control}>
        <Slider.Track {...s.track}>
          <Slider.Indicator {...s.indicator} />
          <Slider.Thumb aria-label="Volume" {...s.thumb} />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  )
}
