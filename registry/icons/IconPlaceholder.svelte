<script lang="ts">
  /**
   * `IconPlaceholder` for Svelte, Vue's (`IconPlaceholder.vue`) over the same data. The library is
   * the design system's, set under `ICON_LIBRARY` (`./svelte.ts`); the size is the control's
   * (`controlIcons` in `styles/control.ts`). A caller's `sx` arrives as `class`.
   */
  import { getContext, onDestroy } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
  import { iconDataVersion, resolveIcon, subscribeIconData } from "./data"
  import { ICON_LIBRARY } from "./svelte"
  import type { IconLibraryContext } from "./svelte"

  let {
    lucide,
    hugeicons,
    tabler,
    phosphor,
    remixicon,
    class: className,
    ...rest
  }: {
    lucide: string
    hugeicons: string
    tabler: string
    phosphor: string
    remixicon: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const library =
    getContext<IconLibraryContext | undefined>(ICON_LIBRARY) ??
    (() => DEFAULT_DESIGN_SYSTEM.iconLibrary)
  // Draws again when a library's data arrives (Tabler, Phosphor and Remix Icon load on demand).
  let version = $state(iconDataVersion())
  onDestroy(subscribeIconData(() => (version = iconDataVersion())))
  const resolved = $derived(
    (void version,
    resolveIcon(library(), { lucide, hugeicons, tabler, phosphor, remixicon }))
  )
</script>

{#if resolved}
  <svg aria-hidden="true" {...resolved.svg} {...rest} class={className}>
    {#each resolved.nodes as [tag, attributes], index (index)}
      <svelte:element this={tag} {...attributes} />
    {/each}
  </svg>
{/if}
