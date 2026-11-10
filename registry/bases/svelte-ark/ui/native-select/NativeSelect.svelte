<script lang="ts">
  import type { Snippet } from "svelte"
  import type { ClassValue, HTMLSelectAttributes } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { nativeSelect } from "../../../../styles/native-select.styles"

  /** `bind:value` on the select, as on a native one; the caller's `sx` is the wrapper's. */
  let {
    value = $bindable(),
    size = "default",
    class: className,
    children,
    ...rest
  }: Omit<HTMLSelectAttributes, "class" | "value" | "size"> & {
    value?: string
    size?: "sm" | "default"
    class?: ClassValue | null
    children?: Snippet
  } = $props()
</script>

<div data-slot="native-select-wrapper" data-size={size} class={className} sx={nativeSelect.wrapper}>
  <select data-slot="native-select" data-size={size} bind:value {...rest} sx={nativeSelect.select}>
    {@render children?.()}
  </select>
  <IconPlaceholder
    lucide="ChevronDownIcon"
    tabler="IconSelector"
    hugeicons="UnfoldMoreIcon"
    phosphor="CaretDownIcon"
    remixicon="RiArrowDownSLine"
    aria-hidden="true"
    data-slot="native-select-icon"
    sx={nativeSelect.icon}
  />
</div>
