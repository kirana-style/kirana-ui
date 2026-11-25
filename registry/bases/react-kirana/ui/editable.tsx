"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { Editable as EditablePrimitive } from "@kirana-ui/react/editable"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { editable } from "../../../styles/editable.styles"
import { input } from "../../../styles/input.styles"
import { Button } from "./button"

type ButtonVariants = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
>

function Editable({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof EditablePrimitive.Root>, "className"> & {
  sx?: Sx
}) {
  return (
    <EditablePrimitive.Root
      data-slot="editable"
      {...props}
      {...styleProps(editable.root, sx)}
    />
  )
}

function EditablePreview({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof EditablePrimitive.Preview>, "className"> & {
  sx?: Sx
}) {
  return (
    <EditablePrimitive.Preview
      data-slot="editable-preview"
      {...props}
      {...styleProps(input, editable.preview, sx)}
    />
  )
}

function EditableInput({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof EditablePrimitive.Input>, "className"> & {
  sx?: Sx
}) {
  return (
    <EditablePrimitive.Input
      data-slot="editable-input"
      {...props}
      {...styleProps(input, editable.input, sx)}
    />
  )
}

/** Starts an edit: a ghost icon button with a pencil unless given children. */
function EditableEditTrigger({
  sx,
  variant = "ghost",
  size = "icon-sm",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof EditablePrimitive.EditTrigger>,
  "className"
> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <EditablePrimitive.EditTrigger
      data-slot="editable-edit-trigger"
      aria-label={children ? undefined : "Edit"}
      {...props}
      render={<Button variant={variant} size={size} sx={sx} />}
    >
      {children ?? (
        <IconPlaceholder
          lucide="PencilIcon"
          tabler="IconPencil"
          hugeicons="EditIcon"
          phosphor="PencilIcon"
          remixicon="RiPencilLine"
        />
      )}
    </EditablePrimitive.EditTrigger>
  )
}

/** Keeps the edit: a ghost icon button with a check unless given children. */
function EditableSubmitTrigger({
  sx,
  variant = "ghost",
  size = "icon-sm",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof EditablePrimitive.SubmitTrigger>,
  "className"
> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <EditablePrimitive.SubmitTrigger
      data-slot="editable-submit-trigger"
      aria-label={children ? undefined : "Save"}
      {...props}
      render={<Button variant={variant} size={size} sx={sx} />}
    >
      {children ?? (
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      )}
    </EditablePrimitive.SubmitTrigger>
  )
}

/** Drops the edit: a ghost icon button with a cross unless given children. */
function EditableCancelTrigger({
  sx,
  variant = "ghost",
  size = "icon-sm",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof EditablePrimitive.CancelTrigger>,
  "className"
> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <EditablePrimitive.CancelTrigger
      data-slot="editable-cancel-trigger"
      aria-label={children ? undefined : "Cancel"}
      {...props}
      render={<Button variant={variant} size={size} sx={sx} />}
    >
      {children ?? (
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      )}
    </EditablePrimitive.CancelTrigger>
  )
}

export {
  Editable,
  EditablePreview,
  EditableInput,
  EditableEditTrigger,
  EditableSubmitTrigger,
  EditableCancelTrigger,
}
