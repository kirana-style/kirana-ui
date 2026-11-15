<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { page } from "../../../styles/page.styles"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      previous: "Previous",
      next: "Next",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      previous: "السابق",
      next: "التالي",
    },
  },
  he: {
    dir: "rtl",
    values: {
      previous: "הקודם",
      next: "הבא",
    },
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

const { dir, t, language, locale } = useTranslation(translations, "ar")

const formatNumber = (num: number): string => {
  if (language.value === "ar") {
    return toArabicNumerals(num)
  }
  return num.toString()
}
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Pagination :dir="dir">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" :text="t.previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {{ formatNumber(1) }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" is-active>
              {{ formatNumber(2) }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {{ formatNumber(3) }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" :text="t.next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </DirectionProvider>
</template>
