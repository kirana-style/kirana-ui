import { Directive, computed, input } from "@angular/core"
import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

import { card } from "../../../styles/card.styles"

/**
 * A card and its parts, each a directive on the element the caller writes
 * (`<div kuiCard>`, `<div kuiCardHeader>` …), its styles and the caller's `sx` merged, the caller's
 * last, on the host's `class`.
 */
@Directive({
  selector: "[kuiCard]",
  host: {
    "data-slot": "card",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class Card {
  readonly size = input<"default" | "sm">("default")
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.root, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardHeader]",
  host: { "data-slot": "card-header", "[class]": "classes()" },
})
export class CardHeader {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.header, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardTitle]",
  host: { "data-slot": "card-title", "[class]": "classes()" },
})
export class CardTitle {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.title, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardDescription]",
  host: { "data-slot": "card-description", "[class]": "classes()" },
})
export class CardDescription {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.description, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardAction]",
  host: { "data-slot": "card-action", "[class]": "classes()" },
})
export class CardAction {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.action, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardContent]",
  host: { "data-slot": "card-content", "[class]": "classes()" },
})
export class CardContent {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.content, this.sx()).className
  )
}

@Directive({
  selector: "[kuiCardFooter]",
  host: { "data-slot": "card-footer", "[class]": "classes()" },
})
export class CardFooter {
  readonly sx = input<Sx>()
  protected readonly classes = computed(
    () => props(card.footer, this.sx()).className
  )
}
