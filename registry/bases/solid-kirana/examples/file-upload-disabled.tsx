import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

export default function FileUploadDisabled() {
  const defaultFiles = [
    new File([new Uint8Array(128_400)], "contract-signed.pdf", {
      type: "application/pdf",
    }),
  ]

  return (
    <div sx={page.example}>
      <FileUpload disabled defaultFiles={defaultFiles} sx={styles.upload}>
        <FileUploadDropzone aria-label="Upload the signed contract">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPlaceholder
                lucide="UploadCloudIcon"
                tabler="IconCloudUpload"
                hugeicons="CloudUploadIcon"
                phosphor="CloudArrowUpIcon"
                remixicon="RiUploadCloudLine"
              />
            </EmptyMedia>
            <EmptyTitle>Contract received</EmptyTitle>
            <EmptyDescription>
              Uploads are closed while it is reviewed.
            </EmptyDescription>
          </EmptyHeader>
          <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
