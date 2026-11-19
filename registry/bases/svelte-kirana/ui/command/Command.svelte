<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "@kirana-ui/svelte/command"

  import { command } from "../../../../styles/command.styles"
  import { setCommand } from "./context"

  /**
   * cmdk's command menu on Kirana UI's: the items come from the markup, what is typed filters them
   * by their text and keywords, groups with no match leave, and choosing an item calls its
   * `onSelect`. The rows keep cmdk's attributes (`cmdk-item` …), which the command's styles read.
   */
  let {
    shouldFilter = true,
    dir,
    class: className,
    children,
    ...rest
  }: {
    shouldFilter?: boolean
    dir?: "ltr" | "rtl"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const selects = new Set<{ value: () => string; select: () => void }>()
  setCommand({
    register(value, select) {
      const entry = { value, select }
      selects.add(entry)
      return () => selects.delete(entry)
    },
  })
  const chosen = (value: string) => {
    for (const entry of selects) if (entry.value() === value) entry.select()
  }
</script>

<Command.Root
  data-slot="command"
  {...{ "cmdk-root": "" }}
  {dir}
  filter={shouldFilter ? undefined : null}
  onSelect={(value: string) => chosen(value)}
  {...rest}
  sx={[command.root, className as Sx]}
>
  {@render children?.()}
</Command.Root>
