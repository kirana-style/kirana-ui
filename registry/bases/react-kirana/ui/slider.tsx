"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { props as styleProps } from "@kirana-style/core"
import { Slider as SliderPrimitive } from "@kirana-ui/react/slider"

import type { Sx } from "../../../lib/sx"
import { slider } from "../../../styles/slider.styles"

function Slider({
  sx,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Omit<PartProps<typeof SliderPrimitive.Root>, "className"> & { sx?: Sx }) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
      {...styleProps(slider.root, sx)}
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
        {Array.from({ length: values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            // Unnamed, every thumb takes the first value in 0.1.1 (PF-021); a single value's two
            // thumbs (upstream's `[min, max]`) both draw it, as on Base UI.
            index={Array.isArray(value ?? defaultValue) ? index : undefined}
            {...styleProps(slider.thumb)}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
