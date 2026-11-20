import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from "@angular/core"
import {
  KpResizableGroup,
  KpResizableHandle,
  KpResizablePanel,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { resizable } from "../../../styles/resizable.styles"

/**
 * Panels a handle resizes: `<div kuiResizablePanelGroup orientation="vertical">`, on Kirana UI's
 * resizable group (`KpResizableGroup`), which writes each panel's share as its `flex`: its
 * `orientation` is the primitive's. The group clips its panels, and a group inside another's panel
 * shrinks with it, as Kirana UI's docs leave to the design. `layoutChange` is told every panel's
 * share, in percent, as a handle moves them (React's `onLayoutChange`; Kirana UI's `sizesChanged`).
 */
@Directive({
  selector: "[kuiResizablePanelGroup]",
  hostDirectives: [{ directive: KpResizableGroup, inputs: ["orientation"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "resizable-panel-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ResizablePanelGroup {
  readonly sx = input<SxInput>()
  readonly layoutChange = output<number[]>()
  /** Inside another group's panel. */
  readonly #nested =
    inject(KpResizableGroup, { skipSelf: true, optional: true }) !== null
  protected readonly part = computed(() =>
    partSx(
      [
        resizable.group,
        resizable.groupKirana,
        this.#nested && resizable.groupNestedKirana,
      ],
      this.sx()
    )
  )

  constructor() {
    inject(KpResizableGroup, { self: true }).sizesChanged.subscribe(
      ({ sizes }) => this.layoutChange.emit(sizes)
    )
  }
}

/**
 * One of its panels: `<div kuiResizablePanel [defaultSize]="25">`, sizes in percent, Kirana UI's
 * panel (`KpResizablePanel`): its `defaultSize`, `minSize` and `maxSize` are the primitive's, which
 * keeps its share (`min-width: 0`, `min-height: 0`). It holds the caller's content in a box that
 * fills it, as react-resizable-panels draws a panel.
 */
@Component({
  selector: "[kuiResizablePanel]",
  hostDirectives: [
    {
      directive: KpResizablePanel,
      inputs: ["defaultSize", "minSize", "maxSize"],
    },
  ],
  host: {
    "data-slot": "resizable-panel",
    "[class]": "panel",
  },
  template: `<div
    style="max-height: 100%; max-width: 100%; flex-grow: 1; overflow: auto"
  >
    <ng-content />
  </div>`,
})
class ResizablePanel {
  protected readonly panel = partSx(resizable.panelKirana, undefined).class
}

/**
 * The boundary between two panels, Kirana UI's handle (`KpResizableHandle`), which the pointer
 * drags and the arrow keys move; `withHandle` draws a grip on it. It never shrinks, as Kirana UI's
 * docs leave to the design.
 */
@Component({
  selector: "[kuiResizableHandle]",
  imports: [SxDirective],
  hostDirectives: [KpResizableHandle],
  providers: [provideSxPart()],
  host: {
    "data-slot": "resizable-handle",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `@if (withHandle()) {
    <div [sx]="grip"></div>
  }`,
})
class ResizableHandle {
  readonly withHandle = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly grip = resizable.grip
  protected readonly part = computed(() =>
    partSx([resizable.handle, resizable.handleKirana], this.sx())
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
