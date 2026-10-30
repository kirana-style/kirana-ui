/**
 * An axis of the design `<html>` carries, for what a component draws differently by it rather than
 * styles (upstream's preview cards round their chart bars except in Lyra and Sera, and name the
 * design's fonts): its attribute, read again as it changes. The default design's on the server,
 * as a prerendered page is written.
 */
import * as React from "react"

import { AXIS_ATTRIBUTES } from "../core/attributes"
import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
import type { DesignSystem } from "../core/config"

type Axis = keyof typeof AXIS_ATTRIBUTES

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: Object.values(AXIS_ATTRIBUTES),
  })
  return () => observer.disconnect()
}

export function useDesign<A extends Axis>(axis: A): DesignSystem[A] {
  return React.useSyncExternalStore(
    subscribe,
    () =>
      (document.documentElement.getAttribute(AXIS_ATTRIBUTES[axis]) ??
        DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A],
    () => DEFAULT_DESIGN_SYSTEM[axis]
  )
}
