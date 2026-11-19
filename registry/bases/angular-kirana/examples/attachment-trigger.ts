import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

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

@Component({
  selector: "attachment-trigger",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoWFullMaxWSmPy12">
        <ng-container kuiDialog>
          <div kuiAttachment [sx]="styles.full">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileSearchIcon"
                tabler="IconFileSearch"
                hugeicons="FileSearchIcon"
                phosphor="FileSearchIcon"
                remixicon="RiFileSearchLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>research-summary.pdf</span>
              <span kuiAttachmentDescription>Open preview dialog</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Copy link">
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              </button>
              <button
                kuiAttachmentAction
                aria-label="Remove research-summary.pdf"
              >
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
            <button
              kuiAttachmentTrigger
              kuiDialogTrigger
              aria-label="Preview research-summary.pdf"
            ></button>
          </div>
          <div kuiDialogContent [sx]="styles.smMaxWMd">
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>research-summary.pdf</h2>
              <p kuiDialogDescription>
                The attachment trigger fills the card and opens the dialog,
                while the actions stay independently clickable above it.
              </p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class AttachmentTriggerExample {
  protected readonly styles = styles
  protected readonly page = page
}
