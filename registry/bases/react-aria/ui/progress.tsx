"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Label as LabelPrimitive,
  ProgressBar as ProgressPrimitive,
} from "react-aria-components"
import type {
  LabelProps,
  ProgressBarProps as ProgressPrimitiveProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { progress } from "../../../styles/progress.styles"

type ProgressContextValue = {
  percentage?: number
  isIndeterminate: boolean
  valueText?: string
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null)

function useProgress() {
  const context = React.useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within a Progress.")
  }

  return context
}

function ProgressContent({
  children,
  percentage,
  isIndeterminate,
  valueText,
}: ProgressContextValue & {
  children?: React.ReactNode
}) {
  const context = React.useMemo(
    () => ({ percentage, isIndeterminate, valueText }),
    [percentage, isIndeterminate, valueText]
  )

  return (
    <ProgressContext value={context}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressContext>
  )
}

function Progress({
  sx,
  children,
  ...props
}: Omit<ProgressPrimitiveProps, "children" | "className" | "style"> & {
  children?: React.ReactNode
  sx?: Sx
}) {
  return (
    <ProgressPrimitive
      data-slot="progress"
      {...props}
      {...styleProps(progress.root, sx)}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <ProgressContent
          percentage={percentage}
          valueText={valueText}
          isIndeterminate={isIndeterminate}
        >
          {children}
        </ProgressContent>
      )}
    </ProgressPrimitive>
  )
}

type El = Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }

function ProgressTrack({ sx, ...props }: El) {
  return (
    <span data-slot="progress-track" {...props} sx={[progress.track, sx]} />
  )
}

function ProgressIndicator({ sx, style, ...props }: El) {
  const { percentage, isIndeterminate } = useProgress()

  return (
    <span
      data-slot="progress-indicator"
      style={{
        ...style,
        width: `${isIndeterminate ? 100 : (percentage ?? 0)}%`,
      }}
      {...props}
      sx={[progress.indicator, sx]}
    />
  )
}

function ProgressLabel({
  sx,
  ...props
}: Omit<LabelProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <LabelPrimitive
      data-slot="progress-label"
      {...props}
      {...styleProps(progress.label, sx)}
    />
  )
}

function ProgressValue({
  sx,
  children,
  ...props
}: Omit<El, "children"> & {
  children?: (value: string) => React.ReactNode
}) {
  const { valueText } = useProgress()
  return (
    <span data-slot="progress-value" {...props} sx={[progress.value, sx]}>
      {children && valueText != null ? children(valueText) : valueText}
    </span>
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
