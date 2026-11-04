import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

const styles = {
  borderBorderDashed: css({
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: theme.border,
  }),
}

@Component({
  selector: "empty-outline",
  imports: [
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiEmpty [sx]="styles.borderBorderDashed">
        <div kuiEmptyHeader>
          <div kuiEmptyMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="CloudIcon"
              tabler="IconCloud"
              hugeicons="CloudUploadIcon"
              phosphor="CloudIcon"
              remixicon="RiCloudLine"
            ></svg>
          </div>
          <div kuiEmptyTitle>Cloud Storage Empty</div>
          <div kuiEmptyDescription>
            Upload files to your cloud storage to access them anywhere.
          </div>
        </div>
        <div kuiEmptyContent>
          <button kuiButton variant="outline" size="sm">Upload Files</button>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyOutline {
  protected readonly styles = styles
  protected readonly page = page
}
