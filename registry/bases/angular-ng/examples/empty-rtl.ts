import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

const styles = {
  emptyContent: css({
    flexDirection: { "*": null, base: "row" },
    justifyContent: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder: css({
    rotate: { ":dir(rtl)": "270deg" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "No Projects Yet",
      description:
        "You haven't created any projects yet. Get started by creating your first project.",
      createProject: "Create Project",
      importProject: "Import Project",
      learnMore: "Learn More",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "لا توجد مشاريع بعد",
      description: "لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.",
      createProject: "إنشاء مشروع",
      importProject: "استيراد مشروع",
      learnMore: "تعرف على المزيد",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "אין פרויקטים עדיין",
      description:
        "עדיין לא יצרת פרויקטים. התחל על ידי יצירת הפרויקט הראשון שלך.",
      createProject: "צור פרויקט",
      importProject: "ייבא פרויקט",
      learnMore: "למד עוד",
    },
  },
}

@Component({
  selector: "empty-rtl",
  imports: [
    Button,
    DirectionProvider,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiEmpty [attr.dir]="dir()">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="FolderCodeIcon"
                tabler="IconFolderCode"
                hugeicons="FolderCodeIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>{{ t().title }}</div>
            <div kuiEmptyDescription>{{ t().description }}</div>
          </div>
          <div kuiEmptyContent [sx]="styles.emptyContent">
            <button kuiButton>{{ t().createProject }}</button>
            <button kuiButton variant="outline">{{ t().importProject }}</button>
          </div>
          <a kuiButton variant="link" [sx]="styles.button" size="sm" href="#">
            {{ t().learnMore }}
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              [sx]="styles.iconPlaceholder"
              data-icon="inline-end"
            ></svg>
          </a>
        </div>
      </div>
    </ng-container>
  `,
})
export default class EmptyRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
