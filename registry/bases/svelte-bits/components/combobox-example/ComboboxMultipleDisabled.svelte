<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { Example } from "../../components/example"
  import { example } from "../../../../styles/example.styles"
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
  } from "../../ui/combobox"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const
</script>

<Example title="Combobox Multiple Disabled" {...rest} sx={className as Sx}>
  <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0], frameworks[1]]} disabled>
    <ComboboxChips sx={example.row}>
      <ComboboxValue>
        {#snippet children(values)}
          {#each values as value (value)}
            <ComboboxChip value={value}>
              {value}
            </ComboboxChip>
          {/each}
          <ComboboxChipsInput disabled />
        {/snippet}
      </ComboboxValue>
    </ComboboxChips>
    <ComboboxContent>
      <ComboboxEmpty>
        No items found.
      </ComboboxEmpty>
      <ComboboxList>
        {#snippet children({ item })}
          <ComboboxItem value={item}>
            {item}
          </ComboboxItem>
        {/snippet}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Example>
