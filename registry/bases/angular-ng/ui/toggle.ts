import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { NgpToggle } from "ng-primitives/toggle"

import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/**
 * A toggle button: `<button kuiToggle [(pressed)]="bold">`, on ng-primitives' `NgpToggle`, which
 * writes `aria-pressed`, as Base UI's, and `data-selected`. It takes Base UI's names (`pressed`,
 * `defaultPressed`, `disabled`).
 */
@Directive({
  selector: "button[kuiToggle]",
  hostDirectives: [
    {
      directive: NgpToggle,
      inputs: [
        "ngpToggleSelected: pressed",
        "ngpToggleDefaultSelected: defaultPressed",
        "ngpToggleDisabled: disabled",
      ],
      outputs: ["ngpToggleSelectedChange: pressedChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "toggle",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Toggle {
  readonly variant = input<ToggleVariants["variant"]>("default")
  readonly size = input<ToggleVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [
        toggleScope.anchor,
        toggle({ variant: this.variant(), size: this.size() }),
      ],
      this.sx()
    )
  )
}

export { Toggle, toggle as toggleVariants }
export type { ToggleVariants }
