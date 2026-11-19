<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "@kirana-ui/svelte/select"

  import { menuLabel } from "../../../../styles/menu.styles"

  // The group's label: inside its group, as Base UI's label must be.
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Select.GroupLabel data-slot="select-label" {...rest} sx={[menuLabel, className as Sx]}>
  {@render children?.()}
</Select.GroupLabel>
