/**
 * A panel in the page only while it is open, as Base UI mounts its collapsible, accordion and tab
 * panels: Angular's part for one (Collapsible's, Accordion's, Tabs') cannot remove its own element, so
 * it takes it out of the page while closed and puts it back before a marker it leaves in its place.
 *
 * Its motion is Base UI's: opening, the panel takes `data-starting-style` for its first frame and the
 * height variable a style reads (`--accordion-panel-height`) its content's height; closing, it takes
 * `data-ending-style` and stays until its animations and transitions have run. A panel open when the
 * page is drawn does not animate (`animation-name: none`, as Base UI writes it).
 */
import {
  DestroyRef,
  ElementRef,
  effect,
  inject,
  untracked,
} from "@angular/core"

export function presence(
  open: () => boolean,
  options: { heightVar?: string; widthVar?: string } = {}
) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const marker = document.createComment("closed")
  let first = true
  let closing = 0
  const size = (value: (axis: "height" | "width") => string) => {
    if (options.heightVar)
      element.style.setProperty(options.heightVar, value("height"))
    if (options.widthVar)
      element.style.setProperty(options.widthVar, value("width"))
  }
  // Styles computed now, not at the next frame: a page in the background, or a headless browser,
  // may not draw one for a while.
  const flush = () => void getComputedStyle(element).getPropertyValue("height")
  const finished = () =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => undefined))
    )

  effect(() => {
    const isOpen = open()
    untracked(() => {
      if (!marker.parentNode) element.before(marker)
      if (first) {
        first = false
        if (isOpen) {
          size(() => "auto")
          element.style.animationName = "none"
        } else element.remove()
        return
      }
      const run = ++closing
      if (isOpen) {
        element.style.removeProperty("animation-name")
        element.removeAttribute("data-ending-style")
        if (!element.parentNode) marker.after(element)
        element.setAttribute("data-starting-style", "")
        size(
          (axis) =>
            `${axis === "height" ? element.scrollHeight : element.scrollWidth}px`
        )
        // The first frame's styles computed, then let go, so a transition runs from them.
        flush()
        element.removeAttribute("data-starting-style")
        void finished().then(() => {
          if (run === closing) size(() => "auto")
        })
      } else {
        // Inside a part that is itself out of the page (a closed menu's content), nothing runs:
        // it simply leaves its parent.
        if (!element.isConnected) {
          element.remove()
          return
        }
        size(
          (axis) =>
            `${axis === "height" ? element.scrollHeight : element.scrollWidth}px`
        )
        element.style.removeProperty("animation-name")
        element.setAttribute("data-ending-style", "")
        // The closing styles computed, so their animations have started, then until they end.
        flush()
        void finished().then(() => {
          if (run !== closing) return
          element.removeAttribute("data-ending-style")
          element.remove()
        })
      }
    })
  })
  inject(DestroyRef).onDestroy(() => marker.remove())
}
