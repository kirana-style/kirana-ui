import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { button } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A button, or a link drawn as one: `<button kuiButton variant="outline">`. Its own styles and the
 * caller's `sx` are merged here (`partSx`), the caller's last, and bound to the host's `class`;
 * Angular keeps the element's own `class` beside them. `provideSxPart()` keeps Kirana's
 * `SxDirective` off the element, so a template can use both. Upstream trims each run of text to its
 * capitals; that label is not wrapped here yet.
 */
@Directive({
  selector: "button[kuiButton], a[kuiButton]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "button",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class Button {
  readonly variant = input<ButtonVariants["variant"]>("default")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )
}

export { button as buttonVariants }
