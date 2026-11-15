/**
 * What the right-to-left demos import, as React's `components/language-selector`: the language
 * they are read in. A page that frames demos provides it under `LANGUAGE` (the Vue preview, from
 * `?lang=` and the docs page's selector); a demo outside one reads its own.
 */
import { computed, inject, ref } from "vue"
import type { InjectionKey, Ref } from "vue"

import { LANGUAGES } from "../../../../core/language"
import type { Language, Translations } from "../../../../core/language"

export { LANGUAGES, isLanguage } from "../../../../core/language"
export type {
  Direction,
  Language,
  Translations,
} from "../../../../core/language"

/** The page's language, when it names one. */
export const LANGUAGE: InjectionKey<Readonly<Ref<Language | undefined>>> =
  Symbol("language")

/** A demo's strings and direction in the page's language, or its own outside a provider. */
export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) {
  const page = inject(LANGUAGE, undefined)
  const own = ref<Language>(defaultLanguage)
  const language = computed<Language>({
    get: () => page?.value ?? own.value,
    set: (next) => (own.value = next),
  })
  const current = computed(() => translations[language.value])
  return {
    language,
    dir: computed(() => current.value.dir),
    // Ark UI's parts write their `dir` from the locale, so a right-to-left demo provides its own
    // (`DirectionProvider :locale`), where Base UI's parts read the page's and write none.
    locale: computed(
      () => current.value.locale ?? LANGUAGES[language.value].locale
    ),
    t: computed(() => current.value.values),
  }
}
