import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "item-avatar",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWLgFlexColGa">
        <div kuiItem variant="outline">
          <div kuiItemMedia>
            <span kuiAvatar [sx]="styles.size10">
              <img kuiAvatarImage src="https://github.com/evilrabbit.png" />
              <span kuiAvatarFallback>ER</span>
            </span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Evil Rabbit</div>
            <p kuiItemDescription>Last seen 5 months ago</p>
          </div>
          <div kuiItemActions>
            <button
              kuiButton
              size="icon-sm"
              variant="outline"
              [sx]="styles.roundedFull"
              aria-label="Invite"
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
        <div kuiItem variant="outline">
          <div kuiItemMedia>
            <div [sx]="styles.flexSpaceX2DataSlotAvata">
              <span kuiAvatar [sx]="styles.hiddenSmFlex">
                <img
                  kuiAvatarImage
                  [attr.src]="'/avatars/kirana.png'"
                  alt="@kirana"
                />
                <span kuiAvatarFallback>CN</span>
              </span>
              <span kuiAvatar [sx]="styles.hiddenSmFlex">
                <img
                  kuiAvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <span kuiAvatarFallback>LR</span>
              </span>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <span kuiAvatarFallback>ER</span>
              </span>
            </div>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>No Team Members</div>
            <p kuiItemDescription>
              Invite your team to collaborate on this project.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm" variant="outline">Invite</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ItemAvatar {
  protected readonly styles = styles
  protected readonly page = page
}
