/**
 * Whether the screen is narrower than Tailwind's `md` breakpoint: shadcn/ui's `use-mobile` hook
 * (MIT), at commit `481d523`, read with `useSyncExternalStore` rather than written back from an
 * effect, so mounting renders once. `false` on the server, as upstream's first render. It asks the
 * media query itself where upstream reads `innerWidth`: the same answer, and the one a docs page's
 * framed demo is told (`answerWidthQueriesFrom`).
 */
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}
