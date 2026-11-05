import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "item-group",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiItemGroup [sx]="styles.narrow">
        @for (person of people; track person.username) {
          <div kuiItem variant="outline">
            <div kuiItemMedia>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [attr.src]="person.avatar"
                  [sx]="styles.grayscale"
                />
                <span kuiAvatarFallback>{{ person.username.charAt(0) }}</span>
              </span>
            </div>
            <div kuiItemContent [sx]="styles.gap1">
              <div kuiItemTitle>{{ person.username }}</div>
              <p kuiItemDescription>{{ person.email }}</p>
            </div>
            <div kuiItemActions>
              <button
                kuiButton
                variant="ghost"
                size="icon"
                [sx]="styles.roundedFull"
              >
                <svg
                  iconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                ></svg>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export default class ItemGroupExample {
  protected readonly styles = styles
  protected readonly people = people
  protected readonly page = page
}
