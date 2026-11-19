import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

const results = [
  {
    title: "Caching build outputs",
    url: "https://nextjs.org/docs/app/guides/caching",
  },
  {
    title: "Image optimization reference",
    url: "https://nextjs.org/docs/app/api-reference/components/image",
  },
  {
    title: "Deploy hooks and cache keys",
    url: "https://vercel.com/docs/deploy-hooks",
  },
]

@Component({
  selector: "trace-dialog",
  imports: [
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <ng-container kuiDialog>
          <button kuiDialogTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="GlobeIcon"
                  tabler="IconGlobe"
                  hugeicons="Globe02Icon"
                  phosphor="GlobeIcon"
                  remixicon="RiGlobeLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Searched the web for cache keys</span>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                ></svg>
              </span>
            </span>
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Searched the web for cache keys</h2>
              <p kuiDialogDescription>
                Three results were used in the response.
              </p>
            </div>
            <div kuiTrace>
              @for (result of results; track result.url) {
                <a [attr.href]="result.url" target="_blank" rel="noreferrer">
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="GlobeIcon"
                        tabler="IconGlobe"
                        hugeicons="Globe02Icon"
                        phosphor="GlobeIcon"
                        remixicon="RiGlobeLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>
                      {{ result.title }}
                      <span [sx]="visuallyHidden">(opens in a new tab)</span>
                    </span>
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="ArrowUpRightIcon"
                        tabler="IconArrowUpRight"
                        hugeicons="ArrowUpRightIcon"
                        phosphor="ArrowUpRightIcon"
                        remixicon="RiArrowRightUpLine"
                      ></svg>
                    </span>
                  </span>
                </a>
              }
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class TraceDialog {
  protected readonly styles = styles
  protected readonly results = results
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
