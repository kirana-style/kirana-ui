import {
  Component,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import {
  KuiPopover,
  KuiPopoverDescription,
  KuiPopoverPopup,
  KuiPopoverPortal,
  KuiPopoverPositioner,
  KuiPopoverTitle,
  KuiPopoverTrigger,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { popover } from "../../../styles/popover.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * A popover: `<ng-container kuiPopover>` around its trigger and content, drawing no element, as
 * Base UI's root: Kirana UI's (`KuiPopover`), its `[(open)]` and `defaultOpen` its own. Kirana UI's
 * selectors are the registry's, so a part takes its primitive as a host directive and a file
 * imports only one of the two.
 */
@Directive({
  selector: "[kuiPopover]",
  hostDirectives: [
    {
      directive: KuiPopover,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class Popover {}

/** The button that opens it. */
@Directive({
  selector: "[kuiPopoverTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KuiPopoverTrigger],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'popover-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * What it shows, placed against the trigger: `<div kuiPopoverContent side="top" align="start">`,
 * Base UI's `side`, `align`, `sideOffset` (4) and `alignOffset` (0). The content draws Kirana UI's
 * portal, the positioner and the popup in its template, its children projected into the popup;
 * its own element stays where it was written, drawing nothing, and the `dir` its caller writes on
 * it goes to the popup.
 */
@Component({
  selector: "[kuiPopoverContent]",
  imports: [KuiPopoverPopup, KuiPopoverPortal, KuiPopoverPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiPopoverPortal>
      <div
        kuiPopoverPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kuiPopoverPopup
          data-slot="popover-content"
          [attr.dir]="host.getAttribute('dir')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
})
class PopoverContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly positioner = partSx(popover.positioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, popover.content], this.sx())
  )
}

/** Its heading and description, above its content. */
@Directive({
  selector: "[kuiPopoverHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(popover.header, this.sx()))
}

/** Its title: `<h2 kuiPopoverTitle>`, as Base UI's, which names the popover. */
@Directive({
  selector: "h2[kuiPopoverTitle]",
  providers: [provideSxPart()],
  hostDirectives: [KuiPopoverTitle],
  host: {
    "data-slot": "popover-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(popover.title, this.sx()))
}

/** Its description: `<p kuiPopoverDescription>`, which describes the popover. */
@Directive({
  selector: "p[kuiPopoverDescription]",
  providers: [provideSxPart()],
  hostDirectives: [KuiPopoverDescription],
  host: {
    "data-slot": "popover-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(popover.description, this.sx())
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
