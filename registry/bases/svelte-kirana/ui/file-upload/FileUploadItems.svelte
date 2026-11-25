<script lang="ts">
  import type { Snippet } from "svelte"
  import type { FileUploadEntry } from "@kirana-ui/svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  /** Draws its snippet once for each file. It draws no element. */
  let { children }: { children: Snippet<[FileUploadEntry]> } = $props()
</script>

<FileUpload.Items {children} />
