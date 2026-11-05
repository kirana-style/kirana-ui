import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { buttonGroup } from "../../../styles/button-group.styles"
import { separator } from "../../../styles/separator.styles"

type ButtonGroupVariants = NonNullable<Parameters<typeof buttonGroup.root>[0]>

@Directive({
  selector: "[kuiButtonGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "button-group",
    role: "group",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ButtonGroup {
  readonly orientation = input<ButtonGroupVariants["orientation"] | undefined>(
    undefined
  )
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [
        buttonGroup.root({ orientation: this.orientation() }),
        buttonGroup.width,
      ],
      this.sx()
    )
  )
}

/** A line between the group's parts, upright by default. */
@Directive({
  selector: "[kuiButtonGroupSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "button-group-separator",
    role: "separator",
    "[attr.aria-orientation]": "orientation()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ButtonGroupSeparator {
  readonly orientation = input<"horizontal" | "vertical">("vertical")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([separator, buttonGroup.separator], this.sx())
  )
}

@Directive({
  selector: "[kuiButtonGroupText]",
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'button-group-text'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ButtonGroupText {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(buttonGroup.text, this.sx()))
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
