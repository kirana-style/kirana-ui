<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { css } from "@kirana-style/core"
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
  import { Field, FieldDescription, FieldError, FieldLabel } from "../../ui/field"
  import { space } from "../../../../core/scales"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const styles = {
    flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const
</script>

<Example title="Combobox Multiple Invalid" {...rest} sx={className as Sx}>
  <div sx={[styles.flexCol4, example.row]}>
    <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0], frameworks[1]]}>
      <ComboboxChips>
        <ComboboxValue>
          {#snippet children(values)}
            {#each values as value (value)}
              <ComboboxChip value={value}>
                {value}
              </ComboboxChip>
            {/each}
            <ComboboxChipsInput aria-invalid="true" />
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
    <Field data-invalid="true">
      <FieldLabel for="combobox-multiple-invalid">
        Frameworks
      </FieldLabel>
      <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0], frameworks[1], frameworks[2]]}>
        <ComboboxChips>
          <ComboboxValue>
            {#snippet children(values)}
              {#each values as value (value)}
                <ComboboxChip value={value}>
                  {value}
                </ComboboxChip>
              {/each}
              <ComboboxChipsInput id="combobox-multiple-invalid" aria-invalid="true" />
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
      <FieldDescription>
        Please select at least one framework.
      </FieldDescription>
      <FieldError errors={[{ message: 'This field is required.' }]} />
    </Field>
  </div>
</Example>
