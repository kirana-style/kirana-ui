"use client"

import * as React from "react"
import { useMemo } from "react"

import type { Sx } from "../../../lib/sx"
import { field } from "../../../styles/field.styles"
import { Label } from "./label"
import { Separator } from "./separator"

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function FieldSet({ sx, ...props }: El<"fieldset">) {
  return <fieldset data-slot="field-set" {...props} sx={[field.set, sx]} />
}

function FieldLegend({
  sx,
  variant = "legend",
  ...props
}: El<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      {...props}
      sx={[field.legend, sx]}
    />
  )
}

function FieldGroup({ sx, ...props }: El) {
  return <div data-slot="field-group" {...props} sx={[field.group, sx]} />
}

function Field({
  sx,
  orientation = "vertical",
  ...props
}: El & { orientation?: "vertical" | "horizontal" | "responsive" }) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      {...props}
      sx={[field.root, sx]}
    />
  )
}

function FieldContent({ sx, ...props }: El) {
  return <div data-slot="field-content" {...props} sx={[field.content, sx]} />
}

function FieldLabel({ sx, ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" {...props} sx={[field.label, sx]} />
}

// `field-label`, as upstream: a Field's rules for its label reach a title too.
function FieldTitle({ sx, ...props }: El) {
  return <div data-slot="field-label" {...props} sx={[field.title, sx]} />
}

function FieldDescription({ sx, ...props }: El<"p">) {
  return (
    <p data-slot="field-description" {...props} sx={[field.description, sx]} />
  )
}

function FieldSeparator({
  children,
  sx,
  ...props
}: El & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      {...props}
      sx={[field.separator, sx]}
    >
      <Separator sx={field.separatorLine} />
      {children && (
        <span data-slot="field-separator-content" sx={field.separatorContent}>
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  sx,
  children,
  errors,
  ...props
}: El & { errors?: Array<{ message?: string } | undefined> }) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors?.length) return null
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]
    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message
    return (
      <ul sx={field.errorList}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div role="alert" data-slot="field-error" {...props} sx={[field.error, sx]}>
      {content}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
