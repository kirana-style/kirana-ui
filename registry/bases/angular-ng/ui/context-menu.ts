import {
  Component,
  Directive,
  ElementRef,
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
  provideMenu,
  submenuPopup,
  submenuTrigger,
} from "../../../lib/angular/menu"
import { POPUP, popupRoot, popupSurface } from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
import { contextMenu } from "../../../styles/context-menu.styles"
import {
  menuCheckableRowPadding,
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
 * A menu opened by a right click: `<ng-container kuiContextMenu>` around its trigger and content,
 * drawing no element, as Base UI's root. `[(open)]` or `defaultOpen`. The menu's behaviour is
 * `lib/angular/menu.ts`, its popup `lib/angular/popup.ts`.
 */
@Directive({
  selector: "[kuiContextMenu]",
  providers: [provideMenu()],
})
class ContextMenu {
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
@Directive({ selector: "[kuiContextMenuPortal]" })
class ContextMenuPortal {}

/**
 * The region that opens it: a right click (or a long press) inside it opens the menu at the pointer,
 * as Base UI's.
 */
@Directive({
  selector: "[kuiContextMenuTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-trigger",
    style: "-webkit-touch-callout: none",
    "[attr.data-popup-open]": "menu.popup.open() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(contextmenu)": "openAt($event)",
  },
})
class ContextMenuTrigger {
  readonly sx = input<SxInput>()
  protected readonly menu = inject(MENU)
  protected readonly part = computed(() =>
    partSx(contextMenu.trigger, this.sx())
  )

  constructor() {
    this.menu.popup.trigger.set(inject(ElementRef).nativeElement)
  }

  protected openAt(event: MouseEvent) {
    event.preventDefault()
    const { clientX: x, clientY: y } = event
    this.menu.popup.anchor.set({
      getBoundingClientRect: () => new DOMRect(x, y, 0, 0),
    })
    this.menu.fromKeyboard = false
    if (this.menu.popup.open()) this.menu.popup.setOpen(false, "trigger")
    queueMicrotask(() => this.menu.popup.setOpen(true, "trigger"))
  }
}

/** The menu, at the pointer: to its right and just below it. */
@Directive({
  selector: "[kuiContextMenuContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuContent {
  readonly side = input<Side>("right")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly menu = inject(MENU)
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, contextMenu.content], this.sx())
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
      strategy: "fixed",
      onEscape: () => this.menu.close("escape"),
    })
    menuPopup(this.menu)
  }
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiContextMenuGroup]",
  providers: [{ provide: MENU_GROUP, useFactory: () => new MenuGroup() }],
  host: {
    "data-slot": "context-menu-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class ContextMenuGroup {
  protected readonly group = inject(MENU_GROUP)
}

/** A group's label: inside its `ContextMenuGroup` or `ContextMenuRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiContextMenuLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-label",
    "aria-hidden": "true",
    "[attr.id]": "id",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuLabel {
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

/** An item: `<div kuiContextMenuItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiContextMenuItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-item",
    role: "menuitem",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuItem {
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

/** A menu inside the menu: `<ng-container kuiContextMenuSub>` around its trigger and content. */
@Directive({
  selector: "[kuiContextMenuSub]",
  providers: [provideMenu()],
})
class ContextMenuSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiContextMenuSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-sub-trigger",
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
class ContextMenuSubTrigger {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly icon = contextMenu.subTriggerIcon
  protected readonly part = computed(() =>
    partSx([menuRowBase, menuRowPadding, contextMenu.subTrigger], this.sx())
  )

  constructor() {
    submenuTrigger(inject(MENU))
  }
}

/** A submenu, beside its trigger. */
@Directive({
  selector: "[kuiContextMenuSubContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-sub-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[attr.aria-labelledby]": "labelledBy()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuSubContent {
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
      [popupMotion, menuSurface, contextMenu.content, contextMenu.subContent],
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
  selector: "[kuiContextMenuCheckboxItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-checkbox-item",
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
    <span [sx]="indicator">
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
class ContextMenuCheckboxItem {
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
  protected readonly indicator = contextMenu.indicator
  protected readonly isChecked = linkedSignal(
    () => this.checked() ?? this.defaultChecked()
  )
  protected readonly part = computed(() =>
    partSx(
      [menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow],
      this.sx()
    )
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
  selector: "[kuiContextMenuRadioGroup]",
  providers: [
    { provide: MENU_RADIO_GROUP, useFactory: () => new MenuRadioGroup() },
    { provide: MENU_GROUP, useFactory: () => new MenuGroup() },
  ],
  host: {
    "data-slot": "context-menu-radio-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class ContextMenuRadioGroup {
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

/** One of its items: `<div kuiContextMenuRadioItem value="top">`; it leaves the menu open. */
@Component({
  selector: "[kuiContextMenuRadioItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-radio-item",
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
    <span [sx]="indicator">
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
class ContextMenuRadioItem {
  readonly value = input<unknown>()
  readonly inset = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnClick = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly radio = inject(MENU_RADIO_GROUP)
  protected readonly indicator = contextMenu.indicator
  protected readonly isChecked = computed(
    () => this.radio.value() === this.value()
  )
  protected readonly part = computed(() =>
    partSx(
      [menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow],
      this.sx()
    )
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
  selector: "[kuiContextMenuSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-separator",
    role: "separator",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuSeparator, this.sx()))
}

/** An item's keyboard shortcut, at its end: `<span kuiContextMenuShortcut>⌘S</span>`. */
@Directive({
  selector: "[kuiContextMenuShortcut]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "context-menu-shortcut",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuShortcut {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuShortcut, this.sx()))
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
