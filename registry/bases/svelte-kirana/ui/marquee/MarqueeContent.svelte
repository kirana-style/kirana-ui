<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { marquee } from "../../../../styles/marquee.styles"

  /** One run of the items. The marquee draws it twice; a caller rarely writes it. */
  let {
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: ClassValue | null
    children?: Snippet
  } = $props()
</script>

<div data-slot="marquee-content" {...rest} class={className} sx={marquee.content}>
  {@render children?.()}
</div>
