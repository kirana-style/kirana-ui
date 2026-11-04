import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpCollapsible,
  NgpCollapsibleTrigger,
  injectCollapsibleState,
} from "ng-primitives/collapsible"

import { presence } from "../../../lib/angular/presence"

let next = 0

/**
 * A section that opens and closes: `<div kuiCollapsible [(open)]="open">`, on ng-primitives'
 * `NgpCollapsible`, which writes Base UI's `data-open` and `data-closed`. It takes Base UI's names
 * (`open`, `defaultOpen`, `disabled`).
 */
@Directive({
  selector: "[kuiCollapsible]",
  hostDirectives: [
    {
      directive: NgpCollapsible,
      inputs: [
        "ngpCollapsibleOpen: open",
        "ngpCollapsibleDefaultOpen: defaultOpen",
        "ngpCollapsibleDisabled: disabled",
      ],
      outputs: ["ngpCollapsibleOpenChange: openChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "collapsible",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Collapsible {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** The button that opens and closes it (`aria-expanded`). */
@Directive({
  selector: "[kuiCollapsibleTrigger]",
  hostDirectives: [NgpCollapsibleTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "collapsible-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CollapsibleTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * What it shows when open, out of the page while closed, as Base UI's panel (`presence`), with
 * `--collapsible-panel-height` its height while it moves.
 */
@Directive({
  selector: "[kuiCollapsibleContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "collapsible-content",
    "[attr.id]": "id",
    "[attr.data-open]": "state().open() ? '' : null",
    "[attr.data-closed]": "state().open() ? null : ''",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CollapsibleContent {
  readonly sx = input<SxInput>()
  protected readonly id = `kui-collapsible-content-${next++}`
  protected readonly state = injectCollapsibleState()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    this.state().setContent(this.id)
    presence(() => this.state().open(), {
      heightVar: "--collapsible-panel-height",
      widthVar: "--collapsible-panel-width",
    })
  }
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
