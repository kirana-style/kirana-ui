/**
 * An axis of the design `<html>` carries, React's `useDesign` (`lib/use-design.ts`) as a Vue ref:
 * its attribute, read again as it changes. The default design's before the page mounts.
 */
import { onMounted, onScopeDispose, ref } from "vue"
import type { Ref } from "vue"

import { AXIS_ATTRIBUTES } from "../../core/attributes"
import { DEFAULT_DESIGN_SYSTEM } from "../../core/config"
import type { DesignSystem } from "../../core/config"

type Axis = keyof typeof AXIS_ATTRIBUTES

export function useDesign<A extends Axis>(
  axis: A
): Readonly<Ref<DesignSystem[A]>> {
  const value = ref(DEFAULT_DESIGN_SYSTEM[axis]) as Ref<DesignSystem[A]>
  const read = () =>
    (value.value = (document.documentElement.getAttribute(
      AXIS_ATTRIBUTES[axis]
    ) ?? DEFAULT_DESIGN_SYSTEM[axis]) as DesignSystem[A])
  let observer: MutationObserver | undefined
  onMounted(() => {
    read()
    observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [AXIS_ATTRIBUTES[axis]],
    })
  })
  onScopeDispose(() => observer?.disconnect())
  return value
}
