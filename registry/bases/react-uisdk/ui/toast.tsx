"use client"

import * as React from "react"
import * as ToastPrimitive from "@ui-sdk/react/toast"
import { props as styleProps } from "@kirana-style/core"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { popupContainer, slotRender, slotOf } from "../../../lib/uisdk-slot"
import { toast as styles } from "../../../styles/toast.styles"

type Toaster = ToastPrimitive.Toaster<React.ReactNode>
type Options = ToastPrimitive.ToastOptions<React.ReactNode>

/** Base UI's toast options, as every React base's `toast.add` takes them. */
type ToastOptions = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  type?: string
  timeout?: number
  priority?: "low" | "high"
  actionProps?: {
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  }
  onClose?: () => void
  data?: unknown
}

/** Base UI's options as ui-sdk's: its timeout, priority, action and close by ui-sdk's names. */
function optionsOf(options: ToastOptions): Options {
  const { timeout, priority, actionProps, onClose, type, ...rest } = options
  return {
    ...rest,
    type: type as Options["type"],
    duration: timeout,
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
      onAction: (event) =>
        actionProps.onClick?.(
          event as unknown as React.MouseEvent<HTMLButtonElement>
        ),
    },
    onDismiss: onClose && (() => onClose()),
  }
}

type PromiseMessage<Value> =
  | React.ReactNode
  | ToastOptions
  | ((value: Value) => React.ReactNode | ToastOptions)

/** A promise's message as ui-sdk's: an options object by ui-sdk's names. */
function messageOf<Value>(message: PromiseMessage<Value>) {
  const one = (value: React.ReactNode | ToastOptions) =>
    typeof value === "object" && value !== null && !React.isValidElement(value)
      ? optionsOf(value as ToastOptions)
      : (value as React.ReactNode)
  return typeof message === "function"
    ? (value: Value) => one(message(value))
    : one(message)
}

/**
 * Base UI's toast manager (`add`, `update`, `close`, `promise`) over a ui-sdk toaster, which the
 * `Toaster` shows.
 */
function createToastManager(toaster: Toaster = ToastPrimitive.createToaster()) {
  return {
    toaster,
    add: (options: ToastOptions) => toaster(optionsOf(options)),
    update: (id: string, options: ToastOptions) =>
      toaster.update(id, optionsOf(options)),
    close: (id?: string) => toaster.dismiss(id),
    promise<Value>(
      promise: Promise<Value>,
      messages: {
        loading: React.ReactNode | ToastOptions
        success?: PromiseMessage<Value>
        error?: PromiseMessage<unknown>
      }
    ) {
      toaster.promise(promise, {
        loading: messageOf(messages.loading) as React.ReactNode | Options,
        success: messages.success && messageOf(messages.success),
        error: messages.error && messageOf(messages.error),
      } as Parameters<Toaster["promise"]>[1])
      return promise
    },
  }
}

type ToastManager = ReturnType<typeof createToastManager>

const toast = createToastManager()
const ManagerContext = React.createContext<ToastManager>(toast)

/** Base UI's provider: the manager its toasts come from. */
function ToastProvider({
  toastManager = toast,
  children,
}: {
  toastManager?: ToastManager
  children?: React.ReactNode
}) {
  return <ManagerContext value={toastManager}>{children}</ManagerContext>
}

/** Base UI's portal, which ui-sdk's region does itself: its children as they are. */
function ToastPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

/**
 * Base UI's viewport, ui-sdk's region: its toasts, each drawn by the function child, at the
 * bottom's end as the viewport's styles place it.
 */
function ToastViewport({
  sx,
  limit = 3,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.ToastRegion>,
  "className" | "toaster"
> & { limit?: number; sx?: Sx }) {
  const manager = React.use(ManagerContext)
  return (
    <ToastPrimitive.ToastRegion
      toaster={manager.toaster}
      side="bottom"
      align="end"
      maxVisible={limit}
      container={popupContainer()}
      {...props}
      render={slotRender(
        slotOf(props, "toast-viewport"),
        "section",
        props.render
      )}
      {...styleProps(styles.viewport, sx)}
    >
      {children}
    </ToastPrimitive.ToastRegion>
  )
}

/**
 * One toast. ui-sdk measures the stack under its own names (`--toast-offset`, its front height,
 * its swipe), which the styles read by Base UI's: the toast hands them on.
 */
const STACK = {
  "--toast-offset-y": "var(--toast-offset, 0px)",
  "--toast-frontmost-height": "var(--toast-front-height)",
  "--toast-swipe-movement-x": "var(--toast-swipe-x, 0px)",
  "--toast-swipe-movement-y": "var(--toast-swipe-y, 0px)",
} as React.CSSProperties

function Toast({
  sx,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.Toast>,
  "className" | "children"
> & {
  sx?: Sx
  /** The toast's content, given whether it is behind the front one and the stack is expanded. */
  children?: (state: { behind: boolean; expanded: boolean }) => React.ReactNode
}) {
  const own = styleProps(styles.root, sx)
  return (
    <ToastPrimitive.Toast
      {...props}
      render={slotRender(slotOf(props, "toast"), "li", props.render)}
      className={own.className}
      style={{ ...STACK, ...own.style }}
    >
      {(state) =>
        children?.({ behind: !state.front, expanded: state.expanded })
      }
    </ToastPrimitive.Toast>
  )
}

/** Base UI's content part: the registry's element, with Base UI's attributes on it. */
function ToastContent({
  sx,
  behind,
  expanded,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & {
  behind?: boolean
  expanded?: boolean
  sx?: Sx
}) {
  return (
    <div
      data-slot="toast-content"
      data-behind={behind ? "" : undefined}
      data-expanded={expanded ? "" : undefined}
      {...props}
      sx={[styles.content, sx]}
    />
  )
}

function ToastTitle({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof ToastPrimitive.ToastTitle>, "className"> & {
  sx?: Sx
}) {
  return (
    <ToastPrimitive.ToastTitle
      {...props}
      render={slotRender(slotOf(props, "toast-title"), "div", props.render)}
      {...styleProps(styles.title, sx)}
    />
  )
}

function ToastDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.ToastDescription>,
  "className"
> & { sx?: Sx }) {
  return (
    <ToastPrimitive.ToastDescription
      {...props}
      render={slotRender(
        slotOf(props, "toast-description"),
        "div",
        props.render
      )}
      {...styleProps(styles.description, sx)}
    />
  )
}

function ToastAction({
  sx,
  render,
  ...props
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.ToastAction>,
  "className"
> & { sx?: Sx }) {
  // The part draws as a Button, which takes the part's style in its own `sx`.
  return (
    <ToastPrimitive.ToastAction
      {...props}
      render={slotRender(
        "toast-action",
        "button",
        render ?? (
          <Button variant="outline" size="sm" sx={[styles.action, sx]} />
        )
      )}
    />
  )
}

function ToastClose({
  sx,
  children,
  render,
  ...props
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.ToastClose>,
  "className" | "children"
> & { sx?: Sx; children?: React.ReactNode }) {
  // The part draws as a Button, which takes the part's style in its own `sx`.
  return (
    <ToastPrimitive.ToastClose
      aria-label="Close toast"
      {...props}
      render={slotRender(
        "toast-close",
        "button",
        render ?? (
          <Button variant="ghost" size="icon-sm" sx={[styles.close, sx]} />
        )
      )}
    >
      {children ?? (
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
          aria-hidden="true"
        />
      )}
    </ToastPrimitive.ToastClose>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null

  if (type === "success") {
    icon = (
      <IconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheck"
        hugeicons="CheckmarkCircle02Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleLine"
        {...styleProps(styles.iconSuccess)}
        aria-hidden="true"
      />
    )
  }

  if (type === "info") {
    icon = (
      <IconPlaceholder
        lucide="InfoIcon"
        tabler="IconInfoCircle"
        hugeicons="InformationCircleIcon"
        phosphor="InfoIcon"
        remixicon="RiInformationLine"
        {...styleProps(styles.iconInfo)}
        aria-hidden="true"
      />
    )
  }

  if (type === "warning") {
    icon = (
      <IconPlaceholder
        lucide="TriangleAlertIcon"
        tabler="IconAlertTriangle"
        hugeicons="Alert02Icon"
        phosphor="WarningIcon"
        remixicon="RiErrorWarningLine"
        {...styleProps(styles.iconWarning)}
        aria-hidden="true"
      />
    )
  }

  if (type === "error") {
    icon = (
      <IconPlaceholder
        lucide="OctagonXIcon"
        tabler="IconAlertOctagon"
        hugeicons="MultiplicationSignCircleIcon"
        phosphor="XCircleIcon"
        remixicon="RiCloseCircleLine"
        {...styleProps(styles.iconError)}
        aria-hidden="true"
      />
    )
  }

  if (type === "loading") {
    icon = (
      <IconPlaceholder
        lucide="Loader2Icon"
        tabler="IconLoader"
        hugeicons="Loading03Icon"
        phosphor="SpinnerIcon"
        remixicon="RiLoaderLine"
        {...styleProps(styles.iconLoading)}
        aria-hidden="true"
      />
    )
  }

  if (!icon) {
    return null
  }

  return (
    <span data-slot="toast-icon" sx={styles.icon}>
      {icon}
    </span>
  )
}

function Toaster({
  children,
  toastManager = toast,
  limit,
}: {
  children?: React.ReactNode
  toastManager?: ToastManager
  limit?: number
}) {
  return (
    <ToastProvider toastManager={toastManager}>
      {children}
      <ToastPortal>
        <ToastViewport limit={limit}>
          {(item) => (
            <Toast>
              {({ behind, expanded }) => (
                <ToastContent behind={behind} expanded={expanded}>
                  <ToastIcon type={item.type} />
                  <div sx={styles.body}>
                    <ToastTitle />
                    <ToastDescription />
                  </div>
                  {item.action && <ToastAction />}
                  <ToastClose />
                </ToastContent>
              )}
            </Toast>
          )}
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const useToastManager = () => React.use(ManagerContext)

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
