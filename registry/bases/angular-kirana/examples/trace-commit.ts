import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontFamily, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "../ui/code-block"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  textMutedForeground: css({ color: theme.mutedForeground }),
  narrow: css({ maxWidth: containerSize.sm }),
  fontMono: css({ fontFamily: fontFamily.mono }),
  mx6Mb6WAuto: css({
    marginInline: space[6],
    marginBottom: space[6],
    width: "auto",
  }),
}

const files = [
  {
    path: "app/login/page.tsx",
    added: false,
    additions: 2,
    deletions: 2,
    diff: `@@ -14,7 +14,7 @@ export default async function LoginPage({
   searchParams,
 }) {
   const { next } = await searchParams
-  const redirectTo =
-    next && next.startsWith("/") ? next : "/"
+  const redirectTo = safeRedirect(next)
+
   return <LoginForm redirectTo={redirectTo} />
 }`,
  },
  {
    path: "lib/auth/redirect.ts",
    added: true,
    additions: 7,
    deletions: 0,
    diff: `@@ -0,0 +1,7 @@
+export default function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith("/") || next.startsWith("//")) {
+    return "/"
+  }
+
+  return next
+}`,
  },
]

/** A diff row's look, by its marker (React's `DiffLines`). */
function variant(line: string) {
  return line.startsWith("+")
    ? "added"
    : line.startsWith("-")
      ? "removed"
      : "default"
}

@Component({
  selector: "trace-commit",
  imports: [
    CodeBlock,
    CodeBlockContent,
    CodeBlockLine,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="GitCommitHorizontalIcon"
                  tabler="IconGitCommit"
                  hugeicons="GitCommitIcon"
                  phosphor="GitCommitIcon"
                  remixicon="RiGitCommitLine"
                ></svg>
              </span>
              <span kuiTraceTitle
                >Committed a1b2c3: Fix the login redirect</span
              >
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiTrace>
              @for (file of files; track file.path) {
                <ng-container kuiSheet>
                  <button kuiSheetTrigger>
                    <span kuiTraceLine>
                      <span kuiTraceIcon>
                        @if (file.added) {
                          <svg
                            iconPlaceholder
                            lucide="FilePlusIcon"
                            tabler="IconFilePlus"
                            hugeicons="FileAddIcon"
                            phosphor="FilePlusIcon"
                            remixicon="RiFileAddLine"
                          ></svg>
                        } @else {
                          <svg
                            iconPlaceholder
                            lucide="FilePenIcon"
                            tabler="IconFilePencil"
                            hugeicons="FileEditIcon"
                            phosphor="NotePencilIcon"
                            remixicon="RiFileEditLine"
                          ></svg>
                        }
                      </span>
                      <span kuiTraceTitle>
                        {{ file.added ? "Added" : "Edited" }}
                        {{ file.path }}
                      </span>
                      <span kuiTraceDescription [sx]="styles.fontMono">
                        +{{ file.additions }} −{{ file.deletions }}
                      </span>
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
                  <div kuiSheetContent>
                    <div kuiSheetHeader>
                      <h2 kuiSheetTitle [sx]="styles.fontMono">
                        {{ file.path }}
                      </h2>
                      <p kuiSheetDescription>
                        {{ file.additions }}
                        additions,
                        {{ file.deletions }}
                        deletions
                      </p>
                    </div>
                    <div kuiCodeBlock [sx]="styles.mx6Mb6WAuto">
                      <pre kuiCodeBlockContent>@for (line of file.diff.split('
'); track index; let index = $index) {@if (line.startsWith('@@')) {<span kuiCodeBlockLine [sx]="styles.textMutedForeground">{{ line }}</span>}@else {<span kuiCodeBlockLine [variant]="variant(line)">{{ line.slice(1) }}</span>}}</pre>
                    </div>
                  </div>
                </ng-container>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TraceCommit {
  protected readonly styles = styles
  protected readonly files = files
  protected readonly variant = variant
  protected readonly page = page
}
