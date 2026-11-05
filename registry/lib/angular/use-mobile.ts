/**
 * Whether the screen is narrower than the `md` breakpoint: the React hook's (`../use-mobile.ts`)
 * for the Angular examples, a signal that follows the viewport.
 */
import { DestroyRef, inject, signal } from "@angular/core"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  const isMobile = signal(query.matches)
  const change = () => isMobile.set(query.matches)
  query.addEventListener("change", change)
  inject(DestroyRef).onDestroy(() =>
    query.removeEventListener("change", change)
  )
  return isMobile.asReadonly()
}
