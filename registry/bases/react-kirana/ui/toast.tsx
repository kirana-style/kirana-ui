"use client"

import * as React from "react"
import type { PartProps } from "../../../lib/kirana-render"
import { Toast as ToastPrimitive, createToaster } from "@kirana-ui/react/toast"
import type {
  ToastOptions as KiranaOptions,
  ToastRecord,
  Toaster as KiranaToaster,
} from "@kirana-ui/react/toast"
import { props as styleProps } from "@kirana-style/core"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { toast as styles } from "../../../styles/toast.styles"

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

/**
 * What a toast carries that the primitives' options cannot (PF-025): Base UI's action, and a title
 * or description that is more than text. They travel in the record's `data`, which the toast
 * draws from.
 */
type Carried = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastOptions["actionProps"]
  data?: unknown
}

const text = (node: React.ReactNode) =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : undefined

/**
 * Base UI's options as the primitives': its `timeout` is their `duration`; `priority` (Base UI's
 * live region's politeness) has no equivalent and is taken only.
 */
function optionsOf(options: ToastOptions): KiranaOptions & { id?: string } {
  const {
    timeout,
    priority,
    actionProps,
    onClose,
    title,
    description,
    data,
    ...rest
  } = options
  void priority
  const carried: Carried = { title, description, action: actionProps, data }
  return {
    ...rest,
    title: text(title),
    description: text(description),
    duration: timeout,
    data: carried,
    onClose: onClose && (() => onClose()),
  }
}

type PromiseMessage<Value> =
  | React.ReactNode
  | ToastOptions
  | ((value: Value) => React.ReactNode | ToastOptions)

/** A promise's message as the primitives': text, or an options object by their names. */
function messageOf<Value>(message: PromiseMessage<Value>) {
  const one = (value: React.ReactNode | ToastOptions) =>
    typeof value === "object" && value !== null && !React.isValidElement(value)
      ? optionsOf(value as ToastOptions)
      : (text(value as React.ReactNode) ?? "")
  return typeof message === "function"
    ? (value: Value) => one(message(value))
    : one(message)
}

/**
 * Base UI's toast manager (`add`, `update`, `close`, `promise`) over a primitives' toaster, which
 * the `Toaster` shows. Base UI's provider's `limit` (three) is the toaster's.
 */
function createToastManager(
  toaster: KiranaToaster = createToaster({ limit: 3 })
) {
  return {
    toaster,
    add: (options: ToastOptions) => toaster.add(optionsOf(options)),
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
      // The toaster hands the promise back, as Base UI's manager does.
      return toaster.promise(promise, {
        loading: messageOf(messages.loading),
        success: messages.success ? messageOf(messages.success) : "",
        error: messages.error ? messageOf(messages.error) : "",
      } as Parameters<KiranaToaster["promise"]>[1])
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

/** Base UI's portal; the primitives' viewport is always in the page, so its children as they are. */
function ToastPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

/** Base UI's viewport on the primitives': the manager's toaster's toasts, each drawn by `children`. */
function ToastViewport({
  sx,
  children,
  ...props
}: Omit<
  PartProps<typeof ToastPrimitive.Viewport>,
  "className" | "toaster" | "children"
> & {
  sx?: Sx
  children?: (toast: ToastRecord) => React.ReactNode
}) {
  const manager = React.use(ManagerContext)
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      toaster={manager.toaster}
      {...props}
      {...styleProps(styles.viewport, sx)}
    >
      {children && <ToastPrimitive.List>{children}</ToastPrimitive.List>}
    </ToastPrimitive.Viewport>
  )
}

function Toast({
  sx,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Root>, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      {...props}
      {...styleProps(styles.root, sx)}
    />
  )
}

function ToastContent({
  sx,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Content>, "className"> & {
  sx?: Sx
}) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      {...props}
      {...styleProps(styles.content, sx)}
    />
  )
}

function ToastTitle({
  sx,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Title>, "className"> & {
  sx?: Sx
}) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      {...props}
      {...styleProps(styles.title, sx)}
    />
  )
}

function ToastDescription({
  sx,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Description>, "className"> & {
  sx?: Sx
}) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      {...props}
      {...styleProps(styles.description, sx)}
    />
  )
}

function ToastAction({
  sx,
  render,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Action>, "className"> & {
  sx?: Sx
}) {
  // The part draws as a Button, which takes the part's style in its own `sx`.
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={
        render ?? (
          <Button variant="outline" size="sm" sx={[styles.action, sx]} />
        )
      }
      {...props}
    />
  )
}

function ToastClose({
  sx,
  children,
  render,
  ...props
}: Omit<PartProps<typeof ToastPrimitive.Close>, "className"> & {
  sx?: Sx
}) {
  // The part draws as a Button, which takes the part's style in its own `sx`.
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={
        render ?? (
          <Button variant="ghost" size="icon-sm" sx={[styles.close, sx]} />
        )
      }
      {...props}
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
    </ToastPrimitive.Close>
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

/** One toast as Base UI's list draws it, its title, description and action from `data`. */
function ToastItem({ item }: { item: ToastRecord }) {
  const carried = (item.data ?? {}) as Carried
  const title = carried.title ?? item.title
  const description = carried.description ?? item.description
  const action = carried.action
  return (
    <Toast toast={item}>
      <ToastContent>
        <ToastIcon type={item.type} />
        <div sx={styles.body}>
          {title !== undefined && <ToastTitle>{title}</ToastTitle>}
          {description !== undefined && (
            <ToastDescription>{description}</ToastDescription>
          )}
        </div>
        {action && (
          <ToastAction onClick={action.onClick}>{action.children}</ToastAction>
        )}
        <ToastClose />
      </ToastContent>
    </Toast>
  )
}

function Toaster({
  children,
  toastManager = toast,
}: {
  children?: React.ReactNode
  toastManager?: ToastManager
}) {
  return (
    <ToastProvider toastManager={toastManager}>
      {children}
      <ToastPortal>
        <ToastViewport>
          {(item) => <ToastItem key={item.id} item={item} />}
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
