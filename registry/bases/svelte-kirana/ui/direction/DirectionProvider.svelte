<script lang="ts">
  import type { Snippet } from "svelte"
  import { DirectionProvider } from "@kirana-ui/svelte/direction"

  import { directionOf, setDirection } from "./context"

  /**
   * The reading direction for every part inside, from a locale, as Svelte's Ark UI parts take it
   * (`<DirectionProvider locale="ar">`, Base UI's `<DirectionProvider direction="rtl">`): Kirana
   * UI's provider for its parts, and the registry's own context for the parts that read it.
   */
  let { locale = "en-US", children }: { locale?: string; children?: Snippet } =
    $props()

  const direction = $derived(directionOf(locale))
  setDirection(() => direction)
</script>

<DirectionProvider direction={direction.dir}>
  {@render children?.()}
</DirectionProvider>
