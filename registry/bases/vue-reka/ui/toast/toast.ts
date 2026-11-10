/**
 * The toast manager: Reka UI's (`createToastManager`, Base UI's model) behind Base UI's API, so a
 * page calls `toast.add`, `toast.close`, `toast.update` and `toast.promise` as React's does. The
 * Toaster places them at the bottom end, three at most, each gone after five seconds, as Base UI's.
 */
import { createToastManager } from "reka-ui"
import type { ToastAddOptions } from "reka-ui"

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
}

/** A promise's toast at each step: options, a description, or one read from the result. */
type PromiseStep<T> =
  | string
  | ToastOptions
  | ((value: T) => string | ToastOptions)

export const toaster = createToastManager()

// Base UI's options as Reka's: the type is Reka's `status` (which the toaster's icon reads), a
// high priority its `foreground` type, the action's label its alternative text too.
function reka(options: ToastOptions): ToastAddOptions {
  const { timeout, actionProps, priority, type, ...rest } = options
  return {
    ...rest,
    ...(type ? { status: type } : {}),
    ...(priority
      ? { type: priority === "high" ? "foreground" : "background" }
      : {}),
    ...(timeout === undefined
      ? {}
      : { duration: timeout === 0 ? Infinity : timeout }),
    ...(actionProps
      ? {
          actionProps: {
            label: actionProps.children,
            altText: actionProps.children,
            onClick: actionProps.onClick,
          },
        }
      : {}),
  }
}

/** A promise's step as Reka's options: the step's status is the promise's state, so it is not given. */
function step<T>(value: PromiseStep<T>, result?: T) {
  const resolved = typeof value === "function" ? value(result as T) : value
  const { status: _status, ...options } = reka(
    typeof resolved === "string" ? { description: resolved } : resolved
  )
  return options
}

export const toast = {
  add: (options: ToastOptions) => toaster.add(reka(options)),
  close: (id?: string) => toaster.close(id),
  update: (id: string, options: ToastOptions) =>
    toaster.update(id, reka(options)),
  promise<T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) {
    return toaster.promise(promise, {
      loading: step(options.loading),
      success: (value: T) => step(options.success, value),
      error: (reason: unknown) => step(options.error, reason),
    })
  },
}
