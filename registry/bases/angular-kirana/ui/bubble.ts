import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { bubble } from "../../../styles/bubble.styles"

@Directive({
  selector: "[kuiBubble]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "bubble",
    "[attr.data-variant]": "variant()",
    "[attr.data-align]": "align()",
    // `align` is also HTML's presentational attribute (text-align), which the caller's `align="end"` would
    // leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Bubble {
  readonly variant = input<
    | "default"
    | "secondary"
    | "muted"
    | "tinted"
    | "outline"
    | "ghost"
    | "destructive"
  >("default")
  readonly align = input<"start" | "end">("start")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(bubble.root, this.sx()))
}

@Directive({
  selector: "[kuiBubbleContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "bubble-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BubbleContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(bubble.content, this.sx()))
}

@Directive({
  selector: "[kuiBubbleGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "bubble-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BubbleGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(bubble.group, this.sx()))
}

@Directive({
  selector: "[kuiBubbleReactions]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "bubble-reactions",
    "[attr.data-align]": "align()",
    // `align` is also HTML's presentational attribute (text-align), which the caller's `align="end"` would
    // leave on the element.
    "[attr.align]": "null",
    "[attr.data-side]": "side()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BubbleReactions {
  readonly side = input<"top" | "bottom">("bottom")
  readonly align = input<"start" | "end">("end")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(bubble.reactions, this.sx()))
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions }
