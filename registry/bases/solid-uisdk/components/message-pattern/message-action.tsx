import { omit } from "solid-js"
import { Button } from "../../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

export function MessageAction(props: {
  label: string
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const local = props
  const rest = omit(props, "label", "children", "sx", "class")
  return (
    <Tooltip>
      <TooltipTrigger
        asChild={(childProps) => (
          <Button
            {...childProps()}
            variant="ghost"
            size="icon-sm"
            aria-label={local.label}
            {...rest}
          >
            {local.children}
          </Button>
        )}
      />
      <TooltipContent>
        <p>{local.label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
