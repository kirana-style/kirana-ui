import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { splitProps } from "solid-js"
import type { ComponentProps } from "solid-js"
import { Toaster as Sonner } from "solid-sonner"

import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "./icon-placeholder"
import { sonner } from "../../../styles/sonner.styles"

/**
 * Pass `theme` from your colour mode (Sonner's `light`, `dark` or `system`, the default here);
 * upstream reads it from `next-themes`.
 */
function Toaster(
  props: Omit<ComponentProps<typeof Sonner>, "class" | "className"> & {
    sx?: Sx
  }
) {
  const [local, rest] = splitProps(props, ["theme", "sx"])
  return (
    <Sonner
      theme={local.theme ?? "system"}
      class={styleProps(sonner.toaster, local.sx).class}
      style={{
        "--normal-bg": theme.popover,
        "--normal-text": theme.popoverForeground,
        "--normal-border": theme.border,
        "--border-radius": "var(--sonner-radius)",
      }}
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
      {...rest}
    />
  )
}

export { Toaster }
