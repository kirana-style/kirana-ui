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

const styles = {
  mxAutoWFullMaxWSmPy12: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    paddingBlock: { "*": null, base: space[12] },
  }),
  full: css({ width: "100%" }),
  w64: css({ width: { "*": null, base: space[64] } }),
}

/** An icon by its name in each library, as `IconPlaceholder` takes it. */
type IconProps = {
  lucide: string
  tabler: string
  hugeicons: string
  phosphor: string
  remixicon: string
}

type Item = {
  name: string
  meta: string
  icon?: IconProps
  src?: string
}

const items: Item[] = [
  {
    name: "briefing-notes.pdf",
    meta: "PDF · 1.4 MB",
    icon: {
      lucide: "FileTextIcon",
      tabler: "IconFileText",
      hugeicons: "FileIcon",
      phosphor: "FileTextIcon",
      remixicon: "RiFileTextLine",
    },
  },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  {
    name: "customers.csv",
    meta: "CSV · 18 KB",
    icon: {
      lucide: "TableIcon",
      tabler: "IconTable",
      hugeicons: "TableIcon",
      phosphor: "TableIcon",
      remixicon: "RiTableLine",
    },
  },
  {
    name: "renderer.tsx",
    meta: "TSX · 12 KB",
    icon: {
      lucide: "FileCodeIcon",
      tabler: "IconFileCode",
      hugeicons: "File01Icon",
      phosphor: "FileCodeIcon",
      remixicon: "RiFileCodeLine",
    },
  },
]

@Component({
  selector: "attachment-group",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoWFullMaxWSmPy12">
        <div kuiAttachmentGroup [sx]="styles.full">
          @for (item of items; track item.name) {
            <div kuiAttachment [sx]="styles.w64">
              @if (item.src) {
                <div kuiAttachmentMedia variant="image">
                  <img [attr.src]="item.src" [attr.alt]="item.name" />
                </div>
              } @else if (item.icon) {
                <div kuiAttachmentMedia>
                  <svg
                    iconPlaceholder
                    [lucide]="item.icon.lucide"
                    [tabler]="item.icon.tabler"
                    [hugeicons]="item.icon.hugeicons"
                    [phosphor]="item.icon.phosphor"
                    [remixicon]="item.icon.remixicon"
                  ></svg>
                </div>
              }
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>{{ item.name }}</span>
                <span kuiAttachmentDescription>{{ item.meta }}</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  [attr.aria-label]="\`Remove \${item.name}\`"
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
          }
        </div>
      </div>
    </div>
  `,
})
export default class AttachmentGroupExample {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
