<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { Button } from "../../../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu"
  import { styles } from "./data-table"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<DropdownMenu {...rest} sx={className as Sx}>
  <DropdownMenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()} class={props().class} style={props().style} variant="ghost" sx={styles.button} size="icon">
        <IconPlaceholder lucide="EllipsisVerticalIcon" tabler="IconDotsVertical" hugeicons="MoreVerticalCircle01Icon" phosphor="DotsThreeVerticalIcon" remixicon="RiMore2Line" />
        <span sx={styles.span}>
          Open menu
        </span>
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
    <DropdownMenuItem>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      Make a copy
    </DropdownMenuItem>
    <DropdownMenuItem>
      Favorite
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
