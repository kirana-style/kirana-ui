import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css, props as styleProps } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[1] },
  }),
  iconPlaceholder: css({
    width: space["3.5"],
    height: space["3.5"],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      home: "Home",
      components: "Components",
      documentation: "Documentation",
      themes: "Themes",
      github: "GitHub",
      breadcrumb: "Breadcrumb",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      home: "الرئيسية",
      components: "المكونات",
      documentation: "التوثيق",
      themes: "السمات",
      github: "جيت هاب",
      breadcrumb: "مسار التنقل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      home: "בית",
      components: "רכיבים",
      documentation: "תיעוד",
      themes: "ערכות נושא",
      github: "גיטהאב",
      breadcrumb: "פירורי לחם",
    },
  },
}

export default function BreadcrumbRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Breadcrumb dir={dir}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href="/" />}>{t.home}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<button sx={styles.button} />}>
                {t.components}
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  data-icon="inline-end"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={dir === "rtl" ? "end" : "start"}
                data-lang={dir === "rtl" ? language : undefined}
                dir={dir}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>{t.documentation}</DropdownMenuItem>
                  <DropdownMenuItem>{t.themes}</DropdownMenuItem>
                  <DropdownMenuItem>{t.github}</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
