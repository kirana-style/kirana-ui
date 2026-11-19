import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"

const styles = {
  row: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { base: space[6], [breakpoint.md]: space[12] },
  }),
  grayscale: css({ filter: "grayscale(100%)" }),
  // `bg-green-600 dark:bg-green-800`.
  online: css({
    backgroundColor:
      "light-dark(oklch(0.627 0.194 149.214), oklch(0.448 0.119 151.328))",
  }),
}

@Component({
  selector: "avatar-demo",
  imports: [
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.row">
        <span kuiAvatar>
          <img
            kuiAvatarImage
            [attr.src]="'/avatars/kirana.png'"
            alt="@kirana"
            [sx]="styles.grayscale"
          />
          <span kuiAvatarFallback>CN</span>
        </span>
        <span kuiAvatar>
          <img
            kuiAvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <span kuiAvatarFallback>ER</span>
          <span kuiAvatarBadge [sx]="styles.online"></span>
        </span>
        <div kuiAvatarGroup [sx]="styles.grayscale">
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
    </div>
  `,
})
export default class AvatarDemo {
  protected readonly styles = styles
  protected readonly page = page
}
