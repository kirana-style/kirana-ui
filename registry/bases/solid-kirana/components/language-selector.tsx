/**
 * What the right-to-left demos import, as React's `components/language-selector` and Vue's: the
 * language they are read in. A page that frames demos provides it under `LanguageContext` as an
 * accessor (the Solid preview, from `?lang=` and the docs page's selector); a demo outside one
 * reads its own. The result's fields are getters, so a demo reads them through it
 * (`translation.t`), not destructured, to follow the page's language.
 */
import { createContext, createMemo, createSignal, useContext } from "solid-js"
import type { Accessor } from "solid-js"

import { LANGUAGES } from "../../../core/language"
import type { Language, Translations } from "../../../core/language"

export { LANGUAGES, isLanguage } from "../../../core/language"
export type { Direction, Language, Translations } from "../../../core/language"

/** The page's language, when it names one. */
export const LanguageContext = createContext<Accessor<Language | undefined>>(
  () => undefined
)

/** A demo's strings and direction in the page's language, or its own outside a provider. */
export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) {
  const page = useContext(LanguageContext)
  const [own, setOwn] = createSignal<Language>(defaultLanguage)
  const language = createMemo<Language>(() => page() ?? own())
  const current = createMemo(() => translations[language()])
  return {
    get language() {
      return language()
    },
    set language(next: Language) {
      setOwn(next)
    },
    get dir() {
      return current().dir
    },
    // Ark UI's parts write their `dir` from the locale, so a right-to-left demo provides its own
    // (`DirectionProvider locale`), where Base UI's parts read the page's and write none.
    get locale() {
      return current().locale ?? LANGUAGES[language()].locale
    },
    get t() {
      return current().values
    },
  }
}
