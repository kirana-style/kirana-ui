import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { skeleton } from "../../../styles/skeleton.styles"

/** A placeholder while content loads: `<div kuiSkeleton [sx]="…">`, the caller's `sx` merged last. */
@Directive({
  selector: "[kuiSkeleton]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "skeleton",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class Skeleton {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(skeleton, this.sx()))
}
