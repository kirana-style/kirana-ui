import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { badge } from "../../../styles/badge.styles"

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

@Directive({
  selector: "[kuiBadge]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "badge",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Badge {
  readonly variant = input<BadgeVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(badge({ variant: this.variant() }), this.sx())
  )
}

export { Badge }
