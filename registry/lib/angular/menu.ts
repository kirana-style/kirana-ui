/**
 * Angular's menus (Dropdown Menu, Context Menu): a menu over the popup layer (`popup.ts`), with Base
 * UI's behaviour. Its items are focused as the highlight moves (`data-highlighted`, `tabindex`
 * `0` on the highlighted one): the arrow keys, Home and End, typing a label's first letters, and the
 * pointer. Enter and Space press the highlighted item; pressing an item closes the menu unless it is
 * a checkbox or radio item; Escape and Tab close the whole menu. A submenu is a menu inside a menu:
 * its trigger is one of the parent's items, opened by the pointer resting on it, a press, or the
 * arrow key toward it, and the arrow key back closes it. Opening from the keyboard highlights the
 * first item; from the pointer, the menu itself takes focus.
 */
import {
  DestroyRef,
  ElementRef,
  InjectionToken,
  effect,
  inject,
  signal,
  untracked,
} from "@angular/core"

import { POPUP, Popup } from "./popup"

const ITEM =
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'

export class Menu {
  readonly popup = new Popup()
  /** Whether the menu was opened from the keyboard, so it highlights its first item. */
  fromKeyboard = false
  readonly highlighted = signal<HTMLElement | null>(null)
  #typed = ""
  #typedAt = 0

  constructor(
    readonly parent: Menu | null,
    /** Its items' selector: a menu's `menuitem` roles, a select's `option`. */
    readonly itemSelector = ITEM
  ) {
    parent?.popup.children.add(this.popup)
  }

  /** The outermost menu, which an item's press or Escape closes. */
  get root(): Menu {
    return this.parent ? this.parent.root : this
  }

  items(): HTMLElement[] {
    const popup = this.popup.popup()
    return popup
      ? [...popup.querySelectorAll<HTMLElement>(this.itemSelector)].filter(
          (item) => !item.hasAttribute("data-disabled")
        )
      : []
  }

  highlight(item: HTMLElement | null, focus = true) {
    const previous = this.highlighted()
    if (previous && previous !== item) {
      previous.removeAttribute("data-highlighted")
      previous.tabIndex = -1
    }
    this.highlighted.set(item)
    if (!item) return
    item.setAttribute("data-highlighted", "")
    item.tabIndex = 0
    if (focus) item.focus({ preventScroll: false })
  }

  /** Closes the whole menu, back to its trigger. */
  close(reason: "item" | "escape" | "outside" = "item") {
    const root = this.root
    root.popup.setOpen(false, reason)
    if (reason !== "outside")
      root.popup.trigger()?.focus({ preventScroll: true })
  }

  /** The popup's keys: the highlight, typeahead, a press, Tab. */
  keydown(event: KeyboardEvent) {
    const items = this.items()
    const current = this.highlighted()
    const index = current ? items.indexOf(current) : -1
    const move = (to: number) => {
      event.preventDefault()
      const count = items.length
      if (count) this.highlight(items[(to + count) % count]!)
    }
    switch (event.key) {
      case "ArrowDown":
        return move(index + 1)
      case "ArrowUp":
        return move(index < 0 ? -1 : index - 1)
      case "Home":
        return move(0)
      case "End":
        return move(items.length - 1)
      case "Enter":
      case " ":
        if (current) {
          event.preventDefault()
          current.click()
        }
        return
      case "Tab":
        this.close("outside")
        return
    }
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const now = Date.now()
      this.#typed =
        now - this.#typedAt > 500 ? event.key : this.#typed + event.key
      this.#typedAt = now
      const typed = this.#typed.toLowerCase()
      const start = this.#typed.length === 1 ? index + 1 : Math.max(index, 0)
      const ordered = [...items.slice(start), ...items.slice(0, start)]
      const found = ordered.find((item) =>
        (item.textContent ?? "").trim().toLowerCase().startsWith(typed)
      )
      if (found) this.highlight(found)
    }
  }
}

export const MENU = new InjectionToken<Menu>("kui menu")

/** A menu root's providers: its `Menu`, inside any menu around it, and the `Popup` it opens. */
export function provideMenu() {
  return [
    {
      provide: MENU,
      useFactory: () =>
        new Menu(inject(MENU, { optional: true, skipSelf: true })),
    },
    { provide: POPUP, useFactory: () => inject(MENU).popup },
  ]
}

/** A menu's popup: its keys, the pointer leaving it, and the first item highlighted from the keyboard. */
export function menuPopup(menu: Menu) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const keydown = (event: KeyboardEvent) => {
    // A submenu's own popup takes its keys.
    const own = (event.target as HTMLElement).closest(
      '[role="menu"], [role="listbox"]'
    )
    if (own && own !== element && !element.contains(own)) return
    menu.keydown(event)
  }
  const leave = () => {
    // The highlight stays on a submenu's trigger while its submenu is open.
    const current = menu.highlighted()
    if (current?.getAttribute("aria-expanded") === "true") return
    menu.highlight(null)
    element.focus({ preventScroll: true })
  }
  element.addEventListener("keydown", keydown)
  element.addEventListener("pointerleave", leave)
  effect(() => {
    const open = menu.popup.open()
    untracked(() => {
      if (!open) {
        menu.highlight(null, false)
        return
      }
      if (menu.fromKeyboard)
        queueMicrotask(() => {
          const first = menu.items()[0]
          if (first) menu.highlight(first)
        })
    })
  })
  inject(DestroyRef).onDestroy(() => {
    element.removeEventListener("keydown", keydown)
    element.removeEventListener("pointerleave", leave)
  })
}

/**
 * A menu's trigger: a press opens or closes it, and Enter, Space or the down arrow open it with its
 * first item highlighted.
 */
export function menuTrigger(menu: Menu) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const press = (event: MouseEvent) => {
    menu.fromKeyboard = event.detail === 0
    menu.popup.setOpen(!menu.popup.open(), "trigger")
  }
  const keydown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown") return
    event.preventDefault()
    menu.fromKeyboard = true
    menu.popup.setOpen(true, "trigger")
  }
  element.addEventListener("click", press)
  element.addEventListener("keydown", keydown)
  inject(DestroyRef).onDestroy(() => {
    element.removeEventListener("click", press)
    element.removeEventListener("keydown", keydown)
  })
}

/**
 * One of a menu's items: highlighted under the pointer, pressed by a click (closing the menu when
 * `closes` says so), and Base UI's `data-disabled`, `aria-disabled` when `disabled`.
 */
export function menuItem(
  menu: Menu,
  options: { closes: () => boolean; disabled: () => boolean }
) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  element.tabIndex = -1
  effect(() => {
    if (options.disabled()) {
      element.setAttribute("data-disabled", "")
      element.setAttribute("aria-disabled", "true")
    } else {
      element.removeAttribute("data-disabled")
      element.removeAttribute("aria-disabled")
    }
  })
  const move = () => {
    if (options.disabled() || menu.highlighted() === element) return
    menu.highlight(element)
    // Another item under the pointer closes a submenu opened from this menu.
    for (const child of menu.popup.children)
      if (child.trigger() !== element) child.setOpen(false, "hover")
  }
  const click = (event: MouseEvent) => {
    if (options.disabled()) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }
    if (options.closes()) menu.close("item")
  }
  element.addEventListener("pointermove", move)
  element.addEventListener("click", click)
  inject(DestroyRef).onDestroy(() => {
    element.removeEventListener("pointermove", move)
    element.removeEventListener("click", click)
  })
  return element
}

/**
 * A submenu's trigger, one of its parent's items: the pointer resting on it opens the submenu after
 * `delay` ms, as a press or the arrow key toward it do (that one highlighting its first item); the
 * arrow key back, inside the submenu, closes it and returns to this item.
 */
export function submenuTrigger(sub: Menu, delay = 100) {
  const parent = sub.parent!
  const element = menuItem(parent, {
    closes: () => false,
    disabled: () => false,
  })
  sub.popup.trigger.set(element)
  if (!element.id) element.id = sub.popup.triggerId
  element.setAttribute("aria-haspopup", "menu")
  effect(() => {
    const open = sub.popup.open()
    element.setAttribute("aria-expanded", String(open))
    if (open) element.setAttribute("data-popup-open", "")
    else element.removeAttribute("data-popup-open")
  })
  let timer: ReturnType<typeof setTimeout> | undefined
  const rtl = () => getComputedStyle(element).direction === "rtl"
  const enter = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      sub.fromKeyboard = false
      sub.popup.setOpen(true, "hover")
    }, delay)
  }
  const leave = () => clearTimeout(timer)
  const click = () => {
    sub.fromKeyboard = false
    sub.popup.setOpen(true, "trigger")
  }
  const keydown = (event: KeyboardEvent) => {
    const toward = rtl() ? "ArrowLeft" : "ArrowRight"
    if (event.key !== toward && event.key !== "Enter" && event.key !== " ")
      return
    event.preventDefault()
    event.stopPropagation()
    sub.fromKeyboard = true
    sub.popup.setOpen(true, "trigger")
    // Focus moves into the submenu, and the highlight with it, as Base UI's.
    element.removeAttribute("data-highlighted")
  }
  element.addEventListener("pointerenter", enter)
  element.addEventListener("pointerleave", leave)
  element.addEventListener("click", click)
  element.addEventListener("keydown", keydown)
  inject(DestroyRef).onDestroy(() => {
    clearTimeout(timer)
    element.removeEventListener("pointerenter", enter)
    element.removeEventListener("pointerleave", leave)
    element.removeEventListener("click", click)
    element.removeEventListener("keydown", keydown)
  })
}

/** A submenu's popup: the arrow key back closes it, and it closes with its parent. */
export function submenuPopup(sub: Menu) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const keydown = (event: KeyboardEvent) => {
    const back =
      getComputedStyle(element).direction === "rtl" ? "ArrowRight" : "ArrowLeft"
    if (event.key !== back) return
    event.preventDefault()
    sub.popup.setOpen(false, "escape")
    const trigger = sub.popup.trigger()
    if (trigger) sub.parent!.highlight(trigger)
  }
  element.addEventListener("keydown", keydown)
  effect(() => {
    if (!sub.parent!.popup.open())
      untracked(() => sub.popup.setOpen(false, "outside"))
  })
  inject(DestroyRef).onDestroy(() =>
    element.removeEventListener("keydown", keydown)
  )
}

/** A group's label's id, which the group names itself by (`aria-labelledby`). */
export class MenuGroup {
  readonly labelId = signal<string | null>(null)
}
export const MENU_GROUP = new InjectionToken<MenuGroup>("kui menu group")

/** A radio group's value, which its radio items read and set. */
export class MenuRadioGroup {
  readonly value = signal<unknown>(undefined)
  #changed?: (value: unknown) => void
  onChange(listener: (value: unknown) => void) {
    this.#changed = listener
  }
  select(value: unknown) {
    if (this.value() === value) return
    this.value.set(value)
    this.#changed?.(value)
  }
}
export const MENU_RADIO_GROUP = new InjectionToken<MenuRadioGroup>(
  "kui menu radio group"
)
