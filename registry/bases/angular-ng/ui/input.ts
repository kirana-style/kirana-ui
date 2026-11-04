import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { input as inputStyle } from "../../../styles/input.styles"

@Directive({
  selector: "[kuiInput]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Input {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(inputStyle, this.sx()))
}

export { Input }
