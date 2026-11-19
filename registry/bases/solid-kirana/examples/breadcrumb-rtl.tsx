import { css, props as styleProps } from "@kirana-style/core"
import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function BreadcrumbRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Breadcrumb dir={translation.dir}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild={(props) => (
                  <a {...props()} href="/">
                    {translation.t.home}
                  </a>
                )}
              />
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
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <button
                      {...props()}
                      {...styleProps(props().class, styles.button)}
                    >
                      {translation.t.components}{" "}
                      <IconPlaceholder
                        lucide="ChevronDownIcon"
                        tabler="IconChevronDown"
                        hugeicons="ArrowDown01Icon"
                        phosphor="CaretDownIcon"
                        remixicon="RiArrowDownSLine"
                        data-icon="inline-end"
                        {...styleProps(styles.iconPlaceholder)}
                      />
                    </button>
                  )}
                />
                <DropdownMenuContent
                  align={translation.dir === "rtl" ? "end" : "start"}
                  data-lang={
                    translation.dir === "rtl" ? translation.language : undefined
                  }
                  dir={translation.dir}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      {translation.t.documentation}
                    </DropdownMenuItem>
                    <DropdownMenuItem>{translation.t.themes}</DropdownMenuItem>
                    <DropdownMenuItem>{translation.t.github}</DropdownMenuItem>
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
              <BreadcrumbPage>{translation.t.breadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </DirectionProvider>
  )
}
