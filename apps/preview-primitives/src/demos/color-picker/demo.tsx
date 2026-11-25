import { ColorPicker } from "@kirana-ui/react/color-picker"
import { Popover } from "@kirana-ui/react/popover"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "trigger"
    | "swatch"
    | "value"
    | "popup"
    | "area"
    | "areaThumb"
    | "slider"
    | "track"
    | "sliderThumb"
    | "label"
    | "labelText"
    | "input"
  >
}) {
  return (
    <ColorPicker.Root name="color" defaultValue="#2563eb" {...s.root}>
      <Popover.Root>
        {/* The trigger shows the colour chosen; pressed, it opens the picker. */}
        <Popover.Trigger {...s.trigger}>
          <ColorPicker.Swatch render={<span />} {...s.swatch} />
          <ColorPicker.ValueText {...s.value} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup aria-label="Brand colour" {...s.popup}>
              <ColorPicker.Area {...s.area}>
                <ColorPicker.AreaThumb aria-label="Colour" {...s.areaThumb} />
              </ColorPicker.Area>
              <ColorPicker.ChannelSlider channel="hue" {...s.slider}>
                <ColorPicker.ChannelSliderTrack {...s.track}>
                  <ColorPicker.ChannelSliderThumb
                    aria-label="Hue"
                    {...s.sliderThumb}
                  />
                </ColorPicker.ChannelSliderTrack>
              </ColorPicker.ChannelSlider>
              <label {...s.label}>
                <span {...s.labelText}>Hex</span>
                <ColorPicker.ChannelInput channel="hex" {...s.input} />
              </label>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </ColorPicker.Root>
  )
}
