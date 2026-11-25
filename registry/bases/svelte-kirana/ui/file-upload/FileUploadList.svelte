<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import { fileUpload } from "../../../../styles/file-upload.styles"
  import FileUploadItem from "./FileUploadItem.svelte"

  /** The list of files. Without children it draws a `FileUploadItem` for each file. */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<FileUpload.List data-slot="file-upload-list" {...rest} sx={[fileUpload.list, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <FileUpload.Items>
      {#snippet children(entry)}
        <FileUploadItem {entry} />
      {/snippet}
    </FileUpload.Items>
  {/if}
</FileUpload.List>
