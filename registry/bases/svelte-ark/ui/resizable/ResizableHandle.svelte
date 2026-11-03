<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { SplitterResizeTrigger } from "@ark-ui/svelte"

  import { resizable } from "../../../../styles/resizable.styles"

  let {
    id, withHandle = false,
    class: className,
    ...rest
  }: {
    id: `${string}:${string}`
    withHandle?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // Ark's required `id`, the two panels it sits between (`"a:b"`), declared here and passed on.
</script>

<!-- A div, as react-resizable-panels' handle. -->
<SplitterResizeTrigger id={id}>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="resizable-handle" {...rest} sx={[resizable.handle, className as Sx]}>
      {#if withHandle}
        <div sx={resizable.grip}></div>
      {/if}
    </div>
  {/snippet}
</SplitterResizeTrigger>
