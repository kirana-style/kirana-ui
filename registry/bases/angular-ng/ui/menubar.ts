/**
 * Menubar, the registry's own on its menus (`lib/angular/menu.ts`), as React's is Base UI's menubar
 * over DropdownMenu's parts: `<div kuiMenubar>` around a `<ng-container kuiMenubarMenu>` per menu,
 * each a trigger and its content. As Base UI's: the triggers are one tab stop, the arrow keys moving
 * between them; once a menu is open, the pointer on another trigger opens that one instead, and the
 * left and right arrows in an open menu move to the next menu along. Its rows are DropdownMenu's
 * with `menubar.styles.ts` laid over them; its checkbox and radio rows are Base UI's own, the check
 * at the start.
 */
import {
  Component,
  DestroyRef,
  afterNextRender,
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  untracked,
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
import type { Menu } from "../../../lib/angular/menu"
import {
  POPUP,
  popupRoot,
  popupSurface,
  popupTrigger,
} from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
import { dropdownMenu } from "../../../styles/dropdown-menu.styles"
import {
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
import { menubar } from "../../../styles/menubar.styles"
import { popupMotion } from "../../../styles/overlay.styles"

let next = 0

/** The bar: its menus in order, which trigger is the tab stop, and which menu is open. */
class MenubarState {
  readonly element: HTMLElement
  /** The trigger that takes the tab stop. */
  readonly current = signal<HTMLElement | null>(null)
  readonly #menus = new Map<HTMLElement, Menu>()

  constructor(element: HTMLElement) {
    this.element = element
  }

  add(trigger: HTMLElement, menu: Menu) {
    this.#menus.set(trigger, menu)
  }

  remove(trigger: HTMLElement) {
    this.#menus.delete(trigger)
    if (untracked(this.current) === trigger)
      this.current.set(this.triggers()[0] ?? null)
  }

  /** The triggers in the page's order. */
  triggers(): HTMLElement[] {
    return [
      ...this.element.querySelectorAll<HTMLElement>(
        '[data-slot="menubar-trigger"]'
      ),
    ].filter((trigger) => this.#menus.has(trigger))
  }

  menuOf(trigger: HTMLElement) {
    return this.#menus.get(trigger)
  }

  /** The open menu, if one is. */
  open(): Menu | undefined {
    return [...this.#menus.values()].find((menu) => menu.popup.open())
  }

  /** The trigger `step` along from `from`, round the ends. */
  step(from: HTMLElement, step: number) {
    const triggers = this.triggers()
    const index = triggers.indexOf(from)
    if (index < 0 || !triggers.length) return undefined
    return triggers[(index + step + triggers.length) % triggers.length]
  }

  /** Opens the menu of `trigger`, closing the one that was open. */
  switchTo(trigger: HTMLElement, fromKeyboard: boolean) {
    const menu = this.#menus.get(trigger)
    if (!menu) return
    for (const other of this.#menus.values())
      if (other !== menu && other.popup.open())
        other.popup.setOpen(false, "outside")
    this.current.set(trigger)
    menu.fromKeyboard = fromKeyboard
    menu.popup.setOpen(true, "trigger")
  }

  rtl() {
    return getComputedStyle(this.element).direction === "rtl"
  }
}

const MENUBAR = new InjectionToken<MenubarState>("kui menubar")

/** The bar: `<div kuiMenubar>`, Base UI's `role="menubar"`. */
@Directive({
  selector: "[kuiMenubar]",
  providers: [
    provideSxPart(),
    {
      provide: MENUBAR,
      useFactory: () =>
        new MenubarState(
          inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
        ),
    },
  ],
  host: {
    "data-slot": "menubar",
    role: "menubar",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
    "data-modal": "",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Menubar {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menubar.root, this.sx()))
}

/** One of its menus: `<ng-container kuiMenubarMenu>` around its trigger and content. */
@Directive({
  selector: "[kuiMenubarMenu]",
  providers: [provideMenu()],
})
class MenubarMenu {
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
@Directive({ selector: "[kuiMenubarPortal]" })
class MenubarPortal {}

/** A menu's button in the bar. */
@Directive({
  selector: "[kuiMenubarTrigger]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'menubar-trigger'",
    type: "button",
    role: "menuitem",
    "[attr.tabindex]": "bar.current() === element ? 0 : -1",
    "[class]": "part().class",
    "[style]": "part().style",
    "(focus)": "bar.current.set(element)",
    "(pointerenter)": "hover()",
    "(keydown)": "keydown($event)",
  },
})
class MenubarTrigger {
  readonly sx = input<SxInput>()
  protected readonly bar = inject(MENUBAR)
  protected readonly menu = inject(MENU)
  protected readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly part = computed(() => partSx(menubar.trigger, this.sx()))

  constructor() {
    popupTrigger(this.menu.popup, { haspopup: "menu", toggle: false })
    menuTrigger(this.menu)
    this.bar.add(this.element, this.menu)
    // The first trigger takes the tab stop once the bar's triggers are drawn.
    afterNextRender(() => {
      if (!this.bar.current())
        this.bar.current.set(this.bar.triggers()[0] ?? null)
    })
    inject(DestroyRef).onDestroy(() => this.bar.remove(this.element))
  }

  /** Another menu open, the pointer on this trigger opens this one instead. */
  protected hover() {
    const open = this.bar.open()
    if (!open || open === this.menu) return
    this.element.focus({ preventScroll: true })
    this.bar.switchTo(this.element, false)
  }

  protected keydown(event: KeyboardEvent) {
    const forward = this.bar.rtl() ? "ArrowLeft" : "ArrowRight"
    const back = this.bar.rtl() ? "ArrowRight" : "ArrowLeft"
    const triggers = this.bar.triggers()
    const to =
      event.key === forward
        ? this.bar.step(this.element, 1)
        : event.key === back
          ? this.bar.step(this.element, -1)
          : event.key === "Home"
            ? triggers[0]
            : event.key === "End"
              ? triggers.at(-1)
              : undefined
    if (!to) return
    event.preventDefault()
    this.bar.current.set(to)
    to.focus({ preventScroll: true })
  }
}

/** A menu's content, below its trigger: DropdownMenu's, a little further out. */
@Directive({
  selector: "[kuiMenubarContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-content",
    "[attr.align]": "null",
    "[attr.aria-labelledby]": "labelledBy()",
    "[class]": "part().class",
    "[style]": "part().style",
    "(keydown)": "keydown($event)",
  },
})
class MenubarContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(8, { transform: numberAttribute })
  readonly alignOffset = input(-4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly menu = inject(MENU)
  protected readonly bar = inject(MENUBAR)
  protected readonly labelledBy = computed(
    () => this.menu.popup.trigger()?.id ?? null
  )
  protected readonly part = computed(() =>
    partSx(
      [popupMotion, menuSurface, dropdownMenu.content, menubar.content],
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
      focus: "popup",
      onEscape: () => this.menu.close("escape"),
    })
    menuPopup(this.menu)
  }

  /** The left and right arrows move to the menu beside, unless a submenu's trigger takes them. */
  protected keydown(event: KeyboardEvent) {
    if (event.defaultPrevented) return
    const forward = this.bar.rtl() ? "ArrowLeft" : "ArrowRight"
    const back = this.bar.rtl() ? "ArrowRight" : "ArrowLeft"
    if (event.key !== forward && event.key !== back) return
    const target = event.target as HTMLElement
    if (
      event.key === forward &&
      target.getAttribute("aria-haspopup") === "menu"
    )
      return
    const trigger = this.menu.popup.trigger()
    if (!trigger) return
    const to = this.bar.step(trigger, event.key === forward ? 1 : -1)
    if (!to || to === trigger) return
    event.preventDefault()
    // As Base UI's, the menu beside opens with its popup focused and nothing highlighted.
    this.bar.switchTo(to, false)
  }
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiMenubarGroup]",
  providers: [{ provide: MENU_GROUP, useFactory: () => new MenuGroup() }],
  host: {
    "data-slot": "menubar-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class MenubarGroup {
  protected readonly group = inject(MENU_GROUP)
}

/** A group's label: inside its `MenubarGroup` or `MenubarRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiMenubarLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-label",
    "aria-hidden": "true",
    "[attr.id]": "id",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarLabel {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly id = `kui-menubar-label-${next++}`
  protected readonly part = computed(() =>
    partSx([menuLabel, menuLabelWeight, menubar.label], this.sx())
  )

  constructor() {
    inject(MENU_GROUP, { optional: true })?.labelId.set(this.id)
  }
}

/** An item: `<div kuiMenubarItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiMenubarItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-item",
    role: "menuitem",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly variant = input<"default" | "destructive">("default")
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnClick = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [
        menuRowBase,
        menuRowPadding,
        this.variant() === "destructive" ? menuRowDestructive : undefined,
        menubar.item,
        menubar.inset,
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

/** An item that turns on and off: `[(checked)]` or `defaultChecked`; it leaves the menu open. */
@Component({
  selector: "[kuiMenubarCheckboxItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-checkbox-item",
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
        <span data-checked="" aria-hidden="true">
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
    </span>
    <ng-content />
  `,
})
class MenubarCheckboxItem {
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
  protected readonly indicator = menubar.indicator
  protected readonly isChecked = linkedSignal(
    () => this.checked() ?? this.defaultChecked()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menubar.checkableRow, menubar.checkboxRow], this.sx())
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
  selector: "[kuiMenubarRadioGroup]",
  providers: [
    { provide: MENU_RADIO_GROUP, useFactory: () => new MenuRadioGroup() },
    { provide: MENU_GROUP, useFactory: () => new MenuGroup() },
  ],
  host: {
    "data-slot": "menubar-radio-group",
    role: "group",
    "[attr.aria-labelledby]": "group.labelId()",
  },
})
class MenubarRadioGroup {
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

/** One of its items: `<div kuiMenubarRadioItem value="andy">`; it leaves the menu open. */
@Component({
  selector: "[kuiMenubarRadioItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-radio-item",
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
        <span data-checked="" aria-hidden="true">
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
    </span>
    <ng-content />
  `,
})
class MenubarRadioItem {
  readonly value = input<unknown>()
  readonly inset = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnClick = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly radio = inject(MENU_RADIO_GROUP)
  protected readonly indicator = menubar.indicator
  protected readonly isChecked = computed(
    () => this.radio.value() === this.value()
  )
  protected readonly part = computed(() =>
    partSx([menuRowBase, menubar.checkableRow], this.sx())
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
  selector: "[kuiMenubarSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-separator",
    role: "separator",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuSeparator, menubar.separator], this.sx())
  )
}

/** An item's keyboard shortcut, at its end: `<span kuiMenubarShortcut>⌘S</span>`. */
@Directive({
  selector: "[kuiMenubarShortcut]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-shortcut",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarShortcut {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menuShortcut, this.sx()))
}

/** A menu inside the menu: `<ng-container kuiMenubarSub>` around its trigger and content. */
@Directive({
  selector: "[kuiMenubarSub]",
  providers: [provideMenu()],
})
class MenubarSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiMenubarSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-sub-trigger",
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
class MenubarSubTrigger {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly icon = dropdownMenu.subTriggerIcon
  protected readonly part = computed(() =>
    partSx(
      [menuRowBase, menuRowPadding, dropdownMenu.subTrigger, menubar.inset],
      this.sx()
    )
  )

  constructor() {
    submenuTrigger(inject(MENU))
  }
}

/** A submenu, beside its trigger. */
@Directive({
  selector: "[kuiMenubarSubContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "menubar-sub-content",
    "[attr.align]": "null",
    "[attr.aria-labelledby]": "labelledBy()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarSubContent {
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
      [
        popupMotion,
        menuSurface,
        dropdownMenu.content,
        dropdownMenu.subContent,
        menubar.subContent,
      ],
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
      dismissOutside: false,
      onEscape: () => this.menu.close("escape"),
    })
    menuPopup(this.menu)
    submenuPopup(this.menu)
  }
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
