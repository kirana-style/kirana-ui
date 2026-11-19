/**
 * The toast manager: a ui-sdk toaster behind Base UI's API, so a page calls `toast.add`,
 * `toast.close`, `toast.update` and `toast.promise` as React's does. The toaster's region places
 * them at the bottom's end, three at most, as Base UI's are; ui-sdk closes each after five seconds.
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  createToaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRegion,
  ToastTitle,
} from "@ui-sdk/solid/toast"
import type { ToastOptions as UisdkToastOptions } from "@ui-sdk/solid/toast"
import type { JSX } from "@solidjs/web"
import { Match, merge, omit, Show, Switch } from "solid-js"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
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

export const toaster = createToaster<string>()

type Options = UisdkToastOptions<string>

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

/**
 * A promise's step as ui-sdk's options: text is the toast's description, as Base UI's, where
 * ui-sdk would make it the title.
 */
function stepOf<T>(step: PromiseStep<T>) {
  const one = (value: string | ToastOptions) =>
    optionsOf(typeof value === "string" ? { description: value } : value)
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
      loading: stepOf(options.loading) as Options,
      success: stepOf(options.success),
      error: stepOf(options.error),
    })
    return promise
  },
}

/** The types that draw an icon, as React's `ToastIcon`. */
const TYPES = ["success", "info", "warning", "error", "loading"]

/**
 * ui-sdk measures the stack under its own names (`--toast-offset`, its front height, its swipe),
 * which the styles read by Base UI's: each toast hands them on.
 */
const STACK: JSX.CSSProperties = {
  "--toast-offset-y": "var(--toast-offset, 0px)",
  "--toast-frontmost-height": "var(--toast-front-height)",
  "--toast-swipe-movement-x": "var(--toast-swipe-x, 0px)",
  "--toast-swipe-movement-y": "var(--toast-swipe-y, 0px)",
}

function ToastIcon(props: { type: string }) {
  return (
    <span data-slot="toast-icon" sx={styles.icon}>
      <Switch>
        <Match when={props.type === "success"}>
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
        <Match when={props.type === "info"}>
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
        <Match when={props.type === "warning"}>
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
        <Match when={props.type === "error"}>
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
        <Match when={props.type === "loading"}>
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
  )
}

/** ui-sdk's region is Base UI's viewport, at the bottom's end; each toast Base UI's content inside it. */
function Toaster(props: {
  limit?: number
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = merge({ limit: 3 }, props)
  const rest = omit(local, "limit", "class", "sx")
  // A constant, not an arrow: Kirana inlines a static `styleProps(…)` into an object literal and
  // leaves an arrow's body unparenthesised, which Solid 2's compiler rejects (KF-128).
  const root = styleProps(styles.root)
  return (
    <UisdkPart
      part={ToastRegion}
      slotName="toast-viewport"
      tag="section"
      toaster={toaster}
      side="bottom"
      align="end"
      maxVisible={local.limit}
      container={typeof document === "undefined" ? undefined : document.body}
      {...rest}
      {...styleProps(local.class, styles.viewport, local.sx)}
    >
      {(item: { type?: string; action?: { label: string } }) => (
        <UisdkPart
          part={Toast}
          slotName="toast"
          tag="li"
          class={root.class}
          style={{ ...root.style, ...STACK }}
        >
          {(state: { front: boolean; expanded: boolean }) => (
            // Base UI's attributes on its content: behind the front toast, and the stack expanded.
            <div
              data-slot="toast-content"
              data-behind={state.front ? undefined : ""}
              data-expanded={state.expanded ? "" : undefined}
              sx={styles.content}
            >
              <Show when={item.type && TYPES.includes(item.type)}>
                <ToastIcon type={item.type!} />
              </Show>
              <div sx={styles.body}>
                <UisdkPart
                  part={ToastTitle}
                  slotName="toast-title"
                  {...styleProps(styles.title)}
                />
                <UisdkPart
                  part={ToastDescription}
                  slotName="toast-description"
                  {...styleProps(styles.description)}
                />
              </div>
              <Show when={item.action}>
                <UisdkPart
                  part={ToastAction}
                  slotName="toast-action"
                  tag="button"
                  asChild={(childProps) => (
                    <Button
                      {...childProps()}
                      variant="outline"
                      size="sm"
                      sx={styles.action}
                    >
                      {item.action?.label}
                    </Button>
                  )}
                />
              </Show>
              <UisdkPart
                part={ToastClose}
                slotName="toast-close"
                tag="button"
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
          )}
        </UisdkPart>
      )}
    </UisdkPart>
  )
}

export { Toaster }
