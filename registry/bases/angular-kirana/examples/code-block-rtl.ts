import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import { DirectionProvider } from "../ui/direction"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      description: "Install the packages, then start the dev server.",
      title: "Terminal",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      description: "ثبّت الحزم، ثم شغّل خادم التطوير.",
      title: "الطرفية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      description: "התקן את החבילות, ואז הפעל את שרת הפיתוח.",
      title: "מסוף",
    },
  },
}

const code = `pnpm add ai @ai-sdk/react zod
pnpm dev`

const lines = useHighlightedCode(
  () => code,
  () => "bash"
)

@Component({
  selector: "code-block-rtl",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    DirectionProvider,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <p>{{ t().description }}</p>
          <div kuiCodeBlock>
            <div kuiCodeBlockHeader>
              <div kuiCodeBlockTitle>
                <svg
                  iconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                ></svg
                >{{ t().title }}
              </div>
              <div kuiCodeBlockActions>
                <button kuiCodeBlockCopyButton [value]="code"></button>
              </div>
            </div>
            <pre
              kuiCodeBlockContent
              lineNumbers
            >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class CodeBlockRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly code = code
  protected readonly lines = lines
  protected readonly page = page
}
