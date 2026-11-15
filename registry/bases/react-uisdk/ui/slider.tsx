"use client"

import type { ComponentProps } from "react"

import { props as styleProps } from "@kirana-style/core"
import * as SliderPrimitive from "@ui-sdk/react/slider"

import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { slider } from "../../../styles/slider.styles"

function Slider({
  sx,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Omit<ComponentProps<typeof SliderPrimitive.Slider>, "className"> & {
  sx?: Sx
}) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Slider
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
      render={slotRender("slider", "div", props.render)}
      {...styleProps(slider.root, sx)}
    >
      <SliderPrimitive.SliderControl {...styleProps(slider.control)}>
        <SliderPrimitive.SliderTrack
          {...styleProps(slider.track)}
          render={slotRender("slider-track", "div")}
        >
          <SliderPrimitive.SliderIndicator
            {...styleProps(slider.range)}
            render={slotRender("slider-range", "div")}
          />
        </SliderPrimitive.SliderTrack>
        {Array.from({ length: values.length }, (_, index) => (
          <SliderPrimitive.SliderThumb
            key={index}
            // The value it moves: ui-sdk's thumbs do not take it from their order, as Base UI's do.
            index={index}
            {...styleProps(slider.thumb)}
            render={slotRender("slider-thumb", "div")}
          />
        ))}
      </SliderPrimitive.SliderControl>
    </SliderPrimitive.Slider>
  )
}

export { Slider }
