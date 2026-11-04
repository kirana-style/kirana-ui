import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { color } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"

const styles = {
  avatarWithBadgeAvatarBadge: css({
    backgroundColor: `light-dark(${color.green[600]}, ${color.green[800]})`,
  }),
}

@Component({
  selector: "avatar-badge",
  imports: [Avatar, AvatarBadge, AvatarFallback, AvatarImage, SxDirective],
  template: `
    <div [sx]="page.example">
      <span kuiAvatar>
        <img kuiAvatarImage [attr.src]="'/avatars/kirana.png'" alt="@kirana" />
        <span kuiAvatarFallback>CN</span>
        <span kuiAvatarBadge [sx]="styles.avatarWithBadgeAvatarBadge"></span>
      </span>
    </div>
  `,
})
export default class AvatarBadgeExample {
  protected readonly styles = styles
  protected readonly page = page
}
