<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
  } from "../ui/attachment"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    mxAutoWFullMaxWSmPy12: css({
      marginInline: "auto",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
      paddingBlock: { "*": null, base: space[12] },
    }),
    full: css({ width: "100%" }),
    w64: css({ width: { "*": null, base: space[64] } }),
  }

  /** An icon by its name in each library, as `IconPlaceholder` takes it. */
  type IconProps = {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }

  type Item = {
    name: string
    meta: string
    icon?: IconProps
    src?: string
  }

  const items: Item[] = [
    {
      name: "briefing-notes.pdf",
      meta: "PDF · 1.4 MB",
      icon: {
        lucide: "FileTextIcon",
        tabler: "IconFileText",
        hugeicons: "FileIcon",
        phosphor: "FileTextIcon",
        remixicon: "RiFileTextLine",
      },
    },
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    },
    {
      name: "customers.csv",
      meta: "CSV · 18 KB",
      icon: {
        lucide: "TableIcon",
        tabler: "IconTable",
        hugeicons: "TableIcon",
        phosphor: "TableIcon",
        remixicon: "RiTableLine",
      },
    },
    {
      name: "renderer.tsx",
      meta: "TSX · 12 KB",
      icon: {
        lucide: "FileCodeIcon",
        tabler: "IconFileCode",
        hugeicons: "File01Icon",
        phosphor: "FileCodeIcon",
        remixicon: "RiFileCodeLine",
      },
    },
  ]
</script>

<div sx={page.example}>
  <div sx={styles.mxAutoWFullMaxWSmPy12}>
    <AttachmentGroup sx={styles.full}>
      {#each items as item (item.name)}
        <Attachment sx={styles.w64}>
          {#if item.src}
            <AttachmentMedia variant="image">
              <img src={item.src} alt={item.name} />
            </AttachmentMedia>
          {:else if item.icon}
            <AttachmentMedia>
              <IconPlaceholder {...item.icon} />
            </AttachmentMedia>
          {/if}
          <AttachmentContent>
            <AttachmentTitle>
              {item.name}
            </AttachmentTitle>
            <AttachmentDescription>
              {item.meta}
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${item.name}`}>
              <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      {/each}
    </AttachmentGroup>
  </div>
</div>
