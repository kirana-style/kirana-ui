<script lang="ts">
  import { Command } from "bits-ui"
  import type { Snippet } from "svelte"
  import { createAttachmentKey } from "svelte/attachments"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { command } from "../../../../styles/command.styles"

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

  // Its element, whose text is its value when none is given, as cmdk's.
  let element: Element | undefined
  const keep = {
    [createAttachmentKey()]: (node: Element) => {
      element = node
    },
  }
</script>

<!-- cmdk writes `data-selected` and `data-disabled` as "true" or "false", which the styles read;
     Bits marks them by presence and finds the highlighted row by it, so only "true" is written. -->
<Command.Item
  value={value ?? ""}
  {keywords}
  {disabled}
  onSelect={() => onSelect?.(value ?? element?.textContent?.trim() ?? "")}
>
  {#snippet child({ props })}
    <div
      {...props}
      {...keep}
      data-slot="command-item"
      {...{ "cmdk-item": "" }}
      data-selected={props["aria-selected"] === "true" ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      {...rest}
      class={className}
      sx={command.item}
    >
      {@render children?.()}
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" sx={command.itemIndicator} />
    </div>
  {/snippet}
</Command.Item>
