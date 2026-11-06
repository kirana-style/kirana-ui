/**
 * Toast, the registry's own (ng-primitives has none): Base UI's toast written for Angular, its
 * store and its markup, so the style module reads the same attributes and variables as React's.
 * A page calls `toast.add`, `toast.close`, `toast.update` and `toast.promise`, as React's and
 * Vue's do; `<kui-toast-toaster />`, once in the app, draws them.
 *
 * As Base UI's: three at most (the older ones `data-limited`, inert), each gone after five
 * seconds unless the stack is hovered or focused or the window has lost the focus; the stack
 * expands while hovered or focused; a toast swipes away down or to the right, closes on Escape,
 * and slides in and out (`data-starting-style`, `data-ending-style`); F6 moves the focus into the
 * stack.
 */
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { exitFinished } from "../../../lib/angular/presence"
import { toast as styles } from "../../../styles/toast.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

type ToastType = "success" | "error" | "info" | "warning" | "loading"

/** What `toast.add` takes: Base UI's options. */
export type ToastOptions = {
  id?: string
  title?: string
  description?: string
  type?: ToastType
  /** Milliseconds before it closes; 0 keeps it open. */
  timeout?: number
  priority?: "low" | "high"
  /** Its action button: the label, and what a press does. */
  actionProps?: { children: string; onClick?: () => void }
  onClose?: () => void
  onRemove?: () => void
}

/** A promise's toast at each step: options, a description, or one read from the result. */
type PromiseStep<T> =
  | string
  | ToastOptions
  | ((value: T) => string | ToastOptions)

type ToastItem = ToastOptions & {
  id: string
  transitionStatus?: "starting" | "ending"
  limited?: boolean
  height?: number
  element?: HTMLElement
}

type Timer = {
  timeout?: ReturnType<typeof setTimeout>
  start: number
  delay: number
  remaining: number
  callback: () => void
}

const LIMIT = 3
const TIMEOUT = 5000

let ids = 0

/** Marks the toasts beyond the limit, newest first, as Base UI's `applyLimited`. */
function applyLimited(toasts: ToastItem[]) {
  let active = 0
  return toasts.map((item) => {
    if (item.transitionStatus === "ending") return item
    const limited = active >= LIMIT
    active += 1
    return item.limited === limited ? item : { ...item, limited }
  })
}

/** Base UI's toast store, its state as signals. */
class ToastStore {
  readonly toasts = signal<ToastItem[]>([])
  readonly hovering = signal(false)
  readonly focused = signal(false)
  readonly windowFocused = signal(true)
  readonly expanded = computed(() => this.hovering() || this.focused())
  /** Each toast's place: its index in the list, among the toasts not leaving, and its offset. */
  readonly places = computed(() => {
    const places = new Map<
      string,
      { domIndex: number; visibleIndex: number; offsetY: number }
    >()
    let visibleIndex = 0
    let offsetY = 0
    this.toasts().forEach((item, domIndex) => {
      const ending = item.transitionStatus === "ending"
      places.set(item.id, {
        domIndex,
        visibleIndex: ending ? -1 : visibleIndex,
        offsetY,
      })
      offsetY += item.height ?? 0
      if (!ending) visibleIndex += 1
    })
    return places
  })
  viewport: HTMLElement | null = null
  prevFocusElement: HTMLElement | null = null
  readonly #timers = new Map<string, Timer>()
  #paused = false

  #held() {
    return this.hovering() || this.focused() || !this.windowFocused()
  }

  #set(toasts: ToastItem[], clearInteraction = toasts.length === 0) {
    this.toasts.set(toasts)
    if (clearInteraction) {
      this.hovering.set(false)
      this.focused.set(false)
    }
  }

  get(id: string) {
    return this.toasts().find((item) => item.id === id)
  }

  add(options: ToastOptions) {
    const id = options.id ?? `toast-${++ids}`
    const existing = options.id ? this.get(options.id) : undefined
    if (existing) {
      if (existing.transitionStatus === "ending") this.remove(existing.id, true)
      else {
        this.updateInternal(existing.id, options, true)
        return existing.id
      }
    }
    this.#set(
      applyLimited([
        { ...options, id, transitionStatus: "starting" },
        ...this.toasts(),
      ])
    )
    const duration = options.timeout ?? TIMEOUT
    if (options.type !== "loading" && duration > 0)
      this.#schedule(id, duration, () => this.close(id))
    if (this.#held()) this.pauseTimers()
    return id
  }

  update(id: string, updates: ToastOptions) {
    const previous = this.get(id)
    if (!previous || previous.transitionStatus === "ending") return
    this.updateInternal(id, updates)
  }

  updateInternal(id: string, updates: Partial<ToastItem>, resetTimer = false) {
    const previous = this.get(id)
    if (!previous || previous.transitionStatus === "ending") return
    const next = { ...previous, ...updates }
    this.#set(this.toasts().map((item) => (item.id === id ? next : item)))
    const nextTimeout = next.timeout ?? TIMEOUT
    const shouldHaveTimer =
      next.transitionStatus !== "ending" &&
      next.type !== "loading" &&
      nextTimeout > 0
    const hasTimer = this.#timers.has(id)
    if (!shouldHaveTimer && hasTimer) {
      this.#clear(id)
      return
    }
    if (
      shouldHaveTimer &&
      (!hasTimer ||
        nextTimeout !== (previous.timeout ?? TIMEOUT) ||
        Object.hasOwn(updates, "timeout") ||
        previous.type === "loading" ||
        resetTimer)
    ) {
      this.#clear(id)
      this.#schedule(id, nextTimeout, () => this.close(id))
      if (this.#held()) this.pauseTimers()
    }
  }

  close(id?: string) {
    const all = id === undefined
    const toasts = this.toasts()
    let closing: ToastItem[]
    if (all) {
      closing = toasts
      for (const timer of this.#timers.values()) clearTimeout(timer.timeout)
      this.#timers.clear()
      this.#paused = false
    } else {
      const item = this.get(id)
      if (!item) return
      closing = [item]
      this.#clear(id)
    }
    const next = applyLimited(
      toasts.map((item) =>
        all || item.id === id
          ? { ...item, transitionStatus: "ending" as const, height: 0 }
          : item
      )
    )
    this.#set(next, !next.some((item) => item.transitionStatus !== "ending"))
    for (const item of closing)
      if (item.transitionStatus !== "ending") item.onClose?.()
    this.#moveFocus(id)
  }

  remove(id: string, skipOnRemove = false) {
    const item = this.get(id)
    if (!item) return
    if (!skipOnRemove) item.onRemove?.()
    this.#set(this.toasts().filter((other) => other.id !== id))
  }

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) {
    const resolve = <V>(step: PromiseStep<V>, value?: V): ToastOptions => {
      const resolved = typeof step === "function" ? step(value as V) : step
      return typeof resolved === "string" ? { description: resolved } : resolved
    }
    const id = this.add({ ...resolve(options.loading), type: "loading" })
    return promise
      .then((result) => {
        const success = resolve(options.success, result)
        this.update(id, {
          ...success,
          type: "success",
          timeout: success.timeout,
        })
        return result
      })
      .catch((error: unknown) => {
        const failure = resolve(options.error, error)
        this.update(id, { ...failure, type: "error", timeout: failure.timeout })
        return Promise.reject(error)
      })
  }

  pauseTimers() {
    if (this.#paused) return
    this.#paused = true
    for (const timer of this.#timers.values()) {
      if (timer.timeout === undefined) continue
      clearTimeout(timer.timeout)
      timer.timeout = undefined
      timer.remaining = Math.max(
        timer.remaining - (Date.now() - timer.start),
        0
      )
    }
  }

  resumeTimers() {
    if (!this.#paused) return
    this.#paused = false
    for (const [id, timer] of this.#timers) {
      timer.remaining = timer.remaining > 0 ? timer.remaining : timer.delay
      timer.timeout = setTimeout(() => this.#fire(id, timer), timer.remaining)
      timer.start = Date.now()
    }
  }

  /** Lets the stack go once nothing holds it. */
  release() {
    if (!this.#held()) this.resumeTimers()
  }

  restoreFocus() {
    this.prevFocusElement?.focus({ preventScroll: true })
  }

  #fire(id: string, timer: Timer) {
    this.#timers.delete(id)
    if (this.#timers.size === 0) this.#paused = false
    timer.callback()
  }

  #schedule(id: string, delay: number, callback: () => void) {
    const timer: Timer = {
      start: Date.now(),
      delay,
      remaining: delay,
      callback,
    }
    if (!this.#held())
      timer.timeout = setTimeout(() => this.#fire(id, timer), delay)
    this.#timers.set(id, timer)
  }

  #clear(id: string) {
    clearTimeout(this.#timers.get(id)?.timeout)
    this.#timers.delete(id)
    if (this.#timers.size === 0) this.#paused = false
  }

  /** A toast closed from the keyboard hands the focus to the next one, else back to the page. */
  #moveFocus(id: string | undefined) {
    const active = document.activeElement
    if (!this.viewport?.contains(active) || !active?.matches(":focus-visible"))
      return
    if (id === undefined) {
      this.restoreFocus()
      return
    }
    const toasts = this.toasts()
    const index = toasts.findIndex((item) => item.id === id)
    const scan = (from: number, step: number) => {
      for (let at = from; at >= 0 && at < toasts.length; at += step)
        if (toasts[at]!.transitionStatus !== "ending") return toasts[at]
      return undefined
    }
    const next = scan(index + 1, 1) ?? scan(index - 1, -1)
    if (next?.element) next.element.focus()
    else this.restoreFocus()
  }
}

const store = new ToastStore()

/** The toasts, as React's `toast` manager: `toast.add({ title, description })`. */
export const toast = {
  add: (options: ToastOptions) => store.add(options),
  close: (id?: string) => store.close(id),
  update: (id: string, options: ToastOptions) => store.update(id, options),
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) => store.promise(promise, options),
}

const SWIPE_THRESHOLD = 40
const REVERSE_CANCEL_THRESHOLD = 10
const DAMPING = 0.5
const MIN_DRAG = 1
const SWIPE_DIRECTIONS = ["down", "right"] as const
type SwipeDirection = "up" | "down" | "left" | "right"

/** How far a pointer has gone in a direction. */
function displacement(direction: SwipeDirection, x: number, y: number) {
  return direction === "up"
    ? -y
    : direction === "down"
      ? y
      : direction === "left"
        ? -x
        : x
}

/** The toast's own translation and scale, which a swipe starts from. */
function transformOf(element: HTMLElement) {
  const value = getComputedStyle(element).transform
  if (!value || value === "none") return { x: 0, y: 0, scale: 1 }
  const matrix = new DOMMatrixReadOnly(value)
  return { x: matrix.m41, y: matrix.m42, scale: matrix.a }
}

/**
 * A toast's root: Base UI's `Toast.Root`, its place in the stack (`--toast-index`,
 * `--toast-offset-y`, `--toast-height`), its swipe and its states.
 */
@Directive({
  selector: "[kuiToastRoot]",
  exportAs: "kuiToastRoot",
  host: {
    "data-slot": "toast",
    "[attr.role]": "item().priority === 'high' ? 'alertdialog' : 'dialog'",
    tabindex: "0",
    "aria-modal": "false",
    "[attr.aria-labelledby]": "item().title ? item().id + '-title' : null",
    "[attr.aria-describedby]":
      "item().description ? item().id + '-description' : null",
    "[attr.aria-hidden]":
      "item().priority === 'high' && !store.focused() ? 'true' : null",
    "[attr.inert]": "item().limited ? '' : null",
    "[attr.data-starting-style]":
      "item().transitionStatus === 'starting' ? '' : null",
    "[attr.data-ending-style]":
      "item().transitionStatus === 'ending' ? '' : null",
    "[attr.data-expanded]": "store.expanded() ? '' : null",
    "[attr.data-limited]": "item().limited ? '' : null",
    "[attr.data-type]": "item().type ?? null",
    "[attr.data-swiping]": "swiping() ? '' : null",
    "[attr.data-swipe-direction]": "direction() ?? null",
    "[style.--toast-swipe-movement-x]": "drag().x - initial().x + 'px'",
    "[style.--toast-swipe-movement-y]": "drag().y - initial().y + 'px'",
    "[style.--toast-index]":
      "item().transitionStatus === 'ending' ? place().domIndex : place().visibleIndex",
    "[style.--toast-offset-y]": "place().offsetY + 'px'",
    "[style.--toast-height]": "item().height ? item().height + 'px' : null",
    "[style.transition]": "swiping() ? 'none' : null",
    "[style.transform]":
      "swiping() ? 'translateX(' + drag().x + 'px) translateY(' + drag().y + 'px) scale(' + initial().scale + ')' : null",
    "(pointerdown)": "pointerDown($event)",
    "(pointermove)": "pointerMove($event)",
    "(pointerup)": "swipeEnd($event)",
    "(pointercancel)": "swipeEnd($event)",
    "(keydown)": "keyDown($event)",
  },
})
class ToastRoot {
  readonly item = input.required<ToastItem>({ alias: "kuiToastRoot" })
  protected readonly store = store
  protected readonly place = computed(
    () =>
      store.places().get(this.item().id) ?? {
        domIndex: -1,
        visibleIndex: -1,
        offsetY: 0,
      }
  )
  protected readonly swiping = signal(false)
  protected readonly direction = signal<SwipeDirection | undefined>(undefined)
  protected readonly drag = signal({ x: 0, y: 0 })
  protected readonly initial = signal({ x: 0, y: 0, scale: 1 })
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  #pointer: number | null = null
  #start = { x: 0, y: 0 }
  #baseline = { x: 0, y: 0 }
  #intended: SwipeDirection | undefined
  #maxDisplacement = 0
  #cancelled = false
  #firstMove = false
  #realSwipe = false
  #locked: "horizontal" | "vertical" | null = null
  #abort: AbortController | null = null

  constructor() {
    // Measured once drawn, which also gives the browser its first frame (`data-starting-style`),
    // then the toast slides to its place.
    afterNextRender(() => this.recalculateHeight())
    // Leaving: removed once its motion has finished.
    effect(() => {
      if (this.item().transitionStatus !== "ending") return
      const id = this.item().id
      requestAnimationFrame(
        () => void exitFinished(this.#element).then(() => store.remove(id))
      )
    })
    inject(DestroyRef).onDestroy(() => this.#abort?.abort())
  }

  /** Its height with nothing holding it, which the stack places the toasts by. */
  recalculateHeight() {
    const element = this.#element
    const previous = element.style.height
    element.style.height = "auto"
    const height = element.offsetHeight
    element.style.height = previous
    untracked(() =>
      store.updateInternal(this.item().id, {
        element,
        height,
        transitionStatus: undefined,
      })
    )
  }

  protected pointerDown(event: PointerEvent) {
    if (event.button !== 0) return
    if (event.pointerType === "touch") store.pauseTimers()
    const target = event.target as Element | null
    if (target?.closest('button,a,input,textarea,[role="button"]')) return
    this.#cancelled = false
    this.#intended = undefined
    this.#maxDisplacement = 0
    this.#pointer = event.pointerId
    this.#start = { x: event.clientX, y: event.clientY }
    this.#baseline = this.#start
    const transform = transformOf(this.#element)
    this.initial.set(transform)
    this.drag.set({ x: transform.x, y: transform.y })
    store.hovering.set(true)
    this.swiping.set(true)
    this.#realSwipe = false
    this.#locked = null
    this.#firstMove = true
    this.#abort?.abort()
    this.#abort = new AbortController()
    const end = (ended: PointerEvent) => this.swipeEnd(ended)
    document.addEventListener("pointerup", end, { signal: this.#abort.signal })
    document.addEventListener("pointercancel", end, {
      signal: this.#abort.signal,
    })
    this.#element.setPointerCapture?.(event.pointerId)
  }

  protected pointerMove(event: PointerEvent) {
    if (event.pointerId !== this.#pointer) return
    event.preventDefault()
    if (this.#firstMove) {
      this.#start = { x: event.clientX, y: event.clientY }
      this.#firstMove = false
    }
    const { clientX, clientY, movementX, movementY } = event
    if (
      (movementY < 0 && clientY > this.#baseline.y) ||
      (movementY > 0 && clientY < this.#baseline.y)
    )
      this.#baseline = { x: this.#baseline.x, y: clientY }
    if (
      (movementX < 0 && clientX > this.#baseline.x) ||
      (movementX > 0 && clientX < this.#baseline.x)
    )
      this.#baseline = { x: clientX, y: this.#baseline.y }
    const deltaX = clientX - this.#start.x
    const deltaY = clientY - this.#start.y
    if (!this.#realSwipe && Math.hypot(deltaX, deltaY) >= MIN_DRAG) {
      this.#realSwipe = true
      this.#locked =
        Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical"
    }
    if (!this.#intended) {
      const candidate: SwipeDirection | undefined =
        this.#locked === "vertical"
          ? deltaY > 0
            ? "down"
            : deltaY < 0
              ? "up"
              : undefined
          : this.#locked === "horizontal"
            ? deltaX > 0
              ? "right"
              : deltaX < 0
                ? "left"
                : undefined
            : Math.abs(deltaX) >= Math.abs(deltaY)
              ? deltaX > 0
                ? "right"
                : "left"
              : deltaY > 0
                ? "down"
                : "up"
      if (
        candidate &&
        (SWIPE_DIRECTIONS as readonly string[]).includes(candidate)
      ) {
        this.#intended = candidate
        this.#maxDisplacement = displacement(candidate, deltaX, deltaY)
        this.direction.set(candidate)
      }
    } else {
      const current = displacement(
        this.#intended,
        clientX - this.#baseline.x,
        clientY - this.#baseline.y
      )
      if (current > SWIPE_THRESHOLD) {
        this.#cancelled = false
        this.direction.set(this.#intended)
      } else if (this.#maxDisplacement - current >= REVERSE_CANCEL_THRESHOLD)
        this.#cancelled = true
    }
    // Against a direction it does not swipe, the toast gives way less and less.
    const damp = (delta: number) =>
      delta > 0 ? delta ** DAMPING : -(Math.abs(delta) ** DAMPING)
    const x = deltaX < 0 ? damp(deltaX) : deltaX
    const y = deltaY < 0 ? damp(deltaY) : deltaY
    const initial = this.initial()
    this.drag.set({
      x: initial.x + (this.#locked !== "vertical" ? x : 0),
      y: initial.y + (this.#locked !== "horizontal" ? y : 0),
    })
  }

  protected swipeEnd(event: PointerEvent) {
    if (event.pointerId !== this.#pointer) return
    this.#pointer = null
    this.#abort?.abort()
    this.#abort = null
    this.swiping.set(false)
    this.#realSwipe = false
    this.#locked = null
    const initial = this.initial()
    if (event.type === "pointercancel" || this.#cancelled) {
      this.drag.set({ x: initial.x, y: initial.y })
      this.direction.set(undefined)
      return
    }
    const deltaX = this.drag().x - initial.x
    const deltaY = this.drag().y - initial.y
    const dismiss = SWIPE_DIRECTIONS.find(
      (direction) => displacement(direction, deltaX, deltaY) > SWIPE_THRESHOLD
    )
    if (dismiss) {
      this.direction.set(dismiss)
      store.close(this.item().id)
    } else {
      this.drag.set({ x: initial.x, y: initial.y })
      this.direction.set(undefined)
    }
  }

  protected keyDown(event: KeyboardEvent) {
    if (
      event.key === "Escape" &&
      this.#element.contains(document.activeElement)
    )
      store.close(this.item().id)
  }
}

/** A toast's content, re-measured as it changes: Base UI's `Toast.Content`. */
@Directive({
  selector: "[kuiToastContent]",
  host: {
    "data-slot": "toast-content",
    "[attr.data-behind]": "behind() ? '' : null",
    "[attr.data-expanded]": "store.expanded() ? '' : null",
  },
})
class ToastContent {
  readonly root = input.required<ToastRoot>({ alias: "kuiToastContent" })
  readonly place = input.required<number>()
  protected readonly store = store
  protected readonly behind = computed(() => this.place() > 0)

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const resize = new ResizeObserver(() => this.root().recalculateHeight())
    const mutation = new MutationObserver(() => this.root().recalculateHeight())
    afterNextRender(() => {
      resize.observe(element)
      mutation.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    })
    inject(DestroyRef).onDestroy(() => {
      resize.disconnect()
      mutation.disconnect()
    })
  }
}

/**
 * The toasts: `<kui-toast-toaster />`, once in the app. Base UI's portal and viewport, each toast
 * its root and content, its icon by type, title, description, action and close.
 */
@Component({
  selector: "kui-toast-toaster",
  imports: [Button, IconPlaceholder, SxDirective, ToastContent, ToastRoot],
  host: { style: "display: contents" },
  template: `
    <div data-slot="toast-portal">
      <div
        data-slot="toast-viewport"
        tabindex="-1"
        role="region"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions text"
        aria-label="Notifications"
        [attr.data-expanded]="store.expanded() ? '' : null"
        [style.--toast-frontmost-height]="frontmost()"
        [sx]="styles.viewport"
        (mouseenter)="enter()"
        (mousemove)="enter()"
        (mouseleave)="leave()"
        (focusin)="focus()"
        (focusout)="blur($event)"
        (click)="focus()"
        (keydown)="keyDown($event)"
        (pointerdown)="pointerDown($event)"
        (pointerup)="pointerEnd($event)"
        (pointercancel)="pointerEnd($event)"
      >
        @for (item of store.toasts(); track item.id) {
          <div [kuiToastRoot]="item" #root="kuiToastRoot" [sx]="styles.root">
            <div
              [kuiToastContent]="root"
              [place]="store.places().get(item.id)?.visibleIndex ?? -1"
              [sx]="styles.content"
            >
              @if (icons.includes(item.type ?? "")) {
                <span data-slot="toast-icon" [sx]="styles.icon">
                  @switch (item.type) {
                    @case ("success") {
                      <svg
                        iconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheck"
                        hugeicons="CheckmarkCircle02Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleLine"
                        [sx]="styles.iconSuccess"
                        aria-hidden="true"
                      ></svg>
                    }
                    @case ("info") {
                      <svg
                        iconPlaceholder
                        lucide="InfoIcon"
                        tabler="IconInfoCircle"
                        hugeicons="InformationCircleIcon"
                        phosphor="InfoIcon"
                        remixicon="RiInformationLine"
                        [sx]="styles.iconInfo"
                        aria-hidden="true"
                      ></svg>
                    }
                    @case ("warning") {
                      <svg
                        iconPlaceholder
                        lucide="TriangleAlertIcon"
                        tabler="IconAlertTriangle"
                        hugeicons="Alert02Icon"
                        phosphor="WarningIcon"
                        remixicon="RiErrorWarningLine"
                        [sx]="styles.iconWarning"
                        aria-hidden="true"
                      ></svg>
                    }
                    @case ("error") {
                      <svg
                        iconPlaceholder
                        lucide="OctagonXIcon"
                        tabler="IconAlertOctagon"
                        hugeicons="MultiplicationSignCircleIcon"
                        phosphor="XCircleIcon"
                        remixicon="RiCloseCircleLine"
                        [sx]="styles.iconError"
                        aria-hidden="true"
                      ></svg>
                    }
                    @case ("loading") {
                      <svg
                        iconPlaceholder
                        lucide="Loader2Icon"
                        tabler="IconLoader"
                        hugeicons="Loading03Icon"
                        phosphor="SpinnerIcon"
                        remixicon="RiLoaderLine"
                        [sx]="styles.iconLoading"
                        aria-hidden="true"
                      ></svg>
                    }
                  }
                </span>
              }
              <div [sx]="styles.body">
                @if (item.title) {
                  <h2
                    data-slot="toast-title"
                    [id]="item.id + '-title'"
                    [sx]="styles.title"
                  >
                    {{ item.title }}
                  </h2>
                }
                @if (item.description) {
                  <p
                    data-slot="toast-description"
                    [id]="item.id + '-description'"
                    [sx]="styles.description"
                  >
                    {{ item.description }}
                  </p>
                }
              </div>
              @if (item.actionProps; as action) {
                <button
                  kuiButton
                  variant="outline"
                  size="sm"
                  tabindex="0"
                  [attr.data-slot]="'toast-action'"
                  [sx]="styles.action"
                  (click)="action.onClick?.()"
                >
                  {{ action.children }}
                </button>
              }
              <button
                kuiButton
                variant="ghost"
                size="icon-sm"
                tabindex="0"
                [attr.data-slot]="'toast-close'"
                aria-label="Close toast"
                [attr.aria-hidden]="
                  !store.expanded() && focusedClose() !== item.id
                "
                [sx]="styles.close"
                (click)="store.close(item.id)"
                (focus)="focusedClose.set(item.id)"
                (blur)="focusedClose.set(null)"
              >
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                  aria-hidden="true"
                ></svg>
              </button>
            </div>
          </div>
        }
      </div>
      <!-- A high-priority toast is announced at once, as Base UI's. -->
      @if (!store.focused() && urgent().length) {
        <div [sx]="visuallyHidden">
          @for (item of urgent(); track item.id) {
            <div role="alert" aria-atomic="true">
              <div>{{ item.title }}</div>
              <div>{{ item.description }}</div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
class Toaster {
  protected readonly store = store
  protected readonly styles = styles
  protected readonly visuallyHidden = visuallyHidden
  /** The types that draw an icon, as React's `ToastIcon`. */
  protected readonly icons: readonly string[] = [
    "success",
    "info",
    "warning",
    "error",
    "loading",
  ]
  protected readonly focusedClose = signal<string | null>(null)
  protected readonly frontmost = computed(() => {
    const height = store.toasts()[0]?.height
    return height ? `${height}px` : null
  })
  protected readonly urgent = computed(() =>
    store.toasts().filter((item) => item.priority === "high")
  )
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  #readyToLeave = false
  #touch = false

  constructor() {
    afterNextRender(() => {
      store.viewport = this.#element.querySelector(
        '[data-slot="toast-viewport"]'
      )
    })
    // F6 moves the focus into the stack; the window's focus holds and lets go of it.
    const keydown = (event: KeyboardEvent) => {
      if (
        event.key !== "F6" ||
        !store.toasts().length ||
        event.target === store.viewport
      )
        return
      event.preventDefault()
      store.prevFocusElement = document.activeElement as HTMLElement | null
      store.viewport?.focus({ preventScroll: true })
      store.pauseTimers()
      store.focused.set(true)
    }
    const blur = (event: FocusEvent) => {
      if (event.target !== window) return
      store.windowFocused.set(false)
      store.pauseTimers()
    }
    const focus = (event: FocusEvent) => {
      if (event.relatedTarget) return
      const active = document.activeElement
      if (
        event.target === window ||
        !store.viewport?.contains(event.target as Node) ||
        !active?.matches(":focus-visible")
      )
        store.resumeTimers()
      setTimeout(() => store.windowFocused.set(true))
    }
    const touchOutside = (event: PointerEvent) => {
      if (
        event.pointerType !== "touch" ||
        store.viewport?.contains(event.target as Node)
      )
        return
      store.resumeTimers()
      store.hovering.set(false)
      store.focused.set(false)
    }
    window.addEventListener("keydown", keydown)
    window.addEventListener("blur", blur, true)
    window.addEventListener("focus", focus, true)
    document.addEventListener("pointerdown", touchOutside, true)
    // A pointer that left while a toast was leaving lets go once it has gone.
    effect(() => {
      store.toasts()
      untracked(() => this.#flushLeave())
    })
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("keydown", keydown)
      window.removeEventListener("blur", blur, true)
      window.removeEventListener("focus", focus, true)
      document.removeEventListener("pointerdown", touchOutside, true)
    })
  }

  #flushLeave() {
    if (
      store.toasts().some((item) => item.transitionStatus === "ending") ||
      this.#touch ||
      !this.#readyToLeave
    )
      return
    store.hovering.set(false)
    store.release()
    this.#readyToLeave = false
  }

  protected enter() {
    store.pauseTimers()
    store.hovering.set(true)
    this.#readyToLeave = false
  }

  protected leave() {
    this.#readyToLeave = true
    this.#flushLeave()
  }

  protected pointerDown(event: PointerEvent) {
    if (event.pointerType === "touch") this.#touch = true
  }

  protected pointerEnd(event: PointerEvent) {
    if (event.pointerType !== "touch") return
    this.#touch = false
    this.#flushLeave()
  }

  protected focus() {
    if (store.focused()) return
    if (document.activeElement?.matches(":focus-visible")) {
      store.focused.set(true)
      store.pauseTimers()
    }
  }

  protected blur(event: FocusEvent) {
    if (
      !store.focused() ||
      store.viewport?.contains(event.relatedTarget as Node | null)
    )
      return
    store.focused.set(false)
    store.release()
  }

  protected keyDown(event: KeyboardEvent) {
    if (
      event.key === "Tab" &&
      event.shiftKey &&
      event.target === store.viewport
    ) {
      event.preventDefault()
      store.restoreFocus()
    }
  }
}

export { Toaster }
