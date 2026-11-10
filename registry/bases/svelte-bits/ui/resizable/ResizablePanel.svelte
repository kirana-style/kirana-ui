<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Pane } from "paneforge"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"

  import { PANELS } from "./context"
  import type { PanelsContext } from "./context"

  /** One of the group's `panels`, by its id: its first size, its limits and its order come from there. */
  let {
    id,
    class: className,
    children,
    ...rest
  }: {
    id: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const group = getContext<PanelsContext | undefined>(PANELS)
  const index = $derived(group?.panels().findIndex((panel) => panel.id === id) ?? -1)
  const entry = $derived(group?.panels()[index])
</script>

<Pane
  data-slot="resizable-panel"
  {id}
  order={index}
  defaultSize={group?.defaultSize()?.[index]}
  minSize={entry?.minSize}
  maxSize={entry?.maxSize}
  {...rest}
  sx={className as Sx}
>
  {@render children?.()}
</Pane>
