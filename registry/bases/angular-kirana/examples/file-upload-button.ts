import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  FileUpload,
  FileUploadDropzone,
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
    FileUploadDropzone,
    FileUploadList,
    FileUploadTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFileUpload [accept]="'.pdf,.doc,.docx'" [sx]="styles.upload">
        <!-- PF-079: the file input is drawn by the dropzone, so a button-only upload keeps one, hidden. -->
        <div kuiFileUploadDropzone hidden></div>
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
