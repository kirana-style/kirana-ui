import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  maxWMd: css({ maxWidth: containerSize.md }),
}

export default function AlertBasic() {
  return (
    <div sx={page.example}>
      <Alert sx={styles.maxWMd}>
        <IconPlaceholder
          lucide="CheckCircle2Icon"
          tabler="IconCircleCheckFilled"
          hugeicons="CheckmarkCircle02Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleLine"
        />
        <AlertTitle>Account updated successfully</AlertTitle>
        <AlertDescription>
          Your profile information has been saved. Changes will be reflected
          immediately.
        </AlertDescription>
      </Alert>
    </div>
  )
}
