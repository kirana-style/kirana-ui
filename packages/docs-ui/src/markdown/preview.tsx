/**
 * `<!-- ::preview item="button-demo" height="360" combinations="react/base,react/aria" -->`: an
 * item's live preview, framed on the page as shadcn/ui's component preview is (a bordered box, the
 * item centred in it). The page that draws the item is the site's (`DocsConfig.previewSrc`), shown
 * in an iframe, so it renders in its own framework and design. With `combinations`, a picker above
 * it chooses the framework and base, the reader's choice for the whole site (`combination.ts`).
 *
 * Under it, in the same box, the demo's code as upstream shows it (`demo-code.tsx`), with a link to
 * the framed page alone, in a new tab, in its corner. `surface="true"` gives the page upstream's
 * `bg-surface`, as its chat parts' previews have; `code="false"` leaves the code out, as upstream's
 * `hideCode`.
 *
 * The frame is created once the page has hydrated, so its first address is the final one: the
 * prerendered page knows neither the reader's combination nor anything saved, and a frame created
 * before would load twice. The colour mode is not in the address: the framed page reads the site's
 * mode as it loads and follows a change through the theme provider's channel.
 */
import { useRef, useState, useSyncExternalStore } from "react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import type { Sx } from "@workspace/registry/lib/sx"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import {
  chooseCombination,
  combinationList,
  useCombination,
} from "../combination.ts"
import type { DocsCombination } from "../provider.tsx"
import { useDocs } from "../provider.tsx"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { LanguageSelector } from "@workspace/registry/bases/react-base/components/language-selector"
import type { Language } from "@workspace/registry/bases/react-base/components/language-selector"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/registry/bases/react-base/ui/popover"
import { LANGUAGE_MESSAGE } from "@workspace/registry/core/preview"
import { Icon } from "@workspace/shell/icon"

import { fontSize, lineHeight, radius, spacing, theme } from "../tokens.ts"
import { DemoCode } from "./demo-code.tsx"

const styles = {
  root: css({ marginBlockEnd: spacing[5] }),
  // The demo and its code in one bordered box, as upstream's component preview.
  box: css({
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  frame: css({ display: "block", width: "100%", borderWidth: 0 }),
  stage: css({ position: "relative" }),
  // A block, as upstream's `type="block"`: the page 1600px wide in a `4 / 2.5` box, clipped at the
  // box's end (its start, right to left), so the block lays out as on a desktop.
  blockStage: css({ aspectRatio: "4 / 2.5", overflow: "hidden" }),
  blockFrame: css({
    position: "absolute",
    insetBlock: 0,
    insetInlineStart: 0,
    width: "1600px",
    maxWidth: "none",
    height: "100%",
  }),
  blockFrameEnd: css({ insetInlineStart: "auto", insetInlineEnd: 0 }),
  // A wide demo: the frame the page's width, centred in the box and clipped by it, so its CSS
  // breakpoints read the page's width as upstream's inline demo does (a `hidden md:flex` item).
  wideStage: css({ overflow: "hidden" }),
  wideFrame: css({
    position: "absolute",
    insetBlock: 0,
    left: "50%",
    maxWidth: "none",
    height: "100%",
    translate: "-50% 0",
  }),
  caption: css({
    marginBlockStart: spacing[4],
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  // A right-to-left demo's bar, as upstream's: the language it is read in, and a note.
  bar: css({
    display: "flex",
    height: spacing[16],
    alignItems: "center",
    paddingInline: spacing[4],
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  note: css({ marginInlineStart: "auto" }),
  noteText: css({
    width: spacing[56],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  picker: css({
    marginBlockEnd: spacing[2],
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  missing: css({
    marginBlockEnd: spacing[5],
    color: theme.mutedForeground,
  }),
}

/** The framework-and-base picker, over every embed of a page that shows one. */
export function CombinationPicker({
  available,
  current,
  sx,
}: {
  available: readonly DocsCombination[]
  current: DocsCombination | undefined
  /** Where a page sets the picker in a row of its own (the charts' types). */
  sx?: Sx
}) {
  if (available.length < 2 || !current) return null
  return (
    <Tabs
      value={current.id}
      onValueChange={(value) => chooseCombination(String(value))}
      sx={[styles.picker, sx]}
      data-slot="combination-picker"
    >
      <TabsList variant="line">
        {available.map((combination) => (
          <TabsTrigger key={combination.id} value={combination.id}>
            {combination.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

export function MarkdownPreview({
  item,
  height = "360",
  combinations,
  direction,
  surface,
  code,
  block,
  caption,
  wide,
}: {
  item?: string
  height?: string
  combinations?: string
  /** `rtl`: a right-to-left demo, read in the language its bar chooses (Arabic first). */
  direction?: string
  /** `true`: upstream's `bg-surface` under the demo. */
  surface?: string
  /** `false`: the demo without its code (upstream's `hideCode`). */
  code?: string
  /** `true`: a block, shown as on a desktop and without its code (upstream's `type="block"`). */
  block?: string
  /** A line under the box (upstream's `figcaption`). */
  caption?: string
  /** `true`: the frame as wide as the page, for a demo whose CSS breakpoints must read the page. */
  wide?: string
}) {
  const { previewSrc, frameQuery } = useDocs()
  const hydrated = useSyncExternalStore(subscribeNever, isClient, isServer)
  const only = combinationList(combinations)
  const { available, current } = useCombination(only)
  const rtl = direction === "rtl"
  const isBlock = block === "true"
  const isWide = wide === "true" && !isBlock
  const [language, setLanguage] = useState<Language>("ar")
  // The frame opens in the first language and takes the next by message, so it is not reloaded.
  const [opened] = useState<Language>("ar")
  const frame = useRef<HTMLIFrameElement>(null)
  if (!item || !previewSrc)
    return <p sx={styles.missing}>No preview for {item ?? "this item"}.</p>
  const base = previewSrc(item, only ? current?.id : undefined)
  const extra = [
    rtl ? `lang=${opened}` : null,
    surface === "true" ? "surface=true" : null,
    // The page's own design for its frames, once hydrated: the browser knows what the reader saved.
    (hydrated && frameQuery?.()) || null,
  ].filter(Boolean)
  const src = extra.length
    ? `${base}${base.includes("?") ? "&" : "?"}${extra.join("&")}`
    : base
  // The page's width, which the framed demo's scripts are told (an inline demo would read it). A
  // block's frame is a desktop's width itself.
  const framed =
    hydrated && !isBlock
      ? `${src}${src.includes("?") ? "&" : "?"}pagewidth=${window.innerWidth}`
      : src
  const choose = (next: Language) => {
    setLanguage(next)
    frame.current?.contentWindow?.postMessage(
      { type: LANGUAGE_MESSAGE, language: next },
      "*"
    )
  }
  return (
    <div sx={styles.root} data-slot="markdown-preview">
      {only ? (
        <CombinationPicker available={available} current={current} />
      ) : null}
      <div sx={styles.box}>
        {rtl ? (
          <div sx={styles.bar}>
            <LanguageSelector value={language} onValueChange={choose} />
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    sx={styles.note}
                    aria-label="About the translations"
                  />
                }
              >
                <Icon icon={InformationCircleIcon} />
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" sx={styles.noteText}>
                The translations are shadcn/ui's, made with AI for
                demonstration: not perfect, and they may contain errors.
              </PopoverContent>
            </Popover>
          </div>
        ) : null}
        <div
          sx={[
            styles.stage,
            isBlock && styles.blockStage,
            isWide && styles.wideStage,
          ]}
          style={isWide ? { height: `${height}px` } : undefined}
        >
          {hydrated ? (
            <iframe
              ref={frame}
              title={`${item} preview`}
              src={framed}
              loading="lazy"
              height={isBlock || isWide ? undefined : height}
              style={isWide ? { width: `${window.innerWidth}px` } : undefined}
              sx={[
                styles.frame,
                isBlock && styles.blockFrame,
                isBlock && rtl && styles.blockFrameEnd,
                isWide && styles.wideFrame,
              ]}
            />
          ) : isBlock ? null : (
            <div style={{ height: `${height}px` }} sx={styles.frame} />
          )}
        </div>
        {/* Prerendered folded, so its height is there before the code comes. */}
        {code === "false" || isBlock ? null : (
          <DemoCode
            item={item}
            combination={current?.id ?? "react/base"}
            rtl={rtl}
            open={hydrated ? src : undefined}
          />
        )}
      </div>
      {caption ? <p sx={styles.caption}>{caption}</p> : null}
    </div>
  )
}
