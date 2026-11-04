import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"

const styles = {
  exampleAvatarGroup: css({
    filter: "grayscale(100%)",
  }),
}

@Component({
  selector: "avatar-group-count",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiAvatarGroup [sx]="styles.exampleAvatarGroup">
        <span kuiAvatar>
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
        <div kuiAvatarGroupCount>+3</div>
      </div>
    </div>
  `,
})
export default class AvatarGroupCountExample {
  protected readonly styles = styles
  protected readonly page = page
}
