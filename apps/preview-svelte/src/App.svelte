<script lang="ts">
  import { css } from "@kirana-style/core"
  import { previews } from "@workspace/registry/bases/svelte-ark/previews.ts"
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
   * One page per item, as `/preview/svelte/ark/<item>`, the showcase and `/create`'s charts;
   * anything else lists them.
   */
  const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
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
  {#await import("@workspace/registry/bases/svelte-ark/ui/sonner/Toaster.svelte") then toaster}
    <toaster.default position="top-center" />
  {/await}
  <!-- The toast's toaster (Ark UI's), as React's preview mounts Base UI's beside every item. -->
  {#await import("@workspace/registry/bases/svelte-ark/ui/toast/Toaster.svelte") then toaster}
    <toaster.default />
  {/await}
{:else}
  <nav sx={list}>
    {#each Object.keys(previews) as name (name)}
      <a href={`/preview/svelte/ark/${name}`}>{name}</a>
    {/each}
    <a href="/preview/svelte/ark/showcase">showcase</a>
  </nav>
{/if}
