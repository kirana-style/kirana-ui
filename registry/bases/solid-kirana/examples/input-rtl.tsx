import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function InputRtl() {
  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        apiKey: "API Key",
        placeholder: "sk-...",
        description: "Your API key is encrypted and stored securely.",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        apiKey: "مفتاح API",
        placeholder: "sk-...",
        description: "مفتاح API الخاص بك مشفر ومخزن بأمان.",
      },
    },
    he: {
      dir: "rtl",
      values: {
        apiKey: "מפתח API",
        placeholder: "sk-...",
        description: "מפתח ה-API שלך מוצפן ונשמר בצורה מאובטחת.",
      },
    },
  }

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Field dir={translation.dir}>
          <FieldLabel for="input-rtl-api-key">
            {translation.t.apiKey}
          </FieldLabel>
          <Input
            id="input-rtl-api-key"
            type="password"
            placeholder={translation.t.placeholder}
            dir={translation.dir}
          />
          <FieldDescription>{translation.t.description}</FieldDescription>
        </Field>
      </div>
    </DirectionProvider>
  )
}
