<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import { computed, ref } from "vue"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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

const { dir, t, language, locale } = useTranslation(translations, "ar")

const selectedFruit = ref<string | null>(null)

const fruits = computed(() => [
  { label: t.value.apple, value: "apple" },
  { label: t.value.banana, value: "banana" },
  { label: t.value.blueberry, value: "blueberry" },
  { label: t.value.grapes, value: "grapes" },
  { label: t.value.pineapple, value: "pineapple" },
])

const vegetables = computed(() => [
  { label: t.value.carrot, value: "carrot" },
  { label: t.value.broccoli, value: "broccoli" },
  { label: t.value.spinach, value: "spinach" },
])

const allItems = computed(() => [
  { label: t.value.selectFruit, value: null },
  ...fruits.value,
  ...vegetables.value,
])
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Select :items="allItems" v-model="selectedFruit">
        <SelectTrigger :sx="styles.selectTrigger" :dir="dir">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          :dir="dir"
          :data-lang="dir === 'rtl' ? language : undefined"
        >
          <SelectGroup>
            <SelectLabel>{{ t.fruits }}</SelectLabel>
            <SelectItem
              v-for="item in fruits"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>{{ t.vegetables }}</SelectLabel>
            <SelectItem
              v-for="item in vegetables"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </DirectionProvider>
</template>
