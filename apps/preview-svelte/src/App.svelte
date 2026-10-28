<script lang="ts">
  import { css } from "@kirana-style/core"
  import { previews } from "@workspace/registry/bases/svelte-ark/previews.ts"
  import { space } from "@workspace/registry/core/scales.ts"

  import Showcase from "./Showcase.svelte"

  /** One page per item, as `/preview/svelte/ark/<item>`, and the showcase; anything else lists them. */
  const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
  const Current =
    item && item in previews ? previews[item as keyof typeof previews] : undefined

  const list = css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    padding: space[6],
  })
</script>

{#if item === "showcase"}
  <Showcase />
{:else if Current}
  <Current />
{:else}
  <nav sx={list}>
    {#each Object.keys(previews) as name (name)}
      <a href={`/preview/svelte/ark/${name}`}>{name}</a>
    {/each}
    <a href="/preview/svelte/ark/showcase">showcase</a>
  </nav>
{/if}
