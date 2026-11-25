<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { marquee } from "../../../../styles/marquee.styles"

  /** One item in the run. */
  let {
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: ClassValue | null
    children?: Snippet
  } = $props()
</script>

<div data-slot="marquee-item" {...rest} class={className} sx={marquee.item}>
  {@render children?.()}
</div>
