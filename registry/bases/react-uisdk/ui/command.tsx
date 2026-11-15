"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { command } from "../../../styles/command.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { InputGroup, InputGroupAddon } from "./input-group"

function Command({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive>, "className"> & {
  sx?: Sx
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      {...props}
      {...styleProps(command.root, sx)}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  sx,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  sx?: Sx
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader sx={visuallyHidden}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        sx={[command.dialog, sx]}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Input>, "className"> & {
  sx?: Sx
}) {
  return (
    <div data-slot="command-input-wrapper" sx={command.inputWrapper}>
      <InputGroup sx={command.inputGroup}>
        <CommandPrimitive.Input
          data-slot="command-input"
          {...props}
          {...styleProps(command.input, sx)}
        />
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            {...styleProps(command.inputIcon)}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.List>, "className"> & {
  sx?: Sx
}) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      {...props}
      {...styleProps(command.list, sx)}
    />
  )
}

function CommandEmpty({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Empty>, "className"> & {
  sx?: Sx
}) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      {...props}
      {...styleProps(command.empty, sx)}
    />
  )
}

function CommandGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Group>, "className"> & {
  sx?: Sx
}) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      {...props}
      {...styleProps(command.group, sx)}
    />
  )
}

function CommandSeparator({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof CommandPrimitive.Separator>,
  "className"
> & { sx?: Sx }) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      {...props}
      {...styleProps(command.separator, sx)}
    />
  )
}

function CommandItem({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Item>, "className"> & {
  sx?: Sx
}) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      {...props}
      {...styleProps(command.item, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
        {...styleProps(command.itemIndicator)}
      />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return (
    <span data-slot="command-shortcut" {...props} sx={[command.shortcut, sx]} />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
