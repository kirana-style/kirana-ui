"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { props as styleProps } from "@kirana-style/core"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { toast as styles } from "../../../styles/toast.styles"

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({
  sx,
  ...props
}: Omit<ToastPrimitive.Viewport.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      {...props}
      {...styleProps(styles.viewport, sx)}
    />
  )
}

function Toast({
  sx,
  ...props
}: Omit<ToastPrimitive.Root.Props, "className"> & { sx?: Sx }) {
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
}: Omit<ToastPrimitive.Content.Props, "className"> & { sx?: Sx }) {
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
}: Omit<ToastPrimitive.Title.Props, "className"> & { sx?: Sx }) {
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
}: Omit<ToastPrimitive.Description.Props, "className"> & { sx?: Sx }) {
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
}: Omit<ToastPrimitive.Action.Props, "className"> & { sx?: Sx }) {
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
}: Omit<ToastPrimitive.Close.Props, "className"> & { sx?: Sx }) {
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

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div sx={styles.body}>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

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
