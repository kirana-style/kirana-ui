<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { inputGroup } from "../../../../styles/input-group.styles"
  import { Textarea } from "../textarea"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Textarea data-slot="input-group-control" {...rest} sx={[inputGroup.textarea, className as Sx]} />
