/**
 * What the right-to-left demos import, as React's `components/language-selector`: the language
 * they are read in. The Angular preview provides the page's under `LANGUAGE` (from `?lang=` and the
 * docs page's selector); a demo outside one reads its own.
 */
import { InjectionToken, computed, inject, signal } from "@angular/core"
import type { Signal } from "@angular/core"

import { LANGUAGES } from "../../../core/language"
import type { Language, Translations } from "../../../core/language"

export { LANGUAGES, isLanguage } from "../../../core/language"
export type { Direction, Language, Translations } from "../../../core/language"

/** The page's language, when it names one. */
export const LANGUAGE = new InjectionToken<Signal<Language | undefined>>(
  "kui language",
  { factory: () => signal(undefined) }
)

/**
 * A demo's strings and direction in the page's language, or its own outside a provider: signals,
 * read in its template as `t().title` and `dir()`.
 */
export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) {
  const page = inject(LANGUAGE)
  const own = signal<Language>(defaultLanguage)
  const language = computed<Language>(() => page() ?? own())
  const current = computed(() => translations[language()])
  return {
    language,
    setLanguage: (next: Language) => own.set(next),
    dir: computed(() => current().dir),
    locale: computed(() => current().locale ?? LANGUAGES[language()].locale),
    t: computed(() => current().values),
  }
}
