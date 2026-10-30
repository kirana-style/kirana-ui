import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Message, MessageContent } from "../ui/message"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

export default function MessageAttachmentDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Message align="end">
          <MessageContent>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </AttachmentMedia>
            </Attachment>
            <Bubble>
              <BubbleContent>
                Here&apos;s the image. Can you add it to the PDF? Use it for the
                cover page.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the PDF with the image added as the cover
                page.
              </BubbleContent>
            </Bubble>
            <Attachment>
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
                <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  type="button"
                  title="Download"
                  aria-label="Download"
                  size="icon-sm"
                  variant="secondary"
                >
                  <IconPlaceholder
                    lucide="DownloadIcon"
                    tabler="IconDownload"
                    hugeicons="DownloadIcon"
                    phosphor="DownloadIcon"
                    remixicon="RiDownloadLine"
                  />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Thanks. Looks good.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
