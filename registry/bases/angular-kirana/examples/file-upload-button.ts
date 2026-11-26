import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  FileUpload,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "file-upload-button",
  imports: [
    FileUpload,
    FileUploadList,
    FileUploadTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFileUpload [accept]="'.pdf,.doc,.docx'" [sx]="styles.upload">
        <button kuiFileUploadTrigger>
          <svg
            iconPlaceholder
            lucide="UploadCloudIcon"
            tabler="IconCloudUpload"
            hugeicons="CloudUploadIcon"
            phosphor="CloudArrowUpIcon"
            remixicon="RiUploadCloudLine"
          ></svg>
          Upload your CV
        </button>
        <ul kuiFileUploadList></ul>
      </div>
    </div>
  `,
})
export default class FileUploadButton {
  protected readonly styles = styles
  protected readonly page = page
}
