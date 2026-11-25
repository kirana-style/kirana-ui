<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PasswordInput } from "@kirana-ui/svelte/password-input"

  import { button } from "../../../../styles/button.styles"
  import { inputGroup } from "../../../../styles/input-group.styles"
  import PasswordInputIndicator from "./PasswordInputIndicator.svelte"

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

<!-- The show/hide button, in its addon at the field's inline end; it draws its indicator unless given children. -->
<div data-slot="password-input-addon" data-align="inline-end" sx={inputGroup.addon({ align: "inline-end" })}>
  <PasswordInput.Toggle
    data-slot="password-input-toggle"
    data-size="icon-xs"
    {...rest}
    sx={[button({ variant: "ghost" }), inputGroup.button({ size: "icon-xs" }), className as Sx]}
  >
    {#if children}
      {@render children()}
    {:else}
      <PasswordInputIndicator />
    {/if}
  </PasswordInput.Toggle>
</div>
