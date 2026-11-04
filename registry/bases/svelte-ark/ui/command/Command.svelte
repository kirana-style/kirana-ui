<script lang="ts">
  /**
   * cmdk's command menu on Ark UI's listbox: the items register from the markup, what is typed
   * filters them (by value and keywords, as cmdk's default filter does, without its fuzzy score),
   * groups with no match leave, the first match is highlighted (`data-selected`, as cmdk writes it),
   * and choosing an item calls its `onSelect`; nothing stays selected.
   */
  import { ListboxRoot, createListCollection } from "@ark-ui/svelte"
  import type { Sx } from "@kirana-style/core"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { command } from "../../../../styles/command.styles"
  import { COMMAND } from "./context"
  import type { CommandContext, CommandEntry } from "./context"

  // Ark's listbox takes its direction from the locale provider alone (a `dir` prop is ignored), so a
  // right-to-left command sits in a `DirectionProvider`, as its demo does.
  let {
    shouldFilter = true,
    dir,
    class: className,
    children,
    ...rest
  }: {
    shouldFilter?: boolean
    dir?: "ltr" | "rtl"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let entries = $state.raw<CommandEntry[]>([])
  let query = $state("")
  const matches = (entry: CommandEntry) => {
    const q = query.trim().toLowerCase()
    if (!shouldFilter || !q) return true
    return [entry.value, ...entry.keywords].some((word) => word.toLowerCase().includes(q))
  }
  const shown = $derived(entries.filter(matches))
  // Ark's collection holds plain items, the same shape each `CommandItem` hands its `ListboxItem`.
  const collection = $derived(
    createListCollection({
      items: shown.map((entry) => ({ value: entry.value, disabled: entry.disabled })),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.value,
      isItemDisabled: (item) => !!item.disabled,
    })
  )

  // cmdk highlights the first match, again whenever what is typed changes.
  let highlighted = $state<string | null>(null)
  $effect(() => {
    void query
    void entries.length
    highlighted = shown.find((entry) => !entry.disabled)?.value ?? null
  })

  function select(value: string) {
    entries.find((entry) => entry.value === value)?.onSelect()
  }

  setContext<CommandContext>(COMMAND, {
    register(entry) {
      entries = [...entries, entry]
      return () => (entries = entries.filter((e) => e.id !== entry.id))
    },
    visible: (value) => shown.some((entry) => entry.value === value),
    groupVisible: (group) => shown.some((entry) => entry.group === group),
    get empty() {
      return shown.length === 0
    },
    get highlighted() {
      return highlighted
    },
    set highlighted(value) {
      highlighted = value
    },
    get query() {
      return query
    },
    set query(value) {
      query = value
    },
  })
</script>

<ListboxRoot collection={collection} value={[]} highlightedValue={highlighted ?? undefined} loopFocus onHighlightChange={
      (d: { highlightedValue: string | null }) =>
        (highlighted = d.highlightedValue)
    } onSelect={(d: { value: string }) => select(d.value)}>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="command" {...{ "cmdk-root": "" }} tabindex="-1" dir={dir} {...rest} sx={[command.root, className as Sx]}>
      {@render children?.()}
    </div>
  {/snippet}
</ListboxRoot>
