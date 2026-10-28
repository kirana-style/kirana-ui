import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  maxWMd: css({ maxWidth: containerSize.md }),
}

export default function AlertDestructive() {
  return (
    <div sx={page.example}>
      <Alert variant="destructive" sx={styles.maxWMd}>
        <IconPlaceholder
          lucide="AlertCircleIcon"
          tabler="IconAlertCircle"
          hugeicons="AlertCircleIcon"
          phosphor="WarningCircleIcon"
          remixicon="RiErrorWarningLine"
        />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Please check your payment method
          and try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
