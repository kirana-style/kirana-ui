import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"

const styles = {
  resizablePanelGroup: css({
    maxWidth: { "*": null, base: containerSize.sm },
    borderRadius: { "*": null, base: radius.lg },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  div: css({
    display: "flex",
    height: "200px",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span: css({
    fontWeight: fontWeight.semibold,
  }),
  div2: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span2: css({
    fontWeight: fontWeight.semibold,
  }),
  div3: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span3: css({
    fontWeight: fontWeight.semibold,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      one: "One",
      two: "Two",
      three: "Three",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      one: "واحد",
      two: "اثنان",
      three: "ثلاثة",
    },
  },
  he: {
    dir: "rtl",
    values: {
      one: "אחד",
      two: "שניים",
      three: "שלושה",
    },
  },
}

@Component({
  selector: "resizable-rtl",
  imports: [
    DirectionProvider,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiResizablePanelGroup
          orientation="horizontal"
          [sx]="styles.resizablePanelGroup"
          [attr.dir]="dir()"
        >
          <div kuiResizablePanel [defaultSize]="50">
            <div [sx]="styles.div">
              <span [sx]="styles.span">{{ t().one }}</span>
            </div>
          </div>
          <div kuiResizableHandle withHandle></div>
          <div kuiResizablePanel [defaultSize]="50">
            <div
              kuiResizablePanelGroup
              orientation="vertical"
              [attr.dir]="dir()"
            >
              <div kuiResizablePanel [defaultSize]="25">
                <div [sx]="styles.div2">
                  <span [sx]="styles.span2">{{ t().two }}</span>
                </div>
              </div>
              <div kuiResizableHandle withHandle></div>
              <div kuiResizablePanel [defaultSize]="75">
                <div [sx]="styles.div3">
                  <span [sx]="styles.span3">{{ t().three }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ResizableRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
