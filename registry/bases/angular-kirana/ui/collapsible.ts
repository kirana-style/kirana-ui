import { Component, Directive, computed, input } from "@angular/core"
import {
  KpCollapsible,
  KpCollapsiblePanel,
  KpCollapsibleTrigger,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

/**
 * A section that opens and closes: `<div kuiCollapsible [(open)]="open">`, on Kirana UI's
 * collapsible (`KpCollapsible`), which writes `data-open` and `data-closed`: its `[(open)]`,
 * `defaultOpen` and `disabled` are the primitive's.
 */
@Directive({
  selector: "[kuiCollapsible]",
  hostDirectives: [
    {
      directive: KpCollapsible,
      inputs: ["open", "defaultOpen", "disabled"],
      outputs: ["openChange"],
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
 * The button that opens and closes it, Kirana UI's trigger (`KpCollapsibleTrigger`: `aria-expanded`,
 * `data-panel-open`). Its slot is the element's, unless another part is the one React renders it
 * into (`<button kuiCollapsibleTrigger kuiSidebarGroupLabel dataSlot="sidebar-group-label">`, where
 * React's label renders the trigger): that part's.
 */
@Directive({
  selector: "[kuiCollapsibleTrigger]",
  hostDirectives: [KpCollapsibleTrigger],
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "dataSlot()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CollapsibleTrigger {
  readonly dataSlot = input("collapsible-trigger")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * What it shows when open: `<div kuiCollapsibleContent>`. Kirana UI's panel is structural
 * (`*kpCollapsiblePanel`, out of the page while closed, `--collapsible-panel-height` its height
 * while it moves), which an attribute cannot put around its own element: the part draws it around
 * the caller's content, its own element drawing nothing.
 */
@Component({
  selector: "[kuiCollapsibleContent]",
  imports: [KpCollapsiblePanel],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpCollapsiblePanel
      data-slot="collapsible-content"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class CollapsibleContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
