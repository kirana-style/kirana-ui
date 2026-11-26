import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  FileUpload,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

export default function FileUploadButton() {
  return (
    <div sx={page.example}>
      <FileUpload accept=".pdf,.doc,.docx" sx={styles.upload}>
        <FileUploadTrigger>
          <IconPlaceholder
            lucide="UploadCloudIcon"
            tabler="IconCloudUpload"
            hugeicons="CloudUploadIcon"
            phosphor="CloudArrowUpIcon"
            remixicon="RiUploadCloudLine"
          />
          Upload your CV
        </FileUploadTrigger>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
