import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const styles = {
  avatarDemoAvatarImage: css({
    filter: "grayscale(100%)",
  }),
}

@Component({
  selector: "avatar-basic",
  imports: [Avatar, AvatarFallback, AvatarImage, SxDirective],
  template: `
    <div [sx]="page.example">
      <span kuiAvatar>
        <img
          kuiAvatarImage
          [attr.src]="'/avatars/kirana.png'"
          alt="@kirana"
          [sx]="styles.avatarDemoAvatarImage"
        />
        <span kuiAvatarFallback>CN</span>
      </span>
    </div>
  `,
})
export default class AvatarBasic {
  protected readonly styles = styles
  protected readonly page = page
}
