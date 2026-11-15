import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { page } from "../../../styles/page.styles"
import { color, containerSize } from "../../../core/scales"

const styles = {
  maxWMdBorderAmber200BgAm: css({
    maxWidth: containerSize.md,
    borderColor: {
      "*": null,
      base: `light-dark(${color.amber[200]}, ${color.amber[900]})`,
    },
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.amber[50]}, ${color.amber[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.amber[900]}, ${color.amber[50]})`,
    },
  }),
}

export default function AlertColors() {
  return (
    <div sx={page.example}>
      <Alert sx={styles.maxWMdBorderAmber200BgAm}>
        <IconPlaceholder
          lucide="AlertTriangleIcon"
          tabler="IconAlertTriangle"
          hugeicons="AlertCircleIcon"
          phosphor="WarningIcon"
          remixicon="RiErrorWarningLine"
        />
        <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
        <AlertDescription>
          Renew now to avoid service interruption or upgrade to a paid plan to
          continue using the service.
        </AlertDescription>
      </Alert>
    </div>
  )
}
