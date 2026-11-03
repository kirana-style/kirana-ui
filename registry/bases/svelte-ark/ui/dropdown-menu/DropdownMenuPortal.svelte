<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    children
  }: {
    children?: Snippet
  } = $props()

  // Upstream's portal around the content. The content here teleports itself to `<body>`, so this only
  // passes its children through, for markup written for both.
</script>

{@render children?.()}
