<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Toggle } from "../ui/toggle"
import { css } from "@kirana-style/core"
import { IN_PRESSED_TOGGLE } from "../../../styles/toggle.styles"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  iconPlaceholder: css({
    // The icon fills while the toggle is pressed.
    fill: { [IN_PRESSED_TOGGLE]: theme.foreground },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Bookmark",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "إشارة مرجعية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "סימנייה",
    },
  },
}

const { dir, t, locale } = useTranslation(translations, "ar")
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Toggle
        aria-label="Toggle bookmark"
        size="sm"
        variant="outline"
        :dir="dir"
      >
        <IconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="BookmarkIcon"
          phosphor="BookmarkIcon"
          remixicon="RiBookmarkLine"
          :sx="styles.iconPlaceholder"
        />
        {{ t.label }}
      </Toggle>
    </div>
  </DirectionProvider>
</template>
