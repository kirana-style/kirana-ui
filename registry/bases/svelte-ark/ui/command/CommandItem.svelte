<script lang="ts">
  import { ListboxItem } from "@ark-ui/svelte"
  import type { Sx } from "@kirana-style/core"
  import { getContext, onMount } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { command } from "../../../../styles/command.styles"
  import { COMMAND_GROUP, useCommand } from "./context"

  let {
    value,
    keywords = [],
    disabled = false,
    onSelect,
    class: className,
    children,
    ...rest
  }: {
    /** What it is matched by and known as; its text, as cmdk's, when not given. */
    value?: string
    keywords?: string[]
    disabled?: boolean
    onSelect?: (value: string) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = useCommand()
  const group = getContext<symbol | undefined>(COMMAND_GROUP)

  let el = $state<HTMLElement>()
  let text = $state("")
  const own = $derived(value ?? text)
  const highlighted = $derived(context.highlighted)
  const visible = context.visible
  onMount(() => {
    text = el?.textContent?.trim() ?? ""
    return context.register({
      id: Symbol("item"),
      get value() {
        return own
      },
      keywords,
      group,
      get disabled() {
        return disabled
      },
      onSelect: () => onSelect?.(own),
    })
  })
  const item = $derived({ value: own, disabled })
</script>

<!-- Mounted while it does not match, so it stays registered; shown when it matches. -->
<ListboxItem item={item}>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} style:display={!own || visible(own) ? undefined : "none"} bind:this={el} data-slot="command-item" {...{ "cmdk-item": "" }} role="option" aria-disabled={disabled} aria-selected={highlighted === own} data-disabled={String(disabled)} data-selected={String(highlighted === own)} {...rest} sx={[command.item, className as Sx]}>
      {@render children?.()}
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" sx={command.itemIndicator} />
    </div>
  {/snippet}
</ListboxItem>
