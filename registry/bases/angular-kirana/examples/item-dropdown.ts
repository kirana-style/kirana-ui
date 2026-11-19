import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
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

const styles = {
  w48: css({ width: { "*": null, base: space[48] } }),
  wFullP2: css({ width: { "*": null, base: "100%" }, padding: space[2] }),
  sizeSpacing65: css({ width: spacing(6.5), height: spacing(6.5) }),
  grayscale: css({ filter: "grayscale(100%)" }),
  gap0: css({ gap: { "*": null, base: space[0] } }),
  leadingNone: css({ lineHeight: "1" }),
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
  selector: "item-dropdown",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">
          Select
          <svg
            iconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
          ></svg>
        </button>
        <div kuiDropdownMenuContent [sx]="styles.w48" align="end">
          <div kuiDropdownMenuGroup>
            @for (person of people; track person.username) {
              <div kuiDropdownMenuItem>
                <div kuiItem size="xs" [sx]="styles.wFullP2">
                  <div kuiItemMedia>
                    <span kuiAvatar [sx]="styles.sizeSpacing65">
                      <img
                        kuiAvatarImage
                        [attr.src]="person.avatar"
                        [sx]="styles.grayscale"
                      />
                      <span kuiAvatarFallback>{{
                        person.username.charAt(0)
                      }}</span>
                    </span>
                  </div>
                  <div kuiItemContent [sx]="styles.gap0">
                    <div kuiItemTitle>{{ person.username }}</div>
                    <p kuiItemDescription [sx]="styles.leadingNone">
                      {{ person.email }}
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ItemDropdown {
  protected readonly styles = styles
  protected readonly people = people
  protected readonly page = page
}
