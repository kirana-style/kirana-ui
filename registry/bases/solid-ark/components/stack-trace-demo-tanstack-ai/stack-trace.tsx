import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function StackTrace(props: { stack: string; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["stack", "sx", "class"])
  const styles = {
    stackTraceTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[2] },
    }),
    stackTraceP: css({
      fontFamily: fontFamily.mono,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      color: theme.destructive,
    }),
    stackTraceOl: css({
      display: "flex",
      flexDirection: "column",
      gap: space[1],
      overflowX: "auto",
      borderRadius: radius.md,
      backgroundColor: theme.muted,
      padding: space[3],
      fontFamily: fontFamily.mono,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
    }),
    stackTraceLi: css({
      whiteSpace: "nowrap",
    }),
  }

  function parseFrame(line: string) {
    const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

    return {
      line,
      name: match?.[1],
      file: match?.[2],
      lineNumber: match?.[3],
      internal: line.includes("node_modules") || line.includes("node:"),
    }
  }

  const parsed = createMemo(() => {
    const [error, ...lines] = local.stack.split("\n").map((line) => line.trim())
    const frames = lines.map(parseFrame)
    return {
      error,
      appFrames: frames.filter((frame) => !frame.internal),
      internalFrames: frames.filter((frame) => frame.internal),
    }
  })

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>Failed: {parsed().error}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.stackTraceTraceCollapsibleContent}>
        <p sx={styles.stackTraceP}>{parsed().error}</p>
        <Trace>
          <For each={parsed().appFrames}>
            {(frame) => (
              <a href={`#${frame.file}:${frame.lineNumber}`}>
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    />
                  </TraceIcon>
                  <TraceTitle>
                    {frame.name} in {frame.file}:{frame.lineNumber}
                  </TraceTitle>
                </TraceLine>
              </a>
            )}
          </For>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="LayersIcon"
                    tabler="IconStack2"
                    hugeicons="Layers01Icon"
                    phosphor="StackIcon"
                    remixicon="RiStackLine"
                  />
                </TraceIcon>
                <TraceTitle>
                  {parsed().internalFrames.length} framework frames
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <ol sx={styles.stackTraceOl}>
                <For each={parsed().internalFrames}>
                  {(frame) => <li sx={styles.stackTraceLi}>{frame.line}</li>}
                </For>
              </ol>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
