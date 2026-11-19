import { splitProps } from "solid-js"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { Button } from "../../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"

export function RowActions(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <DropdownMenu {...rest} class={local.class} sx={[local.sx]}>
      <DropdownMenuTrigger
        asChild={(childProps) => (
          <Button
            {...childProps()}
            variant="ghost"
            sx={styles.button}
            size="icon"
          >
            <IconPlaceholder
              lucide="EllipsisVerticalIcon"
              tabler="IconDotsVertical"
              hugeicons="MoreVerticalCircle01Icon"
              phosphor="DotsThreeVerticalIcon"
              remixicon="RiMore2Line"
            />
            <span sx={styles.span}>Open menu</span>
          </Button>
        )}
      />
      <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
