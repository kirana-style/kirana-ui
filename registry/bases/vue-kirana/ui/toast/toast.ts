import { createToaster } from "@kirana-ui/vue/toast"
import type { ToastOptions as KiranaOptions } from "@kirana-ui/vue/toast"

type ToastType = "success" | "error" | "info" | "warning" | "loading"

/** Base UI's toast options, as every Vue base's `toast.add` takes them. */
export type ToastOptions = {
  id?: string
  title?: string
  description?: string
  type?: ToastType
  timeout?: number
  priority?: "low" | "high"
  actionProps?: { children: string; onClick?: () => void }
  onClose?: () => void
}

type PromiseStep<T> =
  | string
  | ToastOptions
  | ((value: T) => string | ToastOptions)

/** The page's toasts, as Base UI's provider holds three at once. */
export const toaster = createToaster({ limit: 3 })

/**
 * Base UI's options as Kirana UI's: its `timeout` is their `duration` (`0` for one that stays), its
 * `actionProps` their `action`, its `priority` their politeness. Base UI's action leaves the toast
 * open: pressing it keeps the toast unless its handler closes it.
 */
function optionsOf(options: ToastOptions): KiranaOptions & {
  id?: string
} {
  const { timeout, priority, actionProps, onClose, ...rest } = options
  return {
    ...rest,
    duration: timeout === 0 ? Infinity : timeout,
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

function stepOf<T>(step: PromiseStep<T>) {
  // A step given as text is its description, as Base UI's (Kirana UI's toaster takes text as a title).
  const one = (value: string | ToastOptions) =>
    optionsOf(typeof value === "string" ? { description: value } : value)
  return typeof step === "function" ? (value: T) => one(step(value)) : one(step)
}

/** Base UI's toast manager (`add`, `close`, `update`, `promise`) over Kirana UI's toaster. */
export const toast = {
  add: (options: ToastOptions) => toaster.add(optionsOf(options)),
  close: (id?: string) => toaster.dismiss(id),
  update: (id: string, options: ToastOptions) =>
    toaster.update(id, optionsOf(options)),
  promise<T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) {
    // The toaster hands the promise back, as Base UI's manager does.
    return toaster.promise(promise, {
      loading: stepOf(options.loading),
      success: stepOf(options.success),
      error: stepOf(options.error),
    } as Parameters<typeof toaster.promise>[1])
  },
}
