import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  resizablePanelGroup: css({
    maxWidth: { "*": null, base: containerSize.sm },
    borderRadius: { "*": null, base: radius.lg },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  div: css({
    display: "flex",
    height: "200px",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span: css({
    fontWeight: fontWeight.semibold,
  }),
  div2: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span2: css({
    fontWeight: fontWeight.semibold,
  }),
  div3: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  span3: css({
    fontWeight: fontWeight.semibold,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      one: "One",
      two: "Two",
      three: "Three",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      one: "واحد",
      two: "اثنان",
      three: "ثلاثة",
    },
  },
  he: {
    dir: "rtl",
    values: {
      one: "אחד",
      two: "שניים",
      three: "שלושה",
    },
  },
}

export default function ResizableRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.resizablePanelGroup}
        dir={dir}
      >
        <ResizablePanel defaultSize="50%">
          <div sx={styles.div}>
            <span sx={styles.span}>{t.one}</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical" dir={dir}>
            <ResizablePanel defaultSize="25%">
              <div sx={styles.div2}>
                <span sx={styles.span2}>{t.two}</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="75%">
              <div sx={styles.div3}>
                <span sx={styles.span3}>{t.three}</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
