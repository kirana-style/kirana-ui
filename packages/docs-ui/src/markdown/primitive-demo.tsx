/**
 * `<!-- ::start:primitive-demo demo="dialog" source="https://…" -->` … `<!-- ::end:primitive-demo -->`:
 * one card for a primitive's example. The component is drawn live in a frame; under it, a bar
 * chooses the framework whose code is read and the styling (CSS Modules, Kirana, Tailwind, or
 * Raw, the browser's own look); then that choice's files as tabs over the one that is read,
 * with its copy button, and the code can be put away.
 *
 * The block's content is the code itself, one fenced block a file, its title saying whose it
 * is: `React · CSS Modules · demo.tsx`, `Vue · Example · Demo.vue`. The frame is a page of the
 * primitives' preview app (`/preview/primitives/?demo=…&style=…`), which loads that one styling's
 * stylesheet and no other.
 */
import { Children, isValidElement, useEffect, useState } from "react"
import { css } from "@kirana-style/core"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/react-base/ui/select"
import { BrandIcon } from "../brand-icon.tsx"
import { FRAMEWORK_LOGOS } from "../framework-logos.ts"
import {
  alpha,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"
import { CodeSource, CopyButton } from "./code-block.tsx"

const STYLINGS = [
  ["css", "CSS Modules"],
  ["kirana", "Kirana"],
  ["tailwind", "Tailwind"],
  ["raw", "Raw"],
] as const
type Styling = (typeof STYLINGS)[number][0]

/** Where the reader's framework is kept, so every page opens on it. */
const KEPT = "kui-primitives-framework"

const rule = {
  borderBlockStartWidth: "1px",
  borderBlockStartStyle: "solid",
  borderBlockStartColor: theme.border,
} as const

const styles = {
  card: css({
    marginBlock: spacing[6],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.xl,
    overflow: "hidden",
  }),
  frame: css({
    display: "block",
    width: "100%",
    borderWidth: "0",
    backgroundColor: theme.background,
  }),
  bar: css({
    ...rule,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing[2],
    paddingBlock: spacing[2],
    paddingInline: spacing[3],
    backgroundColor: alpha.muted50,
  }),
  label: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  choice: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[2],
  }),
  spacer: css({ flexGrow: "1" }),
  action: css({
    paddingBlock: spacing[1],
    paddingInline: spacing[2],
    borderRadius: radius.md,
    backgroundColor: { base: "transparent", ":hover": theme.background },
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    textDecorationLine: "none",
  }),
  // The files of the framework and styling chosen, as tabs over the one that is read.
  files: css({
    ...rule,
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    paddingInline: spacing[2],
  }),
  tabs: css({ display: "flex", overflowX: "auto", scrollbarWidth: "none" }),
  tab: css({
    paddingBlock: spacing[2],
    paddingInline: spacing[3],
    borderWidth: "0",
    borderBlockEndWidth: "2px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: {
      base: "transparent",
      '[aria-selected="true"]': theme.foreground,
    },
    backgroundColor: "transparent",
    color: {
      base: theme.mutedForeground,
      '[aria-selected="true"]': theme.foreground,
    },
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    whiteSpace: "nowrap",
    cursor: "pointer",
  }),
  note: css({
    ...rule,
    margin: "0",
    paddingBlock: spacing[2],
    paddingInline: spacing[4],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  code: css({
    ...rule,
    maxHeight: "26rem",
    overflow: "auto",
    backgroundColor: theme.background,
  }),
  toggle: css({
    ...rule,
    display: "block",
    width: "100%",
    paddingBlock: spacing[2],
    borderInlineWidth: "0",
    borderBlockEndWidth: "0",
    backgroundColor: { base: alpha.muted50, ":hover": theme.background },
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    cursor: "pointer",
  }),
}

interface File {
  framework: string
  styling: string
  name: string
  html: string
  source: string
  lang: string
}

type Code = { title?: string; html?: string; source?: string; lang?: string }

/** The block's code, by whose it is: read from each file's title. */
function files(children: React.ReactNode): File[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<Code>(child)) return []
    const { title = "", html = "", source = "", lang = "" } = child.props
    const [framework, styling, name] = title.split(" · ")
    if (!framework || !styling || !name) return []
    return [{ framework, styling, name, html, source, lang }]
  })
}

function Framework({ name }: { name: string }) {
  const logo = FRAMEWORK_LOGOS[name.toLowerCase()]
  return (
    <span sx={styles.choice}>
      {logo ? <BrandIcon icon={logo} /> : null}
      {name}
    </span>
  )
}

export function PrimitiveDemo({
  demo = "",
  height = "380",
  source,
  children,
}: {
  demo?: string
  height?: string
  /** The demo's files in the repository. */
  source?: string
  children?: React.ReactNode
}) {
  const all = files(children)
  const frameworks = [...new Set(all.map((file) => file.framework))]
  const [framework, setFramework] = useState(frameworks[0] ?? "React")
  const [styling, setStyling] = useState<Styling>("css")
  const [shown, setShown] = useState(true)
  const [file, setFile] = useState("")
  // The reader's framework, from the last page they chose one on.
  useEffect(() => {
    const kept = window.localStorage.getItem(KEPT)
    if (kept && frameworks.includes(kept)) setFramework(kept)
    // Read once, when the page is first drawn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!demo) return null
  const label = STYLINGS.find(([id]) => id === styling)![1]
  const own = all.filter((each) => each.framework === framework)
  // A framework with its own code in every styling shows the chosen one's files; one with a
  // single example shows that.
  const styled = own.filter((each) => each.styling === label)
  const code = styled.length
    ? styled
    : own.filter((each) => each.styling === own[0]?.styling)
  // The file that is read: the one chosen, while the framework and styling still have it.
  const read = code.find((each) => each.name === file) ?? code[0]
  const frame = `/preview/primitives/?demo=${encodeURIComponent(demo)}&style=${styling}`
  return (
    <div sx={styles.card} data-slot="primitive-demo">
      <iframe
        // A page of its own a styling: a new frame, so no stylesheet of the last one is left.
        key={styling}
        sx={styles.frame}
        style={{ height: `${height}px` }}
        src={frame}
        title={`${demo}, ${label}`}
      />
      <div sx={styles.bar}>
        <span sx={styles.label}>Framework</span>
        <Select
          value={framework}
          onValueChange={(next) => {
            setFramework(String(next))
            window.localStorage.setItem(KEPT, String(next))
          }}
        >
          <SelectTrigger size="sm" aria-label="Framework">
            <SelectValue>{() => <Framework name={framework} />}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {frameworks.map((each) => (
              <SelectItem key={each} value={each}>
                <Framework name={each} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span sx={styles.label}>Styling</span>
        <Select
          value={styling}
          onValueChange={(next) => setStyling(next as Styling)}
        >
          <SelectTrigger size="sm" aria-label="Styling">
            <SelectValue>{() => label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STYLINGS.map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span sx={styles.spacer} />
        <a sx={styles.action} href={frame} target="_blank" rel="noreferrer">
          Open
        </a>
        {source ? (
          <a sx={styles.action} href={source} target="_blank" rel="noreferrer">
            Source
          </a>
        ) : null}
      </div>
      {read ? (
        <>
          <div sx={styles.files}>
            <div sx={styles.tabs} role="tablist" aria-label="Files">
              {code.map((each) => (
                <button
                  key={each.name}
                  type="button"
                  role="tab"
                  sx={styles.tab}
                  aria-selected={each === read}
                  onClick={() => {
                    setFile(each.name)
                    setShown(true)
                  }}
                >
                  {each.name}
                </button>
              ))}
            </div>
            <span sx={styles.spacer} />
            <CopyButton source={read.source} />
          </div>
          {styled.length || !shown ? null : (
            <p sx={styles.note}>
              {framework}, as the library's own tests write it. The live example
              above and its stylings are React's; the component and its styles
              are the same on every framework.
            </p>
          )}
          {shown ? (
            <div sx={styles.code} role="tabpanel">
              <CodeSource
                html={read.html}
                lang={read.lang}
                source={read.source}
              />
            </div>
          ) : null}
          <button
            type="button"
            sx={styles.toggle}
            aria-expanded={shown}
            onClick={() => setShown(!shown)}
          >
            {shown ? "Hide code" : "Show code"}
          </button>
        </>
      ) : null}
    </div>
  )
}
