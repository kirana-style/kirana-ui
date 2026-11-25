<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import { fileUpload } from "../../../../styles/file-upload.styles"

  /** The file's size as people read one, unless given children. */
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

<FileUpload.ItemSize data-slot="file-upload-item-size" {children} {...rest} sx={[fileUpload.itemSize, className as Sx]} />
