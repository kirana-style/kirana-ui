/**
 * What the right-to-left demos import, as upstream's `@/components/language-selector`: the language
 * they are read in (`registry/lib/language.tsx`), and the selector a page shows over them.
 */
import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import type { Language } from "../../../lib/language"
import { languageOptions } from "../../../lib/language"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export * from "../../../lib/language"

const styles = {
  trigger: css({ width: { "*": null, base: space[36] } }),
}

export function LanguageSelector({
  value,
  onValueChange,
  languages = ["en", "ar", "he"],
}: {
  value: Language
  onValueChange: (value: Language) => void
  languages?: readonly Language[]
}) {
  return (
    <Select
      aria-label="Language"
      selectedKey={value}
      onSelectionChange={(next) => onValueChange(next as Language)}
    >
      <SelectTrigger
        size="sm"
        sx={styles.trigger}
        dir="ltr"
        data-name="language-selector"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent dir="ltr">
        <SelectGroup>
          {languageOptions
            .filter((option) => languages.includes(option.value))
            .map((option) => (
              <SelectItem key={option.value} id={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
