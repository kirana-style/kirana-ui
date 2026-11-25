import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "file-upload-demo",
  imports: [
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    FileUpload,
    FileUploadDropzone,
    FileUploadList,
    FileUploadTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFileUpload [multiple]="true" [sx]="styles.upload">
        <div kuiFileUploadDropzone aria-label="Upload receipts">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="UploadCloudIcon"
                tabler="IconCloudUpload"
                hugeicons="CloudUploadIcon"
                phosphor="CloudArrowUpIcon"
                remixicon="RiUploadCloudLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>Drop your receipts here</div>
            <div kuiEmptyDescription>Or choose them from your device.</div>
          </div>
          <button kuiFileUploadTrigger size="sm">Browse files</button>
        </div>
        <ul kuiFileUploadList></ul>
      </div>
    </div>
  `,
})
export default class FileUploadDemo {
  protected readonly styles = styles
  protected readonly page = page
}
