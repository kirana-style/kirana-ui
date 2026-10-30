import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  dropdownMenu: css({
    width: { "*": null, base: space[32] },
  }),
}

export default function AvatarDropdown() {
  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" sx={styles.button}>
          <Avatar>
            <AvatarImage src="/avatars/kirana.png" alt="kirana" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        <DropdownMenu sx={styles.dropdownMenu}>
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
