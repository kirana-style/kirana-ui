import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "react-aria-components"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css, props as styleProps } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
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
            <BreadcrumbLink
              href="/"
              render={(props) =>
                "href" in props ? <a {...props} /> : <span {...props} />
              }
            >
              {t.home}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <DropdownMenuTrigger>
              <Button {...styleProps(styles.button)}>
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
              </Button>
              <DropdownMenu
                placement={dir === "rtl" ? "bottom end" : "bottom start"}
                data-lang={dir === "rtl" ? language : undefined}
                dir={dir}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>{t.documentation}</DropdownMenuItem>
                  <DropdownMenuItem>{t.themes}</DropdownMenuItem>
                  <DropdownMenuItem>{t.github}</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
