<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PasswordInput } from "@kirana-ui/svelte/password-input"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { passwordInput } from "../../../../styles/password-input.styles"

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

<!-- An eye, struck through while the password can be read; children replace it. -->
<PasswordInput.Indicator data-slot="password-input-indicator" {...rest} sx={[passwordInput.indicator, className as Sx]}>
  {#snippet child({ props, state })}
    <span {...props}>
      {#if children}
        {@render children()}
      {:else if state.visible}
        <IconPlaceholder lucide="EyeOffIcon" tabler="IconEyeClosed" hugeicons="ViewOffIcon" phosphor="EyeSlashIcon" remixicon="RiEyeOffLine" />
      {:else}
        <IconPlaceholder lucide="EyeIcon" tabler="IconEye" hugeicons="EyeIcon" phosphor="EyeIcon" remixicon="RiEyeLine" />
      {/if}
    </span>
  {/snippet}
</PasswordInput.Indicator>
