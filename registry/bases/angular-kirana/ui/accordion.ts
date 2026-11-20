import { Component, Directive, computed, input } from "@angular/core"
import {
  KpAccordion,
  KpAccordionHeader,
  KpAccordionItem,
  KpAccordionPanel,
  KpAccordionTrigger,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { accordion } from "../../../styles/accordion.styles"

/**
 * An accordion: `<div kuiAccordion [defaultValue]="['shipping']" multiple>`, on Kirana UI's
 * accordion (`KpAccordion`). Base UI's API: its value is a list of the open items' values, one
 * item open at a time unless `multiple`, and an open item closes again on its trigger; its
 * `defaultValue`, `multiple`, `disabled` and `orientation` are the primitive's.
 */
@Directive({
  selector: "[kuiAccordion]",
  hostDirectives: [
    {
      directive: KpAccordion,
      inputs: ["defaultValue", "multiple", "disabled", "orientation"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "accordion",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Accordion {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(accordion.root, this.sx()))
}

/**
 * One of its sections: `<div kuiAccordionItem value="shipping">`, Kirana UI's item
 * (`KpAccordionItem`, `data-open` while open): its `value` and `disabled` are the primitive's.
 */
@Directive({
  selector: "[kuiAccordionItem]",
  hostDirectives: [
    { directive: KpAccordionItem, inputs: ["value", "disabled"] },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "accordion-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AccordionItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(accordion.item, this.sx()))
}

/**
 * Its heading and the heading's button, with the chevrons that show which way it goes:
 * `<h3 kuiAccordionTrigger>Shipping</h3>` is Kirana UI's header (`KpAccordionHeader`) and draws
 * its trigger inside (`kuiAccordionTrigger`, `data-panel-open` while open), as React's draws the
 * header around the trigger; the caller's content and `sx` go to the button.
 */
@Component({
  selector: "h3[kuiAccordionTrigger]",
  imports: [IconPlaceholder, KpAccordionTrigger, SxDirective],
  hostDirectives: [KpAccordionHeader],
  providers: [provideSxPart()],
  host: {
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <button kpAccordionTrigger data-slot="accordion-trigger" [sx]="trigger()">
      <ng-content />
      <svg
        iconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        data-slot="accordion-trigger-icon"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        [sx]="iconClosed"
      ></svg>
      <svg
        iconPlaceholder
        lucide="ChevronUpIcon"
        tabler="IconChevronUp"
        data-slot="accordion-trigger-icon"
        hugeicons="ArrowUp01Icon"
        phosphor="CaretUpIcon"
        remixicon="RiArrowUpSLine"
        [sx]="iconOpen"
      ></svg>
    </button>
  `,
})
class AccordionTrigger {
  readonly sx = input<SxInput>()
  protected readonly iconClosed = accordion.iconClosed
  protected readonly iconOpen = accordion.iconOpen
  protected readonly part = computed(() => partSx(accordion.header, undefined))
  protected readonly trigger = computed(
    () => [accordion.trigger, this.sx()] as SxInput
  )
}

/**
 * What a section shows when open: `<div kuiAccordionContent>`. Kirana UI's panel is structural
 * (`*kpAccordionPanel`, out of the page while closed, moving over `--accordion-panel-height`),
 * which an attribute cannot put around its own element: the part draws it, and inside it the part
 * that takes the caller's content and `sx`, as React's, its own element drawing nothing.
 */
@Component({
  selector: "[kuiAccordionContent]",
  imports: [KpAccordionPanel, SxDirective],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpAccordionPanel
      data-slot="accordion-content"
      [class]="part().class"
      [style]="part().style"
    >
      <div [sx]="inner()"><ng-content /></div>
    </div>
  `,
})
class AccordionContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([accordion.content, accordion.contentBase], undefined)
  )
  protected readonly inner = computed(
    () =>
      [accordion.contentInner, accordion.contentInnerBase, this.sx()] as SxInput
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
