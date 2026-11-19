import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { marker } from "../../../styles/marker.styles"

type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>

@Directive({
  selector: "[kuiMarker]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "marker",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Marker {
  readonly variant = input<MarkerVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([marker.scope, marker.root({ variant: this.variant() })], this.sx())
  )
}

@Directive({
  selector: "[kuiMarkerContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "marker-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MarkerContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(marker.content, this.sx()))
}

@Directive({
  selector: "[kuiMarkerIcon]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "marker-icon",
    "aria-hidden": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MarkerIcon {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(marker.icon, this.sx()))
}

export { Marker, MarkerContent, MarkerIcon }
