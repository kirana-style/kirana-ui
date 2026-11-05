import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import type { Signal } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { POPUP, hoverTrigger, providePopup } from "../../../lib/angular/popup"
import { useIsMobile } from "../../../lib/angular/use-mobile"
import { button } from "../../../styles/button.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { separator } from "../../../styles/separator.styles"
import { sidebar } from "../../../styles/sidebar.styles"
import { skeleton } from "../../../styles/skeleton.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { TooltipContent } from "./tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/** What a SidebarProvider hands its parts, as React's context does. */
export type SidebarContext = {
  state: Signal<"expanded" | "collapsed">
  open: Signal<boolean>
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  openMobile: Signal<boolean>
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void
  isMobile: Signal<boolean>
  toggleSidebar: () => void
}

const SIDEBAR = new InjectionToken<SidebarContext>("kui sidebar")

/** Each provider's state, by its element, for a part projected out of its template (below). */
const PROVIDED = new WeakMap<Element, SidebarContext>()

/**
 * The provider's state, inside a `SidebarProvider`: `useSidebar().toggleSidebar()`. A part written
 * in one template and projected into a provider in another (a card's menu inside its section's
 * sidebar) cannot inject it, since Angular resolves what its declaring template provides, where
 * React's context follows the page: it finds the provider around its element once drawn.
 */
function useSidebar(): SidebarContext {
  const context = inject(SIDEBAR, { optional: true })
  if (context) return context
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  let found: SidebarContext | undefined
  const around = () => {
    found ??= PROVIDED.get(
      element.closest('[data-slot="sidebar-wrapper"]') as Element
    )
    if (!found)
      throw new Error("useSidebar must be used within a SidebarProvider.")
    return found
  }
  return {
    state: computed(() => around().state()),
    open: computed(() => around().open()),
    setOpen: (open) => around().setOpen(open),
    openMobile: computed(() => around().openMobile()),
    setOpenMobile: (open) => around().setOpenMobile(open),
    isMobile: computed(() => around().isMobile()),
    toggleSidebar: () => around().toggleSidebar(),
  }
}

/**
 * The sidebar's state and its wrapper: `<div kuiSidebarProvider>` around the sidebar and its
 * inset. `[(open)]` or `defaultOpen`; the state is kept in a cookie, and ⌘B or Ctrl+B toggles it.
 */
@Directive({
  selector: "[kuiSidebarProvider]",
  providers: [
    provideSxPart(),
    {
      provide: SIDEBAR,
      useFactory: (): SidebarContext => inject(SidebarProvider).context,
    },
  ],
  host: {
    "data-slot": "sidebar-wrapper",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarProvider {
  readonly defaultOpen = input(true, { transform: booleanAttribute })
  readonly open = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly openChange = output<boolean>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.wrapper, this.sx()))

  // The sidebar's own state, unless the caller controls it with `[(open)]`.
  readonly #open = signal<boolean | undefined>(undefined)
  readonly #openMobile = signal(false)
  readonly context: SidebarContext

  constructor() {
    const isMobile = useIsMobile()
    const open = computed(
      () => this.open() ?? this.#open() ?? this.defaultOpen()
    )
    const setOpen = (value: boolean | ((open: boolean) => boolean)) => {
      const state = typeof value === "function" ? value(open()) : value
      this.#open.set(state)
      this.openChange.emit(state)
      // Kept in a cookie, so the next page load starts in the same state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${state}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    }
    const setOpenMobile = (value: boolean | ((open: boolean) => boolean)) =>
      this.#openMobile.set(
        typeof value === "function" ? value(this.#openMobile()) : value
      )
    const toggleSidebar = () =>
      isMobile()
        ? setOpenMobile((current) => !current)
        : setOpen((current) => !current)
    this.context = {
      state: computed(() => (open() ? "expanded" : "collapsed")),
      open,
      setOpen,
      openMobile: this.#openMobile.asReadonly(),
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }

    PROVIDED.set(
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
      this.context
    )

    // ⌘B or Ctrl+B toggles the sidebar.
    const keydown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", keydown)
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("keydown", keydown)
    )
  }
}

/**
 * The sidebar: `<div kuiSidebar>`. Drawn as React's: fixed beside the page, with the gap that holds
 * its room, its container and inner panel; in a Sheet on a narrow screen; or in place when
 * `collapsible` is `none`. The caller's `sx` goes on its container, as React's.
 */
@Component({
  selector: "[kuiSidebar]",
  imports: [
    NgTemplateOutlet,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SxDirective,
  ],
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "mode() === 'mobile' ? null : 'sidebar'",
    "[attr.data-state]": "mode() === 'fixed' ? context.state() : null",
    "[attr.data-collapsible]":
      "mode() === 'fixed' ? (context.state() === 'collapsed' ? collapsible() : '') : null",
    "[attr.data-variant]": "mode() === 'fixed' ? variant() : null",
    "[attr.data-side]": "mode() === 'fixed' ? side() : null",
    "[attr.dir]": "mode() === 'none' ? (dir() ?? null) : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-template #content><ng-content /></ng-template>
    @switch (mode()) {
      @case ("none") {
        <ng-container [ngTemplateOutlet]="content" />
      }
      @case ("mobile") {
        <ng-container
          kuiSheet
          [open]="context.openMobile()"
          (openChange)="context.setOpenMobile($event)"
        >
          <div
            kuiSheetContent
            [attr.data-slot]="'sidebar'"
            data-sidebar="sidebar"
            data-mobile="true"
            [attr.dir]="dir() ?? null"
            [sx]="styles.mobile"
            [side]="side()"
            [showCloseButton]="false"
          >
            <div kuiSheetHeader [sx]="styles.hidden">
              <h2 kuiSheetTitle>Sidebar</h2>
              <p kuiSheetDescription>Displays the mobile sidebar.</p>
            </div>
            <div [sx]="styles.mobileInner">
              <ng-container [ngTemplateOutlet]="content" />
            </div>
          </div>
        </ng-container>
      }
      @default {
        <!-- Holds the room the fixed panel takes on the page. -->
        <div data-slot="sidebar-gap" [sx]="gap()"></div>
        <div
          data-slot="sidebar-container"
          [attr.data-side]="side()"
          [attr.dir]="dir() ?? null"
          [sx]="container()"
        >
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            [sx]="styles.inner"
          >
            <ng-container [ngTemplateOutlet]="content" />
          </div>
        </div>
      }
    }
  `,
})
class Sidebar {
  readonly side = input<"left" | "right">("left")
  readonly variant = input<"sidebar" | "floating" | "inset">("sidebar")
  readonly collapsible = input<"offcanvas" | "icon" | "none">("offcanvas")
  readonly dir = input<"ltr" | "rtl">()
  readonly sx = input<SxInput>()
  protected readonly context = useSidebar()
  protected readonly styles = {
    mobile: sidebar.mobile,
    mobileInner: sidebar.mobileInner,
    inner: sidebar.inner,
    hidden: visuallyHidden,
  }
  protected readonly mode = computed(() =>
    this.collapsible() === "none"
      ? "none"
      : this.context.isMobile()
        ? "mobile"
        : "fixed"
  )
  readonly #padded = computed(
    () => this.variant() === "floating" || this.variant() === "inset"
  )
  protected readonly gap = computed(
    () => [sidebar.gap, this.#padded() && sidebar.gapPadded] as SxInput
  )
  protected readonly container = computed(
    () =>
      [
        sidebar.container,
        this.#padded() && sidebar.containerPadded,
        this.sx(),
      ] as SxInput
  )
  protected readonly part = computed(() => {
    const mode = this.mode()
    if (mode === "none") return partSx(sidebar.static, this.sx())
    if (mode === "mobile") return { class: "", style: "display: contents" }
    return partSx(sidebar.root, undefined)
  })
}

/** The button that opens and closes it, a ghost `icon-sm` Button. */
@Component({
  selector: "button[kuiSidebarTrigger]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    type: "button",
    "data-sidebar": "trigger",
    "[attr.data-slot]": "'sidebar-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "context.toggleSidebar()",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="PanelLeftIcon"
      tabler="IconLayoutSidebar"
      hugeicons="SidebarLeftIcon"
      phosphor="SidebarIcon"
      remixicon="RiSideBarLine"
    ></svg>
    <span [sx]="hidden">Toggle Sidebar</span>
  `,
})
class SidebarTrigger {
  readonly sx = input<SxInput>()
  protected readonly context = useSidebar()
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(button({ variant: "ghost", size: "icon-sm" }), this.sx())
  )
}

/** The thin rail along its edge, which toggles it. */
@Directive({
  selector: "button[kuiSidebarRail]",
  providers: [provideSxPart()],
  host: {
    type: "button",
    "data-sidebar": "rail",
    "data-slot": "sidebar-rail",
    "aria-label": "Toggle Sidebar",
    tabindex: "-1",
    title: "Toggle Sidebar",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "context.toggleSidebar()",
  },
})
class SidebarRail {
  readonly sx = input<SxInput>()
  protected readonly context = useSidebar()
  protected readonly part = computed(() => partSx(sidebar.rail, this.sx()))
}

/** The page beside it: `<main kuiSidebarInset>`. */
@Directive({
  selector: "[kuiSidebarInset]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-inset",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarInset {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.inset, this.sx()))
}

/** A search field in it, an Input in its look. */
@Directive({
  selector: "input[kuiSidebarInput]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-input",
    "data-sidebar": "input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, sidebar.input], this.sx())
  )
}

/** A Separator in its look. */
@Directive({
  selector: "[kuiSidebarSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-separator",
    "data-sidebar": "separator",
    role: "separator",
    "aria-orientation": "horizontal",
    "data-orientation": "horizontal",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([separator, sidebar.separator], this.sx())
  )
}

@Directive({
  selector: "[kuiSidebarHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-header",
    "data-sidebar": "header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.header, this.sx()))
}

@Directive({
  selector: "[kuiSidebarFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-footer",
    "data-sidebar": "footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.footer, this.sx()))
}

@Directive({
  selector: "[kuiSidebarContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-content",
    "data-sidebar": "content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.content, this.sx()))
}

@Directive({
  selector: "[kuiSidebarGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-group",
    "data-sidebar": "group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.group, this.sx()))
}

@Directive({
  selector: "[kuiSidebarGroupLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarGroupLabel {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(sidebar.groupLabel, this.sx())
  )
}

@Directive({
  selector: "[kuiSidebarGroupAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarGroupAction {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(sidebar.groupAction, this.sx())
  )
}

@Directive({
  selector: "[kuiSidebarGroupContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-group-content",
    "data-sidebar": "group-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarGroupContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(sidebar.groupContent, this.sx())
  )
}

@Directive({
  selector: "[kuiSidebarMenu]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu",
    "data-sidebar": "menu",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenu {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.menu, this.sx()))
}

@Directive({
  selector: "[kuiSidebarMenuItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-item",
    "data-sidebar": "menu-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.menuItem, this.sx()))
}

@Directive({
  selector: "[kuiSidebarMenuBadge]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-badge",
    "data-sidebar": "menu-badge",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuBadge {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.menuBadge, this.sx()))
}

@Directive({
  selector: "[kuiSidebarMenuSub]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-sub",
    "data-sidebar": "menu-sub",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuSub {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sidebar.menuSub, this.sx()))
}

@Directive({
  selector: "[kuiSidebarMenuSubItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-sub-item",
    "data-sidebar": "menu-sub-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuSubItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(sidebar.menuSubItem, this.sx())
  )
}

const MENU_BUTTON_VARIANTS = {
  default: null,
  outline: sidebar.menuButtonOutline,
}
const MENU_BUTTON_SIZES = {
  default: sidebar.menuButtonDefault,
  sm: sidebar.menuButtonSm,
  lg: sidebar.menuButtonLg,
}

/**
 * A row's button: `<button kuiSidebarMenuButton isActive>` (or on an `<a>`). With `tooltip`, it
 * names itself in a tooltip to its right while the sidebar is collapsed to its icons.
 */
@Component({
  selector: "[kuiSidebarMenuButton]",
  imports: [TooltipContent],
  providers: [provideSxPart(), providePopup()],
  host: {
    "[attr.data-slot]": "'sidebar-menu-button'",
    "data-sidebar": "menu-button",
    "[attr.data-size]": "size()",
    "[attr.data-active]": "isActive() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    @if (tooltip()) {
      <div
        kuiTooltipContent
        side="right"
        align="center"
        [hidden]="context.state() !== 'collapsed' || context.isMobile()"
      >
        {{ tooltip() }}
      </div>
    }
  `,
})
class SidebarMenuButton {
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly variant = input<keyof typeof MENU_BUTTON_VARIANTS>("default")
  readonly size = input<keyof typeof MENU_BUTTON_SIZES>("default")
  readonly tooltip = input<string>()
  readonly sx = input<SxInput>()
  protected readonly context = useSidebar()
  protected readonly part = computed(() =>
    partSx(
      [
        sidebar.menuButton,
        MENU_BUTTON_VARIANTS[this.variant()],
        MENU_BUTTON_SIZES[this.size()],
      ],
      this.sx()
    )
  )

  constructor() {
    const popup = inject(POPUP)
    // Its tooltip opens at once, as React's (inside the provider's `TooltipProvider`, delay 0).
    hoverTrigger(
      popup,
      () => 0,
      () => 0
    )
  }
}

/** A row's action at its end; with `showOnHover`, only while the row is hovered or active. */
@Directive({
  selector: "[kuiSidebarMenuAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuAction {
  readonly showOnHover = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [sidebar.menuAction, this.showOnHover() && sidebar.menuActionOnHover],
      this.sx()
    )
  )
}

/** A placeholder row, its text a width between 50 and 90%, so a list of them reads as text. */
@Component({
  selector: "[kuiSidebarMenuSkeleton]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-skeleton",
    "data-sidebar": "menu-skeleton",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (showIcon()) {
      <div
        data-slot="skeleton"
        data-sidebar="menu-skeleton-icon"
        [sx]="icon"
      ></div>
    }
    <div
      data-slot="skeleton"
      data-sidebar="menu-skeleton-text"
      [sx]="text"
      [style.max-width]="width"
    ></div>
  `,
})
class SidebarMenuSkeleton {
  readonly showIcon = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly icon = [skeleton, sidebar.menuSkeletonIcon] as SxInput
  protected readonly text = [skeleton, sidebar.menuSkeletonText] as SxInput
  protected readonly width = `${Math.floor(Math.random() * 40) + 50}%`
  protected readonly part = computed(() =>
    partSx(sidebar.menuSkeleton, this.sx())
  )
}

/** A submenu's link: `<a kuiSidebarMenuSubButton>`. */
@Directive({
  selector: "[kuiSidebarMenuSubButton]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "[attr.data-size]": "size()",
    "[attr.data-active]": "isActive() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SidebarMenuSubButton {
  readonly size = input<"sm" | "md">("md")
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(sidebar.menuSubButton, this.sx())
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
