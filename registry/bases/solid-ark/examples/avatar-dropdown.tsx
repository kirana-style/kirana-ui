import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function AvatarDropdown() {
  const styles = {
    button: css({
      borderRadius: { "*": null, base: radius.full },
    }),
    dropdownMenuContent: css({
      width: { "*": null, base: space[32] },
    }),
  }

  return (
    <div sx={page.example}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild={(props) => (
            <Button {...props()} variant="ghost" size="icon" sx={styles.button}>
              <Avatar>
                <AvatarImage src={"/avatars/kirana.png"} alt="kirana" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          )}
        />
        <DropdownMenuContent sx={styles.dropdownMenuContent}>
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
