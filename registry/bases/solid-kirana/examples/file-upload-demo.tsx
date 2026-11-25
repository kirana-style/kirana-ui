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

export default function FileUploadDemo() {
  return (
    <div sx={page.example}>
      <FileUpload multiple sx={styles.upload}>
        <FileUploadDropzone aria-label="Upload receipts">
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
            <EmptyTitle>Drop your receipts here</EmptyTitle>
            <EmptyDescription>
              Or choose them from your device.
            </EmptyDescription>
          </EmptyHeader>
          <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
