/**
 * Toast on Kirana UI's toaster (`createToaster`), behind Base UI's API: a page calls `toast.add`,
 * `toast.close`, `toast.update` and `toast.promise`, as React's and Vue's do; `<kui-toast-toaster />`,
 * once in the app, draws them in Kirana UI's viewport, which is always in the page and writes Base
 * UI's stack variables on each toast (`--toast-index`, `--toast-offset-y`, `data-limited` …), swipes
 * them away, holds them while hovered or focused and takes the focus on F6. Three at most, as Base
 * UI's provider holds them.
 */
import { Component } from "@angular/core"
import {
  KpToastAction,
  KpToastClose,
  KpToastContent,
  KpToastDescription,
  KpToastList,
  KpToastRoot,
  KpToastTitle,
  KpToastViewport,
  createToaster,
} from "@kirana-ui/angular"
import type {
  ToastContent,
  ToastOptions as KiranaOptions,
  ToastState,
} from "@kirana-ui/angular"
import { SxDirective } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { toast as styles } from "../../../styles/toast.styles"
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

/** The page's toasts, as Base UI's provider holds three at once. */
export const toaster = createToaster({ limit: 3 })

/**
 * Base UI's `onRemove`, heard once a toast has left the page: Kirana UI's toaster has no such
 * callback, so the toasts it holds are watched for one that is gone.
 */
const removals = new Map<string, () => void>()
let present = new Set<string>()
toaster.toasts.subscribe(() => {
  const now = new Set(toaster.toasts.peek().map((item) => item.id))
  for (const [id, onRemove] of removals)
    if (present.has(id) && !now.has(id)) {
      removals.delete(id)
      onRemove()
    }
  present = now
})

/**
 * Base UI's options as Kirana UI's: its `timeout` is theirs (`0` for one that stays), its
 * `actionProps` their `action`, its `priority` their politeness. Base UI's action leaves the toast
 * open: pressing it keeps the toast unless its handler closes it.
 */
function optionsOf(options: ToastOptions): KiranaOptions<ToastContent> {
  const {
    id: _id,
    priority,
    actionProps,
    onClose,
    onRemove: _onRemove,
    ...rest
  } = options
  return {
    ...rest,
    priority:
      priority === undefined
        ? undefined
        : priority === "high"
          ? "assertive"
          : "polite",
    action: actionProps && {
      label: actionProps.children,
      onAction: (details) => {
        details.cancel()
        actionProps.onClick?.()
      },
    },
    onClose: onClose && (() => onClose()),
  }
}

/** Keeps a toast's `onRemove` until it has left. */
function track(id: string, options: ToastOptions) {
  if (options.onRemove) removals.set(id, options.onRemove)
  return id
}

/**
 * A promise's step as Kirana UI's: a string is its description, as Base UI's manager takes it, and
 * the step's type is the state's (`loading`, `success`, `error`), as Base UI's.
 */
function stepOf<T>(step: PromiseStep<T>, type: ToastType) {
  const one = (value: string | ToastOptions): ToastState<ToastContent> =>
    optionsOf({
      ...(typeof value === "string" ? { description: value } : value),
      type,
    })
  return typeof step === "function" ? (value: T) => one(step(value)) : one(step)
}

/** The toasts, as React's `toast` manager: `toast.add({ title, description })`. */
export const toast = {
  add: (options: ToastOptions) =>
    track(toaster.add({ ...optionsOf(options), id: options.id }), options),
  close: (id?: string) => toaster.dismiss(id),
  update: (id: string, options: ToastOptions) => {
    track(id, options)
    toaster.update(id, optionsOf(options))
  },
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) => {
    // Shown at once: a step read from a result is read from none.
    const loading = stepOf(options.loading, "loading")
    // The toaster hands the promise back, as Base UI's manager does.
    return toaster.promise(promise, {
      loading:
        typeof loading === "function" ? loading(undefined as T) : loading,
      success: stepOf(options.success, "success"),
      error: stepOf(options.error, "error"),
    })
  },
}

/**
 * The toasts: `<kui-toast-toaster />`, once in the app. Kirana UI's viewport, each toast its root
 * and content, its icon by type, title, description, action and close.
 */
@Component({
  selector: "kui-toast-toaster",
  imports: [
    Button,
    IconPlaceholder,
    KpToastAction,
    KpToastClose,
    KpToastContent,
    KpToastDescription,
    KpToastList,
    KpToastRoot,
    KpToastTitle,
    KpToastViewport,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kpToastViewport
      data-slot="toast-viewport"
      [toaster]="toaster"
      [sx]="styles.viewport"
    >
      <div
        *kpToastList="let item"
        kpToastRoot
        data-slot="toast"
        [toast]="item"
        [sx]="styles.root"
      >
        <div kpToastContent data-slot="toast-content" [sx]="styles.content">
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
            @if (item.title !== undefined) {
              <h2 kpToastTitle data-slot="toast-title" [sx]="styles.title"></h2>
            }
            @if (item.description !== undefined) {
              <p
                kpToastDescription
                data-slot="toast-description"
                [sx]="styles.description"
              ></p>
            }
          </div>
          @if (item.action; as action) {
            <button
              kuiButton
              kpToastAction
              variant="outline"
              size="sm"
              [attr.data-slot]="'toast-action'"
              [sx]="styles.action"
            >
              {{ action.label }}
            </button>
          }
          <button
            kuiButton
            kpToastClose
            variant="ghost"
            size="icon-sm"
            [attr.data-slot]="'toast-close'"
            aria-label="Close toast"
            [sx]="styles.close"
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
    </div>
  `,
})
class Toaster {
  protected readonly toaster = toaster
  protected readonly styles = styles
  /** The types that draw an icon, as React's `ToastIcon`. */
  protected readonly icons: readonly string[] = [
    "success",
    "info",
    "warning",
    "error",
    "loading",
  ]
}

export { Toaster }
