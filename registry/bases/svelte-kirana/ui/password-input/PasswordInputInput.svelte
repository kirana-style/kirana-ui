<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { PasswordInput } from "@kirana-ui/svelte/password-input"

  import { input } from "../../../../styles/input.styles"
  import { inputGroup } from "../../../../styles/input-group.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<PasswordInput.Input data-slot="password-input-input" {...rest} sx={[input, inputGroup.input, className as Sx]} />
