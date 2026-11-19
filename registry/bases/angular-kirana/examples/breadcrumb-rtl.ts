import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { DirectionProvider } from "../ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

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

@Component({
  selector: "breadcrumb-rtl",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    DirectionProvider,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <nav kuiBreadcrumb [attr.dir]="dir()">
          <ol kuiBreadcrumbList>
            <li kuiBreadcrumbItem>
              <a kuiBreadcrumbLink href="/">{{ t().home }}</a>
            </li>
            <li kuiBreadcrumbSeparator>
              <svg
                iconPlaceholder
                lucide="DotIcon"
                tabler="IconPoint"
                hugeicons="DotIcon"
                phosphor="DotIcon"
                remixicon="RiCheckboxBlankCircleFill"
              ></svg>
            </li>
            <li kuiBreadcrumbItem>
              <ng-container kuiDropdownMenu>
                <button kuiDropdownMenuTrigger [sx]="styles.button">
                  {{ t().components }}
                  <svg
                    iconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    data-icon="inline-end"
                    [sx]="styles.iconPlaceholder"
                  ></svg>
                </button>
                <div
                  kuiDropdownMenuContent
                  [align]="dir() === 'rtl' ? 'end' : 'start'"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                  [attr.dir]="dir()"
                >
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>{{ t().documentation }}</div>
                    <div kuiDropdownMenuItem>{{ t().themes }}</div>
                    <div kuiDropdownMenuItem>{{ t().github }}</div>
                  </div>
                </div>
              </ng-container>
            </li>
            <li kuiBreadcrumbSeparator>
              <svg
                iconPlaceholder
                lucide="DotIcon"
                tabler="IconPoint"
                hugeicons="DotIcon"
                phosphor="DotIcon"
                remixicon="RiCheckboxBlankCircleFill"
              ></svg>
            </li>
            <li kuiBreadcrumbItem>
              <span kuiBreadcrumbPage>{{ t().breadcrumb }}</span>
            </li>
          </ol>
        </nav>
      </div>
    </ng-container>
  `,
})
export default class BreadcrumbRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
