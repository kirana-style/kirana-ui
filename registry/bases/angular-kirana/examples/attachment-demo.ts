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
  AttachmentGroup,
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

@Component({
  selector: "attachment-demo",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoFlexWFullMaxWSmFle">
        <div kuiAttachmentGroup>
          @for (image of images; track image.name) {
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img [attr.src]="image.src" [attr.alt]="image.alt" />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>{{ image.name }}</span>
                <span kuiAttachmentDescription>{{ image.meta }}</span>
              </div>
            </div>
          }
        </div>
        <div kuiAttachment state="uploading" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg kuiSpinner></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>sales-dashboard.pdf</span>
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
        <div kuiAttachment [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="File01Icon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>message-renderer.tsx</span>
            <span kuiAttachmentDescription>TypeScript · 12 KB</span>
          </div>
          <div kuiAttachmentActions>
            <button
              kuiAttachmentAction
              aria-label="Remove message-renderer.tsx"
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
      </div>
    </div>
  `,
})
export default class AttachmentDemo {
  protected readonly styles = styles
  protected readonly images = images
  protected readonly page = page
}
