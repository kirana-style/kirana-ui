<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { attachment } from "../../../../styles/attachment.styles"

  let {
    state = "done",
    size = "default",
    orientation = "horizontal",
    class: className,
    children,
    ...rest
  }: {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
    size?: "default" | "sm" | "xs"
    orientation?: "horizontal" | "vertical"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="attachment" data-state={state} data-size={size} data-orientation={orientation} {...rest} sx={[attachment.root, className as Sx]}>
  {@render children?.()}
</div>
