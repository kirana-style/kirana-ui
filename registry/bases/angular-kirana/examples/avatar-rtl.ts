import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { breakpoint, color, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"
import { DirectionProvider } from "../ui/direction"

const styles = {
  div: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { base: space[6], [breakpoint.md]: space[12] },
  }),
  avatarImage: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  avatarBadge: css({
    backgroundColor: `light-dark(${color.green[600]}, ${color.green[800]})`,
  }),
  avatarGroup: css({
    filter: "grayscale(100%)",
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      moreUsers: "+3",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      moreUsers: "+٣",
    },
  },
  he: {
    dir: "rtl",
    values: {
      moreUsers: "+3",
    },
  },
}

@Component({
  selector: "avatar-rtl",
  imports: [
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    DirectionProvider,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <span kuiAvatar>
            <img
              kuiAvatarImage
              [attr.src]="'/avatars/kirana.png'"
              alt="@kirana"
              [sx]="styles.avatarImage"
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
            <span kuiAvatarBadge [sx]="styles.avatarBadge"></span>
          </span>
          <div kuiAvatarGroup [sx]="styles.avatarGroup">
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
            <div kuiAvatarGroupCount>{{ t().moreUsers }}</div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class AvatarRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
