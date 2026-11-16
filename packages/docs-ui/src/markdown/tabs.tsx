/**
 * `<!-- ::start:tabs -->` … `<!-- ::end:tabs -->`: the section's headings become tabs, and what
 * follows each heading its panel (TanStack Markdown splits them, as `md-tab-panel` nodes). Every
 * panel stays in the page, hidden until chosen, so search and the page's markdown twin read all of
 * it. The chosen tab is kept in the address (`?tab=`), so a link can open one. A group whose headings
 * are all the site's combinations (`Base UI`, `React Aria` …, `DocsConfig.combinations`) follows the
 * reader's framework and base instead, the same choice on every page (`combination.ts`).
 */
import { createContext, use, useState, useSyncExternalStore } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/react-base/ui/select"
import { BrandIcon } from "../brand-icon.tsx"
import { chooseCombination, useCombination } from "../combination.ts"
import { FRAMEWORK_LOGOS } from "../framework-logos.ts"
import { useDocs } from "../provider.tsx"
import { spacing, theme } from "../tokens.ts"

const styles = {
  root: css({ marginBlockEnd: spacing[8] }),
  list: css({
    // `overflowX: auto` turns the other axis to `auto` too, and the active tab's underline then
    // scrolls the list by a pixel: keep the swipe on narrow screens, without a scrollbar.
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    maxWidth: "100%",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  panel: css({ paddingBlockStart: spacing[6] }),
  // The picker (`kind="select"`): as wide as the text, each choice with its mark.
  picker: css({ width: "100%", justifyContent: "space-between" }),
  choice: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[2],
  }),
}

type Tab = { slug: string; name: string }

/** The address changes only through `choose`, which sets the state itself. */
const ignore = () => () => {}

/** A choice's name, with its framework's mark where it is one. */
function Choice({ name }: { name: string }) {
  const logo = FRAMEWORK_LOGOS[name.toLowerCase()]
  return (
    <span sx={styles.choice}>
      {logo ? <BrandIcon icon={logo} /> : null}
      {name}
    </span>
  )
}

/** Set inside `<!-- ::start:picker -->`, where a tab group is drawn as one picker. */
const InPicker = createContext(false)

/**
 * `<!-- ::start:picker -->` … `<!-- ::end:picker -->` around a tab group: one picker in place of
 * the row of tabs, for a choice made once for the page (a framework), each with its mark. A block
 * of its own, since the tabs block keeps none of its own attributes (LF-028).
 */
export function MarkdownPicker({ children }: { children?: React.ReactNode }) {
  return <InPicker value={true}>{children}</InPicker>
}

export function MarkdownTabs({
  tabs = [],
  children,
}: {
  tabs?: readonly Tab[]
  children?: React.ReactNode
}) {
  const picker = use(InPicker)
  const [chosen, setChosen] = useState<string>()
  // The address names a tab only after hydration, so the server and the first render agree.
  const wanted = useSyncExternalStore(
    ignore,
    () => new URLSearchParams(window.location.search).get("tab"),
    () => null
  )
  const { combinations = [] } = useDocs()
  const named = tabs.map(
    (tab) =>
      combinations.find((combination) => combination.label === tab.name)?.id
  )
  const follows = tabs.length > 0 && named.every(Boolean)
  const { current } = useCombination(follows ? (named as string[]) : undefined)
  const followed = follows ? tabs[named.indexOf(current?.id)]?.slug : undefined
  const value =
    followed ??
    chosen ??
    (tabs.some((tab) => tab.slug === wanted) ? wanted! : tabs[0]?.slug)
  const choose = (next: string) => {
    if (follows) {
      chooseCombination(named[tabs.findIndex((tab) => tab.slug === next)]!)
      return
    }
    setChosen(next)
    const url = new URL(window.location.href)
    url.searchParams.set("tab", next)
    window.history.replaceState(window.history.state, "", url)
  }
  return (
    <Tabs
      value={value}
      onValueChange={(next) => choose(String(next))}
      sx={styles.root}
      data-slot="markdown-tabs"
    >
      {picker ? (
        <Select value={value} onValueChange={(next) => choose(String(next))}>
          <SelectTrigger aria-label="Choose one" sx={styles.picker}>
            <SelectValue>
              {() => (
                <Choice
                  name={tabs.find((tab) => tab.slug === value)?.name ?? ""}
                />
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.slug} value={tab.slug}>
                <Choice name={tab.name} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <TabsList variant="line" sx={styles.list}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.slug} value={tab.slug}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      {children}
    </Tabs>
  )
}

/** One tab's content: rendered always, shown when its tab is chosen. */
export function MarkdownTabPanel({
  "data-tab-slug": slug,
  children,
}: {
  "data-tab-slug"?: string
  children?: React.ReactNode
}) {
  return (
    <TabsContent value={slug} keepMounted sx={styles.panel}>
      {children}
    </TabsContent>
  )
}
