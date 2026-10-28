import { Directive, computed, input } from "@angular/core"
import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

import { button } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A button, or a link drawn as one: `<button kuiButton variant="outline">`. Its own styles and the
 * caller's `sx` are merged here, the caller's last, and bound to the host's `class`; Angular keeps
 * the element's own `class` beside them. Do not also apply Kirana's `SxDirective` to the element:
 * both read `[sx]`. Upstream trims each run of text to its capitals; that label is not wrapped here
 * yet.
 */
@Directive({
  selector: "button[kuiButton], a[kuiButton]",
  host: {
    "data-slot": "button",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class Button {
  readonly variant = input<ButtonVariants["variant"]>("default")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () =>
      props(button({ variant: this.variant(), size: this.size() }), this.sx())
        .className
  )
}

export { button as buttonVariants }
