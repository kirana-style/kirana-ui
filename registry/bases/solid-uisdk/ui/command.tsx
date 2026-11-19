/**
 * cmdk's command menu on ui-sdk's command: the items register themselves, what is typed filters them
 * (by value and keywords), groups with no match leave, the first match is highlighted
 * (`data-highlighted`), and choosing an item calls its `onSelect` with its value; nothing stays
 * selected.
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Command as UisdkCommand,
  CommandEmpty as UisdkCommandEmpty,
  CommandGroup as UisdkCommandGroup,
  CommandGroupLabel,
  CommandInput as UisdkCommandInput,
  CommandItem as UisdkCommandItem,
  CommandList as UisdkCommandList,
  CommandSeparator as UisdkCommandSeparator,
} from "@ui-sdk/solid/command"
import type { JSX } from "@solidjs/web"
import { createSignal, merge, omit, onSettled, Show } from "solid-js"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import { command } from "../../../styles/command.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { IconPlaceholder } from "./icon-placeholder"
import { InputGroup, InputGroupAddon } from "./input-group"

function Command(props: {
  shouldFilter?: boolean
  dir?: "ltr" | "rtl"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge({ shouldFilter: true } as const, props)
  const rest = omit(local, "shouldFilter", "dir", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkCommand}
      slotName="command"
      tag="div"
      {...{ "cmdk-root": "" }}
      tabindex="-1"
      dir={local.dir}
      filter={local.shouldFilter ? undefined : false}
      {...rest}
      {...styleProps(local.class, command.root, local.sx)}
    >
      {local.children}
    </UisdkPart>
  )
}

function CommandDialog(props: {
  title?: string
  description?: string
  showCloseButton?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: false,
    } as const,
    props
  )
  const rest = omit(
    local,
    "title",
    "description",
    "showCloseButton",
    "class",
    "sx",
    "children"
  )
  return (
    <Dialog {...rest}>
      <DialogHeader sx={visuallyHidden}>
        <DialogTitle>{local.title}</DialogTitle>
        <DialogDescription>{local.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={local.class}
        sx={[command.dialog, local.sx]}
        showCloseButton={local.showCloseButton}
      >
        {local.children}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Shown while nothing matches, as cmdk's. ui-sdk keeps its live region in the page so the message is
 * announced when it appears: until then it carries no slot and no style.
 */
function CommandEmpty(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkCommandEmpty
      render={(given: Record<string, unknown>, state: { empty: boolean }) => (
        <Show
          when={state.empty}
          fallback={<div {...given} data-slot={undefined} />}
        >
          <div
            {...given}
            {...rest}
            data-slot="command-empty"
            {...{ "cmdk-empty": "" }}
            {...styleProps(props.class, command.empty, props.sx)}
          >
            {props.children}
          </div>
        </Show>
      )}
    />
  )
}

/** A group with no match leaves the list, as cmdk's. Its heading is cmdk's, with no slot. */
function CommandGroup(props: {
  heading?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "heading", "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkCommandGroup}
      slotName="command-group"
      tag="div"
      {...{ "cmdk-group": "" }}
      {...rest}
      {...styleProps(props.class, command.group, props.sx)}
    >
      <Show when={props.heading}>
        <CommandGroupLabel
          render={(given: Record<string, unknown>) => (
            <div
              {...given}
              data-slot={undefined}
              {...{ "cmdk-group-heading": "" }}
            >
              {props.heading}
            </div>
          )}
        />
      </Show>
      <div {...{ "cmdk-group-items": "" }}>{props.children}</div>
    </UisdkPart>
  )
}

function CommandInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <div data-slot="command-input-wrapper" sx={command.inputWrapper}>
      <InputGroup sx={command.inputGroup}>
        <UisdkPart
          part={UisdkCommandInput}
          slotName="command-input"
          tag="input"
          {...{ "cmdk-input": "" }}
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          {...rest}
          {...styleProps(props.class, command.input, props.sx)}
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

function CommandItem(props: {
  /** What it is matched by and known as; its text, as cmdk's, when not given. */
  value?: string
  keywords?: string[]
  disabled?: boolean
  onSelect?: (value: string) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge({ keywords: [] as string[], disabled: false }, props)
  const rest = omit(
    local,
    "value",
    "keywords",
    "disabled",
    "onSelect",
    "class",
    "sx",
    "children"
  )
  // cmdk matches an item by its text when it has no value; ui-sdk matches its `label`.
  let el: HTMLElement | undefined
  const [text, setText] = createSignal("")
  const own = () => local.value ?? text()
  onSettled(() => {
    setText(el?.textContent?.trim() ?? "")
  })
  return (
    <UisdkPart
      part={UisdkCommandItem}
      slotName="command-item"
      tag="div"
      {...{ "cmdk-item": "" }}
      value={local.value}
      label={own() || undefined}
      keywords={local.keywords}
      disabled={local.disabled}
      onSelect={() => local.onSelect?.(own())}
      ref={(node: HTMLElement) => (el = node)}
      {...rest}
      {...styleProps(local.class, command.item, local.sx)}
    >
      {local.children}
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
        {...styleProps(command.itemIndicator)}
      />
    </UisdkPart>
  )
}

function CommandList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={UisdkCommandList}
      slotName="command-list"
      tag="div"
      {...{ "cmdk-list": "" }}
      aria-label="Suggestions"
      {...rest}
      {...styleProps(props.class, command.list, props.sx)}
    >
      <div {...{ "cmdk-list-sizer": "" }}>{props.children}</div>
    </UisdkPart>
  )
}

/** Hidden while something is typed, as cmdk's: ui-sdk's composed separators hide while it filters. */
function CommandSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={UisdkCommandSeparator}
      slotName="command-separator"
      tag="div"
      {...{ "cmdk-separator": "" }}
      {...rest}
      {...styleProps(props.class, command.separator, props.sx)}
    />
  )
}

function CommandShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="command-shortcut"
      {...rest}
      {...styleProps(props.class, command.shortcut, props.sx)}
    >
      {props.children}
    </span>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
