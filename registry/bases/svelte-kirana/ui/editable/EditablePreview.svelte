<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Editable } from "@kirana-ui/svelte/editable"

  import { editable } from "../../../../styles/editable.styles"
  import { input } from "../../../../styles/input.styles"

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

<!-- Says the text, or the placeholder while there is none, unless given children. -->
<Editable.Preview data-slot="editable-preview" {children} {...rest} sx={[input, editable.preview, className as Sx]} />
