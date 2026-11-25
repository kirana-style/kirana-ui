import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Editable as EditablePrimitive } from "@kirana-ui/solid/editable"
import type {
  CancelTriggerProps,
  EditTriggerProps,
  InputProps,
  PreviewProps,
  RootProps,
  SubmitTriggerProps,
} from "@kirana-ui/solid/editable"
import type { Sx } from "@kirana-style/core"

import { editable } from "../../../styles/editable.styles"
import { input } from "../../../styles/input.styles"
import { Button } from "./button"
import type { ButtonProps } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

type ButtonVariants = Pick<ButtonProps, "variant" | "size">

function Editable(props: Styled<RootProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <EditablePrimitive.Root
      data-slot="editable"
      {...rest}
      {...styleProps(props.class, editable.root, props.sx)}
    />
  )
}

function EditablePreview(props: Styled<PreviewProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <EditablePrimitive.Preview
      data-slot="editable-preview"
      {...rest}
      {...styleProps(props.class, input, editable.preview, props.sx)}
    />
  )
}

function EditableInput(props: Styled<InputProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <EditablePrimitive.Input
      data-slot="editable-input"
      {...rest}
      {...styleProps(props.class, input, editable.input, props.sx)}
    />
  )
}

/** Starts an edit: a ghost icon button with a pencil unless given children. */
function EditableEditTrigger(
  props: Styled<Omit<EditTriggerProps, "render">> & ButtonVariants
) {
  const rest = omit(props, "class", "sx", "variant", "size", "children")
  const own = "children" in props
  return (
    <EditablePrimitive.EditTrigger
      data-slot="editable-edit-trigger"
      aria-label={own ? undefined : "Edit"}
      {...rest}
      render={(triggerProps) => (
        <Button
          {...triggerProps()}
          variant={props.variant ?? "ghost"}
          size={props.size ?? "icon-sm"}
          class={props.class}
          sx={props.sx}
        >
          {own ? (
            props.children
          ) : (
            <IconPlaceholder
              lucide="PencilIcon"
              tabler="IconPencil"
              hugeicons="EditIcon"
              phosphor="PencilIcon"
              remixicon="RiPencilLine"
            />
          )}
        </Button>
      )}
    />
  )
}

/** Keeps the edit: a ghost icon button with a check unless given children. */
function EditableSubmitTrigger(
  props: Styled<Omit<SubmitTriggerProps, "render">> & ButtonVariants
) {
  const rest = omit(props, "class", "sx", "variant", "size", "children")
  const own = "children" in props
  return (
    <EditablePrimitive.SubmitTrigger
      data-slot="editable-submit-trigger"
      aria-label={own ? undefined : "Save"}
      {...rest}
      render={(triggerProps) => (
        <Button
          {...triggerProps()}
          variant={props.variant ?? "ghost"}
          size={props.size ?? "icon-sm"}
          class={props.class}
          sx={props.sx}
        >
          {own ? (
            props.children
          ) : (
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          )}
        </Button>
      )}
    />
  )
}

/** Drops the edit: a ghost icon button with a cross unless given children. */
function EditableCancelTrigger(
  props: Styled<Omit<CancelTriggerProps, "render">> & ButtonVariants
) {
  const rest = omit(props, "class", "sx", "variant", "size", "children")
  const own = "children" in props
  return (
    <EditablePrimitive.CancelTrigger
      data-slot="editable-cancel-trigger"
      aria-label={own ? undefined : "Cancel"}
      {...rest}
      render={(triggerProps) => (
        <Button
          {...triggerProps()}
          variant={props.variant ?? "ghost"}
          size={props.size ?? "icon-sm"}
          class={props.class}
          sx={props.sx}
        >
          {own ? (
            props.children
          ) : (
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
          )}
        </Button>
      )}
    />
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
