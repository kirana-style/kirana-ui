/**
 * The toast manager: a ui-sdk toaster behind Base UI's API, so a page calls `toast.add`,
 * `toast.close`, `toast.update` and `toast.promise` as React's does. The toaster's region places
 * them at the bottom's end, three at most, as Base UI's are; ui-sdk closes each after five seconds.
 */
import { createToaster } from "@ui-sdk/vue/toast"

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

export const toaster = createToaster<string>()

type Options = Exclude<Parameters<typeof toaster>[0], string>

/** Base UI's options as ui-sdk's: its timeout, priority, action and close by ui-sdk's names. */
function optionsOf(options: ToastOptions): Options {
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
    // Base UI's action leaves the toast open: its handler closes it when it should.
    action: actionProps && {
      label: actionProps.children,
      dismiss: false,
      onAction: () => actionProps.onClick?.(),
    },
    onDismiss: onClose && (() => onClose()),
  }
}

/** A promise's step as ui-sdk's message: a description, or options by ui-sdk's names. */
function stepOf<T>(step: PromiseStep<T>) {
  const one = (value: string | ToastOptions) =>
    typeof value === "string" ? value : optionsOf(value)
  return typeof step === "function" ? (value: T) => one(step(value)) : one(step)
}

export const toast = {
  add: (options: ToastOptions) => toaster(optionsOf(options)),
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
    toaster.promise(promise, {
      loading: stepOf(options.loading) as string | Options,
      success: stepOf(options.success),
      error: stepOf(options.error),
    })
    return promise
  },
}
