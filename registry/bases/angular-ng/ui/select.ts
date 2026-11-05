import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import {
  MENU_GROUP,
  Menu,
  MenuGroup,
  menuPopup,
} from "../../../lib/angular/menu"
import { POPUP, popupSurface, popupTrigger } from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
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
import { select } from "../../../styles/select.styles"

let next = 0

/** An entry of a select's `items`, as Base UI takes them: the one whose value is `null` is the placeholder. */
export type SelectEntry = { label: string; value: unknown; disabled?: boolean }

/** One select's state: its value, its listbox (a `Menu` of options) and its items' labels. */
class SelectState {
  readonly list = new Menu(null, '[role="option"]')
  readonly value = signal<unknown>(null)
  readonly items = signal<readonly SelectEntry[] | null>(null)
  /** The labels its items gave, where it has no `items`. */
  readonly labels = signal<ReadonlyMap<unknown, string>>(new Map())
  readonly disabled = signal(false)
  #changed?: (value: unknown) => void

  onChange(listener: (value: unknown) => void) {
    this.#changed = listener
  }

  choose(value: unknown) {
    if (this.value() !== value) {
      this.value.set(value)
      this.#changed?.(value)
    }
    this.list.popup.setOpen(false, "item")
    this.list.popup.trigger()?.focus({ preventScroll: true })
  }

  register(value: unknown, label: string) {
    if (this.labels().get(value) === label) return
    this.labels.update((labels) => new Map(labels).set(value, label))
  }

  /** The chosen value's label, or `null` while none is chosen. */
  readonly label = computed(() => {
    const value = this.value()
    if (value === null || value === undefined) return null
    const entry = this.items()?.find((item) => item.value === value)
    return entry?.label ?? this.labels().get(value) ?? String(value)
  })

  /** The placeholder its `items` give (the entry whose value is `null`). */
  readonly placeholder = computed(
    () => this.items()?.find((item) => item.value === null)?.label ?? null
  )
}

const SELECT = new InjectionToken<SelectState>("kui select")

/**
 * A select: `<ng-container kuiSelect [items]="fruits" [(value)]="fruit">` around its trigger and
 * content, drawing no element, as Base UI's root. `items` are Base UI's: a `{ label, value }` list,
 * whose entry with a `null` value is the placeholder; without them the items' own text names the
 * value. The popup is the registry's own layer (`lib/angular/popup.ts`).
 */
@Directive({
  selector: "[kuiSelect]",
  providers: [
    { provide: SELECT, useFactory: () => new SelectState() },
    { provide: POPUP, useFactory: () => inject(SELECT).list.popup },
  ],
})
class Select {
  readonly items = input<readonly SelectEntry[] | undefined>()
  readonly value = input<unknown>(undefined)
  readonly defaultValue = input<unknown>(undefined)
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly valueChange = output<unknown>()

  constructor() {
    const state = inject(SELECT)
    let first = true
    effect(() => {
      const items = this.items() ?? null
      const value = this.value()
      const initial = this.defaultValue()
      const disabled = this.disabled()
      untracked(() => {
        state.items.set(items)
        state.disabled.set(disabled)
        if (value !== undefined) state.value.set(value)
        else if (first && initial !== undefined) state.value.set(initial)
        first = false
      })
    })
    state.onChange((value) => this.valueChange.emit(value))
  }
}

/**
 * The button showing the chosen value, with its chevron: `<button kuiSelectTrigger>` around a
 * `SelectValue`. A press, Enter, Space or an arrow key opens the list; a hidden input after it
 * holds the value, as Base UI's.
 */
@Component({
  selector: "button[kuiSelectTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-trigger",
    type: "button",
    role: "combobox",
    "[attr.data-size]": "size()",
    "[attr.data-placeholder]": "state.label() === null ? '' : null",
    "[attr.data-disabled]": "state.disabled() ? '' : null",
    "[disabled]": "state.disabled()",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "toggle($event)",
    "(keydown)": "keydown($event)",
  },
  template: `
    <ng-content />
    <svg
      iconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      [sx]="icon"
    ></svg>
  `,
})
class SelectTrigger {
  readonly size = input<"sm" | "default">("default")
  readonly sx = input<SxInput>()
  protected readonly state = inject(SELECT)
  protected readonly icon = select.triggerIcon
  protected readonly part = computed(() => partSx(select.trigger, this.sx()))

  constructor() {
    const element = popupTrigger(this.state.list.popup, {
      haspopup: "listbox",
      toggle: false,
    })
    const hidden = document.createElement("input")
    hidden.tabIndex = -1
    hidden.setAttribute("aria-hidden", "true")
    hidden.style.cssText =
      "clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0;padding:0;width:1px;height:1px;margin:0;position:fixed;top:0;left:0"
    afterNextRender(() => {
      hidden.id = `${element.id}-hidden-input`
      element.after(hidden)
    })
    effect(() => {
      const value = this.state.value()
      hidden.value = value === null || value === undefined ? "" : String(value)
    })
    inject(DestroyRef).onDestroy(() => hidden.remove())
  }

  protected toggle(event: MouseEvent) {
    if (this.state.disabled()) return
    this.state.list.fromKeyboard = event.detail === 0
    this.state.list.popup.setOpen(!this.state.list.popup.open(), "trigger")
  }

  protected keydown(event: KeyboardEvent) {
    if (!["ArrowDown", "ArrowUp"].includes(event.key) || this.state.disabled())
      return
    event.preventDefault()
    this.state.list.fromKeyboard = true
    this.state.list.popup.setOpen(true, "trigger")
  }
}

/** The chosen value's label, or the placeholder: `<span kuiSelectValue placeholder="Pick one">`. */
@Component({
  selector: "span[kuiSelectValue]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-value",
    "[attr.data-placeholder]": "state.label() === null ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `{{ state.label() ?? placeholder() ?? state.placeholder() ?? "" }}`,
})
class SelectValue {
  readonly placeholder = input<string>()
  readonly sx = input<SxInput>()
  protected readonly state = inject(SELECT)
  protected readonly part = computed(() => partSx(select.value, this.sx()))
}

/**
 * The list: `<div kuiSelectContent>`. As Base UI's by default it opens over its trigger, the chosen
 * item over the trigger's value (`alignItemWithTrigger`); with that off, or where it does not fit,
 * below the trigger, `side`, `align` and their offsets as Base UI's.
 */
@Component({
  selector: "[kuiSelectContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[attr.data-align-trigger]": "alignItemWithTrigger()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  imports: [IconPlaceholder, SxDirective],
  template: `
    @if (canScroll().up) {
      <div
        data-slot="select-scroll-up-button"
        data-direction="up"
        data-visible=""
        data-side="none"
        aria-hidden="true"
        style="position: absolute"
        [sx]="scrollUp"
        (pointerenter)="scrollWhile(-1)"
        (pointerleave)="scrollWhile(0)"
      >
        <svg
          iconPlaceholder
          lucide="ChevronUpIcon"
          tabler="IconChevronUp"
          hugeicons="ArrowUp01Icon"
          phosphor="CaretUpIcon"
          remixicon="RiArrowUpSLine"
        ></svg>
      </div>
    }
    <div
      #list
      role="listbox"
      [attr.id]="listId"
      style="position: relative; max-height: 100%; overflow: hidden auto"
      (scroll)="measure()"
    >
      <ng-content />
    </div>
    @if (canScroll().down) {
      <div
        data-slot="select-scroll-down-button"
        data-direction="down"
        data-visible=""
        data-side="none"
        aria-hidden="true"
        style="position: absolute"
        [sx]="scrollDown"
        (pointerenter)="scrollWhile(1)"
        (pointerleave)="scrollWhile(0)"
      >
        <svg
          iconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
        ></svg>
      </div>
    }
  `,
})
class SelectContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly alignItemWithTrigger = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = inject(SELECT)
  protected readonly listId = `kui-select-list-${next++}`
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, select.content], this.sx())
  )
  private readonly listElement =
    viewChild.required<ElementRef<HTMLElement>>("list")
  protected readonly scrollUp = [
    select.scrollButton,
    select.scrollUp,
  ] as SxInput
  protected readonly scrollDown = [
    select.scrollButton,
    select.scrollDown,
  ] as SxInput
  /** Whether the list can scroll further, which shows the arrow at that end, as Base UI's. */
  protected readonly canScroll = signal({ up: false, down: false })
  #scrolling: ReturnType<typeof setInterval> | undefined

  protected measure() {
    const list = this.listElement().nativeElement
    const up = list.scrollTop > 0
    const down = list.scrollTop + list.clientHeight < list.scrollHeight - 1
    const now = this.canScroll()
    if (now.up !== up || now.down !== down) this.canScroll.set({ up, down })
  }

  /** The pointer resting on an arrow scrolls the list that way. */
  protected scrollWhile(direction: -1 | 0 | 1) {
    clearInterval(this.#scrolling)
    if (!direction) return
    this.#scrolling = setInterval(() => {
      this.listElement().nativeElement.scrollTop += direction * 8
    }, 16)
  }

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const list = this.state.list
    popupSurface(list.popup, {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: menuPositioner,
      role: "presentation",
      placeSelf: (positioner, trigger) =>
        this.alignItemWithTrigger() &&
        this.#overTrigger(element, positioner, trigger),
    })
    menuPopup(list)
    inject(DestroyRef).onDestroy(() => clearInterval(this.#scrolling))
    // Open, the chosen item (or the first) is highlighted, as Base UI's.
    effect(() => {
      if (!list.popup.open()) return
      untracked(() =>
        queueMicrotask(() => {
          const items = list.items()
          const chosen =
            items.find(
              (item) => item.getAttribute("aria-selected") === "true"
            ) ?? items[0]
          if (chosen) list.highlight(chosen)
          this.measure()
        })
      )
    })
  }

  /** Base UI's `alignItemWithTrigger`: the chosen item's text over the trigger's value. */
  #overTrigger(
    element: HTMLElement,
    positioner: HTMLElement,
    trigger: HTMLElement
  ) {
    const items = this.state.list.items()
    const item =
      items.find((entry) => entry.getAttribute("aria-selected") === "true") ??
      items[0]
    if (!item) return false
    const margin = 10
    const style = positioner.style
    style.cssText = "position: fixed; top: 0px; left: 0px; max-height: none;"
    const height = this.listElement().nativeElement.scrollHeight
    const popupBox = element.getBoundingClientRect()
    const itemBox = item.getBoundingClientRect()
    const text = item.firstElementChild ?? item
    const textBox = text.getBoundingClientRect()
    const triggerBox = trigger.getBoundingClientRect()
    const value = trigger.querySelector('[data-slot="select-value"]') ?? trigger
    const valueBox = value.getBoundingClientRect()
    const itemTop = itemBox.top - popupBox.top
    const top =
      triggerBox.top + (triggerBox.height - itemBox.height) / 2 - itemTop
    const left =
      triggerBox.left +
      (valueBox.left - triggerBox.left) -
      (textBox.left - popupBox.left)
    const viewport = document.documentElement.clientHeight
    if (top < margin) return false
    // Taller than the room below: it keeps its top and reaches down to the viewport's margin, its
    // list scrolling, as Base UI's.
    const overflows = top + height > viewport - margin
    const placed = overflows ? viewport - top - margin : height
    style.cssText = [
      "position: fixed",
      `--available-width: ${document.documentElement.clientWidth - margin}px`,
      // The room below the trigger, as Base UI measures it for its fallback below the trigger.
      `--available-height: ${viewport - triggerBox.bottom - this.sideOffset() - 5}px`,
      `--anchor-width: ${triggerBox.width}px`,
      `--anchor-height: ${triggerBox.height}px`,
      `--transform-origin: ${popupBox.width / 2}px -4px`,
      `left: ${left}px`,
      `height: ${placed}px`,
      "max-height: none",
      `margin-top: ${margin}px`,
      `margin-bottom: ${margin}px`,
      overflows ? "bottom: 0px" : `top: ${top - margin}px`,
    ].join("; ")
    element.style.height = "100%"
    element.style.setProperty(
      "--transform-origin",
      `50% ${((itemTop + itemBox.height / 2) / placed) * 100}%`
    )
    for (const node of [positioner, element]) {
      node.setAttribute("data-side", "none")
      node.setAttribute("data-align", "center")
    }
    return true
  }
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiSelectGroup]",
  providers: [
    provideSxPart(),
    { provide: MENU_GROUP, useFactory: () => new MenuGroup() },
  ],
  host: {
    "data-slot": "select-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SelectGroup {
  readonly sx = input<SxInput>()
  protected readonly group = inject(MENU_GROUP)
  protected readonly part = computed(() => partSx(select.group, this.sx()))
}

/** A group's label: inside its `SelectGroup`, as Base UI's. */
@Directive({
  selector: "[kuiSelectLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-label",
    "aria-hidden": "true",
    "[attr.id]": "id",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SelectLabel {
  readonly sx = input<SxInput>()
  protected readonly id = `kui-select-label-${next++}`
  protected readonly part = computed(() => partSx(menuLabel, this.sx()))

  constructor() {
    inject(MENU_GROUP, { optional: true })?.labelId.set(this.id)
  }
}

/** An item: `<div kuiSelectItem value="apple">Apple</div>`, its check while chosen. */
@Component({
  selector: "[kuiSelectItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-item",
    role: "option",
    tabindex: "-1",
    "[attr.aria-selected]": "chosen()",
    "[attr.data-selected]": "chosen() ? '' : null",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "choose()",
    "(pointermove)": "hover()",
  },
  template: `
    <div #text [sx]="itemText"><ng-content /></div>
    @if (chosen()) {
      <span [sx]="indicator">
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
class SelectItem {
  readonly value = input<unknown>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = inject(SELECT)
  protected readonly itemText = select.itemText
  protected readonly indicator = [menuIndicator, select.indicator] as SxInput
  protected readonly chosen = computed(
    () => this.state.value() === this.value()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding, select.item], this.sx())
  )
  private readonly text = viewChild.required<ElementRef<HTMLElement>>("text")
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement

  constructor() {
    afterNextRender(() =>
      this.state.register(
        this.value(),
        (this.text().nativeElement.textContent ?? "").trim()
      )
    )
  }

  protected choose() {
    if (!this.disabled()) this.state.choose(this.value())
  }

  protected hover() {
    if (!this.disabled() && this.state.list.highlighted() !== this.#element)
      this.state.list.highlight(this.#element)
  }
}

/** A line between groups. */
@Directive({
  selector: "[kuiSelectSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "select-separator",
    role: "separator",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SelectSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuSeparator, select.separator], this.sx())
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
