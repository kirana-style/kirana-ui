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
  KpContextMenuTrigger,
  KpMenu,
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
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
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

/**
 * A menu opened by a right click: `<ng-container kuiContextMenu>` around its trigger and content,
 * drawing no element, as Base UI's root: Kirana UI's menu (`KpMenu`, which `kuiContextMenu` makes
 * a context menu), its `[(open)]` and `defaultOpen` its own. Kirana UI's selectors are the
 * registry's, so a part takes its primitive as a host directive and a file imports only one of the
 * two.
 */
@Directive({
  selector: "[kuiContextMenu]",
  hostDirectives: [
    {
      directive: KpMenu,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class ContextMenu {}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiContextMenuPortal]" })
class ContextMenuPortal {}

/**
 * The region that opens it: a right click (or a long press) inside it opens the menu at the pointer,
 * as Base UI's.
 */
@Directive({
  selector: "[kuiContextMenuTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KpContextMenuTrigger],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'context-menu-trigger'",
    style: "-webkit-touch-callout: none",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(contextMenu.trigger, this.sx())
  )
}

/**
 * What a content's own element carries that its popup, drawn in a portal, needs: the reading
 * direction and the language the caller wrote on it (`[attr.dir]`, `[attr.data-lang]`).
 */
function carried(element: HTMLElement) {
  return (name: "dir" | "data-lang") => element.getAttribute(name)
}

/**
 * The menu, at the pointer: to its right and just below it. Kirana UI's portal is a structural
 * part, which an attribute cannot put around its own element: the content draws the portal, the
 * positioner and the popup in its template, its children projected into the popup, and its own
 * element stays where it was written, drawing nothing.
 */
@Component({
  selector: "[kuiContextMenuContent]",
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
          data-slot="context-menu-content"
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
class ContextMenuContent {
  readonly side = input<Side>("right")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, menuSurface, contextMenu.content], this.sx())
  )
}

/** A group of items, named by its label. */
@Directive({
  selector: "[kuiContextMenuGroup]",
  hostDirectives: [KpMenuGroup],
  host: { "data-slot": "context-menu-group" },
})
class ContextMenuGroup {}

/** A group's label: inside its `ContextMenuGroup` or `ContextMenuRadioGroup`, as Base UI's. */
@Directive({
  selector: "[kuiContextMenuLabel]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenuGroupLabel],
  host: {
    "data-slot": "context-menu-label",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuLabel {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([menuLabel, menuLabelWeight], this.sx())
  )
}

/** An item: `<div kuiContextMenuItem (click)="…">`, `variant="destructive"`, `inset`, `disabled`. */
@Directive({
  selector: "[kuiContextMenuItem]",
  providers: [provideSxPart()],
  hostDirectives: [
    // `closeOnClick`: whether a press closes the menu (Base UI's), as Kirana UI's item takes it.
    { directive: KpMenuItem, inputs: ["disabled", "closeOnClick"] },
  ],
  host: {
    "data-slot": "context-menu-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ContextMenuItem {
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

/** A menu inside the menu: `<ng-container kuiContextMenuSub>` around its trigger and content. */
@Directive({
  selector: "[kuiContextMenuSub]",
  hostDirectives: [KpMenuSubmenuRoot],
})
class ContextMenuSub {}

/** The item that opens a submenu, with its chevron. */
@Component({
  selector: "[kuiContextMenuSubTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KpMenuSubmenuTrigger],
  host: {
    "data-slot": "context-menu-sub-trigger",
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
}

/** A submenu, beside its trigger: drawn as the content is, in its own portal. */
@Component({
  selector: "[kuiContextMenuSubContent]",
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
          data-slot="context-menu-sub-content"
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
class ContextMenuSubContent {
  readonly side = input<Side>("inline-end")
  readonly align = input<Align>("start")
  readonly sideOffset = input(0, { transform: numberAttribute })
  readonly alignOffset = input(-3, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly attr = carried(inject(ElementRef).nativeElement)
  protected readonly positioner = partSx(menuPositioner, undefined).class
  protected readonly part = computed(() =>
    partSx(
      [popupMotion, menuSurface, contextMenu.content, contextMenu.subContent],
      this.sx()
    )
  )
}

/**
 * An item that turns on and off: `[(checked)]` or `defaultChecked`; it leaves the menu open. Its
 * check is Kirana UI's indicator, in the page while the item is checked.
 */
@Component({
  selector: "[kuiContextMenuCheckboxItem]",
  imports: [IconPlaceholder, KpMenuCheckboxItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KpMenuCheckboxItem,
      inputs: ["defaultChecked", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "context-menu-checkbox-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span [sx]="indicator">
      <span *kpMenuCheckboxItemIndicator>
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
class ContextMenuCheckboxItem {
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
  protected readonly indicator = contextMenu.indicator
  protected readonly part = computed(() =>
    partSx(
      [menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow],
      this.sx()
    )
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
  selector: "[kuiContextMenuRadioGroup]",
  hostDirectives: [
    {
      directive: KpMenuRadioGroup,
      inputs: ["value", "defaultValue"],
      outputs: ["valueChange"],
    },
  ],
  host: { "data-slot": "context-menu-radio-group" },
})
class ContextMenuRadioGroup {}

/** One of its items: `<div kuiContextMenuRadioItem value="top">`; it leaves the menu open. */
@Component({
  selector: "[kuiContextMenuRadioItem]",
  imports: [IconPlaceholder, KpMenuRadioItemIndicator, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [
    {
      directive: KpMenuRadioItem,
      inputs: ["value", "disabled", "closeOnClick"],
    },
  ],
  host: {
    "data-slot": "context-menu-radio-item",
    "[attr.data-inset]": "inset() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span [sx]="indicator">
      <span *kpMenuRadioItemIndicator>
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
class ContextMenuRadioItem {
  readonly inset = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly indicator = contextMenu.indicator
  protected readonly part = computed(() =>
    partSx(
      [menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow],
      this.sx()
    )
  )
}

/** A line between groups. */
@Directive({
  selector: "[kuiContextMenuSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KpMenuSeparator],
  host: {
    "data-slot": "context-menu-separator",
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
