import {
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
} from "@angular/core"
import {
  KuiSelect,
  KuiSelectGroup,
  KuiSelectGroupLabel,
  KuiSelectInput,
  KuiSelectItem,
  KuiSelectItemIndicator,
  KuiSelectItemText,
  KuiSelectList,
  KuiSelectPopup,
  KuiSelectPortal,
  KuiSelectPositioner,
  KuiSelectScrollDownArrow,
  KuiSelectScrollUpArrow,
  KuiSelectSeparator,
  KuiSelectTrigger,
  KuiSelectValue,
} from "@kirana-ui/angular"
import type { Align, SelectShown, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
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
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/** An entry of a select's `items`, as Base UI takes them: the one whose value is `null` is the placeholder. */
export type SelectEntry = { label: string; value: unknown; disabled?: boolean }

/** What the registry's select keeps beside Kirana UI's: its value as Base UI's, and its `items`. */
class SelectState {
  /** The chosen value, or a `multiple` select's list; `undefined` before any is given or chosen. */
  readonly chosen = signal<unknown>(undefined)
  readonly items = signal<readonly SelectEntry[] | null>(null)

  /** The placeholder its `items` give (the entry whose value is `null`). */
  readonly placeholder = computed(
    () => this.items()?.find((item) => item.value === null)?.label ?? null
  )
}

const SELECT = new InjectionToken<SelectState>("kui select")

/**
 * A select: `<ng-container kuiSelect [items]="fruits" [(value)]="fruit">` around its trigger and
 * content, drawing no element, as Base UI's root: Kirana UI's (`KuiSelect`), its `disabled` and
 * `multiple` its own. Base UI's `value`, `defaultValue` and `valueChange` are a list with
 * `multiple`, where Kirana UI's are `values`, `defaultValues` and `valuesChange`: this root takes
 * Base UI's and hands them to the one that holds them. `items` are Base UI's: a `{ label, value }`
 * list, whose entry with a `null` value is the placeholder, read by the value part; without them the
 * items' own text names the value, as Kirana UI's does. Kirana UI's selectors are the registry's, so
 * a part takes its primitive as a host directive and a file imports only one of the two.
 */
@Directive({
  selector: "[kuiSelect]",
  providers: [{ provide: SELECT, useFactory: () => new SelectState() }],
  hostDirectives: [{ directive: KuiSelect, inputs: ["disabled", "multiple"] }],
})
class Select {
  readonly items = input<readonly SelectEntry[] | undefined>()
  readonly value = input<unknown>(undefined)
  readonly defaultValue = input<unknown>(undefined)
  readonly valueChange = output<unknown>()

  constructor() {
    const state = inject(SELECT)
    const root = inject(KuiSelect)
    let first = true
    effect(() => {
      const items = this.items() ?? null
      const value = this.value()
      const initial = this.defaultValue()
      const multiple = root.multiple()
      untracked(() => {
        state.items.set(items)
        const next = value !== undefined ? value : first ? initial : undefined
        first = false
        if (next === undefined) return
        state.chosen.set(next)
        if (multiple) root.values.set(Array.isArray(next) ? next : [])
        else root.value.set(next)
      })
    })
    root.valueChanged.subscribe(({ value }) => {
      state.chosen.set(value)
      this.valueChange.emit(value)
    })
    root.valuesChanged.subscribe(({ values }) => {
      state.chosen.set(values)
      this.valueChange.emit(values)
    })
  }
}

/**
 * The button showing the chosen value, with its chevron: `<button kuiSelectTrigger>` around a
 * `SelectValue`. A press, Enter, Space or an arrow key opens the list, as Kirana UI's trigger does.
 */
@Component({
  selector: "button[kuiSelectTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KuiSelectTrigger],
  host: {
    "data-slot": "select-trigger",
    type: "button",
    "[attr.data-size]": "size()",
    // Base UI's trigger is a disabled button, which the trigger's look reads (`:disabled`).
    "[disabled]": "root.disabled()",
    "[class]": "part().class",
    "[style]": "part().style",
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
      aria-hidden="true"
      [sx]="icon"
    ></svg>
  `,
})
class SelectTrigger {
  readonly size = input<"sm" | "default">("default")
  readonly sx = input<SxInput>()
  protected readonly root = inject(KuiSelect)
  protected readonly icon = select.triggerIcon
  protected readonly part = computed(() => partSx(select.trigger, this.sx()))
}

/**
 * The chosen value's label, or the placeholder: `<span kuiSelectValue placeholder="Pick one">`. Its
 * own content takes the label's place, reading the chosen entry (`#value="kuiSelectValue"`,
 * `value.selected()`) or the chosen values (`value.values()`), as React's takes a function of the
 * value. The label is drawn by Kirana UI's value part, written structurally inside this element.
 */
@Component({
  selector: "span[kuiSelectValue]",
  exportAs: "kuiSelectValue",
  imports: [KuiSelectValue],
  providers: [provideSxPart()],
  // Kirana UI's value element is the one drawn: a select whose popup opens over the trigger
  // (`alignItemWithTrigger`) lines its chosen item up with that element's box, so the box is the
  // design's, and this element draws none.
  host: { style: "display: contents" },
  template: `<span
    *kuiSelectValue="let shown"
    data-slot="select-value"
    [attr.data-placeholder]="values().length ? null : ''"
    [class]="part().class"
    [style]="part().style"
    ><ng-content>{{ text(shown) }}</ng-content></span
  >`,
})
class SelectValue {
  readonly placeholder = input<string>()
  readonly sx = input<SxInput>()
  protected readonly state = inject(SELECT)
  /** The chosen values, a list (one or none, or a `multiple` select's). */
  readonly values = computed(() => {
    const value = this.state.chosen()
    return Array.isArray(value)
      ? value
      : value === null || value === undefined
        ? []
        : [value]
  })
  /** The chosen entry of the select's `items`, or `null`. */
  readonly selected = computed(
    () =>
      this.state.items()?.find((item) => item.value === this.state.chosen()) ??
      null
  )
  protected readonly part = computed(() => partSx(select.value, this.sx()))

  /** The label: the `items`' where they name the value, else Kirana UI's (the item's own text). */
  protected text(shown: SelectShown) {
    const values = this.values()
    if (!values.length)
      return this.placeholder() ?? this.state.placeholder() ?? ""
    const items = this.state.items()
    if (!items) return shown.label ?? ""
    return values
      .map(
        (value) =>
          items.find((item) => item.value === value)?.label ?? String(value)
      )
      .join(", ")
  }
}

/**
 * What a content's own element carries that its popup, drawn in a portal, needs: the reading
 * direction and the language the caller wrote on it (`[attr.dir]`, `[attr.data-lang]`).
 */
function carried(element: HTMLElement) {
  return (name: "dir" | "data-lang") => element.getAttribute(name)
}

/**
 * The list: `<div kuiSelectContent>`. As Base UI's by default it opens over its trigger, the chosen
 * item over the trigger's value (`alignItemWithTrigger`); with that off, or where it does not fit,
 * below the trigger, `side`, `align` and their offsets as Base UI's. Kirana UI's portal is a
 * structural part, which an attribute cannot put around its own element: the content draws the
 * portal, the positioner, the popup with its scroll arrows and list in its template, its children
 * projected into the list, and the input that submits the value beside them.
 */
@Component({
  selector: "[kuiSelectContent]",
  imports: [
    IconPlaceholder,
    KuiSelectInput,
    KuiSelectList,
    KuiSelectPopup,
    KuiSelectPortal,
    KuiSelectPositioner,
    KuiSelectScrollDownArrow,
    KuiSelectScrollUpArrow,
  ],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiSelectPortal>
      <div
        kuiSelectPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [alignItemWithTrigger]="alignItemWithTrigger()"
        [class]="positioner"
      >
        <div
          kuiSelectPopup
          data-slot="select-content"
          [attr.data-align-trigger]="alignItemWithTrigger()"
          [attr.dir]="attr('dir')"
          [attr.data-lang]="attr('data-lang')"
          [class]="part().class"
          [style]="part().style"
        >
          <div
            *kuiSelectScrollUpArrow
            data-slot="select-scroll-up-button"
            [class]="scrollUp"
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
          <div kuiSelectList><ng-content /></div>
          <div
            *kuiSelectScrollDownArrow
            data-slot="select-scroll-down-button"
            [class]="scrollDown"
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
        </div>
      </div>
    </ng-template>
    <input kuiSelectInput tabindex="-1" aria-hidden="true" [class]="hidden" />
  `,
})
class SelectContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly alignItemWithTrigger = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly hidden = partSx(visuallyHidden, undefined).class
  protected readonly scrollUp = partSx(
    [select.scrollButton, select.scrollUp],
    undefined
  ).class
  protected readonly scrollDown = partSx(
    [select.scrollButton, select.scrollDown],
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, select.content], this.sx())
  )
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiSelectGroup]",
  providers: [provideSxPart()],
  hostDirectives: [KuiSelectGroup],
  host: {
    "data-slot": "select-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SelectGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(select.group, this.sx()))
}

/** A group's label: inside its `SelectGroup`, as Base UI's. */
@Directive({
  selector: "[kuiSelectLabel]",
  providers: [provideSxPart()],
  hostDirectives: [KuiSelectGroupLabel],
  host: {
    "data-slot": "select-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SelectLabel {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuLabel, this.sx()))
}

/**
 * An item: `<div kuiSelectItem value="apple">Apple</div>`, its text Kirana UI's item text (what the
 * trigger shows once it is chosen) and its check Kirana UI's indicator, in the page while chosen.
 */
@Component({
  selector: "[kuiSelectItem]",
  imports: [
    IconPlaceholder,
    KuiSelectItemIndicator,
    KuiSelectItemText,
    SxDirective,
  ],
  providers: [provideSxPart()],
  hostDirectives: [{ directive: KuiSelectItem, inputs: ["value", "disabled"] }],
  host: {
    "data-slot": "select-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div kuiSelectItemText [sx]="itemText"><ng-content /></div>
    <span *kuiSelectItemIndicator [sx]="indicator">
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
class SelectItem {
  readonly sx = input<SxInput>()
  protected readonly itemText = select.itemText
  protected readonly indicator = [menuIndicator, select.indicator] as SxInput
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding, select.item], this.sx())
  )
}

/** A line between groups. */
@Directive({
  selector: "[kuiSelectSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KuiSelectSeparator],
  host: {
    "data-slot": "select-separator",
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
