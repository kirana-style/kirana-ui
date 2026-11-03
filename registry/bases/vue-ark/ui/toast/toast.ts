/**
 * The toast manager: Ark UI's toaster (Zag's store) behind Base UI's API, so a page calls
 * `toast.add`, `toast.close`, `toast.update` and `toast.promise` as React's does. Placed at the
 * bottom end, three at most, the stack collapsed until hovered and each gone after five seconds, as
 * Base UI's are.
 */
import { createToaster } from "@ark-ui/vue"

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

export const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  max: 3,
  duration: 5000,
  gap: 12,
  // Kept while it slides out, Base UI's 500ms, where Zag removes it after 200ms.
  removeDelay: 500,
})

// Zag makes an untyped toast `info`, where Base UI's has no type and draws no icon: the type
// Base UI would have goes in `meta`, which the toaster's icon reads.
function zag(
  options: ToastOptions,
  type: ToastType | undefined = options.type
) {
  const {
    timeout,
    actionProps,
    onClose,
    priority: _priority,
    ...rest
  } = options
  return {
    ...rest,
    meta: { type },
    ...(timeout === undefined
      ? {}
      : { duration: timeout === 0 ? Infinity : timeout }),
    ...(actionProps
      ? {
          action: {
            label: actionProps.children,
            onClick: actionProps.onClick ?? (() => {}),
          },
        }
      : {}),
    ...(onClose
      ? {
          onStatusChange: (details: { status: string }) =>
            details.status === "unmounted" && onClose(),
        }
      : {}),
  }
}

/** A promise's step as Zag's options: the step's type is the promise's state, so it is not given. */
function step<T>(
  state: "loading" | "success" | "error",
  value: PromiseStep<T>,
  result?: T
) {
  const resolved = typeof value === "function" ? value(result as T) : value
  const { type: _type, ...options } = zag(
    typeof resolved === "string" ? { description: resolved } : resolved,
    state
  )
  return options
}

export const toast = {
  add: (options: ToastOptions) => toaster.create(zag(options)),
  close: (id?: string) => toaster.dismiss(id),
  update: (id: string, options: ToastOptions) =>
    toaster.update(id, zag(options)),
  promise<T>(
    promise: Promise<T>,
    options: {
      loading: PromiseStep<T>
      success: PromiseStep<T>
      error: PromiseStep<unknown>
    }
  ) {
    toaster.promise(promise, {
      loading: step("loading", options.loading),
      success: (value: T) => step("success", options.success, value),
      error: (reason: unknown) => step("error", options.error, reason),
    })
    return promise
  },
}
