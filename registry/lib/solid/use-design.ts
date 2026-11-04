/**
 * An axis of the design `<html>` carries, React's `useDesign` (`lib/use-design.ts`) for Solid: its
 * attribute, read again as it changes, as a signal. The default design's before mount.
 */
import { createSignal, onCleanup, onMount } from "solid-js"
import type { Accessor } from "solid-js"

import { AXIS_ATTRIBUTES } from "../../core/attributes"
import { DEFAULT_DESIGN_SYSTEM } from "../../core/config"
import type { DesignSystem } from "../../core/config"

type Axis = keyof typeof AXIS_ATTRIBUTES

export function useDesign<A extends Axis>(axis: A): Accessor<DesignSystem[A]> {
  const [value, setValue] = createSignal<DesignSystem[A]>(
    DEFAULT_DESIGN_SYSTEM[axis]
  )
  const read = () =>
    setValue(
      () =>
        (document.documentElement.getAttribute(AXIS_ATTRIBUTES[axis]) ??
          DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A]
    )
  onMount(() => {
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [AXIS_ATTRIBUTES[axis]],
    })
    onCleanup(() => observer.disconnect())
  })
  return value
}
