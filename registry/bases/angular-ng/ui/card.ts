import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { card } from "../../../styles/card.styles"

/**
 * A card and its parts, each a directive on the element the caller writes
 * (`<div kuiCard>`, `<div kuiCardHeader>` …), its styles and the caller's `sx` merged, the caller's
 * last, on the host's `class`.
 */
@Directive({
  selector: "[kuiCard]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class Card {
  readonly size = input<"default" | "sm">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.root, this.sx()))
}

@Directive({
  selector: "[kuiCardHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.header, this.sx()))
}

@Directive({
  selector: "[kuiCardTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.title, this.sx()))
}

@Directive({
  selector: "[kuiCardDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.description, this.sx()))
}

@Directive({
  selector: "[kuiCardAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-action",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardAction {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.action, this.sx()))
}

@Directive({
  selector: "[kuiCardContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.content, this.sx()))
}

@Directive({
  selector: "[kuiCardFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "card-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
export class CardFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(card.footer, this.sx()))
}
