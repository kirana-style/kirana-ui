import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { page } from "../../../styles/page.styles"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      list: "List",
      grid: "Grid",
      cards: "Cards",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      list: "قائمة",
      grid: "شبكة",
      cards: "بطاقات",
    },
  },
  he: {
    dir: "rtl",
    values: {
      list: "רשימה",
      grid: "רשת",
      cards: "כרטיסים",
    },
  },
}

export default function ToggleGroupRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <ToggleGroup variant="outline" defaultValue={["list"]} dir={dir}>
        <ToggleGroupItem value="list" aria-label={t.list}>
          {t.list}
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label={t.grid}>
          {t.grid}
        </ToggleGroupItem>
        <ToggleGroupItem value="cards" aria-label={t.cards}>
          {t.cards}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
