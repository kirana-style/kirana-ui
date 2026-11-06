import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"

const styles = {
  empty: css({
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
}

@Component({
  selector: "kui-file-upload",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>File Upload</div>
        <div kuiCardDescription>Drag and drop or browse</div>
      </div>
      <div kuiCardContent>
        <div kuiEmpty [sx]="styles.empty">
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
            <div kuiEmptyTitle>Upload files</div>
            <div kuiEmptyDescription>PNG, JPG, PDF up to 10MB</div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>Browse Files</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FileUpload {
  protected readonly styles = styles
}
