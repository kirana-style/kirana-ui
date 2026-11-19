import { Component, computed, input } from "@angular/core"
import {
  KuiScrollArea,
  KuiScrollAreaCorner,
  KuiScrollAreaScrollbar,
  KuiScrollAreaThumb,
  KuiScrollAreaViewport,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { scrollArea } from "../../../styles/scroll-area.styles"

/**
 * A scrollbar and its thumb: the area's own vertical one, or `<div kuiScrollBar
 * orientation="horizontal">` inside the area for a horizontal one. Kirana UI's scrollbar is
 * structural (`*kuiScrollAreaScrollbar`, in the page only while its axis overflows, placed against
 * the area, its thumb sized and moved by the library), which an attribute cannot put around its own
 * element: the part draws it, its own element drawing nothing.
 */
@Component({
  selector: "[kuiScrollBar]",
  imports: [KuiScrollAreaScrollbar, KuiScrollAreaThumb],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kuiScrollAreaScrollbar="orientation()"
      data-slot="scroll-area-scrollbar"
      [class]="part().class"
      [style]="part().style"
    >
      <div
        kuiScrollAreaThumb
        data-slot="scroll-area-thumb"
        [class]="thumb"
      ></div>
    </div>
  `,
})
class ScrollBar {
  readonly orientation = input<"vertical" | "horizontal">("vertical")
  readonly sx = input<SxInput>()
  protected readonly thumb = partSx(scrollArea.thumb, undefined).class
  protected readonly part = computed(() =>
    partSx(scrollArea.scrollbar, this.sx())
  )
}

/**
 * A box that scrolls with its own thin scrollbars: `<div kuiScrollArea>`, on Kirana UI's scroll
 * area (`KuiScrollArea`): the viewport scrolls natively (its own scrollbars hidden by the styles),
 * holding the caller's content directly, as React's; a vertical scrollbar and the corner come with
 * it, and a caller's horizontal `ScrollBar` is drawn beside the viewport, where the library places
 * scrollbars.
 */
@Component({
  selector: "[kuiScrollArea]",
  imports: [KuiScrollAreaCorner, KuiScrollAreaViewport, ScrollBar],
  hostDirectives: [KuiScrollArea],
  providers: [provideSxPart()],
  host: {
    "data-slot": "scroll-area",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div
      kuiScrollAreaViewport
      data-slot="scroll-area-viewport"
      [class]="viewport"
    >
      <ng-content />
    </div>
    <ng-content select="[kuiScrollBar]" />
    <div kuiScrollBar></div>
    <div *kuiScrollAreaCorner></div>
  `,
})
class ScrollArea {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(scrollArea.root, this.sx()))
  protected readonly viewport = partSx(scrollArea.viewport, undefined).class
}

export { ScrollArea, ScrollBar }
