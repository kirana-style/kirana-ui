import { splitProps } from "solid-js"
import { Button } from "../../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function MessageAction(props: {
  label: string
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, ["label", "children", "sx", "class"])
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
