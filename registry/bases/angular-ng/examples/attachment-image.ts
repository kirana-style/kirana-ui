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
  AttachmentTrigger,
} from "../ui/attachment"

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

@Component({
  selector: "attachment-image",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoWFullMaxWSmPy12">
        <div kuiAttachmentGroup [sx]="styles.full">
          @for (image of images; track image.name) {
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img [attr.src]="image.src" [attr.alt]="image.alt" />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>{{ image.name }}</span>
                <span kuiAttachmentDescription>{{ image.meta }}</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  [attr.aria-label]="\`Remove \${image.name}\`"
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
              <a
                kuiAttachmentTrigger
                [attr.href]="image.src"
                target="_blank"
                rel="noreferrer"
                [attr.aria-label]="\`Open \${image.name}\`"
              ></a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export default class AttachmentImage {
  protected readonly styles = styles
  protected readonly images = images
  protected readonly page = page
}
