<script lang="ts">
  import { setContext } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { command } from "../../../../styles/command.styles"
  import { COMMAND_GROUP, useCommand } from "./context"

  let {
    heading,
    class: className,
    children,
    ...rest
  }: {
    heading?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useCommand()
  const group = Symbol("group")
  setContext(COMMAND_GROUP, group)
  const id = $props.id()
</script>

<!-- A group with no match leaves the list, as cmdk's; its items stay mounted to be counted. -->
<div style:display={ctx.groupVisible(group) ? undefined : "none"} data-slot="command-group" {...{ "cmdk-group": "" }} role="presentation" {...rest} sx={[command.group, className as Sx]}>
  {#if heading}
    <div id={id} {...{ "cmdk-group-heading": "" }} aria-hidden="true">
      {heading}
    </div>
  {/if}
  <div {...{ "cmdk-group-items": "" }} role="group" aria-labelledby={heading ? id : undefined}>
    {@render children?.()}
  </div>
</div>
