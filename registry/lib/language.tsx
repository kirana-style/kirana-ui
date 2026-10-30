/**
 * The language a right-to-left demo is read in, as shadcn/ui's site's `language-selector` (MIT):
 * English, Arabic or Hebrew, each with its direction and its strings. A demo reads it with
 * `useTranslation`; a page that frames demos sets it with `LanguageProvider` (the React preview,
 * from `?lang=` and the docs page's selector).
 */
import * as React from "react"

import type { Direction, Language } from "../core/language"

export { LANGUAGES, isLanguage } from "../core/language"
export type { Direction, Language } from "../core/language"

export type Translations<
  T extends Record<string, string> = Record<string, string>,
> = Record<Language, { dir: Direction; locale?: string; values: T }>

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic (العربية)" },
  { value: "he", label: "Hebrew (עברית)" },
] as const

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
)

/** The language for every demo inside; `language` makes it the page's, `defaultLanguage` its own. */
export function LanguageProvider({
  children,
  defaultLanguage = "ar",
  language: controlled,
  onLanguageChange,
}: {
  children: React.ReactNode
  defaultLanguage?: Language
  language?: Language
  onLanguageChange?: (language: Language) => void
}) {
  const [own, setOwn] = React.useState<Language>(defaultLanguage)
  const language = controlled ?? own
  const setLanguage = onLanguageChange ?? setOwn
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return React.useContext(LanguageContext)
}

/** A demo's strings and direction in the page's language, or its own outside a provider. */
export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) {
  const context = useLanguageContext()
  const [localLanguage, setLocalLanguage] =
    React.useState<Language>(defaultLanguage)
  const language = context?.language ?? localLanguage
  const setLanguage = context?.setLanguage ?? setLocalLanguage
  const { dir, locale, values: t } = translations[language]
  return { language, setLanguage, dir, locale, t }
}
