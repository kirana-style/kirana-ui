import {
  Component,
  Directive,
  HostAttributeToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  untracked,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpAccordion,
  NgpAccordionItem,
  NgpAccordionTrigger,
  injectAccordionItemState,
  injectAccordionState,
  provideAccordionConfig,
} from "ng-primitives/accordion"

import { IconPlaceholder } from "../../../icons/angular"
import { presence } from "../../../lib/angular/presence"
import { accordion } from "../../../styles/accordion.styles"

let next = 0

/**
 * ng-primitives reads whether an accordion opens one item or several (`type`) from its config, not
 * an input it can be handed later; its token is not exported, so it is taken from what
 * `provideAccordionConfig` provides, and set per accordion from its `multiple` attribute (LF-014).
 */
const ACCORDION_CONFIG = (
  provideAccordionConfig({}) as { provide: unknown }[]
)[0]!.provide

/**
 * An accordion: `<div kuiAccordion [defaultValue]="['shipping']" multiple>`, on ng-primitives'
 * `NgpAccordion`. Base UI's API: its value is a list of the open items' values, one item open at a
 * time unless `multiple`, and an open item closes again on its trigger.
 */
@Directive({
  selector: "[kuiAccordion]",
  hostDirectives: [
    {
      directive: NgpAccordion,
      inputs: [
        "ngpAccordionDisabled: disabled",
        "ngpAccordionOrientation: orientation",
      ],
    },
  ],
  providers: [
    provideSxPart(),
    {
      provide: ACCORDION_CONFIG,
      useFactory: () => ({
        type:
          inject(new HostAttributeToken("multiple"), { optional: true }) ===
          null
            ? "single"
            : "multiple",
        collapsible: true,
        orientation: "vertical",
      }),
    },
  ],
  host: {
    "data-slot": "accordion",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Accordion {
  readonly defaultValue = input<readonly string[]>()
  readonly multiple = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(accordion.root, this.sx()))

  constructor() {
    const state = injectAccordionState()
    let applied = false
    effect(() => {
      const values = this.defaultValue()
      untracked(() => {
        if (applied || !values) return
        applied = true
        state().setValue(this.multiple() ? [...values] : (values[0] ?? null))
      })
    })
  }
}

/** One of its sections: `<div kuiAccordionItem value="shipping">`. */
@Directive({
  selector: "[kuiAccordionItem]",
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: [
        "ngpAccordionItemValue: value",
        "ngpAccordionItemDisabled: disabled",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "accordion-item",
    "[attr.data-open]": "state().open() ? '' : null",
    "[attr.data-closed]": "state().open() ? null : ''",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AccordionItem {
  readonly sx = input<SxInput>()
  protected readonly state = injectAccordionItemState()
  protected readonly part = computed(() => partSx(accordion.item, this.sx()))
}

/**
 * Its heading and the heading's button, with the chevrons that show which way it goes:
 * `<h3 kuiAccordionTrigger>Shipping</h3>` draws the button inside the heading, as React's draws Base
 * UI's header around its trigger; the caller's content and `sx` go to the button.
 */
@Component({
  selector: "h3[kuiAccordionTrigger]",
  imports: [IconPlaceholder, NgpAccordionTrigger, SxDirective],
  providers: [provideSxPart()],
  host: {
    "[attr.data-open]": "state().open() ? '' : null",
    "[attr.data-closed]": "state().open() ? null : ''",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <button
      ngpAccordionTrigger
      data-slot="accordion-trigger"
      [attr.data-panel-open]="state().open() ? '' : null"
      [sx]="trigger()"
    >
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
  protected readonly state = injectAccordionItemState()
  protected readonly iconClosed = accordion.iconClosed
  protected readonly iconOpen = accordion.iconOpen
  protected readonly part = computed(() => partSx(accordion.header, undefined))
  protected readonly trigger = computed(
    () => [accordion.trigger, this.sx()] as SxInput
  )
}

/**
 * What a section shows when open: the panel, out of the page while closed (`presence`), moving over
 * `--accordion-panel-height`, and the part inside it that takes the caller's `sx`, as React's.
 */
@Component({
  selector: "[kuiAccordionContent]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "accordion-content",
    role: "region",
    "[attr.id]": "id",
    "[attr.aria-labelledby]": "state().triggerId()",
    "[attr.data-open]": "state().open() ? '' : null",
    "[attr.data-closed]": "state().open() ? null : ''",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<div [sx]="inner()"><ng-content /></div>`,
})
class AccordionContent {
  readonly sx = input<SxInput>()
  protected readonly id = `kui-accordion-content-${next++}`
  protected readonly state = injectAccordionItemState()
  protected readonly part = computed(() =>
    partSx([accordion.content, accordion.contentBase], undefined)
  )
  protected readonly inner = computed(
    () =>
      [accordion.contentInner, accordion.contentInnerBase, this.sx()] as SxInput
  )

  constructor() {
    this.state().setContent(this.id)
    presence(() => this.state().open(), {
      heightVar: "--accordion-panel-height",
      widthVar: "--accordion-panel-width",
    })
  }
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
