import { For, Show, createMemo, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { field } from "../../../styles/field.styles"
import { Label } from "./label"
import { Separator } from "./separator"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Field(props: {
  orientation?: "vertical" | "horizontal" | "responsive"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "vertical" } as const, props),
    ["orientation", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="field"
      role="group"
      data-orientation={local.orientation}
      {...rest}
      {...styleProps(local.class, field.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function FieldContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="field-content"
      {...rest}
      {...styleProps(local.class, field.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function FieldDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <p
      data-slot="field-description"
      {...rest}
      {...styleProps(local.class, field.description, local.sx)}
    >
      {local.children}
    </p>
  )
}

function FieldError(props: {
  errors?: Array<{ message?: string } | undefined>
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["errors", "class", "sx", "children"])
  /** The errors' messages, each once. */
  const messages = createMemo(() => [
    ...new Set(
      (local.errors ?? []).flatMap((error) =>
        error?.message ? [error.message] : []
      )
    ),
  ])
  return (
    <Show when={local.children || messages().length}>
      <div
        role="alert"
        data-slot="field-error"
        {...rest}
        {...styleProps(local.class, field.error, local.sx)}
      >
        {local.children ? (
          local.children
        ) : (
          <>
            {messages().length === 1 ? (
              messages()[0]
            ) : (
              <ul sx={field.errorList}>
                <For each={messages()}>{(message) => <li>{message}</li>}</For>
              </ul>
            )}
          </>
        )}
      </div>
    </Show>
  )
}

function FieldGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="field-group"
      {...rest}
      {...styleProps(local.class, field.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function FieldLabel(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <Label
      data-slot="field-label"
      {...rest}
      class={local.class}
      sx={[field.label, local.sx]}
    >
      {local.children}
    </Label>
  )
}

function FieldLegend(props: {
  variant?: "legend" | "label"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "legend" } as const, props),
    ["variant", "class", "sx", "children"]
  )
  return (
    <legend
      data-slot="field-legend"
      data-variant={local.variant}
      {...rest}
      {...styleProps(local.class, field.legend, local.sx)}
    >
      {local.children}
    </legend>
  )
}

function FieldSeparator(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="field-separator"
      data-content={!!local.children}
      {...rest}
      {...styleProps(local.class, field.separator, local.sx)}
    >
      <Separator sx={field.separatorLine} />
      <Show when={local.children}>
        <span data-slot="field-separator-content" sx={field.separatorContent}>
          {local.children}
        </span>
      </Show>
    </div>
  )
}

function FieldSet(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <fieldset
      data-slot="field-set"
      {...rest}
      {...styleProps(local.class, field.set, local.sx)}
    >
      {local.children}
    </fieldset>
  )
}

function FieldTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="field-label"
      {...rest}
      {...styleProps(local.class, field.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldError,
  FieldSeparator,
}
