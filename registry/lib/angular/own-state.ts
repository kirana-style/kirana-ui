/**
 * An ng-primitives part's own state, held as it is when the part is made. ng-primitives 0.131.4
 * shares one state signal between a primitive and every one of its kind nested inside it, unless
 * the primitive provides its state with `inherit: false` (Tabset and Collapsible do; a tab panel or
 * an accordion item does not), and the last one made sets it (LF-019). Read later, a tab panel's
 * state is then a nested tabset's last panel's, and the outer panel never opens. Taken in the
 * part's constructor, before anything inside it exists, it is the part's own.
 */
import { computed, untracked } from "@angular/core"
import type { Signal } from "@angular/core"

export function ownState<T>(state: Signal<T>): Signal<T> {
  const own = untracked(state)
  return computed(() => own)
}
