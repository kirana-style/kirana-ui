<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuSub } from "@ui-sdk/svelte/menu"

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

<MenuSub {...rest}>
  {@render children?.()}
</MenuSub>
