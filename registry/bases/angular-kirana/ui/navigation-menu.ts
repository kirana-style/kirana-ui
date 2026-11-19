/**
 * Base UI's navigation menu on Kirana UI's (`KuiNavigationMenu`): a bar of items, each trigger
 * showing its content on hover or press, the open content drawn in one popup that follows the open
 * trigger and takes the content's size, in a portal, as Base UI's positioner, popup and viewport.
 * Kirana UI's selectors are the registry's, so a part takes its primitive as a host directive and a
 * file imports only one of the two.
 */
import {
  Component,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from "@angular/core"
import {
  KuiNavigationMenu,
  KuiNavigationMenuContent,
  KuiNavigationMenuItem,
  KuiNavigationMenuLink,
  KuiNavigationMenuList,
  KuiNavigationMenuPopup,
  KuiNavigationMenuPortal,
  KuiNavigationMenuPositioner,
  KuiNavigationMenuTrigger,
  KuiNavigationMenuViewport,
} from "@kirana-ui/angular"
import type { Align } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { navigationMenu } from "../../../styles/navigation-menu.styles"

/**
 * The menu: `<nav kuiNavigationMenu>` around its list, with the popup its contents open in, Kirana
 * UI's portal, positioner, popup and viewport. `align` places the popup against the open trigger.
 */
@Component({
  selector: "nav[kuiNavigationMenu]",
  imports: [
    KuiNavigationMenuPopup,
    KuiNavigationMenuPortal,
    KuiNavigationMenuPositioner,
    KuiNavigationMenuViewport,
  ],
  providers: [provideSxPart()],
  hostDirectives: [KuiNavigationMenu],
  host: {
    "data-slot": "navigation-menu",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    <ng-template kuiNavigationMenuPortal>
      <div
        kuiNavigationMenuPositioner
        [side]="'bottom'"
        [sideOffset]="8"
        [align]="align()"
        [alignOffset]="0"
        [attr.dir]="attr('dir')"
        [class]="positioner"
      >
        <nav kuiNavigationMenuPopup [class]="popup">
          <div kuiNavigationMenuViewport [class]="viewport"></div>
        </nav>
      </div>
    </ng-template>`,
})
class NavigationMenu {
  readonly align = input<Align>("start")
  readonly sx = input<SxInput>()
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly positioner = partSx(navigationMenu.positioner, undefined)
    .class
  protected readonly popup = partSx(navigationMenu.popup, undefined).class
  protected readonly viewport = partSx(navigationMenu.viewport, undefined).class
  protected readonly part = computed(() =>
    partSx(navigationMenu.root, this.sx())
  )

  /** The reading direction written on the menu, which its popup, in a portal, takes. */
  protected attr(name: "dir") {
    return this.#element.getAttribute(name)
  }
}

@Directive({
  selector: "ul[kuiNavigationMenuList]",
  providers: [provideSxPart()],
  hostDirectives: [KuiNavigationMenuList],
  host: {
    "data-slot": "navigation-menu-list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuList {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(navigationMenu.list, this.sx())
  )
}

/** An item of the bar: `<li kuiNavigationMenuItem>`, a trigger and its content, or a link. */
@Directive({
  selector: "li[kuiNavigationMenuItem]",
  providers: [provideSxPart()],
  hostDirectives: [KuiNavigationMenuItem],
  host: {
    "data-slot": "navigation-menu-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(navigationMenu.item, this.sx())
  )
}

/** An item's trigger: `<button kuiNavigationMenuTrigger>`, with its chevron. */
@Component({
  selector: "button[kuiNavigationMenuTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  hostDirectives: [KuiNavigationMenuTrigger],
  host: {
    type: "button",
    "data-slot": "navigation-menu-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    <svg
      iconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      aria-hidden="true"
      [sx]="icon"
    ></svg>`,
})
class NavigationMenuTrigger {
  readonly sx = input<SxInput>()
  protected readonly icon = navigationMenu.triggerIcon
  protected readonly part = computed(() =>
    partSx(navigationMenu.trigger, this.sx())
  )
}

/**
 * An item's content: `<div kuiNavigationMenuContent>`, shown in the menu's viewport while its item
 * is open. Kirana UI's content is a structural part, drawn in the viewport: this element stays in
 * its item, drawing nothing, and draws Kirana UI's in its template, its children projected into it.
 * Its selector leaves out the `<ng-template>` its own template writes, which Kirana UI's matches.
 */
@Component({
  selector: "[kuiNavigationMenuContent]:not(ng-template)",
  imports: [KuiNavigationMenuContent],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kuiNavigationMenuContent
      data-slot="navigation-menu-content"
      [attr.dir]="attr('dir')"
      [attr.data-lang]="attr('data-lang')"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class NavigationMenuContent {
  readonly sx = input<SxInput>()
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly part = computed(() =>
    partSx(navigationMenu.content, this.sx())
  )

  /** The reading direction and language written on this element, which the drawn content takes. */
  protected attr(name: "dir" | "data-lang") {
    return this.#element.getAttribute(name)
  }
}

/** A link: `<a kuiNavigationMenuLink href="…">`, in the bar or in a content. */
@Directive({
  selector: "[kuiNavigationMenuLink]",
  providers: [provideSxPart()],
  hostDirectives: [{ directive: KuiNavigationMenuLink, inputs: ["active"] }],
  host: {
    "[attr.data-slot]": "'navigation-menu-link'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuLink {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(navigationMenu.link, this.sx())
  )
}

/** The trigger's look, for a link in the bar beside the triggers (upstream's `navigationMenuTriggerStyle()`). */
const navigationMenuTriggerStyle = navigationMenu.triggerLook

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
}
