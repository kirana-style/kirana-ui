<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { ToggleGroup } from "bits-ui"
  import { setContext, untrack } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import type { toggle } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  /**
   * Bits UI's toggle group, taking Svelte's Ark UI part's props: `multiple`, and a value that is
   * always a list (`defaultValue`, `value` or `bind:value`, `onValueChange` with `{ value }`). Bits'
   * single group takes one value, so the list's first goes in and comes back out as a list. A
   * caller's `dir` lands on the root, which Bits' roving focus reads.
   */
  let {
    variant,
    size,
    spacing = 2,
    orientation = "horizontal",
    multiple = false,
    defaultValue,
    value = $bindable(),
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
    multiple?: boolean
    defaultValue?: string[]
    value?: string[]
    onValueChange?: (details: { value: string[] }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state<string[]>(untrack(() => defaultValue ?? []))
  const current = $derived(value ?? own)
  const change = (next: string | string[]) => {
    const list = Array.isArray(next) ? next : next ? [next] : []
    own = list
    if (value !== undefined) value = list
    onValueChange?.({ value: list })
  }

  setContext<ToggleGroupContext>(TOGGLE_GROUP, {
    get variant() {
      return variant
    },
    get size() {
      return size
    },
    get spacing() {
      return spacing
    },
  })
</script>

<!-- The gap, in steps of 0.25rem, as upstream hands it down. -->
{#if multiple}
  <ToggleGroup.Root
    type="multiple"
    data-slot="toggle-group"
    data-variant={variant}
    data-size={size}
    data-spacing={spacing}
    {orientation}
    style={`--gap: ${spacing}`}
    {...rest}
    value={current}
    onValueChange={change}
    sx={[toggleGroup.root, className as Sx]}
  >
    {@render children?.()}
  </ToggleGroup.Root>
{:else}
  <ToggleGroup.Root
    type="single"
    data-slot="toggle-group"
    data-variant={variant}
    data-size={size}
    data-spacing={spacing}
    {orientation}
    style={`--gap: ${spacing}`}
    {...rest}
    value={current[0] ?? ""}
    onValueChange={change}
    sx={[toggleGroup.root, className as Sx]}
  >
    {@render children?.()}
  </ToggleGroup.Root>
{/if}
