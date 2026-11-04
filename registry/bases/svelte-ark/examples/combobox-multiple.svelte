<script lang="ts">

  import { css } from "@kirana-style/core"
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
  } from "../ui/combobox"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"


  const styles = {
    wFullMaxWXs: css({
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.xs,
    }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const
</script>

<div sx={page.example}>
  <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0]]}>
    <ComboboxChips sx={styles.wFullMaxWXs}>
      <ComboboxValue>
        {#snippet children(values)}
          {#each values as value (value)}
            <ComboboxChip value={value}>
              {value}
            </ComboboxChip>
          {/each}
          <ComboboxChipsInput />
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
</div>
