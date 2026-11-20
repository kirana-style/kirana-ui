/**
 * Menubar on Kirana UI's (`KpMenubar`), as React's is the primitives' menubar over their menu:
 * `<div kuiMenubar>` around a `<ng-container kuiMenubarMenu>` per menu, each a `KpMenu` that is one
 * of the bar's items, with a trigger and its content. The bar's keys, its one tab stop and the
 * pointer moving from one open menu to the next are the primitives'. Its rows are DropdownMenu's
 * with `menubar.styles.ts` laid over them; its checkbox and radio rows are Base UI's own, the check
 * at the start. Each part takes its primitive as a host directive.
 */
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
  KpMenu,
  KpMenubar,
  KpMenuCheckboxItem,
  KpMenuCheckboxItemIndicator,
  KpMenuGroup,
  KpMenuGroupLabel,
  KpMenuItem,
  KpMenuPopup,
  KpMenuPortal,
  KpMenuPositioner,
  KpMenuRadioGroup,
  KpMenuRadioItem,
  KpMenuRadioItemIndicator,
  KpMenuSeparator,
  KpMenuSubmenuRoot,
  KpMenuSubmenuTrigger,
  KpMenuTrigger,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
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

/** The bar: `<div kuiMenubar>`, Base UI's `role="menubar"`. */
@Directive({
  selector: "[kuiMenubar]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenubar],
  host: {
    "data-slot": "menubar",
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
  hostDirectives: [
    {
      directive: KpMenu,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class MenubarMenu {}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiMenubarPortal]" })
class MenubarPortal {}

/** A menu's button in the bar. */
@Directive({
  selector: "[kuiMenubarTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenuTrigger],
  host: {
    "[attr.data-slot]": "'menubar-trigger'",
    type: "button",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(menubar.trigger, this.sx()))
}

/**
 * What a content's own element carries that its popup, drawn in a portal, needs: the reading
 * direction and the language the caller wrote on it (`[attr.dir]`, `[attr.data-lang]`).
 */
function carried(element: HTMLElement) {
  return (name: "dir" | "data-lang") => element.getAttribute(name)
}

/**
 * A menu's content, below its trigger: DropdownMenu's, a little further out. Kirana UI's portal is
 * a structural part, which an attribute cannot put around its own element: the content draws the
 * portal, the positioner and the popup in its template, its children projected into the popup, and
 * its own element stays where it was written, drawing nothing.
 */
@Component({
  selector: "[kuiMenubarContent]",
  imports: [KpMenuPopup, KpMenuPortal, KpMenuPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kpMenuPortal>
      <div
        kpMenuPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kpMenuPopup
          data-slot="menubar-content"
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
class MenubarContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("start")
  readonly sideOffset = input(8, { transform: numberAttribute })
  readonly alignOffset = input(-4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx(
      [popupMotion, menuSurface, dropdownMenu.content, menubar.content],
      this.sx()
    )
  )
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiMenubarGroup]",
  hostDirectives: [KpMenuGroup],
  host: { "data-slot": "menubar-group" },
})
class MenubarGroup {}

/** A group's label: inside its `MenubarGroup` or `MenubarRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiMenubarLabel]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenuGroupLabel],
  host: {
    "data-slot": "menubar-label",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarLabel {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuLabel, menuLabelWeight, menubar.label], this.sx())
  )
}

/** An item: `<div kuiMenubarItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiMenubarItem]",
  providers: [provideSxPart()],
  hostDirectives: [
    { directive: KpMenuItem, inputs: ["disabled", "closeOnClick"] },
  ],
  host: {
    "data-slot": "menubar-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MenubarItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly variant = input<"default" | "destructive">("default")
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
}

/**
 * An item that turns on and off: `[(checked)]` or `defaultChecked`; it leaves the menu open. Its
 * check is Kirana UI's indicator, in the page while the item is checked.
 */
@Component({
  selector: "[kuiMenubarCheckboxItem]",
  imports: [IconPlaceholder, KpMenuCheckboxItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KpMenuCheckboxItem,
      inputs: ["defaultChecked", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "menubar-checkbox-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span [sx]="indicator">
      <span *kpMenuCheckboxItemIndicator aria-hidden="true">
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
class MenubarCheckboxItem {
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
  protected readonly indicator = menubar.indicator
  protected readonly part = computed(() =>
    partSx([menuRowBase, menubar.checkableRow, menubar.checkboxRow], this.sx())
  )

  constructor() {
    const item = inject(KpMenuCheckboxItem)
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
  selector: "[kuiMenubarRadioGroup]",
  hostDirectives: [
    {
      directive: KpMenuRadioGroup,
      inputs: ["value", "defaultValue"],
      outputs: ["valueChange"],
    },
  ],
  host: { "data-slot": "menubar-radio-group" },
})
class MenubarRadioGroup {}

/** One of its items: `<div kuiMenubarRadioItem value="andy">`; it leaves the menu open. */
@Component({
  selector: "[kuiMenubarRadioItem]",
  imports: [IconPlaceholder, KpMenuRadioItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KpMenuRadioItem,
      inputs: ["value", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "menubar-radio-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span [sx]="indicator">
      <span *kpMenuRadioItemIndicator aria-hidden="true">
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
class MenubarRadioItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly indicator = menubar.indicator
  protected readonly part = computed(() =>
    partSx([menuRowBase, menubar.checkableRow], this.sx())
  )
}

/** A line between groups. */
@Directive({
  selector: "[kuiMenubarSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenuSeparator],
  host: {
    "data-slot": "menubar-separator",
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
  hostDirectives: [KpMenuSubmenuRoot],
})
class MenubarSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiMenubarSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KpMenuSubmenuTrigger],
  host: {
    "data-slot": "menubar-sub-trigger",
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
}

/** A submenu, beside its trigger: drawn as the content is, in its own portal. */
@Component({
  selector: "[kuiMenubarSubContent]",
  imports: [KpMenuPopup, KpMenuPortal, KpMenuPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    "[attr.align]": "null",
  },
  template: `
    <ng-template kpMenuPortal>
      <div
        kpMenuPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kpMenuPopup
          data-slot="menubar-sub-content"
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
class MenubarSubContent {
  readonly side = input<Side>("inline-end")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(-3, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
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
