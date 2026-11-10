<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Actions
        </Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <IconPlaceholder lucide="PencilIcon" tabler="IconPencil" hugeicons="EditIcon" phosphor="PencilIcon" remixicon="RiPencilLine" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="ShareIcon" tabler="IconShare2" hugeicons="Share03Icon" phosphor="ShareIcon" remixicon="RiShareLine" />
          Share
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive">
          <IconPlaceholder lucide="TrashIcon" tabler="IconTrash" hugeicons="DeleteIcon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
