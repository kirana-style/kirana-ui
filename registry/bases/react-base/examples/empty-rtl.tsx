import { IconPlaceholder } from "../../../icons/icon-placeholder"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function EmptyRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Empty dir={dir}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="FolderCodeIcon"
              tabler="IconFolderCode"
              hugeicons="FolderCodeIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
          </EmptyMedia>
          <EmptyTitle>{t.title}</EmptyTitle>
          <EmptyDescription>{t.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent sx={styles.emptyContent}>
          <Button>{t.createProject}</Button>
          <Button variant="outline">{t.importProject}</Button>
        </EmptyContent>
        <Button
          variant="link"
          render={<a href="#" />}
          sx={styles.button}
          size="sm"
          nativeButton={false}
        >
          {t.learnMore}{" "}
          <IconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRightIcon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
            {...styleProps(styles.iconPlaceholder)}
            data-icon="inline-end"
          />
        </Button>
      </Empty>
    </div>
  )
}
