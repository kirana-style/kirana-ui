<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { inputGroup } from "../../../../styles/input-group.styles"
  import { Input } from "../input"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Input data-slot="input-group-control" {...rest} sx={[inputGroup.input, className as Sx]} />
