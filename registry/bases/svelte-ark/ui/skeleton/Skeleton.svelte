<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"

  import { skeleton } from "../../../../styles/skeleton.styles"

  let {
    class: className,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & { class?: string } =
    $props()
</script>

<div data-slot="skeleton" {...rest} sx={[skeleton, className]}></div>
