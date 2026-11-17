<script lang="ts">
  import type { Snippet } from "svelte"

  // Base UI's portal, which ui-sdk's content does itself (its root's `container`): its children.
  let { children }: { children?: Snippet; [attribute: string]: unknown } = $props()
</script>

{@render children?.()}
