import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  div: css({
    display: "grid",
    gap: space[4],
  }),
  div2: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      content: "Add to library",
      "inline-start": "Inline Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      "inline-end": "Inline End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      content: "إضافة إلى المكتبة",
      "inline-start": "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      "inline-end": "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      content: "הוסף לספרייה",
      "inline-start": "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      "inline-end": "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const

const logicalSides = ["inline-start", "inline-end"] as const

@Component({
  selector: "tooltip-rtl",
  imports: [
    Button,
    DirectionProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div">
          <div [sx]="styles.div2">
            @for (side of physicalSides; track side) {
              <ng-container kuiTooltip>
                <button kuiButton kuiTooltipTrigger variant="outline">
                  {{ t()[side] }}
                </button>
                <div kuiTooltipContent [side]="side" [attr.dir]="dir()">
                  {{ t().content }}
                </div>
              </ng-container>
            }
          </div>
          <div [sx]="styles.div3">
            @for (side of logicalSides; track side) {
              <ng-container kuiTooltip>
                <button kuiButton kuiTooltipTrigger variant="outline">
                  {{ t()[side] }}
                </button>
                <div kuiTooltipContent [side]="side" [attr.dir]="dir()">
                  {{ t().content }}
                </div>
              </ng-container>
            }
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class TooltipRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly physicalSides = physicalSides
  protected readonly logicalSides = logicalSides
  protected readonly page = page
}
