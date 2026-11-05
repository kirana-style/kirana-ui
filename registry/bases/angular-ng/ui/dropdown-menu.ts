import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import {
  MENU,
  MENU_GROUP,
  MENU_RADIO_GROUP,
  MenuGroup,
  MenuRadioGroup,
  menuItem,
  menuPopup,
  menuTrigger,
  provideMenu,
  submenuPopup,
  submenuTrigger,
} from "../../../lib/angular/menu"
import {
  POPUP,
  popupRoot,
  popupSurface,
  popupTrigger,
} from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
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

let next = 0

/**
 * A menu opened from a button: `<ng-container kuiDropdownMenu>` around its trigger and content,
 * drawing no element, as Base UI's root. `[(open)]` or `defaultOpen`. The menu's behaviour is
 * `lib/angular/menu.ts`, its popup `lib/angular/popup.ts`.
 */
@Directive({
  selector: "[kuiDropdownMenu]",
  providers: [provideMenu()],
})
class DropdownMenu {
  readonly open = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly defaultOpen = input(false, { transform: booleanAttribute })
  readonly openChange = output<boolean>()

  constructor() {
    popupRoot(inject(POPUP), this.open, this.defaultOpen, (open) =>
      this.openChange.emit(open)
    )
  }
}

/** Upstream's portal, a pass-through here: the content puts itself in a portal. */
@Directive({ selector: "[kuiDropdownMenuPortal]" })
class DropdownMenuPortal {}

/** The button that opens it. */
@Directive({
  selector: "[kuiDropdownMenuTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    const menu = inject(MENU)
    popupTrigger(menu.popup, { haspopup: "menu", toggle: false })
    menuTrigger(menu)
  }
}

/** The menu: `<div kuiDropdownMenuContent align="end">`, below its trigger and aligned to its start. */
@Directive({
  selector: "[kuiDropdownMenuContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[attr.aria-labelledby]": "labelledBy()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly menu = inject(MENU)
  protected readonly labelledBy = computed(
    () => this.menu.popup.trigger()?.id ?? null
  )
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, dropdownMenu.content], this.sx())
  )

  constructor() {
    popupSurface(this.menu.popup, {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: menuPositioner,
      role: "menu",
      focus: "popup",
      onEscape: () => this.menu.close("escape"),
    })
    menuPopup(this.menu)
  }
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiDropdownMenuGroup]",
  providers: [{ provide: MENU_GROUP, useFactory: () => new MenuGroup() }],
  host: {
    "data-slot": "dropdown-menu-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class DropdownMenuGroup {
  protected readonly group = inject(MENU_GROUP)
}

/** A group's label: inside its `DropdownMenuGroup` or `DropdownMenuRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiDropdownMenuLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-label",
    "aria-hidden": "true",
    "[attr.id]": "id",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuLabel {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly id = `kui-menu-label-${next++}`
  protected readonly part = computed(() =>
    partSx([menuLabel, menuLabelWeight], this.sx())
  )

  constructor() {
    inject(MENU_GROUP, { optional: true })?.labelId.set(this.id)
  }
}

/** An item: `<div kuiDropdownMenuItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiDropdownMenuItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-item",
    role: "menuitem",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly variant = input<"default" | "destructive">("default")
  readonly disabled = input(false, { transform: booleanAttribute })
  /** Whether a press closes the menu (Base UI's `closeOnClick`). */
  readonly closeOnClick = input(true, { transform: booleanAttribute })
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

  constructor() {
    menuItem(inject(MENU), {
      closes: this.closeOnClick,
      disabled: this.disabled,
    })
  }
}

/** A menu inside the menu: `<ng-container kuiDropdownMenuSub>` around its trigger and content. */
@Directive({
  selector: "[kuiDropdownMenuSub]",
  providers: [provideMenu()],
})
class DropdownMenuSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiDropdownMenuSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-sub-trigger",
    role: "menuitem",
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

  constructor() {
    submenuTrigger(inject(MENU))
  }
}

/** A submenu, beside its trigger. */
@Directive({
  selector: "[kuiDropdownMenuSubContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-sub-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[attr.aria-labelledby]": "labelledBy()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DropdownMenuSubContent {
  readonly side = input<Side>("inline-end")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(-3, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly menu = inject(MENU)
  protected readonly labelledBy = computed(
    () => this.menu.popup.trigger()?.id ?? null
  )
  protected readonly part = computed(() =>
    partSx(
      [popupMotion, menuSurface, dropdownMenu.content, dropdownMenu.subContent],
      this.sx()
    )
  )

  constructor() {
    popupSurface(this.menu.popup, {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: menuPositioner,
      role: "menu",
      // Opened by the pointer, focus stays on its trigger; from the keyboard, its first item
      // takes it (`menuPopup`).
      dismissOutside: false,
      onEscape: () => this.menu.close("escape"),
    })
    menuPopup(this.menu)
    submenuPopup(this.menu)
  }
}

/** An item that turns on and off: `[(checked)]` or `defaultChecked`; it leaves the menu open. */
@Component({
  selector: "[kuiDropdownMenuCheckboxItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-checkbox-item",
    role: "menuitemcheckbox",
    "[attr.aria-checked]": "isChecked()",
    "[attr.data-checked]": "isChecked() ? '' : null",
    "[attr.data-unchecked]": "isChecked() ? null : ''",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "toggle()",
  },
  template: `
    <span data-slot="dropdown-menu-checkbox-item-indicator" [sx]="indicator">
      @if (isChecked()) {
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      }
    </span>
    <ng-content />
  `,
})
class DropdownMenuCheckboxItem {
  readonly checked = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly defaultChecked = input(false, { transform: booleanAttribute })
  readonly inset = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnClick = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  readonly checkedChange = output<boolean>()
  protected readonly indicator = menuIndicator
  protected readonly isChecked = linkedSignal(
    () => this.checked() ?? this.defaultChecked()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding], this.sx())
  )

  constructor() {
    menuItem(inject(MENU), {
      closes: this.closeOnClick,
      disabled: this.disabled,
    })
  }

  protected toggle() {
    if (this.disabled()) return
    const value = !this.isChecked()
    this.isChecked.set(value)
    this.checkedChange.emit(value)
  }
}

/** Radio items, one chosen: `[(value)]` or `defaultValue`. */
@Directive({
  selector: "[kuiDropdownMenuRadioGroup]",
  providers: [
    { provide: MENU_RADIO_GROUP, useFactory: () => new MenuRadioGroup() },
    { provide: MENU_GROUP, useFactory: () => new MenuGroup() },
  ],
  host: {
    "data-slot": "dropdown-menu-radio-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class DropdownMenuRadioGroup {
  readonly value = input<unknown>()
  readonly defaultValue = input<unknown>()
  readonly valueChange = output<unknown>()
  protected readonly group = inject(MENU_GROUP)

  constructor() {
    const radio = inject(MENU_RADIO_GROUP)
    let first = true
    effect(() => {
      const value = this.value()
      const initial = this.defaultValue()
      if (value !== undefined) radio.value.set(value)
      else if (first) radio.value.set(initial)
      first = false
    })
    radio.onChange((value) => this.valueChange.emit(value))
  }
}

/** One of its items: `<div kuiDropdownMenuRadioItem value="top">`; it leaves the menu open. */
@Component({
  selector: "[kuiDropdownMenuRadioItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-radio-item",
    role: "menuitemradio",
    "[attr.aria-checked]": "isChecked()",
    "[attr.data-checked]": "isChecked() ? '' : null",
    "[attr.data-unchecked]": "isChecked() ? null : ''",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "choose()",
  },
  template: `
    <span data-slot="dropdown-menu-radio-item-indicator" [sx]="indicator">
      @if (isChecked()) {
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      }
    </span>
    <ng-content />
  `,
})
class DropdownMenuRadioItem {
  readonly value = input<unknown>()
  readonly inset = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnClick = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly radio = inject(MENU_RADIO_GROUP)
  protected readonly indicator = menuIndicator
  protected readonly isChecked = computed(
    () => this.radio.value() === this.value()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuCheckableRowPadding], this.sx())
  )

  constructor() {
    menuItem(inject(MENU), {
      closes: this.closeOnClick,
      disabled: this.disabled,
    })
  }

  protected choose() {
    if (!this.disabled()) this.radio.select(this.value())
  }
}

/** A line between groups. */
@Directive({
  selector: "[kuiDropdownMenuSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dropdown-menu-separator",
    role: "separator",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
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
