/**
 * Kirana UI's combobox (`KpCombobox`) with Base UI's items-driven API: `items` (strings, objects
 * with a `label` and `value`, or groups with their own `items`) go to `ComboboxList` and
 * `ComboboxCollection`, which draw each through the caller's `<ng-template let-item>`, and their
 * labels to Kirana UI's `items`, so the input shows a chosen item before the list opens; Kirana UI
 * filters the items by their labels, hides a group with none shown, highlights, chooses and places
 * the popup. A value, or a list of them (`multiple`), is the items
 * themselves, in the shape they were given.
 */
import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  Directive,
  InjectionToken,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
} from "@angular/core"
import type { Signal } from "@angular/core"
import {
  KpCombobox,
  KpComboboxChip,
  KpComboboxChipRemove,
  KpComboboxChips,
  KpComboboxClear,
  KpComboboxEmpty,
  KpComboboxGroup,
  KpComboboxGroupLabel,
  KpComboboxInput,
  KpComboboxItem,
  KpComboboxItemIndicator,
  KpComboboxList,
  KpComboboxPopup,
  KpComboboxPortal,
  KpComboboxPositioner,
  KpComboboxSeparator,
  KpComboboxTrigger,
  hostInputs,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { combobox } from "../../../styles/combobox.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { inputGroup } from "../../../styles/input-group.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuPositioner,
  menuRowBase,
  menuSeparator,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import { InputGroupAddon } from "./input-group"

const isGroup = (item: unknown): item is { items: unknown[] } =>
  typeof item === "object" &&
  item !== null &&
  Array.isArray((item as { items?: unknown }).items)

const list = (value: unknown): unknown[] =>
  value === undefined || value === null
    ? []
    : Array.isArray(value)
      ? [...(value as unknown[])]
      : [value]

/** What the registry's root gives its state: its inputs, read where they are needed. */
type Source = {
  items: Signal<readonly unknown[]>
  defaultValue: Signal<unknown>
  value: Signal<unknown>
  // oxlint-disable-next-line no-explicit-any
  itemToStringLabel: Signal<((item: any) => string) | undefined>
}

/** A combobox's state, which its parts share: its items, how one is named, and what is chosen. */
class ComboboxState {
  readonly source = signal<Source | undefined>(undefined)
  /** Kirana UI's root, once it is made. */
  root!: KpCombobox<unknown, boolean>
  /** Whether the popup is anchored to the chips (`data-chips`). */
  readonly chips = signal(false)
  /** What was chosen since, while the caller does not hold `value`. */
  readonly chosen = signal<unknown[] | undefined>(undefined)

  readonly items = computed(() => this.source()?.items() ?? [])
  /** Every item, out of its group, with its label: Kirana UI's `items`. */
  readonly labels = computed(() =>
    this.items()
      .flatMap((item) => (isGroup(item) ? item.items : [item]))
      .map((item) => ({ value: item, label: this.label(item) }))
  )
  readonly selected = computed(() => {
    const controlled = this.source()?.value()
    if (controlled !== undefined) return list(controlled)
    return this.chosen() ?? list(this.source()?.defaultValue())
  })

  label(item: unknown): string {
    const own = this.source()?.itemToStringLabel()
    if (own) return own(item)
    return typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item)
  }

  chosenLabel() {
    const chosen = this.selected()[0]
    return chosen === undefined ? "" : this.label(chosen)
  }
}

const COMBOBOX = new InjectionToken<ComboboxState>("kui combobox")
/** A group's items, which its `ComboboxCollection` draws. */
const COMBOBOX_GROUP = new InjectionToken<Signal<readonly unknown[]>>(
  "kui combobox group"
)
/** Inside the popup: an input there searches, with no button of its own. */
const IN_CONTENT = new InjectionToken<boolean>("kui combobox in content")

const useCombobox = () => inject(COMBOBOX)

/**
 * The combobox: `<ng-container kuiCombobox [items]="…" [(value)]="…">` around its input (or
 * trigger) and content, drawing no element, as Base UI's root; `multiple`, `autoHighlight` and
 * `disabled` are Kirana UI's own. Kirana UI's root is given the labels of its items as its `items`,
 * and its `defaultValue` as one value or, with `multiple`, a list.
 * `#combo="kuiCombobox"` reads its state, `combo.selected()` the chosen items.
 */
@Directive({
  selector: "[kuiCombobox]",
  exportAs: "kuiCombobox",
  providers: [{ provide: COMBOBOX, useFactory: () => new ComboboxState() }],
  hostDirectives: [
    {
      directive: KpCombobox,
      inputs: ["multiple", "autoHighlight", "disabled"],
    },
  ],
})
class Combobox {
  readonly items = input<readonly unknown[]>([])
  readonly defaultValue = input<unknown>()
  readonly value = input<unknown>()
  readonly valueChange = output<unknown>()
  // `any`: a caller's callback takes its own items' type.
  // oxlint-disable-next-line no-explicit-any
  readonly itemToStringLabel = input<(item: any) => string>()
  /** Base UI's object values' keys: Kirana UI compares the values themselves, so taken only. */
  // oxlint-disable-next-line no-explicit-any
  readonly itemToStringValue = input<(item: any) => string>()
  readonly state = inject(COMBOBOX)
  readonly selected = this.state.selected

  constructor() {
    const state = this.state
    state.source.set(this)
    const root = inject(KpCombobox)
    state.root = root
    hostInputs(KpCombobox, {
      items: () => state.labels(),
      defaultValue: () =>
        root.multiple()
          ? list(this.defaultValue())
          : (this.defaultValue() ?? null),
    })
    // What is chosen, as Kirana UI reports it about to change (with `multiple`, the list there
    // would then be), reported in the items' shape.
    root.valueChanged.subscribe(({ value }) => {
      if (root.multiple()) {
        state.chosen.set(list(value))
        this.valueChange.emit(list(value))
        return
      }
      state.chosen.set(list(value))
      this.valueChange.emit(value ?? null)
    })
    // A value the caller holds goes to Kirana UI's.
    effect(() => {
      const controlled = this.value()
      if (controlled === undefined) return
      untracked(() => {
        root.value.set(root.multiple() ? list(controlled) : controlled)
      })
    })
  }
}

/** The chosen item's label (Base UI's `Combobox.Value`), or, with a template, the chosen items. */
@Component({
  selector: "kui-combobox-value",
  imports: [NgTemplateOutlet],
  host: { style: "display: contents" },
  template: `@if (template(); as template) {
      <ng-container
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ $implicit: state.selected() }"
      />
    } @else {
      {{ state.chosenLabel() }}
    }`,
})
class ComboboxValue {
  protected readonly state = useCombobox()
  protected readonly template = contentChild(TemplateRef)
}

const CHEVRON = `<svg
  iconPlaceholder
  lucide="ChevronDownIcon"
  tabler="IconChevronDown"
  hugeicons="ArrowDown01Icon"
  phosphor="CaretDownIcon"
  remixicon="RiArrowDownSLine"
  [sx]="chevron"
></svg>`

/**
 * The button that opens it, holding its value and a chevron: `<button kuiButton
 * kuiComboboxTrigger>`, Kirana UI's trigger. Its content then holds the search input, and the
 * button is what the popup is placed against.
 */
@Component({
  selector: "[kuiComboboxTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxTrigger],
  host: {
    type: "button",
    "[attr.data-slot]": "'combobox-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />${CHEVRON}`,
})
class ComboboxTrigger {
  readonly sx = input<SxInput>()
  protected readonly chevron = combobox.triggerIcon
  protected readonly part = computed(() =>
    partSx(combobox.triggerOwn, this.sx())
  )
}

/**
 * The input in its input group: `<div kuiComboboxInput placeholder="…" showClear>`, Kirana UI's
 * input with the chevron that opens the list (`showTrigger`, on by default) and a clear button,
 * in the page while there is something to clear. Inside the content (after a `ComboboxTrigger`), it
 * searches.
 */
@Component({
  selector: "[kuiComboboxInput]",
  imports: [
    IconPlaceholder,
    InputGroupAddon,
    KpComboboxClear,
    KpComboboxInput,
    KpComboboxTrigger,
    SxDirective,
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-group",
    role: "group",
    "[attr.aria-invalid]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <input
      kpComboboxInput
      data-slot="input-group-control"
      [attr.placeholder]="placeholder() ?? null"
      [attr.aria-invalid]="ariaInvalid() ?? null"
      [disabled]="isDisabled()"
      [sx]="control"
    />
    <div kuiInputGroupAddon align="inline-end">
      @if (showTrigger() && !inContent) {
        <button
          kpComboboxTrigger
          type="button"
          tabindex="-1"
          data-slot="input-group-button"
          data-size="icon-xs"
          [attr.data-placeholder]="state.selected().length ? null : ''"
          [disabled]="isDisabled()"
          [sx]="triggerLook"
        >
          ${CHEVRON}
        </button>
      }
      @if (showClear()) {
        <button
          *kpComboboxClear
          type="button"
          tabindex="-1"
          data-slot="combobox-clear"
          data-size="icon-xs"
          aria-label="Clear selection"
          [disabled]="isDisabled()"
          [sx]="clearLook"
        >
          <svg
            iconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          ></svg>
        </button>
      }
    </div>
    <ng-content />
  `,
})
class ComboboxInput {
  readonly placeholder = input<string>()
  readonly showTrigger = input(true, { transform: booleanAttribute })
  readonly showClear = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly inContent = inject(IN_CONTENT, { optional: true }) ?? false
  protected readonly chevron = combobox.triggerIcon
  protected readonly control = [inputStyle, inputGroup.input] as SxInput
  protected readonly triggerLook = [
    button({ variant: "ghost", size: "default" }),
    inputGroup.button({ size: "icon-xs" }),
    combobox.trigger,
  ] as SxInput
  protected readonly clearLook = [
    button({ variant: "ghost", size: "default" }),
    inputGroup.button({ size: "icon-xs" }),
  ] as SxInput
  protected readonly isDisabled = computed(
    () => this.disabled() || this.state.root.disabled()
  )
  protected readonly part = computed(() =>
    partSx([inputGroup.root, combobox.input], this.sx())
  )
}

/**
 * What opens below it: `<div kuiComboboxContent>`, placed with Base UI's props. Kirana UI's portal
 * is a structural part, so the content draws the portal, the positioner and the popup in its
 * template, its children projected into the popup; its own element stays where it was written,
 * drawing nothing.
 */
@Component({
  selector: "[kuiComboboxContent]",
  imports: [KpComboboxPopup, KpComboboxPortal, KpComboboxPositioner],
  providers: [provideSxPart(), { provide: IN_CONTENT, useValue: true }],
  host: { style: "display: contents" },
  template: `
    <ng-template kpComboboxPortal>
      <div
        kpComboboxPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kpComboboxPopup
          data-slot="combobox-content"
          [attr.data-chips]="String(state.chips())"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
})
class ComboboxContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(6, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly String = String
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, combobox.content], this.sx())
  )
}

/**
 * What it says while nothing matches: Kirana UI's structural `*kpComboboxEmpty`, drawn here; its
 * own element draws nothing.
 */
@Component({
  selector: "[kuiComboboxEmpty]",
  imports: [KpComboboxEmpty],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpComboboxEmpty
      data-slot="combobox-empty"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class ComboboxEmpty {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(combobox.empty, this.sx()))
}

/**
 * The items: `<div kuiComboboxList><ng-template let-item>…</ng-template></div>`, each of the root's
 * items drawn; Kirana UI shows those that match what is typed.
 */
@Component({
  selector: "[kuiComboboxList]",
  imports: [NgTemplateOutlet],
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxList],
  host: {
    "data-slot": "combobox-list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `@for (item of state.items(); track $index) {
    <ng-container
      [ngTemplateOutlet]="template()"
      [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
    />
  }`,
})
class ComboboxList {
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly template = contentChild.required(TemplateRef)
  protected readonly part = computed(() => partSx(combobox.list, this.sx()))
}

/** A group of items: `<div kuiComboboxGroup [items]="group.items">`, hidden while none is shown. */
@Directive({
  selector: "[kuiComboboxGroup]",
  providers: [
    provideSxPart(),
    { provide: COMBOBOX_GROUP, useFactory: () => inject(ComboboxGroup).items },
  ],
  hostDirectives: [KpComboboxGroup],
  host: {
    "data-slot": "combobox-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxGroup {
  readonly items = input<readonly unknown[]>([])
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** A group's items: `<ng-template kuiComboboxCollection let-item>…</ng-template>`, no element of its own. */
@Directive({ selector: "ng-template[kuiComboboxCollection]" })
class ComboboxCollection {
  constructor() {
    const items = inject(COMBOBOX_GROUP)
    const template = inject(TemplateRef)
    const container = inject(ViewContainerRef)
    effect(() => {
      const all = items()
      untracked(() => {
        container.clear()
        all.forEach((item, index) =>
          container.createEmbeddedView(template, { $implicit: item, index })
        )
      })
    })
  }
}

/** A group's name. */
@Directive({
  selector: "[kuiComboboxLabel]",
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxGroupLabel],
  host: {
    "data-slot": "combobox-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxLabel {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuLabel, combobox.label], this.sx())
  )
}

/**
 * An item: `<div kuiComboboxItem [value]="item">`, the item itself as the combobox's `items` hold
 * it. Kirana UI's item is given the root's label of its value as its `label`, as Base UI's
 * `itemToStringLabel` names it (the item's text otherwise holds all it draws).
 */
@Component({
  selector: "[kuiComboboxItem]",
  imports: [IconPlaceholder, KpComboboxItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    { directive: KpComboboxItem, inputs: ["value", "disabled"] },
  ],
  host: {
    "data-slot": "combobox-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <span *kpComboboxItemIndicator aria-hidden="true" [sx]="indicator">
      <svg
        iconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      ></svg>
    </span>
  `,
})
class ComboboxItem {
  readonly sx = input<SxInput>()
  protected readonly indicator = [menuIndicator, combobox.indicator] as SxInput
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding, combobox.item], this.sx())
  )

  constructor() {
    const state = useCombobox()
    const item = inject(KpComboboxItem)
    hostInputs(KpComboboxItem, { label: () => state.label(item.value()) })
  }
}

/** A line between groups. */
@Directive({
  selector: "[kuiComboboxSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxSeparator],
  host: {
    "data-slot": "combobox-separator",
    "data-orientation": "horizontal",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuSeparator, this.sx()))
}

/** A multiple combobox's chips and its input, which the popup is placed against. */
@Directive({
  selector: "[kuiComboboxChips]",
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxChips],
  host: {
    "data-slot": "combobox-chips",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxChips {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(combobox.chips, this.sx()))

  constructor() {
    useCombobox().chips.set(true)
  }
}

/**
 * A chosen item: `<div kuiComboboxChip [value]="item">`, with its remove button. Kirana UI's chip
 * needs its value, which a caller may leave out (a chip that only shows), so it is drawn here,
 * inside an element that draws nothing.
 */
@Component({
  selector: "[kuiComboboxChip]",
  imports: [IconPlaceholder, KpComboboxChip, KpComboboxChipRemove],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      kpComboboxChip
      data-slot="combobox-chip"
      [value]="value()"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
      @if (showRemove()) {
        <button
          kpComboboxChipRemove
          type="button"
          data-slot="combobox-chip-remove"
          [class]="remove"
        >
          <svg
            iconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          ></svg>
        </button>
      }
    </div>
  `,
})
class ComboboxChip {
  readonly value = input<unknown>()
  readonly showRemove = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly remove = partSx(
    [button({ variant: "ghost", size: "icon-xs" }), combobox.chipRemove],
    undefined
  ).class
  protected readonly part = computed(() => partSx(combobox.chip, this.sx()))
}

/** The chips' input, Kirana UI's, which filters and opens the list. */
@Directive({
  selector: "input[kuiComboboxChipsInput]",
  providers: [provideSxPart()],
  hostDirectives: [KpComboboxInput],
  host: {
    "data-slot": "combobox-chip-input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxChipsInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(combobox.chipInput, this.sx())
  )
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
}
