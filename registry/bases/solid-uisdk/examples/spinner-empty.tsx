import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { Spinner } from "../ui/spinner"
import { page } from "../../../styles/page.styles"

export default function SpinnerEmpty() {
  const styles = {
    full: css({ width: "100%" }),
  }

  return (
    <div sx={page.example}>
      <Empty sx={styles.full}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
