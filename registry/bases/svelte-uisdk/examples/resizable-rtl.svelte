<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
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

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <ResizablePanelGroup panels={[{ id: 'a1' }, { id: 'a2' }]} defaultSize={[50, 50]} orientation="horizontal" sx={styles.resizablePanelGroup} dir={translation.dir}>
      <ResizablePanel id="a1">
        <div sx={styles.div}>
          <span sx={styles.span}>
            {translation.t.one}
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle id="a1:a2" withHandle />
      <ResizablePanel id="a2">
        <ResizablePanelGroup panels={[{ id: 'b1' }, { id: 'b2' }]} defaultSize={[25, 75]} orientation="vertical" dir={translation.dir}>
          <ResizablePanel id="b1">
            <div sx={styles.div2}>
              <span sx={styles.span2}>
                {translation.t.two}
              </span>
            </div>
          </ResizablePanel>
          <ResizableHandle id="b1:b2" withHandle />
          <ResizablePanel id="b2">
            <div sx={styles.div3}>
              <span sx={styles.span3}>
                {translation.t.three}
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</DirectionProvider>
