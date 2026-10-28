"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Group } from "react-aria-components"
import type { GroupProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { inputGroup } from "../../../styles/input-group.styles"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"

type El<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

type AddonOptions = NonNullable<Parameters<typeof inputGroup.addon>[0]>
type ButtonOptions = NonNullable<Parameters<typeof inputGroup.button>[0]>

function InputGroup({
  sx,
  ...props
}: Omit<GroupProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <Group
      data-slot="input-group"
      {...props}
      {...styleProps(inputGroup.root, sx)}
    />
  )
}

function InputGroupAddon({
  sx,
  align = "inline-start",
  ...props
}: El<"div"> & AddonOptions) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
      sx={[inputGroup.addonScope, inputGroup.addon({ align }), sx]}
    />
  )
}

function InputGroupButton({
  sx,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  ButtonOptions & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      {...props}
      sx={[inputGroup.button({ size }), sx]}
    />
  )
}

function InputGroupText({ sx, ...props }: El<"span">) {
  return <span {...props} sx={[inputGroup.text, sx]} />
}

function InputGroupInput({ sx, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      {...props}
      sx={[inputGroup.input, sx]}
    />
  )
}

function InputGroupTextarea({
  sx,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      {...props}
      sx={[inputGroup.textarea, sx]}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
