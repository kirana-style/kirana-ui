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
    gap: { "*": null, base: space[2] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  full: css({ width: "100%" }),
}

export default function AttachmentStates() {
  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoFlexWFullMaxWSmFle}>
        <Attachment state="idle" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="ClockIcon"
              tabler="IconClock"
              hugeicons="Clock01Icon"
              phosphor="ClockIcon"
              remixicon="RiTimeLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>selected-file.pdf</AttachmentTitle>
            <AttachmentDescription>Ready to upload</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove selected-file.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="uploading" sx={styles.full}>
          <AttachmentMedia>
            <Spinner />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>design-system.zip</AttachmentTitle>
            <AttachmentDescription>Uploading · 64%</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Cancel upload">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="processing" sx={styles.full}>
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
            <AttachmentTitle>market-research.pdf</AttachmentTitle>
            <AttachmentDescription>Processing document</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove market-research.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="error" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileWarningIcon"
              tabler="IconFileAlert"
              hugeicons="FileCorruptIcon"
              phosphor="FileXIcon"
              remixicon="RiFileWarningLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
            <AttachmentDescription>
              Upload failed. Try again.
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Retry upload">
              <IconPlaceholder
                lucide="RefreshCwIcon"
                tabler="IconRefresh"
                hugeicons="RepeatIcon"
                phosphor="ArrowsClockwiseIcon"
                remixicon="RiRefreshLine"
              />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove financial-model.xlsx">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="done" sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
            <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove uploaded-report.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>
    </div>
  )
}
