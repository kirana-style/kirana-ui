"use client"

import * as React from "react"

import type { FileRejection } from "@kirana-ui/react"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { FieldError } from "../ui/field"
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

const MAX_FILES = 3

/** A file of `size` bytes, as the page would hold one already chosen. */
function sample(name: string, size: number, type: string) {
  return new File([new Uint8Array(size)], name, { type })
}

export default function FileUploadMultiple() {
  const [defaultFiles] = React.useState(() => [
    sample("floor-plan.pdf", 482_000, "application/pdf"),
    sample("inventory.xlsx", 36_500, "application/vnd.ms-excel"),
  ])
  const [error, setError] = React.useState<string | null>(null)

  const reject = (rejections: FileRejection[]) => {
    const tooMany = rejections.filter((each) =>
      each.reasons.includes("too-many")
    )
    setError(
      tooMany.length > 0
        ? `Only ${MAX_FILES} files can be attached: ${tooMany
            .map((each) => each.file.name)
            .join(", ")} left out.`
        : null
    )
  }

  return (
    <div sx={page.example}>
      <FileUpload
        multiple
        maxFiles={MAX_FILES}
        defaultFiles={defaultFiles}
        onFilesChange={() => setError(null)}
        onFilesReject={reject}
        sx={styles.upload}
      >
        <FileUploadDropzone aria-label="Attach documents">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
            </EmptyMedia>
            <EmptyTitle>Attach documents</EmptyTitle>
            <EmptyDescription>Up to {MAX_FILES} files.</EmptyDescription>
          </EmptyHeader>
          <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList />
        {error ? <FieldError>{error}</FieldError> : null}
        <FileUploadClear>Remove all</FileUploadClear>
      </FileUpload>
    </div>
  )
}
