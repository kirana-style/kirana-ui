/**
 * Whether the screen is narrower than Tailwind's `md` breakpoint: the React hook's state
 * (`../use-mobile.ts`), read as `isMobile.current`. It asks the media query, as that hook does, and
 * is `false` until mounted.
 */
import { onMount } from "svelte"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  let isMobile = $state(false)
  onMount(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const update = () => (isMobile = mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  })
  return {
    get current() {
      return isMobile
    },
  }
}
