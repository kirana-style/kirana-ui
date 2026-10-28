import { css, select } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWLgFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
  size10: css({
    width: { "*": null, base: space[10] },
    height: { "*": null, base: space[10] },
  }),
  roundedFull: css({ borderRadius: { "*": null, base: radius.full } }),
  flexSpaceX2DataSlotAvata: css({
    display: "flex",
    [select.child(":not(:last-child)")]: {
      marginInlineEnd: `calc(${space[2]} * -1)`,
    },
    [select.child('[data-slot="avatar"]')]: {
      boxShadow: `0 0 0 2px ${theme.background}`,
      filter: "grayscale(100%)",
    },
  }),
  hiddenSmFlex: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "flex" },
  }),
}

export default function ItemAvatar() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWLgFlexColGa}>
        <Item variant="outline">
          <ItemMedia>
            <Avatar sx={styles.size10}>
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Evil Rabbit</ItemTitle>
            <ItemDescription>Last seen 5 months ago</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon-sm"
              variant="outline"
              sx={styles.roundedFull}
              aria-label="Invite"
            >
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
        <Item variant="outline">
          <ItemMedia>
            <div sx={styles.flexSpaceX2DataSlotAvata}>
              <Avatar sx={styles.hiddenSmFlex}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar sx={styles.hiddenSmFlex}>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>No Team Members</ItemTitle>
            <ItemDescription>
              Invite your team to collaborate on this project.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Invite
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  )
}
