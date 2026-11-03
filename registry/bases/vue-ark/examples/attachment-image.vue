<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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
  AttachmentTrigger,
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

<template>
  <div :sx="page.example">
    <div :sx="styles.mxAutoWFullMaxWSmPy12">
      <AttachmentGroup :sx="styles.full">
        <Attachment
          v-for="image in images"
          :key="image.name"
          orientation="vertical"
        >
          <AttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              {{ image.name }}
            </AttachmentTitle>
            <AttachmentDescription>
              {{ image.meta }}
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="`Remove ${image.name}`">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger as-child>
            <a
              :href="image.src"
              target="_blank"
              rel="noreferrer"
              :aria-label="`Open ${image.name}`"
            ></a>
          </AttachmentTrigger>
        </Attachment>
      </AttachmentGroup>
    </div>
  </div>
</template>
