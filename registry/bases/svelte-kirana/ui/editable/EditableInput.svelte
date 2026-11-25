<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Editable } from "@kirana-ui/svelte/editable"

  import { editable } from "../../../../styles/editable.styles"
  import { input } from "../../../../styles/input.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Editable.Input data-slot="editable-input" {...rest} sx={[input, editable.input, className as Sx]} />
