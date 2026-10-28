import { css } from "@kirana-style/core"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  maxWMd: css({ maxWidth: containerSize.md }),
}

export default function AlertActionExample() {
  return (
    <div sx={page.example}>
      <Alert sx={styles.maxWMd}>
        <AlertTitle>Dark mode is now available</AlertTitle>
        <AlertDescription>
          Enable it under your profile settings to get started.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="default">
            Enable
          </Button>
        </AlertAction>
      </Alert>
    </div>
  )
}
