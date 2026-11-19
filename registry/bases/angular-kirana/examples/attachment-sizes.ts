import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment"

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

@Component({
  selector: "attachment-sizes",
  imports: [
    Attachment,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoFlexWFullMaxWSmFle">
        <div kuiAttachment size="default" [sx]="styles.full">
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
            <span kuiAttachmentTitle>Default attachment</span>
            <span kuiAttachmentDescription>PDF · 2.4 MB</span>
          </div>
        </div>
        <div kuiAttachment size="sm" [sx]="styles.full">
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
            <span kuiAttachmentTitle>Small attachment</span>
            <span kuiAttachmentDescription>PDF · 2.4 MB</span>
          </div>
        </div>
        <div kuiAttachment size="xs" [sx]="styles.full">
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
            <span kuiAttachmentTitle>Extra small attachment</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AttachmentSizes {
  protected readonly styles = styles
  protected readonly page = page
}
