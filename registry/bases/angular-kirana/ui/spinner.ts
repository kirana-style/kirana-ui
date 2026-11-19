import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconDrawing } from "../../../icons/angular"
import { spinner } from "../../../styles/spinner.styles"

/** A spinner: the loader icon on the `<svg>` the caller writes (`<svg kuiSpinner>`), turning. */
@Directive({
  selector: "svg[kuiSpinner]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "spinner",
    role: "status",
    "aria-label": "Loading",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Spinner extends IconDrawing {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(spinner, this.sx()))
  protected readonly names = () => ({
    lucide: "Loader2Icon",
    tabler: "IconLoader",
    hugeicons: "Loading03Icon",
    phosphor: "SpinnerIcon",
    remixicon: "RiLoaderLine",
  })
}

export { Spinner }
