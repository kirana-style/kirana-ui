import {
  SliderControl,
  SliderHiddenInput,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@ark-ui/solid"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  mergeProps,
  onCleanup,
  splitProps,
} from "solid-js"

import { slider } from "../../../styles/slider.styles"

type Value = number | number[]

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
  /**
   * A value is one number or several, as Base UI's: Ark's are always a list, so a single number
   * goes in as one and comes back out as one.
   */
  const list = (next: Value | undefined) =>
    typeof next === "number" ? [next] : next
  const single = createMemo(
    () =>
      typeof local.value === "number" || typeof local.defaultValue === "number"
  )

  /**
   * The thumbs' size, which Ark's `contain` needs to keep them inside the track (Base UI's `edge`)
   * and which each style sets: measured from the first thumb, and again as it changes.
   */
  const [root, setRoot] = createSignal<HTMLElement>()
  const [thumbSize, setThumbSize] = createSignal<{
    width: number
    height: number
  }>()
  createEffect(() => {
    const thumb = root()?.querySelector('[data-slot="slider-thumb"]')
    if (!thumb) return
    const observer = new ResizeObserver(() => {
      const { width, height } = thumb.getBoundingClientRect()
      setThumbSize({ width, height })
    })
    observer.observe(thumb)
    onCleanup(() => observer.disconnect())
  })

  /** A thumb per value, or two over the whole range when none is given. */
  const thumbs = createMemo(
    () =>
      (list(local.value) ?? list(local.defaultValue) ?? [local.min, local.max])
        .length
  )
  return (
    <SliderRoot
      ref={setRoot}
      data-slot="slider"
      defaultValue={list(local.defaultValue)}
      value={list(local.value)}
      min={local.min}
      max={local.max}
      thumbAlignment="contain"
      thumbSize={thumbSize()}
      {...rest}
      {...styleProps(local.class, slider.root, local.sx)}
      onValueChange={(details) =>
        local.onValueChange?.({
          value: (single()
            ? (details.value[0] ?? local.min)
            : details.value) as V,
        })
      }
    >
      <SliderControl {...styleProps(slider.control)}>
        <SliderTrack data-slot="slider-track" {...styleProps(slider.track)}>
          <SliderRange data-slot="slider-range" {...styleProps(slider.range)} />
        </SliderTrack>
        <For each={Array.from({ length: thumbs() }, (_, index) => index)}>
          {(index) => (
            <SliderThumb
              index={index}
              data-slot="slider-thumb"
              {...styleProps(slider.thumb)}
            >
              <SliderHiddenInput />
            </SliderThumb>
          )}
        </For>
      </SliderControl>
    </SliderRoot>
  )
}

export { Slider }
