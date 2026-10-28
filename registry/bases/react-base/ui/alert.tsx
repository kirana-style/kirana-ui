import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { alert } from "../../../styles/alert.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }
type AlertVariants = NonNullable<Parameters<typeof alert.root>[0]>

function Alert({ sx, variant = "default", ...props }: El & AlertVariants) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      {...props}
      sx={[alert.scope, alert.root({ variant }), sx]}
    />
  )
}

function AlertTitle({ sx, ...props }: El) {
  return <div data-slot="alert-title" {...props} sx={[alert.title, sx]} />
}

function AlertDescription({ sx, ...props }: El) {
  return (
    <div
      data-slot="alert-description"
      {...props}
      sx={[alert.description, sx]}
    />
  )
}

function AlertAction({ sx, ...props }: El) {
  return <div data-slot="alert-action" {...props} sx={[alert.action, sx]} />
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
