import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css, select } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Skeleton } from "../ui/skeleton"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  skeleton: css({
    height: { "*": null, base: space[12] },
    width: { "*": null, base: space[12] },
    borderRadius: { "*": null, base: radius.full },
  }),
  div2: css({
    [select.child(":not(:last-child)")]: {
      marginBlockStart: "0px",
      marginBottom: space[2],
    },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "250px" },
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "200px" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

@Component({
  selector: "skeleton-rtl",
  imports: [DirectionProvider, Skeleton, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <div kuiSkeleton [sx]="styles.skeleton"></div>
          <div [sx]="styles.div2">
            <div kuiSkeleton [sx]="styles.skeleton2"></div>
            <div kuiSkeleton [sx]="styles.skeleton3"></div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class SkeletonRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
