import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { separator } from "../../../styles/separator.styles"

@Directive({
  selector: "[kuiSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "separator",
    role: "separator",
    "[attr.aria-orientation]": "orientation()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Separator {
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(separator, this.sx()))
}

export { Separator }
