import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Skeleton } from "../ui/skeleton"
import { css, select } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  skeleton: css({
    height: { "*": null, base: space[12] },
    width: { "*": null, base: space[12] },
    borderRadius: { "*": null, base: radius.full },
  }),
  div2: css({
    [select.child(":not(:last-child)")]: {
      marginBlockStart: "0px",
      marginBottom: space[2],
    },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "250px" },
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "200px" },
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

export default function SkeletonRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <Skeleton sx={styles.skeleton} />
        <div sx={styles.div2}>
          <Skeleton sx={styles.skeleton2} />
          <Skeleton sx={styles.skeleton3} />
        </div>
      </div>
    </div>
  )
}
