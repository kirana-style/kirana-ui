<script lang="ts" generics="T extends HTMLTag">
  import type { Snippet } from "svelte"
  import type { SvelteHTMLElements } from "svelte/elements"

  import { propsFn } from "./as-child"
  import type { AsChild, HTMLTag } from "./as-child"

  /**
   * A part's element, `as`, or the caller's own through `asChild` (`as-child.ts`), as Ark UI's
   * `Ark` renders: the parts on Bits UI, which has no such factory, render through it.
   */
  let {
    as,
    asChild,
    children,
    ref = $bindable(null),
    ...rest
  }: SvelteHTMLElements[T] & {
    as: T
    asChild?: AsChild<T>
    children?: Snippet
    ref?: Element | null
  } = $props()

  const VOID = new Set(["area", "br", "col", "hr", "img", "input", "wbr"])
</script>

{#if asChild}
  {@render asChild(propsFn<T>(rest))}
{:else if VOID.has(String(as))}
  <svelte:element this={as} {...rest} bind:this={ref} />
{:else}
  <svelte:element this={as} {...rest} bind:this={ref}>
    {@render children?.()}
  </svelte:element>
{/if}
