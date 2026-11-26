import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { alert } from "../../../styles/alert.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import { withDefaults } from "../../../lib/solid2/with-defaults"

type AlertVariants = NonNullable<Parameters<typeof alert.root>[0]>

function Alert(props: {
  variant?: AlertVariants["variant"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults({ variant: "default" } as const, props)
  const rest = omit(local, "variant", "class", "sx", "children")
  return (
    <div
      data-slot="alert"
      data-variant={local.variant}
      role="alert"
      {...rest}
      {...styleProps(
        local.class,
        alert.scope,
        alert.root({ variant: local.variant }),
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function AlertAction(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-action"
      {...rest}
      {...styleProps(local.class, alert.action, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AlertDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-description"
      {...rest}
      {...styleProps(local.class, alert.description, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AlertTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="alert-title"
      {...rest}
      {...styleProps(local.class, alert.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
