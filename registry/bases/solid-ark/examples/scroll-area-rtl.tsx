import { For } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function ScrollAreaRtl() {
  const styles = {
    scrollArea: css({
      height: { "*": null, base: space[72] },
      width: { "*": null, base: space[48] },
      borderRadius: { "*": null, base: radius.md },
      borderStyle: { "*": null, base: "solid" },
      borderWidth: { "*": null, base: "1px" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderColor: theme.border,
    }),
    div: css({
      padding: space[4],
    }),
    h4: css({
      marginBottom: space[4],
      fontSize: fontSize.sm,
      lineHeight: "1",
      fontWeight: fontWeight.medium,
    }),
    div2: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    separator: css({
      marginBlock: { "*": null, base: space[2] },
    }),
  }

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        tags: "Tags",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        tags: "العلامات",
      },
    },
    he: {
      dir: "rtl",
      values: {
        tags: "תגיות",
      },
    },
  }

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <ScrollArea sx={styles.scrollArea} dir={translation.dir}>
          <div sx={styles.div}>
            <h4 sx={styles.h4}>{translation.t.tags}</h4>
            <For each={tags}>
              {(tag) => (
                <>
                  <div sx={styles.div2}>{tag}</div>
                  <Separator sx={styles.separator} />
                </>
              )}
            </For>
          </div>
        </ScrollArea>
      </div>
    </DirectionProvider>
  )
}
