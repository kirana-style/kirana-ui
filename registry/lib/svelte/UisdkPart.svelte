<script lang="ts">
  import type { Component, Snippet } from "svelte"

  import { mergeProps, propsFn } from "./as-child"
  import type { AsChild } from "./as-child"

  /**
   * A ui-sdk part rendered under the registry's slot. ui-sdk writes its own `data-slot` on every
   * part over the caller's (LF-023); its `render` snippet hands the part's attributes (the
   * attachment that binds its element included) to an element of the caller's. So the part renders
   * through it: as `tag` (the element Base UI's part renders) under `slotName`, or a slot the
   * caller hands it (`data-slot`), or, with `asChild` (the Ark UI parts' snippet), as the caller's
   * own element, its own slot kept when it names one. The rest of the props are the part's: its
   * options, and the classes and attributes ui-sdk merges onto the element.
   */
  let {
    part: Part,
    slotName,
    tag = "div",
    asChild,
    children,
    ...rest
  }: {
    /** The ui-sdk part (`CollapsibleTrigger` …). */
    // `any`: each part's props are its own.
    part: Component<any>
    /** The registry's slot, shadcn/ui's name, which the styles read. Not `name`, a form field's. */
    slotName: string
    /** The element it renders, as Base UI's part renders it. */
    tag?: string
    asChild?: AsChild
    /** Its content, given the part's state. */
    children?: Snippet<[any]>
    [attribute: string]: unknown
  } = $props()

  const slot = $derived(
    typeof rest["data-slot"] === "string" ? rest["data-slot"] : slotName
  )
  const VOID = new Set(["area", "br", "col", "hr", "img", "input", "wbr"])
</script>

<!-- The content is the caller's, or ui-sdk's own when the caller gives none (a progress value's
     text), as ui-sdk hands it back. -->
{#snippet render({
  props,
  state,
  children: content,
}: {
  props: Record<PropertyKey, unknown>
  state: unknown
  children?: Snippet<[any]>
})}
  {#if asChild}
    {@render asChild(propsFn(mergeProps(props, { "data-slot": slot })))}
  {:else if VOID.has(tag)}
    <svelte:element this={tag} {...props} data-slot={slot} />
  {:else}
    <svelte:element this={tag} {...props} data-slot={slot}>
      {@render content?.(state)}
    </svelte:element>
  {/if}
{/snippet}

<Part {...rest} {children} {render} />
