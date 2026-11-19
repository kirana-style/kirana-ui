import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
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
import type { Translations } from "../components/language-selector"

export default function PaginationRtl() {
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

  const translation = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (translation.language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Pagination dir={translation.dir}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text={translation.t.previous} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{formatNumber(1)}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {formatNumber(2)}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{formatNumber(3)}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text={translation.t.next} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </DirectionProvider>
  )
}
