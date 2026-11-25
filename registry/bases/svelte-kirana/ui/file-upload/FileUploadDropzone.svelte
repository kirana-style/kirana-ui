<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import { empty } from "../../../../styles/empty.styles"
  import { fileUpload } from "../../../../styles/file-upload.styles"

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

<FileUpload.Dropzone data-slot="file-upload-dropzone" {...rest} sx={[empty.root, fileUpload.dropzone, className as Sx]}>
  {@render children?.()}
</FileUpload.Dropzone>
