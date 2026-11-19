import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const styles = {
  exampleDiv: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    filter: "grayscale(100%)",
  }),
}

@Component({
  selector: "avatar-size",
  imports: [Avatar, AvatarFallback, AvatarImage, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.exampleDiv">
        <span kuiAvatar size="sm">
          <img
            kuiAvatarImage
            [attr.src]="'/avatars/kirana.png'"
            alt="@kirana"
          />
          <span kuiAvatarFallback>CN</span>
        </span>
        <span kuiAvatar>
          <img
            kuiAvatarImage
            [attr.src]="'/avatars/kirana.png'"
            alt="@kirana"
          />
          <span kuiAvatarFallback>CN</span>
        </span>
        <span kuiAvatar size="lg">
          <img
            kuiAvatarImage
            [attr.src]="'/avatars/kirana.png'"
            alt="@kirana"
          />
          <span kuiAvatarFallback>CN</span>
        </span>
      </div>
    </div>
  `,
})
export default class AvatarSize {
  protected readonly styles = styles
  protected readonly page = page
}
