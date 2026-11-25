<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { FileUpload } from "@kirana-ui/svelte/file-upload"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"
  import { useFileUploadEntry } from "./context"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  /**
   * A ghost icon Button that removes its file. Without children it draws a cross, named "Remove"
   * and the file's name.
   */
  let {
    variant = "ghost",
    size = "icon-xs",
    class: className,
    children,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const entry = useFileUploadEntry()
  const label = $derived.by(() => {
    const current = entry?.()
    return children === undefined && current ? `Remove ${current.file.name}` : undefined
  })
</script>

<FileUpload.ItemRemove data-slot="file-upload-item-remove" aria-label={label} {...rest}>
  {#snippet child({ props })}
    <Button {...props} {variant} {size} sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
      {/if}
    </Button>
  {/snippet}
</FileUpload.ItemRemove>
