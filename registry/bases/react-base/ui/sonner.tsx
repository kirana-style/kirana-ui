"use client"

import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner"

import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { sonner } from "../../../styles/sonner.styles"

/**
 * Upstream reads the colour mode from `next-themes`; pass `theme` from yours (Sonner's `light`,
 * `dark` or `system`, the default here).
 */
const Toaster = ({ theme: mode = "system", ...props }: ToasterProps) => {
  const own = styleProps(sonner.toaster)
  return (
    <Sonner
      theme={mode}
      className={own.className}
      icons={{
        success: (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheck"
            hugeicons="CheckmarkCircle02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            {...styleProps(sonner.icon)}
          />
        ),
        info: (
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
            {...styleProps(sonner.icon)}
          />
        ),
        warning: (
          <IconPlaceholder
            lucide="TriangleAlertIcon"
            tabler="IconAlertTriangle"
            hugeicons="Alert02Icon"
            phosphor="WarningIcon"
            remixicon="RiErrorWarningLine"
            {...styleProps(sonner.icon)}
          />
        ),
        error: (
          <IconPlaceholder
            lucide="OctagonXIcon"
            tabler="IconAlertOctagon"
            hugeicons="MultiplicationSignCircleIcon"
            phosphor="XCircleIcon"
            remixicon="RiCloseCircleLine"
            {...styleProps(sonner.icon)}
          />
        ),
        loading: (
          <IconPlaceholder
            lucide="Loader2Icon"
            tabler="IconLoader"
            hugeicons="Loading03Icon"
            phosphor="SpinnerIcon"
            remixicon="RiLoaderLine"
            {...styleProps(sonner.loading)}
          />
        ),
      }}
      style={
        {
          "--normal-bg": theme.popover,
          "--normal-text": theme.popoverForeground,
          "--normal-border": theme.border,
          "--border-radius": "var(--sonner-radius)",
          ...own.style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
