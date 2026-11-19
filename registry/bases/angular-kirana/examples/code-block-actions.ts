import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  ariaPressedTextForegroun: css({
    color: { '[aria-pressed="true"]': theme.foreground },
  }),
}

const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

@Component({
  selector: "code-block-actions",
  imports: [
    Button,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
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
              >Terminal
            </div>
            <div kuiCodeBlockActions>
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                aria-label="Wrap lines"
                [attr.aria-pressed]="wrap()"
                [sx]="styles.ariaPressedTextForegroun"
                (click)="wrap.set(!wrap())"
              >
                <svg
                  iconPlaceholder
                  lucide="WrapTextIcon"
                  tabler="IconTextWrap"
                  hugeicons="TextWrapIcon"
                  phosphor="ArrowUDownLeftIcon"
                  remixicon="RiTextWrap"
                ></svg>
              </button>
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                aria-label="Download"
                (click)="download(output, 'lint.log')"
              >
                <svg
                  iconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                ></svg>
              </button>
              <button kuiCodeBlockCopyButton [value]="output"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent [wrap]="wrap()">{{ output }}</pre>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockActionsExample {
  protected readonly wrap = signal(true)
  protected readonly styles = styles
  protected readonly output = output
  protected readonly download = download
  protected readonly page = page
}
