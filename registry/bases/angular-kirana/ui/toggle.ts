import { Directive, computed, input } from "@angular/core"
import { KpToggle } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/**
 * A toggle button: `<button kuiToggle [(pressed)]="bold">`, on Kirana UI's toggle (`KpToggle`),
 * which writes `aria-pressed`, `data-pressed` and `type="button"`: its `[(pressed)]`,
 * `defaultPressed` and `disabled` are the primitive's.
 */
@Directive({
  selector: "button[kuiToggle]",
  hostDirectives: [
    {
      directive: KpToggle,
      inputs: ["pressed", "defaultPressed", "disabled"],
      outputs: ["pressedChange"],
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
