<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { AvatarRoot } from "@ark-ui/svelte"

  import { avatar } from "../../../../styles/avatar.styles"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: {
    size?: "default" | "sm" | "lg"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A span, as Base UI's avatar. -->
<AvatarRoot>
  {#snippet asChild(props)}
    <span {...props()} class={props().class} style={props().style} data-slot="avatar" data-size={size} {...rest} sx={[avatar.root, className as Sx]}>
      {@render children?.()}
    </span>
  {/snippet}
</AvatarRoot>
