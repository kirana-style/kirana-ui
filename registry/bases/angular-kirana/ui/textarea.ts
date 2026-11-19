import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { textarea } from "../../../styles/textarea.styles"

@Directive({
  selector: "[kuiTextarea]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "textarea",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Textarea {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(textarea, this.sx()))
}

export { Textarea }
