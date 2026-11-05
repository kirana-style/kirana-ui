/**
 * Base UI's combobox on Angular, the registry's own (ng-primitives' combobox writes another markup
 * and API): `items` (strings, objects with a `label` and `value`, or groups with their own
 * `items`), filtered by what is typed as Base UI's are, `ComboboxList` and `ComboboxCollection`
 * drawing each match through the caller's `<ng-template let-item>`; a value or a list of them
 * (`multiple`), in the shape the items were given; `autoHighlight`. Focus stays in the input: the
 * arrows, Home and End move the highlight (`aria-activedescendant`), Enter chooses, Escape closes.
 * The popup is the registry's layer (`lib/angular/popup.ts`) in Base UI's markup.
 */
import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
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
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { POPUP, popupSurface, providePopup } from "../../../lib/angular/popup"
import type { Align, Side, Popup } from "../../../lib/angular/popup"
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

let next = 0

type Entry = {
  key: string
  id: string
  element: HTMLElement
  item: unknown
  disabled: () => boolean
}

const isGroup = (item: unknown): item is { items: unknown[] } =>
  typeof item === "object" &&
  item !== null &&
  Array.isArray((item as { items?: unknown }).items)

/** A combobox's state, which its parts share. */
class ComboboxState {
  readonly listId = `kui-combobox-list-${next++}`
  readonly inputId = `kui-combobox-input-${next++}`
  readonly items = signal<readonly unknown[]>([])
  readonly multiple = signal(false)
  readonly autoHighlight = signal(false)
  readonly disabled = signal(false)
  readonly toLabel = signal<((item: never) => string) | undefined>(undefined)
  readonly toValue = signal<((item: never) => string) | undefined>(undefined)
  /** What is typed, while it is typed: an input showing the chosen item's label lists them all. */
  readonly query = signal("")
  readonly inputValue = signal("")
  readonly selected = signal<unknown[]>([])
  readonly highlighted = signal<string | null>(null)
  /** Whether the popup is anchored to the chips (`data-chips`), or opened from a trigger (a dialog). */
  readonly chips = signal(false)
  readonly fromTrigger = signal(false)
  readonly #entries = signal<Entry[]>([])
  report: (selected: unknown[]) => void = () => {}

  constructor(readonly popup: Popup) {
    // Opened, nothing is typed yet, and its first chosen item is highlighted, as Base UI's.
    effect(() => {
      const open = this.popup.open()
      untracked(() => {
        this.query.set("")
        if (open) {
          const chosen = this.selected()[0]
          this.highlighted.set(chosen === undefined ? null : this.value(chosen))
        } else if (!this.multiple()) this.inputValue.set(this.chosenLabel())
      })
    })
    // What is typed highlights its first match with `autoHighlight`.
    effect(() => {
      const query = this.query()
      const first = this.entries().find((entry) => !entry.disabled())
      untracked(() => {
        if (this.autoHighlight() && query)
          this.highlighted.set(first?.key ?? null)
      })
    })
  }

  label(item: unknown): string {
    const own = this.toLabel()
    if (own) return own(item as never)
    return typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item)
  }

  value(item: unknown): string {
    const own = this.toValue()
    if (own) return own(item as never)
    return typeof item === "object" && item !== null && "value" in item
      ? String((item as { value: unknown }).value)
      : String(item)
  }

  chosenLabel() {
    const chosen = this.selected()[0]
    return chosen === undefined ? "" : this.label(chosen)
  }

  matches(item: unknown) {
    return this.label(item)
      .toLowerCase()
      .includes(this.query().trim().toLowerCase())
  }

  filter(pool: readonly unknown[]) {
    return pool.filter((item) => this.matches(item))
  }

  /** The items, or the groups with a match, that match what is typed. */
  readonly filtered = computed(() =>
    this.items().flatMap((item) => {
      if (!isGroup(item)) return this.matches(item) ? [item] : []
      return this.filter(item.items).length ? [item] : []
    })
  )
  readonly empty = computed(() => this.filtered().length === 0)

  isSelected(item: unknown) {
    const key = this.value(item)
    return this.selected().some((chosen) => this.value(chosen) === key)
  }

  register(entry: Entry) {
    this.#entries.update((all) => [...all, entry])
    return () =>
      this.#entries.update((all) => all.filter((e) => e.id !== entry.id))
  }

  /** The drawn items, in the page's order. */
  readonly entries = computed(() =>
    [...this.#entries()].sort((a, b) =>
      a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1
    )
  )

  activeId() {
    const key = this.highlighted()
    return this.entries().find((entry) => entry.key === key)?.id ?? null
  }

  highlight(key: string | null) {
    this.highlighted.set(key)
    this.entries()
      .find((entry) => entry.key === key)
      ?.element.scrollIntoView({ block: "nearest" })
  }

  choose(item: unknown) {
    if (this.multiple()) {
      const chosen = this.isSelected(item)
        ? this.selected().filter((s) => this.value(s) !== this.value(item))
        : [...this.selected(), item]
      // Chosen from what was typed, the list closes, as Base UI's.
      const typed = !!this.query()
      this.set(chosen)
      this.query.set("")
      this.inputValue.set("")
      if (typed) this.popup.setOpen(false, "item")
      return
    }
    this.set([item])
    this.inputValue.set(this.label(item))
    this.popup.setOpen(false, "item")
    // Opened from a trigger, focus goes back to it.
    if (this.fromTrigger()) this.popup.trigger()?.focus({ preventScroll: true })
  }

  remove(item: unknown) {
    this.set(this.selected().filter((s) => this.value(s) !== this.value(item)))
  }

  clear() {
    this.set([])
    this.query.set("")
    this.inputValue.set("")
  }

  set(selected: unknown[]) {
    this.selected.set(selected)
    this.report(selected)
  }

  type(text: string) {
    this.inputValue.set(text)
    this.query.set(text)
    if (!this.popup.open()) this.popup.setOpen(true, "trigger")
  }

  keydown(event: KeyboardEvent) {
    const entries = this.entries().filter((entry) => !entry.disabled())
    const at = entries.findIndex((entry) => entry.key === this.highlighted())
    const move = (to: number) => {
      event.preventDefault()
      const entry = entries[to]
      if (entry) this.highlight(entry.key)
    }
    switch (event.key) {
      case "ArrowDown":
        if (!this.popup.open()) {
          event.preventDefault()
          this.popup.setOpen(true, "trigger")
          return
        }
        return move(at < 0 ? 0 : Math.min(at + 1, entries.length - 1))
      case "ArrowUp":
        if (!this.popup.open()) {
          event.preventDefault()
          this.popup.setOpen(true, "trigger")
          return
        }
        return move(at < 0 ? entries.length - 1 : Math.max(at - 1, 0))
      case "Home":
        if (this.popup.open()) move(0)
        return
      case "End":
        if (this.popup.open()) move(entries.length - 1)
        return
      case "Enter": {
        const entry = entries[at]
        if (this.popup.open() && entry) {
          event.preventDefault()
          this.choose(entry.item)
        }
        return
      }
      case "Backspace":
        if (this.multiple() && !this.inputValue() && this.selected().length)
          this.remove(this.selected()[this.selected().length - 1])
        return
    }
  }
}

const COMBOBOX = new InjectionToken<ComboboxState>("kui combobox")
/** A group's items, which its `ComboboxCollection` draws. */
const COMBOBOX_GROUP = new InjectionToken<{
  items: Signal<readonly unknown[]>
  labelId: string
}>("kui combobox group")
/** Inside the popup: an input there is not what it is placed against (the trigger is). */
const IN_CONTENT = new InjectionToken<boolean>("kui combobox in content")

const useCombobox = () => inject(COMBOBOX)

/**
 * The combobox: `<ng-container kuiCombobox [items]="…" [(value)]="…">` around its input (or
 * trigger) and content, drawing no element, as Base UI's root. `#combo="kuiCombobox"` reads its
 * state, `combo.selected()` the chosen items.
 */
@Directive({
  selector: "[kuiCombobox]",
  exportAs: "kuiCombobox",
  providers: [
    providePopup(),
    {
      provide: COMBOBOX,
      useFactory: () => new ComboboxState(inject(POPUP)),
    },
  ],
})
class Combobox {
  readonly items = input<readonly unknown[]>([])
  readonly defaultValue = input<unknown>()
  readonly value = input<unknown>()
  readonly valueChange = output<unknown>()
  readonly multiple = input(false, { transform: booleanAttribute })
  readonly autoHighlight = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  // `any`: a caller's callback takes its own items' type.
  // oxlint-disable-next-line no-explicit-any
  readonly itemToStringLabel = input<(item: any) => string>()
  // oxlint-disable-next-line no-explicit-any
  readonly itemToStringValue = input<(item: any) => string>()
  readonly state = inject(COMBOBOX)
  readonly selected = this.state.selected.asReadonly()

  constructor() {
    const state = this.state
    const list = (value: unknown) =>
      value === undefined || value === null
        ? []
        : Array.isArray(value)
          ? value
          : [value]
    let first = true
    effect(() => {
      state.items.set(this.items())
      state.multiple.set(this.multiple())
      state.autoHighlight.set(this.autoHighlight())
      state.disabled.set(this.disabled())
      state.toLabel.set(this.itemToStringLabel())
      state.toValue.set(this.itemToStringValue())
      const controlled = this.value()
      const initial = this.defaultValue()
      untracked(() => {
        if (controlled !== undefined) state.selected.set(list(controlled))
        else if (first) state.selected.set(list(initial))
        if (first && !this.multiple()) state.inputValue.set(state.chosenLabel())
        first = false
      })
    })
    state.report = (selected) =>
      this.valueChange.emit(this.multiple() ? selected : (selected[0] ?? null))
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
 * kuiComboboxTrigger>`. Its content then holds the search input, as a dialog.
 */
@Component({
  selector: "[kuiComboboxTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    type: "button",
    role: "combobox",
    "aria-haspopup": "dialog",
    "[attr.data-slot]": "'combobox-trigger'",
    "[attr.aria-expanded]": "state.popup.open()",
    "[attr.data-popup-open]": "state.popup.open() ? '' : null",
    "[attr.disabled]": "state.disabled() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "state.popup.setOpen(!state.popup.open(), 'trigger')",
  },
  template: `<ng-content />${CHEVRON}`,
})
class ComboboxTrigger {
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly chevron = combobox.triggerIcon
  protected readonly part = computed(() =>
    partSx(combobox.triggerOwn, this.sx())
  )

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    this.state.popup.trigger.set(element)
    this.state.fromTrigger.set(true)
    if (!element.id) element.id = this.state.popup.triggerId
  }
}

/**
 * The input in its input group: `<div kuiComboboxInput placeholder="…" showClear>`, with the
 * chevron that opens the list (`showTrigger`, on by default) and a clear button. Inside the
 * content (after a `ComboboxTrigger`), it searches.
 */
@Component({
  selector: "[kuiComboboxInput]",
  imports: [IconPlaceholder, InputGroupAddon, SxDirective],
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
      #field
      data-slot="input-group-control"
      autocomplete="off"
      spellcheck="false"
      autocorrect="off"
      autocapitalize="none"
      role="combobox"
      aria-haspopup="listbox"
      aria-autocomplete="list"
      [id]="state.inputId"
      [attr.aria-expanded]="state.popup.open()"
      [attr.aria-controls]="state.popup.open() ? state.listId : null"
      [attr.aria-activedescendant]="
        state.popup.open() ? state.activeId() : null
      "
      [attr.data-popup-open]="inContent ? null : state.popup.open() ? '' : null"
      [attr.placeholder]="placeholder() ?? null"
      [attr.aria-invalid]="ariaInvalid() ?? null"
      [disabled]="isDisabled()"
      [value]="inContent ? state.query() : state.inputValue()"
      (input)="state.type($any($event.target).value)"
      (keydown)="state.keydown($event)"
      (click)="inContent || state.popup.setOpen(true, 'trigger')"
      [sx]="control"
    />
    <div kuiInputGroupAddon align="inline-end">
      @if (showTrigger() && !inContent) {
        <button
          type="button"
          tabindex="-1"
          data-slot="input-group-button"
          data-size="icon-xs"
          aria-haspopup="listbox"
          [attr.data-placeholder]="state.selected().length ? null : ''"
          [attr.aria-expanded]="state.popup.open()"
          [disabled]="isDisabled()"
          [sx]="triggerLook"
          (click)="
            state.popup.setOpen(!state.popup.open(), 'trigger'); field.focus()
          "
        >
          ${CHEVRON}
        </button>
      }
      @if (showClear()) {
        <button
          type="button"
          tabindex="-1"
          data-slot="combobox-clear"
          data-size="icon-xs"
          aria-label="Clear selection"
          [disabled]="isDisabled()"
          [sx]="clearLook"
          (click)="state.clear(); field.focus()"
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
    () => this.disabled() || this.state.disabled()
  )
  protected readonly part = computed(() =>
    partSx([inputGroup.root, combobox.input], this.sx())
  )

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    if (this.inContent) {
      // Searching in a dialog: it takes focus when the content opens.
      effect(() => {
        if (this.state.popup.open())
          queueMicrotask(() =>
            element
              .querySelector<HTMLInputElement>("input")
              ?.focus({ preventScroll: true })
          )
      })
      return
    }
    // The popup is placed against the input, and a press anywhere in the group is not outside it.
    this.state.popup.trigger.set(element)
    queueMicrotask(() =>
      this.state.popup.anchor.set(
        element.querySelector<HTMLInputElement>("input")
      )
    )
  }
}

/** What opens below it: `<div kuiComboboxContent>`, in a portal, placed with Base UI's props. */
@Component({
  selector: "[kuiComboboxContent]",
  providers: [provideSxPart(), { provide: IN_CONTENT, useValue: true }],
  host: {
    "data-slot": "combobox-content",
    "[attr.data-chips]": "String(state.chips())",
    "[attr.role]": "state.fromTrigger() ? 'dialog' : 'presentation'",
    "[attr.data-empty]": "state.empty() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />`,
})
class ComboboxContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(6, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly String = String
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, combobox.content], this.sx())
  )

  constructor() {
    popupSurface(this.state.popup, {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: menuPositioner,
    })
  }
}

/** What it says while nothing matches. */
@Component({
  selector: "[kuiComboboxEmpty]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-empty",
    role: "status",
    "aria-live": "polite",
    "aria-atomic": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `@if (state.empty()) {
    <ng-content />
  }`,
})
class ComboboxEmpty {
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly part = computed(() => partSx(combobox.empty, this.sx()))
}

/** The matches: `<div kuiComboboxList><ng-template let-item>…</ng-template></div>`. */
@Component({
  selector: "[kuiComboboxList]",
  imports: [NgTemplateOutlet],
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-list",
    role: "listbox",
    tabindex: "-1",
    "[id]": "state.listId",
    "[attr.aria-multiselectable]": "state.multiple() ? 'true' : null",
    "[attr.data-empty]": "state.empty() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `@for (item of state.filtered(); track $index) {
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

/** A group of items: `<div kuiComboboxGroup [items]="group.items">`. */
@Directive({
  selector: "[kuiComboboxGroup]",
  providers: [
    provideSxPart(),
    {
      provide: COMBOBOX_GROUP,
      useFactory: () => {
        const group = inject(ComboboxGroup)
        return { items: group.items, labelId: group.labelId }
      },
    },
  ],
  host: {
    "data-slot": "combobox-group",
    role: "group",
    "[attr.aria-labelledby]": "labelId",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxGroup {
  readonly items = input<readonly unknown[]>([])
  readonly sx = input<SxInput>()
  readonly labelId = `kui-combobox-label-${next++}`
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** A group's matches: `<ng-template kuiComboboxCollection let-item>…</ng-template>`, no element of its own. */
@Directive({ selector: "ng-template[kuiComboboxCollection]" })
class ComboboxCollection {
  constructor() {
    const state = useCombobox()
    const group = inject(COMBOBOX_GROUP)
    const template = inject(TemplateRef)
    const container = inject(ViewContainerRef)
    effect(() => {
      const items = state.filter(group.items())
      untracked(() => {
        container.clear()
        items.forEach((item, index) =>
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
  host: {
    "data-slot": "combobox-label",
    "aria-hidden": "true",
    "[id]": "group?.labelId ?? null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxLabel {
  readonly sx = input<SxInput>()
  protected readonly group = inject(COMBOBOX_GROUP, { optional: true })
  protected readonly part = computed(() =>
    partSx([menuLabel, combobox.label], this.sx())
  )
}

/** An item: `<div kuiComboboxItem [value]="item">`, the item itself as the combobox's `items` hold it. */
@Component({
  selector: "[kuiComboboxItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-item",
    role: "option",
    "[id]": "id",
    "[attr.aria-selected]": "String(selected())",
    "[attr.data-selected]": "selected() ? '' : null",
    "[attr.data-highlighted]": "highlighted() ? '' : null",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(pointermove)": "disabled() || highlighted() || state.highlight(key())",
    "(click)": "disabled() || state.choose(value())",
  },
  template: `
    <ng-content />
    @if (selected()) {
      <span data-selected="" aria-hidden="true" [sx]="indicator">
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      </span>
    }
  `,
})
class ComboboxItem {
  readonly value = input.required<unknown>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly id = `kui-combobox-item-${next++}`
  protected readonly String = String
  protected readonly indicator = [menuIndicator, combobox.indicator] as SxInput
  protected readonly key = computed(() => this.state.value(this.value()))
  protected readonly selected = computed(() =>
    this.state.isSelected(this.value())
  )
  protected readonly highlighted = computed(
    () => this.state.highlighted() === this.key()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding, combobox.item], this.sx())
  )

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    let unregister: (() => void) | undefined
    effect(() => {
      const key = this.key()
      const item = this.value()
      untracked(() => {
        unregister?.()
        unregister = this.state.register({
          key,
          id: this.id,
          element,
          item,
          disabled: this.disabled,
        })
      })
    })
    inject(DestroyRef).onDestroy(() => unregister?.())
  }
}

/** A line between groups. */
@Directive({
  selector: "[kuiComboboxSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-separator",
    "data-orientation": "horizontal",
    role: "presentation",
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
  host: {
    "data-slot": "combobox-chips",
    role: "toolbar",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ComboboxChips {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(combobox.chips, this.sx()))

  constructor() {
    const state = useCombobox()
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    state.chips.set(true)
    state.popup.trigger.set(element)
    state.popup.anchor.set(element)
  }
}

/** A chosen item: `<div kuiComboboxChip [value]="item">`, with its remove button. */
@Component({
  selector: "[kuiComboboxChip]",
  imports: [IconPlaceholder],
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-chip",
    tabindex: "-1",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    @if (showRemove()) {
      <button
        type="button"
        tabindex="-1"
        data-slot="combobox-chip-remove"
        aria-disabled="false"
        [class]="remove"
        (click)="state.remove(value())"
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
  `,
})
class ComboboxChip {
  readonly value = input<unknown>()
  readonly showRemove = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
  protected readonly remove = partSx(
    [button({ variant: "ghost", size: "icon-xs" }), combobox.chipRemove],
    undefined
  ).class
  protected readonly part = computed(() => partSx(combobox.chip, this.sx()))
}

/** The chips' input, which filters and opens the list. */
@Directive({
  selector: "input[kuiComboboxChipsInput]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "combobox-chip-input",
    autocomplete: "off",
    spellcheck: "false",
    autocorrect: "off",
    autocapitalize: "none",
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "[id]": "state.inputId",
    "[attr.aria-expanded]": "state.popup.open()",
    "[attr.aria-controls]": "state.popup.open() ? state.listId : null",
    "[attr.aria-activedescendant]":
      "state.popup.open() ? state.activeId() : null",
    "[value]": "state.inputValue()",
    "[disabled]": "state.disabled()",
    "[class]": "part().class",
    "[style]": "part().style",
    "(input)": "state.type($any($event.target).value)",
    "(keydown)": "state.keydown($event)",
    "(click)": "state.popup.setOpen(true, 'trigger')",
  },
})
class ComboboxChipsInput {
  readonly sx = input<SxInput>()
  protected readonly state = useCombobox()
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
