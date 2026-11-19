import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { inputGroup } from "../../../styles/input-group.styles"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function InputGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="input-group"
      role="group"
      {...rest}
      {...styleProps(local.class, inputGroup.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

type AddonOptions = NonNullable<Parameters<typeof inputGroup.addon>[0]>

function InputGroupAddon(props: {
  align?: AddonOptions["align"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ align: "inline-start" } as const, props),
    ["align", "class", "sx", "children"]
  )
  /** A click on the addon, but not on a button in it, focuses the group's input. */
  function focusInput(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("button")) return
    ;(event.currentTarget as HTMLElement).parentElement
      ?.querySelector("input")
      ?.focus()
  }
  return (
    <div
      data-slot="input-group-addon"
      role="group"
      data-align={local.align}
      onClick={focusInput}
      {...rest}
      {...styleProps(
        local.class,
        inputGroup.addonScope,
        inputGroup.addon({ align: local.align }),
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

type ButtonOptions = NonNullable<Parameters<typeof inputGroup.button>[0]>

function InputGroupButton(props: {
  type?: "button" | "submit" | "reset"
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
  size?: ButtonOptions["size"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { type: "button", variant: "ghost", size: "xs" } as const,
      props
    ),
    ["type", "variant", "size", "class", "sx", "children"]
  )
  return (
    <Button
      type={local.type}
      data-size={local.size}
      variant={local.variant}
      {...rest}
      class={local.class}
      sx={[inputGroup.button({ size: local.size }), local.sx]}
    >
      {local.children}
    </Button>
  )
}

function InputGroupInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Input
      data-slot="input-group-control"
      {...rest}
      class={local.class}
      sx={[inputGroup.input, local.sx]}
    />
  )
}

function InputGroupText(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span {...rest} {...styleProps(local.class, inputGroup.text, local.sx)}>
      {local.children}
    </span>
  )
}

function InputGroupTextarea(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Textarea
      data-slot="input-group-control"
      {...rest}
      class={local.class}
      sx={[inputGroup.textarea, local.sx]}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}
