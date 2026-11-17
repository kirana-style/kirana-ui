import type * as React from "react"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

type Item = {
  name: string
  meta: string
  icon?: React.ReactNode
  src?: string
}

const items: Item[] = [
  {
    name: "briefing-notes.pdf",
    meta: "PDF · 1.4 MB",
    icon: (
      <IconPlaceholder
        lucide="FileTextIcon"
        tabler="IconFileText"
        hugeicons="FileIcon"
        phosphor="FileTextIcon"
        remixicon="RiFileTextLine"
      />
    ),
  },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  {
    name: "customers.csv",
    meta: "CSV · 18 KB",
    icon: (
      <IconPlaceholder
        lucide="TableIcon"
        tabler="IconTable"
        hugeicons="TableIcon"
        phosphor="TableIcon"
        remixicon="RiTableLine"
      />
    ),
  },
  {
    name: "renderer.tsx",
    meta: "TSX · 12 KB",
    icon: (
      <IconPlaceholder
        lucide="FileCodeIcon"
        tabler="IconFileCode"
        hugeicons="File01Icon"
        phosphor="FileCodeIcon"
        remixicon="RiFileCodeLine"
      />
    ),
  },
]

export default function AttachmentGroupDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoWFullMaxWSmPy12}>
        <AttachmentGroup sx={styles.full}>
          {items.map((item) => {
            return (
              <Attachment key={item.name} sx={styles.w64}>
                {item.src ? (
                  <AttachmentMedia variant="image">
                    <img src={item.src} alt={item.name} />
                  </AttachmentMedia>
                ) : item.icon ? (
                  <AttachmentMedia>{item.icon}</AttachmentMedia>
                ) : null}
                <AttachmentContent>
                  <AttachmentTitle>{item.name}</AttachmentTitle>
                  <AttachmentDescription>{item.meta}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label={`Remove ${item.name}`}>
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
            )
          })}
        </AttachmentGroup>
      </div>
    </div>
  )
}
