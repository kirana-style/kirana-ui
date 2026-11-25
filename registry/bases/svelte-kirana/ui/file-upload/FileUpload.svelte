<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import { fileUpload } from "../../../../styles/file-upload.styles"

  /** Kirana UI's root: `bind:files` is the files held; the rest goes to the primitive. */
  let {
    files = $bindable(),
    class: className,
    children,
    ...rest
  }: {
    files?: File[]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<FileUpload.Root data-slot="file-upload" bind:files {...rest} sx={[fileUpload.root, className as Sx]}>
  {@render children?.()}
</FileUpload.Root>
