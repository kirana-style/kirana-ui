import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { kbd } from "../../../styles/kbd.styles"

@Directive({
  selector: "[kuiKbd]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "kbd",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Kbd {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(kbd.root, this.sx()))
}

@Directive({
  selector: "[kuiKbdGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "kbd-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class KbdGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(kbd.group, this.sx()))
}

export { Kbd, KbdGroup }
