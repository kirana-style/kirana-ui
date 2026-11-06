/**
 * An axis of the design `<html>` carries, React's `useDesign` (`lib/use-design.ts`) as an Angular
 * signal: its attribute, read again as it changes. Called where `inject()` works, as a component's
 * field or in its constructor.
 */
import { DestroyRef, inject, signal } from "@angular/core"
import type { Signal } from "@angular/core"

import { AXIS_ATTRIBUTES } from "../../core/attributes"
import { DEFAULT_DESIGN_SYSTEM } from "../../core/config"
import type { DesignSystem } from "../../core/config"

type Axis = keyof typeof AXIS_ATTRIBUTES

export function useDesign<A extends Axis>(axis: A): Signal<DesignSystem[A]> {
  const read = () =>
    (document.documentElement.getAttribute(AXIS_ATTRIBUTES[axis]) ??
      DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A]
  const value = signal(read())
  const observer = new MutationObserver(() => value.set(read()))
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [AXIS_ATTRIBUTES[axis]],
  })
  inject(DestroyRef).onDestroy(() => observer.disconnect())
  return value.asReadonly()
}
