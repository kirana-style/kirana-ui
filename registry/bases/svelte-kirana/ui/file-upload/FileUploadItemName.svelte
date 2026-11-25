<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import { fileUpload } from "../../../../styles/file-upload.styles"

  /** The file's name, unless given children. */
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

<FileUpload.ItemName data-slot="file-upload-item-name" {children} {...rest} sx={[fileUpload.itemName, className as Sx]} />
