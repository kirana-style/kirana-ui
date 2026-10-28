import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  gridWFullMaxWMdItemsStar: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    alignItems: "flex-start",
    gap: { "*": null, base: space[4] },
  }),
}

export default function AlertDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWMdItemsStar}>
        <Alert>
          <IconPlaceholder
            lucide="CheckCircle2Icon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
          />
          <AlertTitle>Payment successful</AlertTitle>
          <AlertDescription>
            Your payment of $29.99 has been processed. A receipt has been sent
            to your email address.
          </AlertDescription>
        </Alert>
        <Alert>
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="AlertCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
          <AlertTitle>New feature available</AlertTitle>
          <AlertDescription>
            We&apos;ve added dark mode support. You can enable it in your
            account settings.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
