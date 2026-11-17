<script lang="ts">
  import type { Snippet } from "svelte"

  import { directionOf, setDirection } from "./context"

  /**
   * The reading direction for every part inside, from a locale, as Svelte's Ark UI parts take it
   * (`<DirectionProvider locale="ar">`, Base UI's `<DirectionProvider direction="rtl">`). Bits UI
   * has no provider of its own: its parts read this one (`useDirection`) for their `dir`.
   */
  let { locale = "en-US", children }: { locale?: string; children?: Snippet } =
    $props()

  const direction = $derived(directionOf(locale))
  setDirection(() => direction)
</script>

{@render children?.()}
