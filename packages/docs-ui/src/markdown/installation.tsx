/**
 * `<!-- ::installation name="checkbox" combinations="react/base,react/aria" -->`: a component's
 * Installation section, as shadcn/ui's pages have it. Two tabs:
 *
 * - **Command**: `kirana-style ui add <name>`, and for React shadcn/ui's CLI from the registry's
 *   export.
 * - **Manual**: numbered steps read from the registry's own documents (`DocsConfig.registryItem`):
 *   the project set up with `kirana-style ui init` (Kirana's step, which shadcn/ui's pages do not
 *   need), the components it uses, the packages its framework and base need, every file it
 *   installs (its markup, its style module flattened for the page's style, and the shared style
 *   modules it reads), each folded until expanded, then the import paths.
 *
 * It follows the reader's combination, as the code panel does (`component-code.tsx`).
 *
 * `name` may list several items (`name="trace code-block"`), as a pattern built from components
 * does: the command adds them all, and the manual steps copy the first and add the others.
 */
import { useEffect, useState } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import { combinationList, useCombination } from "../combination.ts"
import { useDocs } from "../provider.tsx"
import {
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"
import { CodeBlock } from "./code-block.tsx"
import { installedFiles } from "./component-code.tsx"
import type { RegistryItem } from "./component-code.tsx"
import { InstallTabs } from "./install-tabs.tsx"
import { CombinationPicker } from "./preview.tsx"

/** What `kirana-style ui init` installs: never a manual step of its own. */
const FROM_INIT = new Set(["kirana", "sx"])

const styles = {
  root: css({ marginBlockEnd: spacing[5] }),
  tabs: css({ marginBlockEnd: spacing[4] }),
  note: css({
    marginBlockEnd: spacing[3],
    color: theme.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // Steps: a number in a circle, joined by a rule down the left, as shadcn/ui's `Steps`.
  steps: css({
    marginInlineStart: spacing[3],
    borderInlineStartWidth: "1px",
    borderInlineStartStyle: "solid",
    borderInlineStartColor: theme.border,
    paddingInlineStart: spacing[6],
    counterReset: "step",
  }),
  step: css({
    position: "relative",
    paddingBlockEnd: spacing[2],
    counterIncrement: "step",
  }),
  stepTitle: css({
    marginBlockEnd: spacing[3],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.base,
    "::before": {
      content: "counter(step)",
      position: "absolute",
      insetInlineStart: `calc(${spacing[9]} * -1 - 0.5px)`,
      display: "inline-flex",
      width: spacing[6],
      height: spacing[6],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.full,
      borderWidth: "4px",
      borderStyle: "solid",
      borderColor: theme.background,
      backgroundColor: theme.muted,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: fontWeight.medium,
    },
  }),
  missing: css({ marginBlockEnd: spacing[5], color: theme.mutedForeground }),
}

type Loaded = { item: RegistryItem; shared: RegistryItem[]; uses: string[] }

/** The item, the shared style modules it reads (at any depth), and the components it uses. */
async function load(
  name: string,
  url: (name: string) => string
): Promise<Loaded> {
  const fetchItem = async (item: string) => {
    const response = await fetch(url(item))
    if (!response.ok) throw new Error(`${item}: ${response.status}`)
    return (await response.json()) as RegistryItem
  }
  const item = await fetchItem(name)
  const shared: RegistryItem[] = []
  const uses: string[] = []
  const seen = new Set<string>([name])
  let queue = item.registryDependencies ?? []
  while (queue.length) {
    const next: string[] = []
    for (const dependency of queue) {
      if (seen.has(dependency) || FROM_INIT.has(dependency)) continue
      seen.add(dependency)
      const found = await fetchItem(dependency)
      // A component the reader installs on its own page; a shared module is copied here.
      if (found.type === "component") uses.push(dependency)
      else {
        shared.push(found)
        next.push(...(found.registryDependencies ?? []))
      }
    }
    queue = next
  }
  return { item, shared, uses }
}

/** The packages a combination needs beyond what `init` installed (Kirana's own). */
function packagesOf(item: RegistryItem, combination: string) {
  const [framework = "", base = ""] = combination.split("/")
  return Object.keys({
    ...item.dependencies,
    ...item.frameworks?.[framework]?.[base]?.dependencies,
  }).filter((name) => !name.startsWith("@kirana-style/"))
}

type Highlight = (source: string, lang: string) => string

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function Installation({
  name,
  combinations,
}: {
  name?: string
  combinations?: string
}) {
  const { registryItem, codeStyle, Link } = useDocs()
  const { available, current } = useCombination(combinationList(combinations))
  const [tab, setTab] = useState("command")
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [failed, setFailed] = useState(false)
  const [highlight, setHighlight] = useState<Highlight>()

  // The documents and the highlighter load when the reader opens the manual steps.
  useEffect(() => {
    if (tab !== "manual" || loaded || !name || !registryItem) return
    let live = true
    const [first = name, ...others] = name.split(/\s+/).filter(Boolean)
    load(first, registryItem)
      .then((value) => ({
        ...value,
        // The pattern's other components, beside the ones the first item uses.
        uses: [...new Set([...others, ...value.uses])],
      }))
      .then((value) => live && setLoaded(value))
      .catch(() => live && setFailed(true))
    void import("@workspace/docs-core/highlight.ts").then(
      ({ highlightSource }) =>
        live &&
        setHighlight(
          () => (source: string, lang: string) => highlightSource(source, lang)
        )
    )
    return () => {
      live = false
    }
  }, [tab, loaded, name, registryItem])

  if (!name) return null
  const react = current?.id.startsWith("react/") ?? true
  const names = name.split(/\s+/).filter(Boolean)

  return (
    <div sx={styles.root} data-slot="installation">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(String(value))}
        sx={styles.tabs}
      >
        <TabsList variant="line">
          <TabsTrigger value="command">Command</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
      </Tabs>
      {tab === "command" ? (
        <>
          <InstallTabs exec={`kirana-style ui add ${names.join(" ")}`} />
          {react ? (
            <>
              <p sx={styles.note}>
                Or with shadcn/ui&apos;s CLI, from the registry&apos;s{" "}
                <Link href="/docs/shadcn">export</Link>:
              </p>
              <InstallTabs
                run={`shadcn@latest add ${names.map((each) => `@kirana/${each}`).join(" ")}`}
              />
            </>
          ) : null}
        </>
      ) : (
        <Manual
          name={names[0] ?? name}
          loaded={loaded}
          failed={failed || !registryItem}
          highlight={highlight}
          combination={current?.id}
          style={codeStyle}
          Link={Link}
          picker={<CombinationPicker available={available} current={current} />}
        />
      )}
    </div>
  )
}

function Manual({
  name,
  loaded,
  failed,
  highlight,
  combination,
  style,
  Link,
  picker,
}: {
  Link: ReturnType<typeof useDocs>["Link"]
  name: string
  loaded: Loaded | null
  failed: boolean
  highlight: Highlight | undefined
  combination: string | undefined
  style: string | undefined
  picker: React.ReactNode
}) {
  if (failed)
    return <p sx={styles.missing}>The code for {name} could not be loaded.</p>
  if (!loaded || !combination)
    return <p sx={styles.missing}>Loading the code for {name}…</p>

  const files = [
    ...installedFiles(loaded.item, combination, style),
    ...loaded.shared.flatMap((item) =>
      installedFiles(item, combination, style)
    ),
  ]
  const packages = packagesOf(loaded.item, combination)

  return (
    <>
      {picker}
      <ol sx={styles.steps} data-slot="steps">
        <li sx={styles.step}>
          <p sx={styles.stepTitle}>
            Set up Kirana and the design system, if the project has neither:
          </p>
          <InstallTabs
            dev="@kirana-style/registry"
            exec="kirana-style ui init"
          />
        </li>
        {loaded.uses.length ? (
          <li sx={styles.step}>
            <p sx={styles.stepTitle}>
              Add the components it uses:{" "}
              {loaded.uses.map((use, index) => (
                <span key={use}>
                  {index ? ", " : null}
                  <Link href={`/docs/components/${use}`}>{use}</Link>
                </span>
              ))}
              .
            </p>
          </li>
        ) : null}
        {packages.length ? (
          <li sx={styles.step}>
            <p sx={styles.stepTitle}>Install the following dependencies:</p>
            <InstallTabs packages={packages.join(" ")} />
          </li>
        ) : null}
        <li sx={styles.step}>
          <p sx={styles.stepTitle}>
            Copy and paste the following code into your project.
          </p>
          {files.map((file) => (
            <CodeBlock
              key={file.file}
              html={
                highlight
                  ? highlight(file.source, file.lang)
                  : escape(file.source)
              }
              source={file.source}
              lang={file.lang}
              file={file.file}
              collapsible
            />
          ))}
        </li>
        <li sx={styles.step}>
          <p sx={styles.stepTitle}>
            Update the import paths to match your project setup.
          </p>
        </li>
      </ol>
    </>
  )
}
