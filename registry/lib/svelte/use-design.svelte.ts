/**
 * An axis of the design `<html>` carries, React's `useDesign` (`lib/use-design.ts`) for Svelte:
 * its attribute, read again as it changes, as `.current`. The default design's before mount.
 */
import { onMount } from "svelte"

import { AXIS_ATTRIBUTES } from "../../core/attributes"
import { DEFAULT_DESIGN_SYSTEM } from "../../core/config"
import type { DesignSystem } from "../../core/config"

type Axis = keyof typeof AXIS_ATTRIBUTES

export function useDesign<A extends Axis>(axis: A) {
  let value = $state(DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A]
  const read = () =>
    (value = (document.documentElement.getAttribute(AXIS_ATTRIBUTES[axis]) ??
      DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A])
  onMount(() => {
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [AXIS_ATTRIBUTES[axis]],
    })
    return () => observer.disconnect()
  })
  return {
    get current() {
      return value
    },
  }
}
