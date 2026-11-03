/**
 * Whether the screen is narrower than Tailwind's `md` breakpoint: the React hook's composable
 * (`../use-mobile.ts`). It asks the media query, as that hook does, and is `false` until mounted.
 */
import { onMounted, onUnmounted, readonly, ref } from "vue"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  const isMobile = ref(false)
  let mql: MediaQueryList | undefined
  const update = () => (isMobile.value = mql?.matches ?? false)
  onMounted(() => {
    mql = window.matchMedia(MOBILE_QUERY)
    update()
    mql.addEventListener("change", update)
  })
  onUnmounted(() => mql?.removeEventListener("change", update))
  return readonly(isMobile)
}
