import { Component, signal } from "@angular/core"
import type { FileRejection } from "@kirana-ui/angular"
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

@Component({
  selector: "file-upload-multiple",
  imports: [
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    FieldError,
    FileUpload,
    FileUploadClear,
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
        [multiple]="true"
        [maxFiles]="maxFiles"
        [defaultFiles]="defaultFiles"
        [sx]="styles.upload"
        (filesChanged)="error.set(null)"
        (filesRejected)="reject($event)"
      >
        <div kuiFileUploadDropzone aria-label="Attach documents">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>Attach documents</div>
            <div kuiEmptyDescription>Up to {{ maxFiles }} files.</div>
          </div>
          <button kuiFileUploadTrigger size="sm">Browse files</button>
        </div>
        <ul kuiFileUploadList></ul>
        @if (error()) {
          <div kuiFieldError>{{ error() }}</div>
        }
        <button kuiFileUploadClear>Remove all</button>
      </div>
    </div>
  `,
})
export default class FileUploadMultiple {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly maxFiles = MAX_FILES
  protected readonly defaultFiles = [
    sample("floor-plan.pdf", 482_000, "application/pdf"),
    sample("inventory.xlsx", 36_500, "application/vnd.ms-excel"),
  ]
  protected readonly error = signal<string | null>(null)

  protected reject(rejections: FileRejection[]) {
    const tooMany = rejections.filter((each) =>
      each.reasons.includes("too-many")
    )
    this.error.set(
      tooMany.length > 0
        ? `Only ${MAX_FILES} files can be attached: ${tooMany
            .map((each) => each.file.name)
            .join(", ")} left out.`
        : null
    )
  }
}
