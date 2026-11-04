import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"

const styles = {
  exampleAvatar: css({
    filter: "grayscale(100%)",
  }),
}

@Component({
  selector: "avatar-badge-icon",
  imports: [
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <span kuiAvatar [sx]="styles.exampleAvatar">
        <img
          kuiAvatarImage
          src="https://github.com/pranathip.png"
          alt="@pranathip"
        />
        <span kuiAvatarFallback>PP</span>
        <span kuiAvatarBadge>
          <svg
            iconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          ></svg>
        </span>
      </span>
    </div>
  `,
})
export default class AvatarBadgeIcon {
  protected readonly styles = styles
  protected readonly page = page
}
