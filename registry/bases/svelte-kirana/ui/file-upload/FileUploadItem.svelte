<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { FileUploadEntry } from "@kirana-ui/svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { fileUpload } from "../../../../styles/file-upload.styles"
  import { item } from "../../../../styles/item.styles"
  import { setFileUploadEntry } from "./context"
  import FileUploadItemName from "./FileUploadItemName.svelte"
  import FileUploadItemRemove from "./FileUploadItemRemove.svelte"
  import FileUploadItemSize from "./FileUploadItemSize.svelte"

  /**
   * One file, a row in Item's outline. Without children it draws a file icon, the name, the size and
   * a button that removes it.
   */
  let {
    entry,
    class: className,
    children,
    ...rest
  }: {
    entry: FileUploadEntry
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setFileUploadEntry(() => entry)
</script>

<FileUpload.Item data-slot="file-upload-item" {entry} {...rest} sx={[item.root({ variant: "outline", size: "sm" }), fileUpload.item, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <IconPlaceholder lucide="FileIcon" tabler="IconFile" hugeicons="FileIcon" phosphor="FileIcon" remixicon="RiFileLine" aria-hidden="true" data-slot="file-upload-item-icon" sx={fileUpload.itemIcon} />
    <FileUploadItemName />
    <FileUploadItemSize />
    <FileUploadItemRemove />
  {/if}
</FileUpload.Item>
