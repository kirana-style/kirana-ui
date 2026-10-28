import { Directive, computed, input } from "@angular/core"
import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

import { skeleton } from "../../../styles/skeleton.styles"

/** A placeholder while content loads: `<div kuiSkeleton [sx]="…">`, the caller's `sx` merged last. */
@Directive({
  selector: "[kuiSkeleton]",
  host: { "data-slot": "skeleton", "[class]": "classes()" },
})
export class Skeleton {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(skeleton, this.sx()).className
  )
}
