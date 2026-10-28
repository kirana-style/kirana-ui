"use client"

import { props as styleProps } from "@kirana-style/core"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import type { Sx } from "../../../lib/sx"
import { slider } from "../../../styles/slider.styles"

function Slider({
  sx,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Omit<SliderPrimitive.Root.Props, "className"> & { sx?: Sx }) {
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
            {...styleProps(slider.thumb)}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
