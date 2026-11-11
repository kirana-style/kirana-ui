<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog"
  import { Button } from "../ui/button"
  import { page } from "../../../styles/page.styles"
  import { surface, theme } from "../../../core/tokens"

  const styles = {
    bgDestructive10TextDestr: css({
      backgroundColor: { "*": null, base: surface.destructiveSoft },
      color: theme.destructive,
    }),
  }
</script>

<div sx={page.example}>
  <AlertDialog>
    <AlertDialogTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="destructive">
          Delete Chat
        </Button>
      {/snippet}
    </AlertDialogTrigger>
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia sx={styles.bgDestructive10TextDestr}>
          <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
        </AlertDialogMedia>
        <AlertDialogTitle>
          Delete chat?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete this chat conversation. View
          <a href="#">
            Settings
          </a>
          delete any memories saved during this chat.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel variant="outline">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction variant="destructive">
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
