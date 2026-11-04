import {
  Show,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  ListboxContent,
  ListboxInput,
  ListboxItem,
  ListboxRoot,
  createListCollection,
} from "@ark-ui/solid"
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
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

/** An item as it registers with its Command: its value, words, group and what choosing it does. */
type CommandEntry = {
  id: symbol
  readonly value: string
  keywords: string[]
  group?: symbol
  readonly disabled: boolean
  onSelect: () => void
}

/** What a Command hands its parts: getters, so they follow it. */
type CommandContextValue = {
  register: (entry: CommandEntry) => () => void
  /** Whether an item, or any item of a group, matches what is typed. */
  visible: (value: string) => boolean
  groupVisible: (group: symbol) => boolean
  readonly empty: boolean
  readonly highlighted: string | null
  query: string
}

const CommandContext = createContext<CommandContextValue>()
const CommandGroupContext = createContext<symbol>()

function useCommand() {
  const context = useContext(CommandContext)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}

/**
 * cmdk's command menu on Ark UI's listbox: the items register from the markup, what is typed
 * filters them (by value and keywords, as cmdk's default filter does, without its fuzzy score),
 * groups with no match leave, the first match is highlighted (`data-selected`, as cmdk writes it),
 * and choosing an item calls its `onSelect`; nothing stays selected.
 */
function Command(props: {
  shouldFilter?: boolean
  // Ark's listbox takes its direction from the locale provider alone (a `dir` prop is ignored), so
  // a right-to-left command sits in a `DirectionProvider`, as its demo does.
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
  const [entries, setEntries] = createSignal<CommandEntry[]>([])
  const [query, setQuery] = createSignal("")
  const matches = (entry: CommandEntry) => {
    const q = query().trim().toLowerCase()
    if (!local.shouldFilter || !q) return true
    return [entry.value, ...entry.keywords].some((word) =>
      word.toLowerCase().includes(q)
    )
  }
  const shown = createMemo(() => entries().filter(matches))
  // Ark's collection holds plain items, the same shape each `CommandItem` hands its `ListboxItem`.
  const collection = createMemo(() =>
    createListCollection({
      items: shown().map((entry) => ({
        value: entry.value,
        disabled: entry.disabled,
      })),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.value,
      isItemDisabled: (item) => !!item.disabled,
    })
  )

  // cmdk highlights the first match, again whenever what is typed changes.
  const [highlighted, setHighlighted] = createSignal<string | null>(null)
  createEffect(() => {
    setHighlighted(shown().find((entry) => !entry.disabled)?.value ?? null)
  })

  function select(value: string) {
    entries()
      .find((entry) => entry.value === value)
      ?.onSelect()
  }

  const context: CommandContextValue = {
    register(entry) {
      setEntries((current) => [...current, entry])
      return () =>
        setEntries((current) => current.filter((e) => e.id !== entry.id))
    },
    visible: (value) => shown().some((entry) => entry.value === value),
    groupVisible: (group) => shown().some((entry) => entry.group === group),
    get empty() {
      return shown().length === 0
    },
    get highlighted() {
      return highlighted()
    },
    get query() {
      return query()
    },
    set query(value) {
      setQuery(value)
    },
  }
  return (
    <CommandContext.Provider value={context}>
      <ListboxRoot
        collection={collection()}
        value={[]}
        highlightedValue={highlighted() ?? undefined}
        loopFocus
        onHighlightChange={(details) =>
          setHighlighted(details.highlightedValue)
        }
        onSelect={(details) => select(details.value)}
        asChild={(childProps) => (
          <div
            {...childProps()}
            data-slot="command"
            {...{ "cmdk-root": "" }}
            tabindex="-1"
            dir={local.dir}
            {...rest}
            {...styleProps(
              childProps().class,
              local.class,
              command.root,
              local.sx
            )}
          >
            {local.children}
          </div>
        )}
      />
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
  const ctx = useCommand()
  return (
    <Show when={ctx.empty}>
      <div
        data-slot="command-empty"
        {...{ "cmdk-empty": "" }}
        role="presentation"
        {...rest}
        {...styleProps(local.class, command.empty, local.sx)}
      >
        {local.children}
      </div>
    </Show>
  )
}

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
  const ctx = useCommand()
  const group = Symbol("group")
  const id = createUniqueId()
  const own = () => styleProps(local.class, command.group, local.sx)
  return (
    <CommandGroupContext.Provider value={group}>
      <div
        data-slot="command-group"
        {...{ "cmdk-group": "" }}
        role="presentation"
        {...rest}
        class={own().class}
        style={{
          ...own().style,
          display: ctx.groupVisible(group) ? undefined : "none",
        }}
      >
        <Show when={local.heading}>
          <div id={id} {...{ "cmdk-group-heading": "" }} aria-hidden="true">
            {local.heading}
          </div>
        </Show>
        <div
          {...{ "cmdk-group-items": "" }}
          role="group"
          aria-labelledby={local.heading ? id : undefined}
        >
          {local.children}
        </div>
      </div>
    </CommandGroupContext.Provider>
  )
}

function CommandInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const ctx = useCommand()
  return (
    <div data-slot="command-input-wrapper" sx={command.inputWrapper}>
      <InputGroup sx={command.inputGroup}>
        <ListboxInput
          asChild={(childProps) => (
            <input
              {...childProps()}
              data-slot="command-input"
              {...{ "cmdk-input": "" }}
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              type="text"
              value={ctx.query}
              {...rest}
              {...styleProps(
                childProps().class,
                local.class,
                command.input,
                local.sx
              )}
              onInput={(event) => {
                ctx.query = (event.target as HTMLInputElement).value
              }}
            />
          )}
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
  const group = useContext(CommandGroupContext)
  let el: HTMLDivElement | undefined
  const [text, setText] = createSignal("")
  const own = () => local.value ?? text()
  onMount(() => {
    setText(el?.textContent?.trim() ?? "")
    onCleanup(
      context.register({
        id: Symbol("item"),
        get value() {
          return own()
        },
        keywords: local.keywords,
        group,
        get disabled() {
          return local.disabled
        },
        onSelect: () => local.onSelect?.(own()),
      })
    )
  })
  const selected = () => context.highlighted === own()
  // Mounted while it does not match, so it stays registered; shown when it matches.
  return (
    <ListboxItem
      item={{ value: own(), disabled: local.disabled }}
      asChild={(childProps) => {
        const merged = () =>
          styleProps(childProps().class, local.class, command.item, local.sx)
        return (
          <div
            {...childProps()}
            ref={(node) => (el = node)}
            data-slot="command-item"
            {...{ "cmdk-item": "" }}
            role="option"
            aria-disabled={local.disabled}
            aria-selected={selected()}
            data-disabled={String(local.disabled)}
            data-selected={String(selected())}
            {...rest}
            class={merged().class}
            style={{
              ...merged().style,
              display: !own() || context.visible(own()) ? undefined : "none",
            }}
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
          </div>
        )
      }}
    />
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
    <ListboxContent
      asChild={(childProps) => (
        <div
          {...childProps()}
          data-slot="command-list"
          {...{ "cmdk-list": "" }}
          aria-label="Suggestions"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            command.list,
            local.sx
          )}
        >
          <div {...{ "cmdk-list-sizer": "" }}>{local.children}</div>
        </div>
      )}
    />
  )
}

function CommandSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const ctx = useCommand()
  return (
    <Show when={!ctx.query}>
      <div
        data-slot="command-separator"
        {...{ "cmdk-separator": "" }}
        role="separator"
        {...rest}
        {...styleProps(local.class, command.separator, local.sx)}
      />
    </Show>
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
