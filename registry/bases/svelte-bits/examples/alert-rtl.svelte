<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
  import { css } from "@kirana-style/core"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      display: "grid",
      width: "100%",
      maxWidth: containerSize.md,
      alignItems: "flex-start",
      gap: space[4],
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        paymentTitle: "Payment successful",
        paymentDescription:
          "Your payment of $29.99 has been processed. A receipt has been sent to your email address.",
        featureTitle: "New feature available",
        featureDescription:
          "We've added dark mode support. You can enable it in your account settings.",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        paymentTitle: "تم الدفع بنجاح",
        paymentDescription:
          "تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.",
        featureTitle: "ميزة جديدة متاحة",
        featureDescription:
          "لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.",
      },
    },
    he: {
      dir: "rtl",
      values: {
        paymentTitle: "התשלום בוצע בהצלחה",
        paymentDescription:
          "התשלום שלך בסך 29.99 דולר עובד. קבלה נשלחה לכתובת האימייל שלך.",
        featureTitle: "תכונה חדשה זמינה",
        featureDescription:
          "הוספנו תמיכה במצב כהה. אתה יכול להפעיל אותו בהגדרות החשבון שלך.",
      },
    },
  }

  const alerts = [
    {
      icon: {
        lucide: "CheckCircle2Icon",
        tabler: "IconCircleCheckFilled",
        hugeicons: "CheckmarkCircle02Icon",
        phosphor: "CheckCircleIcon",
        remixicon: "RiCheckboxCircleLine",
      },
      titleKey: "paymentTitle" as const,
      descriptionKey: "paymentDescription" as const,
    },
    {
      icon: {
        lucide: "InfoIcon",
        tabler: "IconInfoCircle",
        hugeicons: "AlertCircleIcon",
        phosphor: "InfoIcon",
        remixicon: "RiInformationLine",
      },
      titleKey: "featureTitle" as const,
      descriptionKey: "featureDescription" as const,
    },
  ] as const

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <div sx={styles.div} dir={translation.dir}>
      {#each alerts as alert, index (index)}
        <Alert>
          <IconPlaceholder {...alert.icon} />
          <AlertTitle>
            {translation.t[alert.titleKey]}
          </AlertTitle>
          <AlertDescription>
            {translation.t[alert.descriptionKey]}
          </AlertDescription>
        </Alert>
      {/each}
    </div>
  </div>
</DirectionProvider>
