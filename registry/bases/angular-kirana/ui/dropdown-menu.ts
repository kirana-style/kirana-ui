import {
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
} from "@angular/core"
import {
  KuiMenu,
  KuiMenuCheckboxItem,
  KuiMenuCheckboxItemIndicator,
  KuiMenuGroup,
  KuiMenuGroupLabel,
  KuiMenuItem,
  KuiMenuPopup,
  KuiMenuPortal,
  KuiMenuPositioner,
  KuiMenuRadioGroup,
  KuiMenuRadioItem,
  KuiMenuRadioItemIndicator,
  KuiMenuSeparator,
  KuiMenuSubmenuRoot,
  KuiMenuSubmenuTrigger,
  KuiMenuTrigger,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuLabelWeight,
  menuPositioner,
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
  menuSeparator,
  menuShortcut,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * A menu opened from a button: `<ng-container kuiDropdownMenu>` around its trigger and content,
 * drawing no element, as Base UI's root: Kirana UI's menu (`KuiMenu`), its `[(open)]` and
 * `defaultOpen` its own. Kirana UI's selectors are the registry's, so a part takes its primitive as
 * a host directive and a file imports only one of the two.
 */
@Directive({
  selector: "[kuiDropdownMenu]",
  hostDirectives: [
    {
      directive: KuiMenu,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class DropdownMenu {}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiDropdownMenuPortal]" })
class DropdownMenuPortal {}

/** The button that opens it. */
@Directive({
  selector: "[kuiDropdownMenuTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KuiMenuTrigger],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'dropdown-menu-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * What a content's own element carries that its popup, drawn in a portal, needs: the reading
 * direction and the language the caller wrote on it (`[attr.dir]`, `[attr.data-lang]`).
 */
function carried(element: HTMLElement) {
  return (name: "dir" | "data-lang") => element.getAttribute(name)
}

/**
 * The menu: `<div kuiDropdownMenuContent align="end">`, below its trigger and aligned to its start.
 * Kirana UI's portal is a structural part, which an attribute cannot put around its own element:
 * the content draws the portal, the positioner and the popup in its template, its children
 * projected into the popup, and its own element stays where it was written, drawing nothing.
 */
@Component({
  selector: "[kuiDropdownMenuContent]",
  imports: [KuiMenuPopup, KuiMenuPortal, KuiMenuPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiMenuPortal>
      <div
        kuiMenuPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kuiMenuPopup
          data-slot="dropdown-menu-content"
          [attr.dir]="attr('dir')"
          [attr.data-lang]="attr('data-lang')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
})
class DropdownMenuContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, dropdownMenu.content], this.sx())
  )
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiDropdownMenuGroup]",
  hostDirectives: [KuiMenuGroup],
  host: { "data-slot": "dropdown-menu-group" },
})
class DropdownMenuGroup {}

/** A group's label: inside its `DropdownMenuGroup` or `DropdownMenuRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiDropdownMenuLabel]",
  providers: [provideSxPart()],
  hostDirectives: [KuiMenuGroupLabel],
  host: {
    "data-slot": "dropdown-menu-label",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuLabel {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuLabel, menuLabelWeight], this.sx())
  )
}

/** An item: `<div kuiDropdownMenuItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiDropdownMenuItem]",
  providers: [provideSxPart()],
  hostDirectives: [
    // `closeOnClick`: whether a press closes the menu (Base UI's), as Kirana UI's item takes it.
    { directive: KuiMenuItem, inputs: ["disabled", "closeOnClick"] },
  ],
  host: {
    "data-slot": "dropdown-menu-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly variant = input<"default" | "destructive">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [
        menuRowBase,
        menuRowPadding,
        this.variant() === "destructive" ? menuRowDestructive : undefined,
      ],
      this.sx()
    )
  )
}

/** A menu inside the menu: `<ng-container kuiDropdownMenuSub>` around its trigger and content. */
@Directive({
  selector: "[kuiDropdownMenuSub]",
  hostDirectives: [KuiMenuSubmenuRoot],
})
class DropdownMenuSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiDropdownMenuSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KuiMenuSubmenuTrigger],
  host: {
    "data-slot": "dropdown-menu-sub-trigger",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <svg
      iconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      [sx]="icon"
    ></svg>
  `,
})
class DropdownMenuSubTrigger {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly icon = dropdownMenu.subTriggerIcon
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuRowPadding, dropdownMenu.subTrigger], this.sx())
  )
}

/** A submenu, beside its trigger: drawn as the content is, in its own portal. */
@Component({
  selector: "[kuiDropdownMenuSubContent]",
  imports: [KuiMenuPopup, KuiMenuPortal, KuiMenuPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiMenuPortal>
      <div
        kuiMenuPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kuiMenuPopup
          data-slot="dropdown-menu-sub-content"
          [attr.dir]="attr('dir')"
          [attr.data-lang]="attr('data-lang')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
})
class DropdownMenuSubContent {
  readonly side = input<Side>("inline-end")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(-3, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx(
      [popupMotion, menuSurface, dropdownMenu.content, dropdownMenu.subContent],
      this.sx()
    )
  )
}

/**
 * An item that turns on and off: `[(checked)]` or `defaultChecked`; it leaves the menu open. Its
 * check is Kirana UI's indicator, in the page while the item is checked.
 */
@Component({
  selector: "[kuiDropdownMenuCheckboxItem]",
  imports: [IconPlaceholder, KuiMenuCheckboxItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KuiMenuCheckboxItem,
      inputs: ["defaultChecked", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-checkbox-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span data-slot="dropdown-menu-checkbox-item-indicator" [sx]="indicator">
      <span *kuiMenuCheckboxItemIndicator>
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      </span>
    </span>
    <ng-content />
  `,
})
class DropdownMenuCheckboxItem {
  /**
   * Whether it is checked, held by the caller: also a bare `checked`, as Base UI's. Kirana UI's
   * `checked` takes a boolean only, so it is given here and handed on.
   */
  readonly checked = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  readonly checkedChange = output<boolean>()
  protected readonly indicator = menuIndicator
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding], this.sx())
  )

  constructor() {
    const item = inject(KuiMenuCheckboxItem)
    effect(() => {
      const checked = this.checked()
      if (checked !== undefined) item.checked.set(checked)
    })
    item.checkedChanged.subscribe(({ checked }) =>
      this.checkedChange.emit(checked)
    )
  }
}

/** Radio items, one chosen: `[(value)]` or `defaultValue`. */
@Directive({
  selector: "[kuiDropdownMenuRadioGroup]",
  hostDirectives: [
    {
      directive: KuiMenuRadioGroup,
      inputs: ["value", "defaultValue"],
      outputs: ["valueChange"],
    },
  ],
  host: { "data-slot": "dropdown-menu-radio-group" },
})
class DropdownMenuRadioGroup {}

/** One of its items: `<div kuiDropdownMenuRadioItem value="top">`; it leaves the menu open. */
@Component({
  selector: "[kuiDropdownMenuRadioItem]",
  imports: [IconPlaceholder, KuiMenuRadioItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KuiMenuRadioItem,
      inputs: ["value", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "dropdown-menu-radio-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span data-slot="dropdown-menu-radio-item-indicator" [sx]="indicator">
      <span *kuiMenuRadioItemIndicator>
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      </span>
    </span>
    <ng-content />
  `,
})
class DropdownMenuRadioItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly indicator = menuIndicator
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding], this.sx())
  )
}

/** A line between groups. */
@Directive({
  selector: "[kuiDropdownMenuSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KuiMenuSeparator],
  host: {
    "data-slot": "dropdown-menu-separator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuSeparator, this.sx()))
}

/** An item's keyboard shortcut, at its end: `<span kuiDropdownMenuShortcut>⌘S</span>`. */
@Directive({
  selector: "[kuiDropdownMenuShortcut]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-shortcut",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuShortcut {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuShortcut, this.sx()))
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
