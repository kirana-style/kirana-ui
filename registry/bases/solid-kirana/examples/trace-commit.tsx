import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { css } from "@kirana-style/core"
import { containerSize, fontFamily, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function TraceCommit() {
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

  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="GitCommitHorizontalIcon"
                  tabler="IconGitCommit"
                  hugeicons="GitCommitIcon"
                  phosphor="GitCommitIcon"
                  remixicon="RiGitCommitLine"
                />
              </TraceIcon>
              <TraceTitle>Committed a1b2c3: Fix the login redirect</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <For each={files}>
                {(file) => (
                  <Sheet>
                    <SheetTrigger>
                      <TraceLine>
                        <TraceIcon>
                          {file.added ? (
                            <IconPlaceholder
                              lucide="FilePlusIcon"
                              tabler="IconFilePlus"
                              hugeicons="FileAddIcon"
                              phosphor="FilePlusIcon"
                              remixicon="RiFileAddLine"
                            />
                          ) : (
                            <IconPlaceholder
                              lucide="FilePenIcon"
                              tabler="IconFilePencil"
                              hugeicons="FileEditIcon"
                              phosphor="NotePencilIcon"
                              remixicon="RiFileEditLine"
                            />
                          )}
                        </TraceIcon>
                        <TraceTitle>
                          {file.added ? "Added" : "Edited"} {file.path}
                        </TraceTitle>
                        <TraceDescription sx={styles.fontMono}>
                          +{file.additions} −{file.deletions}
                        </TraceDescription>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="ChevronRightIcon"
                            tabler="IconChevronRight"
                            hugeicons="ArrowRight01Icon"
                            phosphor="CaretRightIcon"
                            remixicon="RiArrowRightSLine"
                          />
                        </TraceIcon>
                      </TraceLine>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle sx={styles.fontMono}>
                          {file.path}
                        </SheetTitle>
                        <SheetDescription>
                          {file.additions} additions, {file.deletions} deletions
                        </SheetDescription>
                      </SheetHeader>
                      <CodeBlock sx={styles.mx6Mb6WAuto}>
                        <CodeBlockContent>
                          <For each={file.diff.split("\n")}>
                            {(line) => (
                              <>
                                {line.startsWith("@@") ? (
                                  <CodeBlockLine
                                    sx={styles.textMutedForeground}
                                  >
                                    {line}
                                  </CodeBlockLine>
                                ) : (
                                  <CodeBlockLine variant={variant(line)}>
                                    {line.slice(1)}
                                  </CodeBlockLine>
                                )}
                              </>
                            )}
                          </For>
                        </CodeBlockContent>
                      </CodeBlock>
                    </SheetContent>
                  </Sheet>
                )}
              </For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
