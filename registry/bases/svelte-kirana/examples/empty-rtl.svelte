<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { Button } from "../ui/button"
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "../ui/empty"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../core/tokens"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    emptyContent: css({
      flexDirection: { "*": null, base: "row" },
      justifyContent: { "*": null, base: "center" },
      gap: { "*": null, base: space[2] },
    }),
    button: css({
      color: theme.mutedForeground,
    }),
    iconPlaceholder: css({
      rotate: { ":dir(rtl)": "270deg" },
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        title: "No Projects Yet",
        description:
          "You haven't created any projects yet. Get started by creating your first project.",
        createProject: "Create Project",
        importProject: "Import Project",
        learnMore: "Learn More",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        title: "لا توجد مشاريع بعد",
        description: "لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.",
        createProject: "إنشاء مشروع",
        importProject: "استيراد مشروع",
        learnMore: "تعرف على المزيد",
      },
    },
    he: {
      dir: "rtl",
      values: {
        title: "אין פרויקטים עדיין",
        description:
          "עדיין לא יצרת פרויקטים. התחל על ידי יצירת הפרויקט הראשון שלך.",
        createProject: "צור פרויקט",
        importProject: "ייבא פרויקט",
        learnMore: "למד עוד",
      },
    },
  }

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <Empty dir={translation.dir}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPlaceholder lucide="FolderCodeIcon" tabler="IconFolderCode" hugeicons="FolderCodeIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
        </EmptyMedia>
        <EmptyTitle>
          {translation.t.title}
        </EmptyTitle>
        <EmptyDescription>
          {translation.t.description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent sx={styles.emptyContent}>
        <Button>
          {translation.t.createProject}
        </Button>
        <Button variant="outline">
          {translation.t.importProject}
        </Button>
      </EmptyContent>
      <Button variant="link" sx={styles.button} size="sm">
        {#snippet asChild(props)}
          <a {...props()} href="#">
            {translation.t.learnMore}
            <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" sx={styles.iconPlaceholder} data-icon="inline-end" />
          </a>
        {/snippet}
      </Button>
    </Empty>
  </div>
</DirectionProvider>
