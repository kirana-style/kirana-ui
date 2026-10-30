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
  AttachmentTrigger,
} from "../ui/attachment"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFullMaxWSmPy12: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    paddingBlock: { "*": null, base: space[12] },
  }),
  full: css({ width: "100%" }),
  smMaxWMd: css({ maxWidth: { [breakpoint.sm]: containerSize.md } }),
}

export default function AttachmentTriggerDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoWFullMaxWSmPy12}>
        <DialogTrigger>
          <Attachment sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileSearchIcon"
                tabler="IconFileSearch"
                hugeicons="FileSearchIcon"
                phosphor="FileSearchIcon"
                remixicon="RiFileSearchLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>research-summary.pdf</AttachmentTitle>
              <AttachmentDescription>Open preview dialog</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Copy link">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove research-summary.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <DialogTrigger>
              <AttachmentTrigger aria-label="Preview research-summary.pdf" />
            </DialogTrigger>
          </Attachment>
          <Dialog sx={styles.smMaxWMd}>
            <DialogHeader>
              <DialogTitle>research-summary.pdf</DialogTitle>
              <DialogDescription>
                The attachment trigger fills the card and opens the dialog,
                while the actions stay independently clickable above it.
              </DialogDescription>
            </DialogHeader>
          </Dialog>
        </DialogTrigger>
      </div>
    </div>
  )
}
