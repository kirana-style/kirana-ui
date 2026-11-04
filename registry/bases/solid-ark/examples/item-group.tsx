import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
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

export default function ItemGroupExample() {
  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
    grayscale: css({ filter: "grayscale(100%)" }),
    gap1: css({ gap: { "*": null, base: space[1] } }),
    roundedFull: css({ borderRadius: { "*": null, base: radius.full } }),
  }

  const people = [
    {
      username: "kirana",
      avatar: "/avatars/kirana.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "maxleiter",
      avatar: "https://github.com/maxleiter.png",
      email: "maxleiter@vercel.com",
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@vercel.com",
    },
  ]

  return (
    <div sx={page.example}>
      <ItemGroup sx={styles.narrow}>
        <For each={people}>
          {(person) => (
            <Item variant="outline">
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
          )}
        </For>
      </ItemGroup>
    </div>
  )
}
