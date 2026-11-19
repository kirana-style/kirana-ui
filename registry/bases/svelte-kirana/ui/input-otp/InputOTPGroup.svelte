<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { inputOtp } from "../../../../styles/input-otp.styles"

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

<div data-slot="input-otp-group" {...rest} class={className} sx={inputOtp.group}>
  {@render children?.()}
</div>
