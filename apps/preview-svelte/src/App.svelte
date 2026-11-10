<script lang="ts">
  import { css } from "@kirana-style/core"
  import { previews as arkPreviews } from "@workspace/registry/bases/svelte-ark/previews.ts"
  import { previews as bitsPreviews } from "@workspace/registry/bases/svelte-bits/previews.ts"
  import { space } from "@workspace/registry/core/scales.ts"

  import { LANGUAGE } from "@workspace/registry/bases/svelte-ark/components/language-selector/index.ts"
  import type { LanguageContext } from "@workspace/registry/bases/svelte-ark/components/language-selector/index.ts"
  import { ICON_LIBRARY } from "@workspace/registry/icons/svelte.ts"
  import type { IconLibraryContext } from "@workspace/registry/icons/svelte.ts"
  import { setContext } from "svelte"

  import { design } from "./design.svelte"
  import Charts from "./Charts.svelte"
  import Showcase from "./Showcase.svelte"

  setContext<IconLibraryContext>(ICON_LIBRARY, () => design.current.system.iconLibrary)
  // A right-to-left demo's language, from \`?lang=\` and the docs page's selector.
  setContext<LanguageContext>(LANGUAGE, () => design.current.options.language)

  /**
   * One page per item, as `/preview/svelte/<base>/<item>` (Ark UI's or Bits UI's), the showcase
   * and `/create`'s charts; anything else lists them.
   */
  const route = location.pathname.match(/\/(ark|bits)\/([a-z0-9-]+?)(?:\.html)?\/?$/)
  const base = route?.[1] ?? location.pathname.match(/\/(ark|bits)\/?$/)?.[1] ?? "ark"
  const item = route?.[2]
  const previews = base === "bits" ? bitsPreviews : arkPreviews
  // Loaded only on its own page, as the Vue preview's.
  const load = item ? previews[item] : undefined

  const list = css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    padding: space[6],
  })
</script>

{#if item === "showcase"}
  <Showcase />
{:else if item === "charts"}
  <Charts />
{:else if load}
  {#await load() then module}
    <module.default />
  {/await}
  <!-- Sonner's toaster, as upstream's site mounts it on every page (`top-center`): loaded after
       the page, since only the items that call `toast()` need it. -->
  {#await base === "bits" ? import("@workspace/registry/bases/svelte-bits/ui/sonner/Toaster.svelte") : import("@workspace/registry/bases/svelte-ark/ui/sonner/Toaster.svelte") then toaster}
    <toaster.default position="top-center" />
  {/await}
  <!-- The toast's toaster (Ark UI's), as React's preview mounts Base UI's beside every item. Bits
       UI has no toast. -->
  {#if base === "ark"}
    {#await import("@workspace/registry/bases/svelte-ark/ui/toast/Toaster.svelte") then toaster}
      <toaster.default />
    {/await}
  {/if}
{:else}
  <nav sx={list}>
    {#each Object.keys(previews) as name (name)}
      <a href={`/preview/svelte/${base}/${name}`}>{name}</a>
    {/each}
    <a href={`/preview/svelte/${base}/showcase`}>showcase</a>
  </nav>
{/if}
