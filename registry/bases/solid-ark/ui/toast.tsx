/**
 * The toast manager: Ark UI's toaster (Zag's store) behind Base UI's API, so a page calls
 * `toast.add`, `toast.close`, `toast.update` and `toast.promise` as React's does. Placed at the
 * bottom end, three at most, the stack collapsed until hovered and each gone after five seconds, as
 * Base UI's are.
 */
import {
  Toaster as ArkToaster,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  createToaster,
} from "@ark-ui/solid"
import { Match, Show, Switch, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

import { zIndex } from "../../../core/scales"
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

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

// Zag writes the group's flex column and the highest `z-index` inline; Base UI's viewport is a
// block at the overlays' layer. Given here, after Zag's, they win (each toast is placed alone).
const groupStyle: JSX.CSSProperties = {
  display: "block",
  "flex-direction": "initial",
  "align-items": "initial",
  "z-index": String(zIndex.overlay),
}

/** Ark's toaster is the viewport; each toast its root, Base UI's content inside it. */
function Toaster(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const own = () => styleProps(local.class, styles.viewport, local.sx)
  return (
    <ArkToaster
      toaster={toaster}
      data-slot="toast-viewport"
      {...rest}
      class={own().class}
      style={{ ...own().style, ...groupStyle }}
    >
      {(item) => {
        const type = () => (item().meta as { type?: string } | undefined)?.type
        return (
          <ToastRoot
            data-slot="toast"
            {...styleProps(styles.root, styles.rootArk)}
          >
            <div data-slot="toast-content" sx={styles.content}>
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
                <Show when={item().title}>
                  <ToastTitle
                    data-slot="toast-title"
                    {...styleProps(styles.title)}
                  >
                    {item().title}
                  </ToastTitle>
                </Show>
                <Show when={item().description}>
                  <ToastDescription
                    data-slot="toast-description"
                    {...styleProps(styles.description)}
                  >
                    {item().description}
                  </ToastDescription>
                </Show>
              </div>
              <Show when={item().action}>
                {(action) => (
                  <ToastActionTrigger
                    data-slot="toast-action"
                    asChild={(childProps) => (
                      <Button
                        {...childProps()}
                        variant="outline"
                        size="sm"
                        sx={styles.action}
                      >
                        {action().label}
                      </Button>
                    )}
                  />
                )}
              </Show>
              <ToastCloseTrigger
                data-slot="toast-close"
                aria-label="Close toast"
                asChild={(childProps) => (
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
            </div>
          </ToastRoot>
        )
      }}
    </ArkToaster>
  )
}

export { Toaster }
