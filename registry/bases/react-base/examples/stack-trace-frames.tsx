import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  traceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  p: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.destructive,
  }),
  ol: css({
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
  li: css({
    whiteSpace: "nowrap",
  }),
}

const STACK = `TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/lib/billing.ts:42:31)
    at InvoiceRow (app/components/invoice-row.tsx:18:12)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:19049:16)
    at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:22776:12)
    at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:22707:5)`

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes("node_modules"),
  }
}

const [error, ...lines] = STACK.split("\n").map((line) => line.trim())
const frames = lines.map(parseFrame)
const appFrames = frames.filter((frame) => !frame.internal)
const internalFrames = frames.filter((frame) => frame.internal)

export default function StackTraceFrames() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <IconPlaceholder
                  lucide="CircleXIcon"
                  tabler="IconCircleX"
                  hugeicons="CancelCircleIcon"
                  phosphor="XCircleIcon"
                  remixicon="RiCloseCircleLine"
                />
              </TraceIcon>
              <TraceTitle>Failed: {error}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent
            keepMounted
            sx={styles.traceCollapsibleContent}
          >
            <p sx={styles.p}>{error}</p>
            <Trace>
              {appFrames.map((frame) => (
                <a key={frame.line} href={`#${frame.file}:${frame.lineNumber}`}>
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
              ))}
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
                      {internalFrames.length} framework frames
                    </TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  <ol sx={styles.ol}>
                    {internalFrames.map((frame) => (
                      <li key={frame.line} sx={styles.li}>
                        {frame.line}
                      </li>
                    ))}
                  </ol>
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
