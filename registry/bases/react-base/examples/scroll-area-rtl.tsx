import * as React from "react"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  scrollArea: css({
    height: { "*": null, base: space[72] },
    width: { "*": null, base: space[48] },
    borderRadius: { "*": null, base: radius.md },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
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

export default function ScrollAreaRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <ScrollArea sx={styles.scrollArea} dir={dir}>
        <div sx={styles.div}>
          <h4 sx={styles.h4}>{t.tags}</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div sx={styles.div2}>{tag}</div>
              <Separator sx={styles.separator} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
