import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { label } from "../../../styles/label.styles"

@Directive({
  selector: "[kuiLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Label {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(label, this.sx()))
}

export { Label }
