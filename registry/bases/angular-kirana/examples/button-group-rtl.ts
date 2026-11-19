import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { DirectionProvider } from "../ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  buttonGroup: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "flex" },
  }),
  iconPlaceholder: css({
    rotate: { ":dir(rtl)": "180deg" },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      archive: "Archive",
      report: "Report",
      snooze: "Snooze",
      markAsRead: "Mark as Read",
      addToCalendar: "Add to Calendar",
      addToList: "Add to List",
      labelAs: "Label As...",
      personal: "Personal",
      work: "Work",
      other: "Other",
      trash: "Trash",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      archive: "أرشفة",
      report: "تقرير",
      snooze: "تأجيل",
      markAsRead: "وضع علامة كمقروء",
      addToCalendar: "إضافة إلى التقويم",
      addToList: "إضافة إلى القائمة",
      labelAs: "تصنيف كـ...",
      personal: "شخصي",
      work: "عمل",
      other: "آخر",
      trash: "سلة المهملات",
    },
  },
  he: {
    dir: "rtl",
    values: {
      archive: "ארכיון",
      report: "דוח",
      snooze: "דחה",
      markAsRead: "סמן כנקרא",
      addToCalendar: "הוסף ליומן",
      addToList: "הוסף לרשימה",
      labelAs: "תייג כ...",
      personal: "אישי",
      work: "עבודה",
      other: "אחר",
      trash: "פח",
    },
  },
}

@Component({
  selector: "button-group-rtl",
  imports: [
    Button,
    ButtonGroup,
    DirectionProvider,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [attr.dir]="dir()">
          <div kuiButtonGroup>
            <div kuiButtonGroup [sx]="styles.buttonGroup">
              <button
                kuiButton
                variant="outline"
                size="icon"
                aria-label="Go Back"
              >
                <svg
                  iconPlaceholder
                  lucide="ArrowLeftIcon"
                  tabler="IconArrowLeft"
                  hugeicons="ArrowLeft01Icon"
                  phosphor="ArrowLeftIcon"
                  remixicon="RiArrowLeftLine"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </button>
            </div>
            <div kuiButtonGroup>
              <button kuiButton variant="outline">{{ t().archive }}</button>
              <button kuiButton variant="outline">{{ t().report }}</button>
            </div>
            <div kuiButtonGroup>
              <button kuiButton variant="outline">{{ t().snooze }}</button>
              <ng-container kuiDropdownMenu>
                <button
                  kuiButton
                  kuiDropdownMenuTrigger
                  variant="outline"
                  size="icon"
                  aria-label="More Options"
                >
                  <svg
                    iconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  ></svg>
                </button>
                <div
                  kuiDropdownMenuContent
                  [align]="dir() === 'rtl' ? 'start' : 'end'"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                  [attr.dir]="dir()"
                  [sx]="styles.dropdownMenuContent"
                >
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="MailCheckIcon"
                        tabler="IconMailCheck"
                        hugeicons="MailValidation01Icon"
                        phosphor="EnvelopeIcon"
                        remixicon="RiMailCheckLine"
                      ></svg>
                      {{ t().markAsRead }}
                    </div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="ArchiveIcon"
                        tabler="IconArchive"
                        hugeicons="Archive02Icon"
                        phosphor="ArchiveIcon"
                        remixicon="RiArchiveLine"
                      ></svg>
                      {{ t().archive }}
                    </div>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="ClockIcon"
                        tabler="IconClock"
                        hugeicons="Clock01Icon"
                        phosphor="ClockIcon"
                        remixicon="RiTimeLine"
                      ></svg>
                      {{ t().snooze }}
                    </div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="CalendarPlusIcon"
                        tabler="IconCalendarPlus"
                        hugeicons="CalendarAdd01Icon"
                        phosphor="CalendarPlusIcon"
                        remixicon="RiCalendarLine"
                      ></svg>
                      {{ t().addToCalendar }}
                    </div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="ListFilterIcon"
                        tabler="IconFilter"
                        hugeicons="FilterHorizontalIcon"
                        phosphor="FunnelIcon"
                        remixicon="RiFilterLine"
                      ></svg>
                      {{ t().addToList }}
                    </div>
                    <ng-container kuiDropdownMenuSub>
                      <div kuiDropdownMenuSubTrigger>
                        <svg
                          iconPlaceholder
                          lucide="TagIcon"
                          tabler="IconTag"
                          hugeicons="Tag01Icon"
                          phosphor="TagIcon"
                          remixicon="RiPriceTag3Line"
                        ></svg>
                        {{ t().labelAs }}
                      </div>
                      <div
                        kuiDropdownMenuSubContent
                        [attr.dir]="dir()"
                        [attr.data-lang]="
                          dir() === 'rtl' ? language() : undefined
                        "
                      >
                        <div kuiDropdownMenuRadioGroup [(value)]="label">
                          <div kuiDropdownMenuRadioItem value="personal">
                            {{ t().personal }}
                          </div>
                          <div kuiDropdownMenuRadioItem value="work">
                            {{ t().work }}
                          </div>
                          <div kuiDropdownMenuRadioItem value="other">
                            {{ t().other }}
                          </div>
                        </div>
                      </div>
                    </ng-container>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem variant="destructive">
                      <svg
                        iconPlaceholder
                        lucide="Trash2Icon"
                        tabler="IconTrash"
                        hugeicons="Delete02Icon"
                        phosphor="TrashIcon"
                        remixicon="RiDeleteBinLine"
                      ></svg>
                      {{ t().trash }}
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ButtonGroupRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly label = signal("personal")
  protected readonly styles = styles
  protected readonly page = page
}
