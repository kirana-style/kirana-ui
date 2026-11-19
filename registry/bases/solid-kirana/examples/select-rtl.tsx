import { For, createMemo, createSignal } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function SelectRtl() {
  const styles = {
    selectTrigger: css({
      width: { "*": null, base: space[32] },
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        selectFruit: "Select a fruit",
        fruits: "Fruits",
        apple: "Apple",
        banana: "Banana",
        blueberry: "Blueberry",
        grapes: "Grapes",
        pineapple: "Pineapple",
        vegetables: "Vegetables",
        carrot: "Carrot",
        broccoli: "Broccoli",
        spinach: "Spinach",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        selectFruit: "اختر فاكهة",
        fruits: "الفواكه",
        apple: "تفاح",
        banana: "موز",
        blueberry: "توت أزرق",
        grapes: "عنب",
        pineapple: "أناناس",
        vegetables: "الخضروات",
        carrot: "جزر",
        broccoli: "بروكلي",
        spinach: "سبانخ",
      },
    },
    he: {
      dir: "rtl",
      values: {
        selectFruit: "בחר פרי",
        fruits: "פירות",
        apple: "תפוח",
        banana: "בננה",
        blueberry: "אוכמניה",
        grapes: "ענבים",
        pineapple: "אננס",
        vegetables: "ירקות",
        carrot: "גזר",
        broccoli: "ברוקולי",
        spinach: "תרד",
      },
    },
  }

  const translation = useTranslation(translations, "ar")

  const [selectedFruit, setSelectedFruit] = createSignal<string | null>(null)

  const fruits = createMemo(() => [
    { label: translation.t.apple, value: "apple" },
    { label: translation.t.banana, value: "banana" },
    { label: translation.t.blueberry, value: "blueberry" },
    { label: translation.t.grapes, value: "grapes" },
    { label: translation.t.pineapple, value: "pineapple" },
  ])

  const vegetables = createMemo(() => [
    { label: translation.t.carrot, value: "carrot" },
    { label: translation.t.broccoli, value: "broccoli" },
    { label: translation.t.spinach, value: "spinach" },
  ])

  const allItems = createMemo(() => [
    { label: translation.t.selectFruit, value: null },
    ...fruits(),
    ...vegetables(),
  ])

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Select
          items={allItems()}
          value={selectedFruit()}
          onValueChange={(details: {
            value: ReturnType<typeof selectedFruit>
          }) => setSelectedFruit(details.value)}
        >
          <SelectTrigger sx={styles.selectTrigger} dir={translation.dir}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            dir={translation.dir}
            data-lang={
              translation.dir === "rtl" ? translation.language : undefined
            }
          >
            <SelectGroup>
              <SelectLabel>{translation.t.fruits}</SelectLabel>
              <For each={fruits()}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>{translation.t.vegetables}</SelectLabel>
              <For each={vegetables()}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </DirectionProvider>
  )
}
