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
  selector: "file-upload-disabled",
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
      <div
        kuiFileUpload
        [disabled]="true"
        [defaultFiles]="defaultFiles"
        [sx]="styles.upload"
      >
        <div kuiFileUploadDropzone aria-label="Upload the signed contract">
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
            <div kuiEmptyTitle>Contract received</div>
            <div kuiEmptyDescription>
              Uploads are closed while it is reviewed.
            </div>
          </div>
          <button kuiFileUploadTrigger size="sm">Browse files</button>
        </div>
        <ul kuiFileUploadList></ul>
      </div>
    </div>
  `,
})
export default class FileUploadDisabled {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly defaultFiles = [
    new File([new Uint8Array(128_400)], "contract-signed.pdf", {
      type: "application/pdf",
    }),
  ]
}
