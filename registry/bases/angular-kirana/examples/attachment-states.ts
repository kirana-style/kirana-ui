import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
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
} from "../ui/attachment"
import { Spinner } from "../ui/spinner"

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

@Component({
  selector: "attachment-states",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoFlexWFullMaxWSmFle">
        <div kuiAttachment state="idle" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="ClockIcon"
              tabler="IconClock"
              hugeicons="Clock01Icon"
              phosphor="ClockIcon"
              remixicon="RiTimeLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>selected-file.pdf</span>
            <span kuiAttachmentDescription>Ready to upload</span>
          </div>
          <div kuiAttachmentActions>
            <button kuiAttachmentAction aria-label="Remove selected-file.pdf">
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
        </div>
        <div kuiAttachment state="uploading" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg kuiSpinner></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>design-system.zip</span>
            <span kuiAttachmentDescription>Uploading · 64%</span>
          </div>
          <div kuiAttachmentActions>
            <button kuiAttachmentAction aria-label="Cancel upload">
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
        </div>
        <div kuiAttachment state="processing" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>market-research.pdf</span>
            <span kuiAttachmentDescription>Processing document</span>
          </div>
          <div kuiAttachmentActions>
            <button kuiAttachmentAction aria-label="Remove market-research.pdf">
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
        </div>
        <div kuiAttachment state="error" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileWarningIcon"
              tabler="IconFileAlert"
              hugeicons="FileCorruptIcon"
              phosphor="FileXIcon"
              remixicon="RiFileWarningLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>financial-model.xlsx</span>
            <span kuiAttachmentDescription>Upload failed. Try again.</span>
          </div>
          <div kuiAttachmentActions>
            <button kuiAttachmentAction aria-label="Retry upload">
              <svg
                iconPlaceholder
                lucide="RefreshCwIcon"
                tabler="IconRefresh"
                hugeicons="RepeatIcon"
                phosphor="ArrowsClockwiseIcon"
                remixicon="RiRefreshLine"
              ></svg>
            </button>
            <button
              kuiAttachmentAction
              aria-label="Remove financial-model.xlsx"
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
        </div>
        <div kuiAttachment state="done" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>uploaded-report.pdf</span>
            <span kuiAttachmentDescription>Uploaded · 1.8 MB</span>
          </div>
          <div kuiAttachmentActions>
            <button kuiAttachmentAction aria-label="Remove uploaded-report.pdf">
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
        </div>
      </div>
    </div>
  `,
})
export default class AttachmentStates {
  protected readonly styles = styles
  protected readonly page = page
}
