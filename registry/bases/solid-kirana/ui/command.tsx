import { Command as CommandPrimitive } from "@kirana-ui/solid/command"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Show,
  createContext,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js"
import type { JSX } from "solid-js"

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

/** What a Command hands its items: where each one's `onSelect` is heard, by its value. */
type CommandContextValue = {
  register: (value: () => string, select: () => void) => () => void
}

const CommandContext = createContext<CommandContextValue>()

function useCommand() {
  const context = useContext(CommandContext)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}

/**
 * cmdk's command menu on Kirana UI's: the items come from the markup, what is typed filters them by
 * their text and keywords, groups with no match leave, and choosing an item calls its `onSelect`,
 * heard through the root. The rows keep cmdk's attributes (`cmdk-item` …), which the command's
 * styles read.
 */
function Command(props: {
  shouldFilter?: boolean
  dir?: "ltr" | "rtl"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ shouldFilter: true } as const, props),
    ["shouldFilter", "dir", "class", "sx", "children"]
  )
  const selects = new Set<{ value: () => string; select: () => void }>()
  const context: CommandContextValue = {
    register(value, select) {
      const entry = { value, select }
      selects.add(entry)
      return () => selects.delete(entry)
    },
  }
  const chosen = (value: string) => {
    for (const entry of selects) if (entry.value() === value) entry.select()
  }
  return (
    <CommandContext.Provider value={context}>
      <CommandPrimitive.Root
        data-slot="command"
        {...{ "cmdk-root": "" }}
        dir={local.dir}
        filter={local.shouldFilter ? undefined : null}
        onSelect={(value) => chosen(value)}
        {...rest}
        {...styleProps(local.class, command.root, local.sx)}
      >
        {local.children}
      </CommandPrimitive.Root>
    </CommandContext.Provider>
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
  const [local, rest] = splitProps(
    mergeProps(
      {
        title: "Command Palette",
        description: "Search for a command to run...",
        showCloseButton: false,
      } as const,
      props
    ),
    ["title", "description", "showCloseButton", "class", "sx", "children"]
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

function CommandEmpty(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      {...{ "cmdk-empty": "" }}
      {...rest}
      {...styleProps(local.class, command.empty, local.sx)}
    >
      {local.children}
    </CommandPrimitive.Empty>
  )
}

/** Hidden while none of its items is shown, as cmdk's. */
function CommandGroup(props: {
  heading?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "heading",
    "class",
    "sx",
    "children",
  ])
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      {...{ "cmdk-group": "" }}
      {...rest}
      {...styleProps(local.class, command.group, local.sx)}
    >
      <Show when={local.heading}>
        <CommandPrimitive.GroupHeading {...{ "cmdk-group-heading": "" }}>
          {local.heading}
        </CommandPrimitive.GroupHeading>
      </Show>
      <div {...{ "cmdk-group-items": "" }}>{local.children}</div>
    </CommandPrimitive.Group>
  )
}

function CommandInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <div data-slot="command-input-wrapper" sx={command.inputWrapper}>
      <InputGroup sx={command.inputGroup}>
        <CommandPrimitive.Input
          data-slot="command-input"
          {...{ "cmdk-input": "" }}
          autocomplete="off"
          autocorrect="off"
          spellcheck={false}
          {...rest}
          {...styleProps(local.class, command.input, local.sx)}
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
  const [local, rest] = splitProps(
    mergeProps({ keywords: [] as string[], disabled: false }, props),
    ["value", "keywords", "disabled", "onSelect", "class", "sx", "children"]
  )
  const context = useCommand()
  const [element, setElement] = createSignal<HTMLDivElement>()
  // Its text, read once it is in the page, for an item given no `value`.
  const [text, setText] = createSignal("")
  const own = () => local.value ?? text()
  onMount(() => {
    setText(element()?.textContent?.trim() ?? "")
    onCleanup(context.register(own, () => local.onSelect?.(own())))
  })
  return (
    <CommandPrimitive.Item
      ref={setElement}
      data-slot="command-item"
      {...{ "cmdk-item": "" }}
      value={own()}
      keywords={local.keywords}
      disabled={local.disabled}
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
    </CommandPrimitive.Item>
  )
}

function CommandList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      {...{ "cmdk-list": "" }}
      aria-label="Suggestions"
      {...rest}
      {...styleProps(local.class, command.list, local.sx)}
    >
      <div {...{ "cmdk-list-sizer": "" }}>{local.children}</div>
    </CommandPrimitive.List>
  )
}

/** Hidden while something is typed, as cmdk's. */
function CommandSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      {...{ "cmdk-separator": "" }}
      {...rest}
      {...styleProps(local.class, command.separator, local.sx)}
    />
  )
}

function CommandShortcut(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="command-shortcut"
      {...rest}
      {...styleProps(local.class, command.shortcut, local.sx)}
    >
      {local.children}
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
