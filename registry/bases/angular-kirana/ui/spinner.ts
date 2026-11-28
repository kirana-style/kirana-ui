import { Component, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { spinner } from "../../../styles/spinner.styles"

/**
 * A spinner: the `<svg>` the caller writes (`<svg kuiSpinner>`), turning, with the loader icon
 * filling it. The icon is an `<svg>` of its own inside, so the installer writes it in the
 * project's library as it does every other icon (KF-148: a part drawn on its host has no
 * placeholder form yet).
 */
@Component({
  selector: "svg[kuiSpinner]",
  imports: [IconPlaceholder],
  providers: [provideSxPart()],
  host: {
    "data-slot": "spinner",
    role: "status",
    "aria-label": "Loading",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="Loader2Icon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoaderLine"
      width="100%"
      height="100%"
      aria-hidden="true"
    ></svg>
  `,
})
class Spinner {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(spinner, this.sx()))
}

export { Spinner }
