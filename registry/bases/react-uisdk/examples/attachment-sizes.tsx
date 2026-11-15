import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment"
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

export default function AttachmentSizes() {
  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoFlexWFullMaxWSmFle}>
        <Attachment size="default" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Default attachment</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="sm" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Small attachment</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="xs" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Extra small attachment</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      </div>
    </div>
  )
}
