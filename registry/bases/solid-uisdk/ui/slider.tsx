import {
  Slider as SliderPrimitive,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from "@ui-sdk/solid/slider"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { createMemo, For, omit } from "solid-js"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import { slider } from "../../../styles/slider.styles"

type Value = number | number[]

/**
 * ui-sdk's slider, taking Solid's Ark UI parts' props: `value` (with `onValueChange` called with
 * `{ value }`) and `defaultValue`, a number or a list as Base UI's, one thumb per value; each thumb
 * is told which value it moves, which ui-sdk does not take from their order.
 */
function Slider<V extends Value = Value>(props: {
  defaultValue?: V
  value?: V
  /** Ark's details, the value one number where the caller gave one. */
  onValueChange?: (details: { value: V }) => void
  min?: number
  max?: number
  step?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "defaultValue",
    "value",
    "onValueChange",
    "min",
    "max",
    "class",
    "sx"
  )
  const min = () => props.min ?? 0
  const max = () => props.max ?? 100

  /** A thumb per value, or two over the whole range when none is given. */
  const thumbs = createMemo(() => {
    const shape = props.value ?? props.defaultValue
    return Array.isArray(shape) ? shape.length : shape === undefined ? 2 : 1
  })
  return (
    <UisdkPart
      part={SliderPrimitive}
      slotName="slider"
      // One of the two, as ui-sdk asks: the caller's `value`, else a default.
      defaultValue={
        props.value === undefined
          ? (props.defaultValue ?? [min(), max()])
          : undefined
      }
      value={props.value}
      min={min()}
      max={max()}
      {...rest}
      onValueChange={(next: Value) =>
        props.onValueChange?.({ value: next as V })
      }
      {...styleProps(props.class, slider.root, props.sx)}
    >
      <SliderControl {...styleProps(slider.control)}>
        <UisdkPart
          part={SliderTrack}
          slotName="slider-track"
          {...styleProps(slider.track)}
        >
          <UisdkPart
            part={SliderIndicator}
            slotName="slider-range"
            {...styleProps(slider.range)}
          />
        </UisdkPart>
        <For each={Array.from({ length: thumbs() }, (_, index) => index)}>
          {(index) => (
            <UisdkPart
              part={SliderThumb}
              slotName="slider-thumb"
              index={index}
              {...styleProps(slider.thumb)}
            />
          )}
        </For>
      </SliderControl>
    </UisdkPart>
  )
}

export { Slider }
