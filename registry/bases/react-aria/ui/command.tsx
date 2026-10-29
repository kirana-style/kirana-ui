"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Autocomplete,
  Collection,
  composeRenderProps,
  Header,
  Input,
  Menu,
  MenuItem,
  MenuSection,
  SearchField,
  Separator,
  useFilter,
} from "react-aria-components"
import type {
  AutocompleteProps,
  InputProps,
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  SeparatorProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { command } from "../../../styles/command.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import { InputGroup, InputGroupAddon } from "./input-group"

function Command({
  sx,
  dir,
  style,
  ...props
}: Omit<AutocompleteProps, "className" | "style"> & {
  sx?: Sx
  dir?: React.HTMLAttributes<HTMLDivElement>["dir"]
  style?: React.CSSProperties
}) {
  const { contains } = useFilter({ sensitivity: "base" })
  return (
    <div data-slot="command" dir={dir} style={style} sx={[command.root, sx]}>
      <Autocomplete {...props} filter={props.filter || contains}>
        {props.children}
      </Autocomplete>
    </div>
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  open,
  onOpenChange,
  sx,
  showCloseButton = false,
  ...props
}: Omit<
  React.ComponentProps<typeof Dialog>,
  "children" | "sx" | "isOpen" | "onOpenChange"
> & {
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  sx?: Sx
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog
      isOpen={open}
      onOpenChange={onOpenChange}
      sx={[command.dialog, sx]}
      showCloseButton={showCloseButton}
      isDismissable
      {...props}
    >
      <DialogHeader sx={visuallyHidden}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </Dialog>
  )
}

function CommandInput({
  sx,
  ...props
}: Omit<InputProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <SearchField
      autoFocus
      aria-label={props.placeholder || "Search"}
      data-slot="command-input-wrapper"
      {...styleProps(command.inputWrapper)}
    >
      <InputGroup sx={command.inputGroup}>
        <Input
          {...props}
          data-slot="command-input"
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
    </SearchField>
  )
}

function CommandList<T extends object>({
  sx,
  ...props
}: Omit<MenuProps<T>, "className" | "style"> & { sx?: Sx }) {
  return (
    <Menu
      {...props}
      data-slot="command-list"
      {...styleProps(command.list, sx)}
    />
  )
}

function CommandEmpty({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="command-empty" {...props} sx={[command.empty, sx]} />
}

function CommandGroup<T extends object>({
  sx,
  children,
  items,
  heading,
  ...props
}: Omit<MenuSectionProps<T>, "className" | "style"> & {
  heading?: string
  sx?: Sx
}) {
  return (
    <MenuSection
      data-slot="command-group"
      {...props}
      {...styleProps(command.group, sx)}
    >
      {heading && <Header cmdk-group-heading="">{heading}</Header>}
      <Collection items={items}>{children}</Collection>
    </MenuSection>
  )
}

function CommandSeparator({
  sx,
  ...props
}: Omit<SeparatorProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <Separator
      data-slot="command-separator"
      {...props}
      {...styleProps(command.separator, sx)}
    />
  )
}

function CommandItem<T extends object>({
  sx,
  children,
  textValue,
  ...props
}: Omit<MenuItemProps<T>, "className" | "style"> & { sx?: Sx }) {
  return (
    <MenuItem
      {...props}
      data-slot="command-item"
      {...styleProps(command.item, sx)}
      textValue={
        textValue || (typeof children === "string" ? children : undefined)
      }
    >
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            {...styleProps(command.itemIndicator)}
          />
        </>
      ))}
    </MenuItem>
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
