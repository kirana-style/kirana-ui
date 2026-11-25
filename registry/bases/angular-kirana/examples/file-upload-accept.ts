import { Component, computed, signal } from "@angular/core"
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
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

const MAX_SIZE = 2 * 1024 * 1024

/** What the page says of a file it did not take. */
function why(rejection: FileRejection) {
  if (rejection.reasons.includes("type"))
    return `${rejection.file.name} is not an image.`
  if (rejection.reasons.includes("too-large"))
    return `${rejection.file.name} is larger than 2 MB.`
  return `${rejection.file.name} could not be added.`
}

@Component({
  selector: "file-upload-accept",
  imports: [
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    FieldError,
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
        [multiple]="true"
        [accept]="'image/*'"
        [maxSize]="maxSize"
        [sx]="styles.upload"
        (filesChanged)="errors.set([])"
        (filesRejected)="errors.set(reasons($event))"
      >
        <div kuiFileUploadDropzone aria-label="Upload photos">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="ImageIcon"
                tabler="IconPhoto"
                hugeicons="ImageIcon"
                phosphor="ImageIcon"
                remixicon="RiImageLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>Add photos</div>
            <div kuiEmptyDescription>PNG, JPG or WebP, up to 2 MB each.</div>
          </div>
          <button kuiFileUploadTrigger size="sm">Choose images</button>
        </div>
        @if (errors().length > 0) {
          <div kuiFieldError [errors]="messages()"></div>
        }
        <ul kuiFileUploadList></ul>
      </div>
    </div>
  `,
})
export default class FileUploadAccept {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly maxSize = MAX_SIZE
  protected readonly errors = signal<string[]>([])
  protected readonly messages = computed(() =>
    this.errors().map((message) => ({ message }))
  )

  protected reasons(rejections: FileRejection[]) {
    return rejections.map(why)
  }
}
