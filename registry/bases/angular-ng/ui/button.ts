import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
} from "@angular/core"
import { props } from "@kirana-style/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Wraps each run of text in the host in a label trimmed to its capitals, as React's Button wraps
 * its text children: once the page is drawn, and again as the runs change (Angular keeps updating
 * a text node it moved). For Button and the parts drawn as one (Input Group's, Attachment's,
 * Pagination's links); `enabled` false leaves the text bare.
 */
export function buttonLabels(enabled: () => boolean = () => true) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const label = props(buttonLabel).className ?? ""
  const wrap = () => {
    if (!enabled()) return
    // A copy: wrapping a text node changes the live list.
    for (const node of Array.from(element.childNodes)) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim())
        continue
      const span = document.createElement("span")
      span.dataset.slot = "button-label"
      span.className = label
      node.replaceWith(span)
      span.append(node)
    }
  }
  const observer = new MutationObserver(wrap)
  afterNextRender(() => {
    wrap()
    observer.observe(element, { childList: true })
  })
  inject(DestroyRef).onDestroy(() => observer.disconnect())
}

/**
 * A button, or a link drawn as one: `<button kuiButton variant="outline">`. Its own styles and the
 * caller's `sx` are merged here (`partSx`), the caller's last, and bound to the host's `class`;
 * Angular keeps the element's own `class` beside them. `provideSxPart()` keeps Kirana's
 * `SxDirective` off the element, so a template can use both. Each run of text is wrapped in a label
 * trimmed to its capitals, as React's Button wraps its text children: the runs are wrapped once they
 * are in the page, and again as they change (Angular keeps updating a text node it moved).
 * `labelText` false leaves them bare, as Pagination's link does.
 */
@Directive({
  // Any element: a button, a link, or a span drawn as one (React's `render={<span />}`).
  selector: "[kuiButton]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "button",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class Button {
  readonly variant = input<ButtonVariants["variant"]>("default")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly labelText = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels(this.labelText)
  }
}

export { button as buttonVariants }
