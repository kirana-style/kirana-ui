import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { space, spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w48: css({ width: { "*": null, base: space[48] } }),
  wFullP2: css({ width: { "*": null, base: "100%" }, padding: space[2] }),
  sizeAvatarSizeAvatarSize: css({ width: spacing(6.5), height: spacing(6.5) }),
  grayscale: css({ filter: "grayscale(100%)" }),
  gap0: css({ gap: { "*": null, base: space[0] } }),
  leadingNone: css({ lineHeight: "1" }),
}

const people = [
  {
    username: "alex",
    avatar: "/avatars/01.png",
    email: "alex@example.com",
  },
  {
    username: "jamie",
    avatar: "/avatars/02.png",
    email: "jamie@example.com",
  },
  {
    username: "taylor",
    avatar: "/avatars/03.png",
    email: "taylor@example.com",
  },
]

export default function ItemDropdown() {
  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">
          Select{" "}
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
          />
        </Button>
        <DropdownMenu sx={styles.w48} placement="bottom end">
          <DropdownMenuGroup>
            {people.map((person) => (
              <DropdownMenuItem key={person.username}>
                <Item size="xs" sx={styles.wFullP2}>
                  <ItemMedia>
                    <Avatar sx={styles.sizeAvatarSizeAvatarSize}>
                      <AvatarImage src={person.avatar} sx={styles.grayscale} />
                      <AvatarFallback>
                        {person.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent sx={styles.gap0}>
                    <ItemTitle>{person.username}</ItemTitle>
                    <ItemDescription sx={styles.leadingNone}>
                      {person.email}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
