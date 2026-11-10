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
  import { Spinner } from "../ui/spinner"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    mxAutoFlexWFullMaxWSmFle: css({
      marginInline: "auto",
      display: "flex",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
      flexDirection: "column",
      gap: { "*": null, base: space[3] },
      paddingBlock: { "*": null, base: space[12] },
    }),
    full: css({ width: "100%" }),
  }

  const images = [
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
      alt: "Workspace",
    },
    {
      name: "desk-reference.jpg",
      meta: "JPG · 1.1 MB",
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
      alt: "Desk",
    },
    {
      name: "office-reference.jpg",
      meta: "JPG · 940 KB",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
      alt: "Office",
    },
  ]
</script>

<div sx={page.example}>
  <div sx={styles.mxAutoFlexWFullMaxWSmFle}>
    <AttachmentGroup>
      {#each images as image (image.name)}
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img src={image.src} alt={image.alt} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              {image.name}
            </AttachmentTitle>
            <AttachmentDescription>
              {image.meta}
            </AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      {/each}
    </AttachmentGroup>
    <Attachment state="uploading" sx={styles.full}>
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>
          sales-dashboard.pdf
        </AttachmentTitle>
        <AttachmentDescription>
          Uploading · 64%
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment sx={styles.full}>
      <AttachmentMedia>
        <IconPlaceholder lucide="FileCodeIcon" tabler="IconFileCode" hugeicons="File01Icon" phosphor="FileCodeIcon" remixicon="RiFileCodeLine" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>
          message-renderer.tsx
        </AttachmentTitle>
        <AttachmentDescription>
          TypeScript · 12 KB
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove message-renderer.tsx">
          <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</div>
