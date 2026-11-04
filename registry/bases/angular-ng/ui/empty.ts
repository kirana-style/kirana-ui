import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { empty } from "../../../styles/empty.styles"

type MediaVariants = NonNullable<Parameters<typeof empty.media>[0]>

@Directive({
  selector: "[kuiEmpty]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Empty {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(empty.root, this.sx()))
}

@Directive({
  selector: "[kuiEmptyContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EmptyContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(empty.content, this.sx()))
}

@Directive({
  selector: "[kuiEmptyDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EmptyDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(empty.description, this.sx()))
}

@Directive({
  selector: "[kuiEmptyHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EmptyHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(empty.header, this.sx()))
}

@Directive({
  selector: "[kuiEmptyMedia]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty-icon",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EmptyMedia {
  readonly variant = input<MediaVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(empty.media({ variant: this.variant() }), this.sx())
  )
}

@Directive({
  selector: "[kuiEmptyTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "empty-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EmptyTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(empty.title, this.sx()))
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
}
