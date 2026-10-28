import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"

const styles = {
  borderBorderDashed: css({
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: theme.border,
  }),
}

export default function EmptyOutline() {
  return (
    <div sx={page.example}>
      <Empty sx={styles.borderBorderDashed}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="CloudIcon"
              tabler="IconCloud"
              hugeicons="CloudUploadIcon"
              phosphor="CloudIcon"
              remixicon="RiCloudLine"
            />
          </EmptyMedia>
          <EmptyTitle>Cloud Storage Empty</EmptyTitle>
          <EmptyDescription>
            Upload files to your cloud storage to access them anywhere.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Upload Files
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
