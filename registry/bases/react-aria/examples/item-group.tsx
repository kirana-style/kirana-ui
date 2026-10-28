import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { containerSize, space } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  grayscale: css({ filter: "grayscale(100%)" }),
  gap1: css({ gap: { "*": null, base: space[1] } }),
  roundedFull: css({ borderRadius: { "*": null, base: radius.full } }),
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

export default function ItemGroupExample() {
  return (
    <div sx={page.example}>
      <ItemGroup sx={styles.narrow}>
        {people.map((person) => (
          <Item key={person.username} variant="outline">
            <ItemMedia>
              <Avatar>
                <AvatarImage src={person.avatar} sx={styles.grayscale} />
                <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent sx={styles.gap1}>
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="icon" sx={styles.roundedFull}>
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
