<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { ListboxContent } from "@ark-ui/svelte"

  import { command } from "../../../../styles/command.styles"

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

<ListboxContent>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="command-list" {...{ "cmdk-list": "" }} aria-label="Suggestions" {...rest} sx={[command.list, className as Sx]}>
      <div {...{ "cmdk-list-sizer": "" }}>
        {@render children?.()}
      </div>
    </div>
  {/snippet}
</ListboxContent>
