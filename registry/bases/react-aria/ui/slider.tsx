"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  SliderFill,
  Slider as SliderPrimitive,
  SliderThumb,
  SliderTrack,
} from "react-aria-components"
import type { SliderProps as SliderPrimitiveProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { slider } from "../../../styles/slider.styles"

type SliderValue = number | number[]
type SliderProps<T extends SliderValue = SliderValue> = Omit<
  SliderPrimitiveProps<T>,
  "className" | "style"
> & { sx?: Sx }

function Slider<T extends SliderValue = SliderValue>({
  sx,
  ...props
}: SliderProps<T>) {
  return (
    <SliderPrimitive
      data-slot="slider"
      {...props}
      {...styleProps(slider.root, slider.control, sx)}
    >
      {({ state }) => (
        <>
          <SliderTrack data-slot="slider-track" {...styleProps(slider.track)}>
            <SliderFill
              data-slot="slider-range"
              {...styleProps(slider.range, slider.rangeAria)}
            />
          </SliderTrack>
          {state.values.map((_, index) => (
            <SliderThumb
              data-slot="slider-thumb"
              key={index}
              index={index}
              {...styleProps(slider.thumb, slider.thumbAria)}
            />
          ))}
        </>
      )}
    </SliderPrimitive>
  )
}

export { Slider }
