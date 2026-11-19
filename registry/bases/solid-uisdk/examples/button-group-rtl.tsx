import { createSignal } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
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
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function ButtonGroupRtl() {
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

  const translation = useTranslation(translations, "ar")

  const [label, setLabel] = createSignal("personal")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <div dir={translation.dir}>
          <ButtonGroup>
            <ButtonGroup sx={styles.buttonGroup}>
              <Button variant="outline" size="icon" aria-label="Go Back">
                <IconPlaceholder
                  lucide="ArrowLeftIcon"
                  tabler="IconArrowLeft"
                  hugeicons="ArrowLeft01Icon"
                  phosphor="ArrowLeftIcon"
                  remixicon="RiArrowLeftLine"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">{translation.t.archive}</Button>
              <Button variant="outline">{translation.t.report}</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">{translation.t.snooze}</Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <Button
                      {...props()}
                      variant="outline"
                      size="icon"
                      aria-label="More Options"
                    >
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                    </Button>
                  )}
                />
                <DropdownMenuContent
                  align={translation.dir === "rtl" ? "start" : "end"}
                  data-lang={
                    translation.dir === "rtl" ? translation.language : undefined
                  }
                  dir={translation.dir}
                  sx={styles.dropdownMenuContent}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="MailCheckIcon"
                        tabler="IconMailCheck"
                        hugeicons="MailValidation01Icon"
                        phosphor="EnvelopeIcon"
                        remixicon="RiMailCheckLine"
                      />{" "}
                      {translation.t.markAsRead}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="ArchiveIcon"
                        tabler="IconArchive"
                        hugeicons="Archive02Icon"
                        phosphor="ArchiveIcon"
                        remixicon="RiArchiveLine"
                      />{" "}
                      {translation.t.archive}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="ClockIcon"
                        tabler="IconClock"
                        hugeicons="Clock01Icon"
                        phosphor="ClockIcon"
                        remixicon="RiTimeLine"
                      />{" "}
                      {translation.t.snooze}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="CalendarPlusIcon"
                        tabler="IconCalendarPlus"
                        hugeicons="CalendarAdd01Icon"
                        phosphor="CalendarPlusIcon"
                        remixicon="RiCalendarLine"
                      />{" "}
                      {translation.t.addToCalendar}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="ListFilterIcon"
                        tabler="IconFilter"
                        hugeicons="FilterHorizontalIcon"
                        phosphor="FunnelIcon"
                        remixicon="RiFilterLine"
                      />{" "}
                      {translation.t.addToList}
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <IconPlaceholder
                          lucide="TagIcon"
                          tabler="IconTag"
                          hugeicons="Tag01Icon"
                          phosphor="TagIcon"
                          remixicon="RiPriceTag3Line"
                        />{" "}
                        {translation.t.labelAs}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent
                        dir={translation.dir}
                        data-lang={
                          translation.dir === "rtl"
                            ? translation.language
                            : undefined
                        }
                      >
                        <DropdownMenuRadioGroup
                          value={label()}
                          onValueChange={(details: {
                            value: ReturnType<typeof label>
                          }) => setLabel(details.value)}
                        >
                          <DropdownMenuRadioItem value="personal">
                            {translation.t.personal}
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="work">
                            {translation.t.work}
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="other">
                            {translation.t.other}
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <IconPlaceholder
                        lucide="Trash2Icon"
                        tabler="IconTrash"
                        hugeicons="Delete02Icon"
                        phosphor="TrashIcon"
                        remixicon="RiDeleteBinLine"
                      />{" "}
                      {translation.t.trash}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
    </DirectionProvider>
  )
}
