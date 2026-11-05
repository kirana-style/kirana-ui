/**
 * Base UI's navigation menu on Angular, the registry's own (ng-primitives has none): a bar of items,
 * each trigger opening its panel on hover (after Base UI's 50ms) or press, the open panel shown in
 * one popup that follows the open trigger and takes the panel's size, in a portal, as Base UI's
 * positioner, popup and viewport. The popup is the registry's layer (`lib/angular/popup.ts`).
 */
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { POPUP, popupSurface, providePopup } from "../../../lib/angular/popup"
import type { Align, Popup } from "../../../lib/angular/popup"
import { navigationMenu } from "../../../styles/navigation-menu.styles"

let next = 0
const DELAY = 50
const CLOSE_DELAY = 50

type Panel = { trigger: HTMLElement | null; content: HTMLElement | null }

/** The menu's state: which item is open, each item's trigger and panel. */
class NavigationMenuState {
  readonly #panels = new Map<string, Panel>()
  /** The open item's id. */
  readonly current = signal<string | null>(null)
  #timer: ReturnType<typeof setTimeout> | undefined

  constructor(readonly popup: Popup) {}

  panel(id: string) {
    let panel = this.#panels.get(id)
    if (!panel) this.#panels.set(id, (panel = { trigger: null, content: null }))
    return panel
  }

  /** Opens an item's panel, or closes the menu (`null`), after `wait` ms. */
  later(id: string | null, wait: number) {
    clearTimeout(this.#timer)
    const run = () => this.open(id)
    if (wait <= 0) run()
    else this.#timer = setTimeout(run, wait)
  }

  open(id: string | null) {
    clearTimeout(this.#timer)
    this.current.set(id)
    if (id) {
      this.popup.trigger.set(this.panel(id).trigger)
      this.popup.setOpen(true, "trigger")
    } else this.popup.setOpen(false, "trigger")
  }

  content(id: string | null) {
    return id ? (this.#panels.get(id)?.content ?? null) : null
  }
}

const NAVIGATION_MENU = new InjectionToken<NavigationMenuState>(
  "kui navigation menu"
)
const NAVIGATION_MENU_ITEM = new InjectionToken<string>(
  "kui navigation menu item"
)

/** The popup that shows the open panel, placed below the open trigger. */
@Component({
  selector: "nav[kuiNavigationMenuPopup]",
  imports: [SxDirective],
  host: {
    "[class]": "part",
  },
  template: `<div #viewport [sx]="viewportStyle"></div>`,
})
class NavigationMenuPopup {
  readonly align = input<Align>("start")
  protected readonly part = partSx(navigationMenu.popup, undefined).class
  protected readonly viewportStyle = navigationMenu.viewport
  private readonly viewport =
    viewChild.required<ElementRef<HTMLElement>>("viewport")

  constructor() {
    const state = inject(NAVIGATION_MENU)
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    element.style.setProperty("--popup-width", "auto")
    element.style.setProperty("--popup-height", "auto")
    popupSurface(state.popup, {
      side: () => "bottom",
      align: this.align,
      sideOffset: () => 8,
      alignOffset: () => 0,
      positioner: navigationMenu.positioner,
      // The positioner takes the panel's size, which the popup grows and shrinks to.
      onPlaced: () => size(),
    })
    const size = () => {
      const positioner = element.parentElement
      if (!positioner) return
      // The panel's own size, measured with the last one's released.
      const was = [
        positioner.style.getPropertyValue("--positioner-width"),
        positioner.style.getPropertyValue("--positioner-height"),
      ]
      positioner.style.setProperty("--positioner-width", "max-content")
      positioner.style.setProperty("--positioner-height", "max-content")
      const { width, height } = element.getBoundingClientRect()
      if (was[0]) {
        // From where it was, so the popup grows or shrinks to it.
        positioner.style.setProperty("--positioner-width", was[0])
        positioner.style.setProperty("--positioner-height", was[1]!)
        void getComputedStyle(positioner).width
      }
      positioner.style.setProperty("--positioner-width", `${width}px`)
      positioner.style.setProperty("--positioner-height", `${height}px`)
    }
    // The open item's panel in the viewport; a closed one leaves the page, as Base UI's.
    effect(() => {
      const id = state.current()
      const content = state.content(id)
      untracked(() => {
        const viewport = this.viewport().nativeElement
        for (const child of Array.from(viewport.children))
          if (child !== content) child.remove()
        if (content && content.parentElement !== viewport) {
          content.setAttribute("data-open", "")
          viewport.append(content)
        }
        queueMicrotask(size)
      })
    })
    // The pointer on the popup keeps it open; leaving it closes the menu.
    element.addEventListener("pointerenter", () => {
      const id = state.current()
      if (id) state.later(id, 0)
    })
    element.addEventListener("pointerleave", () =>
      state.later(null, CLOSE_DELAY)
    )
  }
}

/**
 * The menu: `<nav kuiNavigationMenu>` around its list, with the popup its panels open in. `align`
 * places the popup against the open trigger.
 */
@Component({
  selector: "nav[kuiNavigationMenu]",
  imports: [NavigationMenuPopup],
  providers: [
    provideSxPart(),
    providePopup(),
    {
      provide: NAVIGATION_MENU,
      useFactory: () => new NavigationMenuState(inject(POPUP)),
    },
  ],
  host: {
    "data-slot": "navigation-menu",
    "[attr.data-open]": "state.popup.open() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    <nav kuiNavigationMenuPopup [align]="align()"></nav>`,
})
class NavigationMenu {
  readonly align = input<Align>("start")
  readonly sx = input<SxInput>()
  protected readonly state = inject(NAVIGATION_MENU)
  protected readonly part = computed(() =>
    partSx(navigationMenu.root, this.sx())
  )

  constructor() {
    // Closed from outside (Escape, a press elsewhere): no item is open.
    effect(() => {
      if (!this.state.popup.open())
        untracked(() => this.state.current.set(null))
    })
  }
}

@Directive({
  selector: "ul[kuiNavigationMenuList]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "navigation-menu-list",
    "[attr.data-open]": "state.popup.open() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuList {
  readonly sx = input<SxInput>()
  protected readonly state = inject(NAVIGATION_MENU)
  protected readonly part = computed(() =>
    partSx(navigationMenu.list, this.sx())
  )
}

/** An item of the bar: `<li kuiNavigationMenuItem>`, a trigger and its panel, or a link. */
@Directive({
  selector: "li[kuiNavigationMenuItem]",
  providers: [
    provideSxPart(),
    {
      provide: NAVIGATION_MENU_ITEM,
      useFactory: () => `kui-navigation-menu-item-${next++}`,
    },
  ],
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
  host: {
    type: "button",
    "data-slot": "navigation-menu-trigger",
    "aria-disabled": "false",
    "[attr.aria-expanded]": "open()",
    "[attr.aria-controls]": "open() ? state.popup.id : null",
    "[attr.data-popup-open]": "open() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(pointerenter)": "state.later(id, state.popup.open() ? 0 : delay)",
    "(pointerleave)": "state.later(null, closeDelay)",
    "(click)": "state.open(open() ? null : id)",
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
  protected readonly state = inject(NAVIGATION_MENU)
  protected readonly id = inject(NAVIGATION_MENU_ITEM)
  protected readonly delay = DELAY
  protected readonly closeDelay = CLOSE_DELAY
  protected readonly icon = navigationMenu.triggerIcon
  protected readonly open = computed(() => this.state.current() === this.id)
  protected readonly part = computed(() =>
    partSx(navigationMenu.trigger, this.sx())
  )

  constructor() {
    this.state.panel(this.id).trigger =
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  }
}

/** An item's panel: `<div kuiNavigationMenuContent>`, shown in the menu's popup while its item is open. */
@Directive({
  selector: "[kuiNavigationMenuContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "navigation-menu-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(navigationMenu.content, this.sx())
  )

  constructor() {
    const state = inject(NAVIGATION_MENU)
    const id = inject(NAVIGATION_MENU_ITEM)
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    state.panel(id).content = element
    // Out of the page until its item opens: the popup moves it into its viewport.
    afterNextRender(() => {
      if (state.current() !== id) element.remove()
    })
    inject(DestroyRef).onDestroy(() => {
      element.remove()
      state.panel(id).content = null
    })
  }
}

/** A link: `<a kuiNavigationMenuLink href="…">`, in the bar or in a panel. */
@Directive({
  selector: "[kuiNavigationMenuLink]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'navigation-menu-link'",
    "[attr.data-active]": "active() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NavigationMenuLink {
  readonly active = input(false)
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
