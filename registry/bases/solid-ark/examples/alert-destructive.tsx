import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function AlertDestructive() {
  const styles = {
    maxWMd: css({ maxWidth: containerSize.md }),
  }

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
