<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "@kirana-ui/svelte/command"
  import { onMount } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { command } from "../../../../styles/command.styles"
  import { useCommand } from "./context"

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

  // Its text, read once it is in the page, for an item given no `value`.
  let element = $state<HTMLElement | null>(null)
  let text = $state("")
  const own = $derived(value ?? text)
  onMount(() => {
    text = element?.textContent?.trim() ?? ""
    return useCommandRegister()
  })
  const context = useCommand()
  const useCommandRegister = () =>
    context.register(
      () => own,
      () => onSelect?.(own)
    )
</script>

<Command.Item data-slot="command-item" {...{ "cmdk-item": "" }} value={own} {keywords} {disabled} {...rest} sx={[command.item, className as Sx]}>
  {#snippet child({ props })}
    <div {...props} bind:this={element}>
      {@render children?.()}
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" sx={command.itemIndicator} />
    </div>
  {/snippet}
</Command.Item>
