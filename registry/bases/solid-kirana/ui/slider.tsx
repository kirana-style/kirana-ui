import { Slider as SliderPrimitive } from "@kirana-ui/solid/slider"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { createMemo, For, mergeProps, splitProps } from "solid-js"

import { slider } from "../../../styles/slider.styles"

type Value = number | number[]

/**
 * A value is one number or several, as Base UI's and Kirana UI's: what `onValueChange` is told is
 * the same kind, in Solid's Ark UI part's details (`{ value }`). The thumbs stay inside the
 * track, as Base UI's `edge`, and each holds its hidden input.
 */
function Slider<V extends Value = Value>(props: {
  defaultValue?: V
  value?: V
  /** Ark's details, the value one number where the caller gave one. */
  onValueChange?: (details: { value: V }) => void
  min?: number
  max?: number
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(mergeProps({ min: 0, max: 100 }, props), [
    "defaultValue",
    "value",
    "onValueChange",
    "min",
    "max",
    "class",
    "sx",
  ])
  // The thumbs counted as React's: one per value of a list, and for one number (or none)
  // upstream's `[min, max]`, both drawing it.
  const thumbs = createMemo(() => {
    const values = Array.isArray(local.value)
      ? local.value
      : Array.isArray(local.defaultValue)
        ? local.defaultValue
        : [local.min, local.max]
    return Array.from({ length: values.length }, (_, index) => index)
  })
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={local.defaultValue}
      value={local.value}
      min={local.min}
      max={local.max}
      thumbAlignment="edge"
      {...rest}
      {...styleProps(local.class, slider.root, local.sx)}
      onValueChange={(value: Value) =>
        local.onValueChange?.({ value: value as V })
      }
    >
      <SliderPrimitive.Control {...styleProps(slider.control)}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          {...styleProps(slider.track)}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            {...styleProps(slider.range)}
          />
        </SliderPrimitive.Track>
        <For each={thumbs()}>
          {() => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              {...styleProps(slider.thumb)}
            />
          )}
        </For>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
