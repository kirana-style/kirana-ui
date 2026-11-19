<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
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

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <ToggleGroup variant="outline" defaultValue={['list']} dir={translation.dir}>
      <ToggleGroupItem value="list" aria-label={translation.t.list}>
        {translation.t.list}
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label={translation.t.grid}>
        {translation.t.grid}
      </ToggleGroupItem>
      <ToggleGroupItem value="cards" aria-label={translation.t.cards}>
        {translation.t.cards}
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</DirectionProvider>
