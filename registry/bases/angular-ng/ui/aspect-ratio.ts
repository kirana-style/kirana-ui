import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { aspectRatio } from "../../../styles/aspect-ratio.styles"

@Directive({
  selector: "[kuiAspectRatio]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "aspect-ratio",
    "[style.--ratio]": "ratio()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AspectRatio {
  readonly ratio = input<number>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(aspectRatio, this.sx()))
}

export { AspectRatio }
