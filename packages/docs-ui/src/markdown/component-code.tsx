/**
 * `<!-- ::component-code name="button" combinations="react/base,react/aria,vue/ark" -->`: the files
 * a project gets when it installs an item, read from the registry's own document
 * (`DocsConfig.registryItem`, Kirana's format): the markup for the chosen framework and base, and
 * the style modules flattened for the page's style (`DocsConfig.codeStyle`), with their imports at
 * the default aliases, as `kirana-style ui add` writes them. It follows the reader's combination
 * (`combination.ts`). The code is fetched and highlighted in the browser, once the panel is on the
 * page, so the docs never carry a stale copy of the registry.
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
import { spacing, theme } from "../tokens.ts"
import { CombinationPicker } from "./preview.tsx"
import { CodeBlock } from "./code-block.tsx"

type RegistryFile = { path: string; type: string; content?: string }
export type RegistryItem = {
  type?: string
  registryDependencies?: string[]
  dependencies?: Record<string, string>
  styles?: RegistryFile[]
  files?: RegistryFile[]
  frameworks?: Record<
    string,
    Record<
      string,
      { files?: RegistryFile[]; dependencies?: Record<string, string> }
    >
  >
  flattened?: { builds?: Record<string, Record<string, RegistryFile[]>> }
}

/** Where each type of file installs with `kirana-style ui init`'s default aliases. */
const ALIASES: Record<string, string> = {
  ui: "components/ui",
  component: "components",
  lib: "lib",
  hook: "hooks",
  page: "app",
}

const LANGUAGES: Record<string, string> = {
  tsx: "tsx",
  ts: "ts",
  css: "css",
  json: "json",
}

const styles = {
  root: css({ marginBlockEnd: spacing[5] }),
  files: css({
    marginBlockEnd: spacing[2],
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  missing: css({ marginBlockEnd: spacing[5], color: theme.mutedForeground }),
}

type Shown = { file: string; source: string; lang: string }

/** An item's files for one framework and base, in one style, as a project gets them. */
export function installedFiles(
  item: RegistryItem,
  combination: string,
  style: string | undefined
): Shown[] {
  const [framework = "", base = ""] = combination.split("/")
  const markup = item.frameworks?.[framework]?.[base]?.files ?? []
  const modules =
    (style ? item.flattened?.builds?.[style]?.[base] : undefined) ??
    item.styles ??
    []
  return [...markup, ...modules, ...(item.files ?? [])].map((file) => ({
    file: `${ALIASES[file.type] ?? file.type}/${file.path}`,
    source: (file.content ?? "").replace(
      /@\/registry\/(ui|component|lib|hook|page)\//g,
      (_, type: string) => `@/${ALIASES[type]}/`
    ),
    lang: LANGUAGES[file.path.split(".").pop() ?? ""] ?? "plaintext",
  }))
}

type Highlight = (source: string, lang: string) => string

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function ComponentCode({
  name,
  combinations,
}: {
  name?: string
  combinations?: string
}) {
  const { registryItem, codeStyle } = useDocs()
  const { available, current } = useCombination(combinationList(combinations))
  const [item, setItem] = useState<RegistryItem | null>(null)
  const [failed, setFailed] = useState(false)
  const [highlight, setHighlight] = useState<Highlight>()
  const [chosen, setChosen] = useState(0)

  useEffect(() => {
    if (!name || !registryItem) return
    let live = true
    fetch(registryItem(name))
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status))
        return response.json() as Promise<RegistryItem>
      })
      .then((value) => live && setItem(value))
      .catch(() => live && setFailed(true))
    // The highlighter is the build's, loaded only where a panel is shown.
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
  }, [name, registryItem])

  if (!name || !registryItem || failed)
    return <p sx={styles.missing}>The code for {name} could not be loaded.</p>
  if (!item || !current)
    return <p sx={styles.missing}>Loading the code for {name}…</p>

  const files = installedFiles(item, current.id, codeStyle)
  const shown = files[Math.min(chosen, files.length - 1)]
  return (
    <div sx={styles.root} data-slot="component-code">
      <CombinationPicker available={available} current={current} />
      {files.length > 1 ? (
        <Tabs
          value={String(files.indexOf(shown!))}
          onValueChange={(value) => setChosen(Number(value))}
          sx={styles.files}
        >
          <TabsList variant="line">
            {files.map((file, index) => (
              <TabsTrigger key={file.file} value={String(index)}>
                {file.file.split("/").pop()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}
      {shown ? (
        <CodeBlock
          html={
            highlight
              ? highlight(shown.source, shown.lang)
              : escape(shown.source)
          }
          source={shown.source}
          lang={shown.lang}
          file={shown.file}
        />
      ) : null}
    </div>
  )
}
