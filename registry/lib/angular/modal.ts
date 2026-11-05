/**
 * Angular's modals (Dialog, Alert Dialog, Sheet, Drawer): the popup layer's state (`Popup`, `popup.ts`) drawn
 * as Base UI draws a modal. Opening puts the content in a portal at the end of the body, after its
 * backdrop, both with `data-open`/`data-closed` and their first frame and exit
 * (`data-starting-style`, `data-ending-style`, held until their animations end); focus moves to the
 * content's first tabbable element and Tab stays inside it; the page behind does not scroll (`overflow:
 * hidden` on the body, as Base UI locks it); Escape
 * closes it, and a press on the backdrop too unless `dismissible` is false (an alert dialog); focus
 * returns to the trigger. The content is labelled by its title and described by its description
 * (`ModalLabels`).
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
import { props } from "@kirana-style/core"
import type { StyleHandle } from "@kirana-style/core"

import type { Popup } from "./popup"
import { exitFinished } from "./presence"

const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

let next = 0

/** The ids of a modal's title and description, which its content is labelled and described by. */
export class ModalLabels {
  readonly title = signal<string | null>(null)
  readonly description = signal<string | null>(null)
}
export const MODAL_LABELS = new InjectionToken<ModalLabels>("kui modal labels")

/** A title's or a description's id, registered with its modal. */
export function modalLabel(kind: "title" | "description") {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  if (!element.id) element.id = `kui-modal-${kind}-${next++}`
  inject(MODAL_LABELS, { optional: true })?.[kind].set(element.id)
}

export type ModalOptions = {
  /** The portal's own `data-slot` (`dialog-portal`). */
  portalSlot: string
  /** The backdrop's `data-slot` and look. */
  overlaySlot: string
  overlay: StyleHandle[]
  role?: "dialog" | "alertdialog"
  /** Whether a press on the backdrop closes it (an alert dialog's does not). */
  dismissible?: boolean
  /**
   * A viewport the content sits in, after the backdrop (a drawer's, `drawer-viewport`), with its
   * own look and attributes.
   */
  viewport?: {
    slot: string
    look: StyleHandle[]
    attributes?: () => Record<string, string>
  }
  /**
   * Whether it is modal (`true`): a non-modal one has no backdrop, keeps no focus inside and leaves
   * the page scrolling, as a non-modal drawer.
   */
  modal?: () => boolean
}

export function modalSurface(popup: Popup, options: ModalOptions) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const labels = inject(MODAL_LABELS, { optional: true })
  const portal = document.createElement("div")
  portal.setAttribute("data-base-ui-portal", "")
  portal.setAttribute("data-slot", options.portalSlot)
  const overlay = document.createElement("div")
  overlay.setAttribute("role", "presentation")
  overlay.setAttribute("data-slot", options.overlaySlot)
  overlay.setAttribute("aria-hidden", "true")
  overlay.className = props(...options.overlay).className ?? ""
  portal.append(overlay)
  const modal = options.modal ?? (() => true)
  // The content's container in the portal: the viewport when it has one.
  let holder: HTMLElement = portal
  if (options.viewport) {
    holder = document.createElement("div")
    holder.setAttribute("role", "presentation")
    holder.setAttribute("data-slot", options.viewport.slot)
    holder.className = props(...options.viewport.look).className ?? ""
    portal.append(holder)
  }
  element.id = popup.id
  element.tabIndex = -1
  element.setAttribute("role", options.role ?? "dialog")
  popup.popup.set(element)
  if (labels)
    effect(() => {
      const title = labels.title()
      const description = labels.description()
      if (title) element.setAttribute("aria-labelledby", title)
      if (description) element.setAttribute("aria-describedby", description)
    })

  const both = (name: string, value: string | null) => {
    for (const node of [
      overlay,
      element,
      ...(holder === portal ? [] : [holder]),
    ])
      if (value === null) node.removeAttribute(name)
      else node.setAttribute(name, value)
  }
  const flush = () => void getComputedStyle(element).getPropertyValue("opacity")
  let run = 0
  let first = true
  let overflow = ""

  const keydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      popup.setOpen(false, "escape")
      return
    }
    if (event.key !== "Tab" || !modal()) return
    // Tab stays inside the content.
    const stops = [...element.querySelectorAll<HTMLElement>(TABBABLE)]
    if (!stops.length) {
      event.preventDefault()
      return
    }
    const start = stops[0]!
    const last = stops[stops.length - 1]!
    if (event.shiftKey && document.activeElement === start) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      start.focus()
    }
  }
  const press = () => {
    if (options.dismissible !== false) popup.setOpen(false, "outside")
  }
  overlay.addEventListener("click", press)

  const show = () => {
    run++
    if (!portal.isConnected) document.body.append(portal)
    holder.append(element)
    for (const [name, value] of Object.entries(
      options.viewport?.attributes?.() ?? {}
    ))
      holder.setAttribute(name, value)
    // A non-modal one draws no backdrop and leaves the page scrolling.
    if (modal()) {
      if (!overlay.isConnected) portal.prepend(overlay)
    } else overlay.remove()
    both("data-closed", null)
    both("data-open", "")
    for (const node of [overlay, element])
      node.removeAttribute("data-ending-style")
    overflow = document.body.style.overflow
    if (modal()) document.body.style.overflow = "hidden"
    document.addEventListener("keydown", keydown, true)
    if (!first) {
      for (const node of [overlay, element])
        node.setAttribute("data-starting-style", "")
      flush()
      for (const node of [overlay, element])
        node.removeAttribute("data-starting-style")
    }
    queueMicrotask(() =>
      (element.querySelector<HTMLElement>(TABBABLE) ?? element).focus({
        preventScroll: true,
      })
    )
  }

  const hide = (animate: boolean) => {
    const current = ++run
    document.removeEventListener("keydown", keydown, true)
    if (!portal.isConnected) {
      element.remove()
      return
    }
    document.body.style.overflow = overflow
    both("data-open", null)
    both("data-closed", "")
    popup.trigger()?.focus({ preventScroll: true })
    const done = () => {
      if (current !== run) return
      for (const node of [overlay, element])
        node.removeAttribute("data-ending-style")
      portal.remove()
    }
    if (!animate) return done()
    for (const node of [overlay, element])
      node.setAttribute("data-ending-style", "")
    flush()
    void exitFinished(overlay, element).then(done)
  }

  effect(() => {
    const open = popup.open()
    untracked(() => {
      if (open) show()
      else hide(!first)
      first = false
    })
  })
  inject(DestroyRef).onDestroy(() => {
    document.removeEventListener("keydown", keydown, true)
    overlay.removeEventListener("click", press)
    if (portal.isConnected) document.body.style.overflow = overflow
    portal.remove()
  })
}
