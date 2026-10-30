import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { css, props as styleProps } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    flexDirection: { [breakpoint.md]: "row" },
  }),
  iconPlaceholder: css({
    rotate: { ":dir(rtl)": "180deg" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      button: "Button",
      submit: "Submit",
      delete: "Delete",
      loading: "Loading",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      button: "زر",
      submit: "إرسال",
      delete: "حذف",
      loading: "جاري التحميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      button: "כפתור",
      submit: "שלח",
      delete: "מחק",
      loading: "טוען",
    },
  },
}

export default function ButtonRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <Button variant="outline">{t.button}</Button>
        <Button variant="destructive">{t.delete}</Button>
        <Button variant="outline">
          {t.submit}{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight01Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            {...styleProps(styles.iconPlaceholder)}
            data-icon="inline-end"
          />
        </Button>
        <Button variant="outline" size="icon" aria-label="Add">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </Button>
        <Button variant="secondary" isDisabled>
          <Spinner data-icon="inline-start" /> {t.loading}
        </Button>
      </div>
    </div>
  )
}
