<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { Kbd, KbdGroup } from "../ui/kbd"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: space[4],
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {},
    },
    ar: {
      dir: "rtl",
      values: {},
    },
    he: {
      dir: "rtl",
      values: {},
    },
  }

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <div sx={styles.div} dir={translation.dir}>
      <KbdGroup>
        <Kbd>
          ⌘
        </Kbd>
        <Kbd>
          ⇧
        </Kbd>
        <Kbd>
          ⌥
        </Kbd>
        <Kbd>
          ⌃
        </Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>
          Ctrl
        </Kbd>
        <span>
          +
        </span>
        <Kbd>
          B
        </Kbd>
      </KbdGroup>
    </div>
  </div>
</DirectionProvider>
