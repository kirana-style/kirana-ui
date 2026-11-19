/**
 * The toast manager: Kirana UI's toaster behind Base UI's API, so a page calls `toast.add`,
 * `toast.close`, `toast.update` and `toast.promise` as React's does. Three at most, as Base UI's
 * provider holds them; the viewport writes Base UI's stack variables on each toast.
 */
import { Toast as ToastPrimitive, createToaster } from "@kirana-ui/solid/toast"
import type { ToastOptions as KiranaOptions } from "@kirana-ui/solid/toast"
import { Match, Show, Switch, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

import { toast as styles } from "../../../styles/toast.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

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

/** A promise's toast at each step: options, a title, or one read from the result. */
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
function optionsOf(options: ToastOptions): KiranaOptions & { id?: string } {
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

/** A promise's step as Kirana UI's: a string is its title, as Base UI's manager takes it. */
function stepOf<T>(step: PromiseStep<T>) {
  const one = (value: string | ToastOptions) =>
    typeof value === "string" ? value : optionsOf(value)
  return typeof step === "function" ? (value: T) => one(step(value)) : one(step)
}

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

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

/** Kirana UI's viewport, always in the page; each toast its root, Base UI's content inside it. */
function Toaster(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      toaster={toaster}
      {...rest}
      {...styleProps(local.class, styles.viewport, local.sx)}
    >
      <ToastPrimitive.List>
        {(item) => {
          const type = () => item().type
          return (
            <ToastPrimitive.Root
              toast={item()}
              data-slot="toast"
              {...styleProps(styles.root)}
            >
              <ToastPrimitive.Content
                data-slot="toast-content"
                {...styleProps(styles.content)}
              >
                <Show when={type() && TYPES.includes(type()!)}>
                  <span data-slot="toast-icon" sx={styles.icon}>
                    <Switch>
                      <Match when={type() === "success"}>
                        <IconPlaceholder
                          lucide="CircleCheckIcon"
                          tabler="IconCircleCheck"
                          hugeicons="CheckmarkCircle02Icon"
                          phosphor="CheckCircleIcon"
                          remixicon="RiCheckboxCircleLine"
                          aria-hidden="true"
                          {...styleProps(styles.iconSuccess)}
                        />
                      </Match>
                      <Match when={type() === "info"}>
                        <IconPlaceholder
                          lucide="InfoIcon"
                          tabler="IconInfoCircle"
                          hugeicons="InformationCircleIcon"
                          phosphor="InfoIcon"
                          remixicon="RiInformationLine"
                          aria-hidden="true"
                          {...styleProps(styles.iconInfo)}
                        />
                      </Match>
                      <Match when={type() === "warning"}>
                        <IconPlaceholder
                          lucide="TriangleAlertIcon"
                          tabler="IconAlertTriangle"
                          hugeicons="Alert02Icon"
                          phosphor="WarningIcon"
                          remixicon="RiErrorWarningLine"
                          aria-hidden="true"
                          {...styleProps(styles.iconWarning)}
                        />
                      </Match>
                      <Match when={type() === "error"}>
                        <IconPlaceholder
                          lucide="OctagonXIcon"
                          tabler="IconAlertOctagon"
                          hugeicons="MultiplicationSignCircleIcon"
                          phosphor="XCircleIcon"
                          remixicon="RiCloseCircleLine"
                          aria-hidden="true"
                          {...styleProps(styles.iconError)}
                        />
                      </Match>
                      <Match when={type() === "loading"}>
                        <IconPlaceholder
                          lucide="Loader2Icon"
                          tabler="IconLoader"
                          hugeicons="Loading03Icon"
                          phosphor="SpinnerIcon"
                          remixicon="RiLoaderLine"
                          aria-hidden="true"
                          {...styleProps(styles.iconLoading)}
                        />
                      </Match>
                    </Switch>
                  </span>
                </Show>
                <div sx={styles.body}>
                  <Show when={item().title !== undefined}>
                    <ToastPrimitive.Title
                      data-slot="toast-title"
                      {...styleProps(styles.title)}
                    />
                  </Show>
                  <Show when={item().description !== undefined}>
                    <ToastPrimitive.Description
                      data-slot="toast-description"
                      {...styleProps(styles.description)}
                    />
                  </Show>
                </div>
                <Show when={item().action}>
                  <ToastPrimitive.Action
                    data-slot="toast-action"
                    render={(childProps) => (
                      <Button
                        {...childProps()}
                        variant="outline"
                        size="sm"
                        sx={styles.action}
                      />
                    )}
                  />
                </Show>
                <ToastPrimitive.Close
                  data-slot="toast-close"
                  aria-label="Close toast"
                  render={(childProps) => (
                    <Button
                      {...childProps()}
                      variant="ghost"
                      size="icon-sm"
                      sx={styles.close}
                    >
                      <IconPlaceholder
                        lucide="XIcon"
                        tabler="IconX"
                        hugeicons="Cancel01Icon"
                        phosphor="XIcon"
                        remixicon="RiCloseLine"
                        aria-hidden="true"
                      />
                    </Button>
                  )}
                />
              </ToastPrimitive.Content>
            </ToastPrimitive.Root>
          )
        }}
      </ToastPrimitive.List>
    </ToastPrimitive.Viewport>
  )
}

export { Toaster }
