import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from "@angular/core"
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
    // Bound, so it wins over the slot of a part on the same element (`<li kuiSidebarMenuItem
    // kuiCollapsible>`), as Base UI keeps the root's on the element it renders.
    "[attr.data-slot]": "'collapsible'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Collapsible {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * The button that opens and closes it (`aria-expanded`). Its slot is the element's, unless another
 * part is the one React renders it into (`<button kuiCollapsibleTrigger kuiSidebarGroupLabel
 * dataSlot="sidebar-group-label">`, where React's label renders the trigger): that part's.
 */
@Directive({
  selector: "[kuiCollapsibleTrigger]",
  hostDirectives: [NgpCollapsibleTrigger],
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "dataSlot()",
    // Base UI's trigger says its panel is open (`data-panel-open`); ng-primitives' writes
    // `data-open` too, taken off below, so a style written for React's trigger reads the same here.
    "[attr.data-panel-open]": "state().open() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CollapsibleTrigger {
  readonly dataSlot = input("collapsible-trigger")
  readonly sx = input<SxInput>()
  protected readonly state = injectCollapsibleState()

  constructor() {
    // ng-primitives writes its `data-open` itself, not through a binding this part could override.
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const strip = () => element.removeAttribute("data-open")
    const observer = new MutationObserver(strip)
    observer.observe(element, { attributeFilter: ["data-open"] })
    afterNextRender(strip)
    inject(DestroyRef).onDestroy(() => observer.disconnect())
  }
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
