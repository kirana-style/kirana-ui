/**
 * Writes a page for each primitive into `content/docs/primitives/components/`, their index, and
 * `primitives/frameworks.md` (none committed):
 * its reference from the installed `@kirana-ui/*` packages (`primitives-data.ts`), and how it is
 * written on each framework from `primitives/anatomy.json`. `generate-content.ts` runs it first.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"

import {
  FRAMEWORKS,
  components,
  packageFile,
  reference,
  usage,
} from "./primitives-data.ts"
import type { Framework } from "./primitives-data.ts"

/** What each is, in a line: the pages' descriptions and the index's cards. */
const DESCRIPTIONS: Record<string, string> = {
  Accordion: "Stacked sections that open and close, one or several at a time.",
  AlertDialog:
    "A dialog that asks for an answer: a press outside it does not close it.",
  Autocomplete:
    "A text input that suggests as you type: the text is the value.",
  Autosize: "A textarea as tall as what is written in it.",
  Avatar:
    "A picture of a person or a thing, with a fallback until it has loaded.",
  Button:
    "A button, or another element that acts as one, that can stay focusable while disabled.",
  Calendar: "A month of days to choose from: one day, or a first and a last.",
  Carousel:
    "Slides that scroll one at a time, with buttons and the arrow keys.",
  Checkbox:
    "A box that is checked, unchecked or indeterminate, and a form's own control.",
  Collapsible: "A panel that a button opens and closes.",
  Combobox:
    "A text input that filters a list to choose one value from, or several.",
  Command:
    "A list filtered by what is typed, where Enter or a press runs an item.",
  ContextMenu: "A menu for an area of the page, opened at the pointer.",
  DateField: "A date typed part by part, each part a spin button.",
  DatePicker: "A date field and a calendar in a popover that are one value.",
  Dialog: "A window over the page that holds focus until it is closed.",
  Drawer: "A dialog that comes from an edge and is dragged back to it.",
  Field: "A control with its label, description and error, and its validity.",
  Fieldset: "A group of fields with a legend that names it.",
  Form: "A form that checks its fields on submit and takes errors from a server.",
  HoverCard:
    "A card the pointer opens from a link, which the pointer may enter.",
  Input: "A native input that says its state, and is its field's control.",
  Label:
    "A label for a control, which a second press does not select the text of.",
  Listbox: "A list to choose from that is always in the page.",
  Menu: "A button that opens a list of actions, with submenus, checkboxes and radios.",
  Menubar: "A row of menus that work as one.",
  MessageScroller:
    "A conversation that stays at its newest message unless the reader scrolls away.",
  Meter: "A measure within a known range.",
  NavigationMenu:
    "Links with panels of more links, drawn in one shared viewport.",
  NumberField:
    "A number typed, stepped with buttons or keys, and formatted for a locale.",
  Otp: "A one-time code typed into one input and drawn as a cell for each character.",
  Pagination: "The pages of a long list, with the gaps between them.",
  Popover: "A popup anchored to its trigger, for content of any kind.",
  Progress: "How far a task has come, or that it is under way.",
  QrCode: "A QR code drawn as an SVG.",
  RadioGroup: "A set of options of which one is chosen.",
  Resizable: "Panels whose sizes are dragged, or set with the keyboard.",
  ScrollArea: "A scrolling area with scrollbars the design draws.",
  Select: "A button that opens a list to choose one value from.",
  Separator: "A line between things, said to a screen reader as one.",
  Slider: "A value, or a range, chosen along a track.",
  Switch: "A control that is on or off.",
  Tabs: "Panels of which one is shown, chosen by its tab.",
  Toast: "Short messages that appear over the page and leave by themselves.",
  Toggle: "A button that is pressed or not.",
  ToggleGroup: "Toggles that share one value: one pressed, or several.",
  Toolbar: "A row of controls that is one stop for Tab.",
  Tooltip: "A short label the pointer or focus opens.",
}

/** A name as it is said: `AlertDialog` is "Alert Dialog". */
const TITLES: Record<string, string> = { Otp: "OTP", QrCode: "QR Code" }
const title = (name: string) =>
  TITLES[name] ?? name.replace(/([a-z])([A-Z])/g, "$1 $2")
const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (letter, at) => (at ? "-" : "") + letter.toLowerCase())

const LABELS: Record<Framework | "web", string> = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  solid: "Solid",
  angular: "Angular",
  web: "Custom elements",
}
const LANGUAGE: Record<Framework | "web", string> = {
  react: "tsx",
  vue: "vue",
  svelte: "svelte",
  solid: "tsx",
  angular: "html",
  web: "html",
}

const anatomy = JSON.parse(
  readFileSync(new URL("../primitives/anatomy.json", import.meta.url), "utf8")
) as Record<string, Partial<Record<Framework | "web", string>>>
const references = Object.fromEntries(
  FRAMEWORKS.map((framework) => [framework, reference(framework)])
) as Record<Framework, ReturnType<typeof reference>>
const version = (
  JSON.parse(packageFile("core", "package.json")) as { version: string }
).version

/** The install command, as the site draws one: every package manager, in a terminal. */
const install = (framework: Framework | "web") =>
  `<!-- ::install packages="@kirana-ui/${framework}" -->`

const fence = (language: string, code: string) =>
  `\`\`\`${language}\n${code}\n\`\`\``

/** A cell of a table: a `|` in a type would end it. */
const cell = (text: string) => text.replace(/\|/g, "\\|")

/** The reference's props, for the page's props table: the default is said on its own. */
function propsTable(lines: readonly string[]): string {
  const rows = lines.flatMap((line) => {
    const found = /^- `([^`]+)`(?:: (.*))?$/.exec(line)
    if (!found) return []
    const [, signature = "", said = ""] = found
    const at = signature.indexOf(": ")
    const prop = at < 0 ? signature : signature.slice(0, at)
    const type = at < 0 ? "" : signature.slice(at + 2)
    return [
      [
        prop.replace(/\?$/, ""),
        type,
        /Default:? `([^`]+)`/.exec(said)?.[1] ?? "",
        said,
      ],
    ]
  })
  // An attribute holds no quote: the rows are encoded.
  return `<!-- ::props rows="${encodeURIComponent(JSON.stringify(rows))}" -->`
}

/** The reference's parts, each with its attributes and its CSS variables as tables. */
function partsReference(
  lines: readonly string[],
  label: (part: string) => string
): string {
  const out: string[] = []
  let attributes: string[] = []
  let variables: string[] = []
  const flush = () => {
    if (attributes.length)
      out.push(
        ["| Attribute | When |", "| --- | --- |", ...attributes].join("\n")
      )
    if (variables.length)
      out.push(
        [
          "| CSS variable | What it holds |",
          "| --- | --- |",
          ...variables,
        ].join("\n")
      )
    attributes = []
    variables = []
  }
  for (const line of lines) {
    const part = /^- ([\w-]+): (.*)$/.exec(line)
    const entry = /^\s+- `([^`]+)`: (.*)$/.exec(line)
    if (part) {
      flush()
      out.push(`### ${label(part[1]!)}`, part[2]!)
    } else if (entry) {
      const row = `| \`${cell(entry[1]!)}\` | ${cell(entry[2]!)} |`
      if (entry[1]!.startsWith("--")) variables.push(row)
      else attributes.push(row)
    }
  }
  flush()
  return out.join("\n\n")
}

/** The reference as the page's sections: props, then every part. */
function api(body: string, label: (part: string) => string): string {
  const lines = body.split("\n")
  const from = (heading: RegExp) =>
    lines.findIndex((line) => heading.test(line))
  const props = from(/^Props( of its root)?:$/)
  const parts = from(/^Attributes and CSS variables, by part:$/)
  const out: string[] = ["## API reference"]
  if (props >= 0) {
    const end = parts > props ? parts : lines.length
    out.push(
      lines[props] === "Props:" ? "### Props" : "### Props of the root",
      propsTable(lines.slice(props + 1, end))
    )
  }
  if (parts >= 0) out.push(partsReference(lines.slice(parts + 1), label))
  return out.join("\n\n")
}

const pascal = (part: string) =>
  part.replace(/(^|-)([a-z])/g, (_whole, _dash, letter: string) =>
    letter.toUpperCase()
  )

/** What a list's template is on the frameworks, where its name is not the part's. */
const LISTS: Record<string, string> = { toasts: "List" }

interface Node {
  label: string
  note?: string
  children: Node[]
}

/**
 * A component's parts as they nest, read from how it is written as custom elements (the one
 * form where every part is an element with its name on it), and named as the frameworks name
 * them. A component written inside it is another component's, and left out.
 */
function tree(name: string): { text: string; rest: string[] } | undefined {
  const html = anatomy[kebab(name)]?.web
  const own = references.react.get(name)
  if (!html || !own) return undefined
  const known = new Set(
    own.parts.map((part) => /^<(.+)>$/.exec(part)?.[1] ?? part)
  )
  const used = new Set<string>()
  const named = (part: string) => {
    const dotted = `${name}.${pascal(part)}`
    // A component of one part is that part, whatever it is called (`Button`, `Autosize.Textarea`).
    const label = known.has(dotted)
      ? dotted
      : part === "root" && known.size <= 1
        ? ([...known][0] ?? name)
        : undefined
    if (label) used.add(label)
    return label
  }
  const top: Node = { label: "", children: [] }
  // Each open element: the node its parts go into, and whether it is inside another component.
  const stack: { tag: string; into: Node; foreign: boolean }[] = []
  const tags = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|[^>"])*)>/g
  let hosts = 0
  for (let found = tags.exec(html); found; found = tags.exec(html)) {
    const [, closing, tag = "", attributes = ""] = found
    if (closing) {
      while (stack.length && stack.pop()!.tag !== tag);
      continue
    }
    const around = stack.at(-1)
    let into = around?.into ?? top
    let foreign = around?.foreign ?? false
    if (tag.startsWith("kui-") && hosts++ > 0) foreign = true
    const part = /kui-part="([^"]+)"/.exec(attributes)?.[1]
    const each = /kui-each="([^"]+)"/.exec(attributes)?.[1]
    const label = foreign
      ? undefined
      : part === "portal"
        ? named("portal")
        : part
          ? named(part)
          : each
            ? named(LISTS[each] ? LISTS[each]!.toLowerCase() : each)
            : undefined
    if (label) {
      const node: Node = { label, children: [] }
      if (part === "portal")
        node.note = "no element: what is inside is drawn at the end of body"
      if (each)
        node.note = "no element: draws what is inside once for each entry"
      into.children.push(node)
      into = node
    }
    const single =
      /\/\s*$/.test(attributes) || ["input", "img", "br", "hr"].includes(tag)
    if (!single) stack.push({ tag, into, foreign })
  }
  // The same part written several times (an item for each value) is drawn once.
  const write = (node: Node): string =>
    `${node.label}${node.note ? `|${node.note}` : ""}${
      node.children.length
        ? `[${[...new Set(node.children.map(write))].join(",")}]`
        : ""
    }`
  let roots = top.children
  // A root that draws no element holds the rest, in the code only.
  const root = `${name}.Root`
  if (known.has(root) && !used.has(root)) {
    used.add(root)
    roots = [
      {
        label: root,
        note: "no element: holds the component's state",
        children: roots,
      },
    ]
  }
  const text = [...new Set(roots.map(write))].join(",")
  return { text, rest: [...known].filter((part) => !used.has(part)) }
}

function page(name: string, order: number): string {
  const slug = kebab(name)
  const tabs = (each: (framework: Framework | "web") => string | undefined) =>
    [
      "<!-- ::start:tabs -->",
      ...([...FRAMEWORKS, "web"] as const).flatMap((framework) => {
        const body = each(framework)
        return body ? [`### ${LABELS[framework]}`, body] : []
      }),
      "<!-- ::end:tabs -->",
    ].join("\n\n")
  const imports = tabs((framework) =>
    framework === "web"
      ? [install("web"), fence("ts", `import "@kirana-ui/web/${slug}"`)].join(
          "\n\n"
        )
      : [
          install(framework),
          fence("ts", references[framework].get(name)?.import ?? ""),
        ].join("\n\n")
  )
  const examples = tabs((framework) => {
    const code = anatomy[slug]?.[framework]
    return code && fence(LANGUAGE[framework], code)
  })
  const own = references.react.get(name)!
  const drawn = tree(name)
  // What each part is called: one spelling on four frameworks, a directive on Angular.
  const directives = references.angular.get(name)?.parts ?? []
  const names = !own.parts.length
    ? ""
    : directives.length === own.parts.length
      ? [
          "| React, Vue, Svelte, Solid | Angular |",
          "| --- | --- |",
          ...own.parts.map(
            (part, at) => `| \`${part}\` | \`${cell(directives[at]!)}\` |`
          ),
        ].join("\n")
      : [
          `On React, Vue, Svelte and Solid: ${own.parts.map((part) => `\`${part}\``).join(", ")}.`,
          ...(directives.length
            ? [
                `On Angular: ${directives.map((part) => `\`${part}\``).join(", ")}.`,
              ]
            : []),
        ].join("\n\n")
  return `---
title: ${title(name)}
description: ${DESCRIPTIONS[name]}
section: primitives-components
order: ${order}
keywords: [${[title(name).toLowerCase(), "primitive", "headless", "unstyled"].join(", ")}]
---

# ${title(name)}

## Installation

${imports}
${
  drawn
    ? `\n## Anatomy\n\nHow its parts go together. Write them in this order, each inside the one around it.\n\n<!-- ::anatomy tree="${drawn.text}" rest="${drawn.rest.join(",")}" -->\n`
    : ""
}${names ? `\n### What each part is called\n\n${names}\n` : ""}
## Example

A whole one, as the library's own tests write it, on each framework. The classes are the
example's: a primitive has no styles of its own.

${examples}

${api(own.body, (part) => (own.parts.length ? `${name}.${pascal(part)}` : name))}

The props, attributes and variables are the same on every framework; how each writes a prop and
hears a change is in [Frameworks](/docs/primitives/frameworks). This page is generated from
\`@kirana-ui/*\` ${version}.
`
}

/** How each framework writes a component: its reference's own "Using it", and one example. */
function frameworks(): string {
  const one = (framework: Framework) =>
    [
      `## ${LABELS[framework]}`,
      install(framework),
      usage(framework).join("\n"),
      fence(LANGUAGE[framework], anatomy.collapsible?.[framework] ?? ""),
    ].join("\n\n")
  return `---
title: Frameworks
description: How a component is written on React, Vue, Svelte, Solid, Angular and as custom elements, and what is the same on all of them.
section: primitives
order: 3
keywords: [react, vue, svelte, solid, angular, custom elements, web components, render, as-child, directive]
---

# Frameworks

One core holds every component's behaviour, and a package per framework draws its parts in that
framework's own idiom. The parts, their attributes, the keyboard and the callbacks are the same on
all of them: the library's tests play one set of scenarios on every adapter and compare the DOM
of every state.

What follows is each package's own reference, as it ships in the package (\`llms.txt\`, version
${version}), with the same collapsible written on each.

${FRAMEWORKS.map(one).join("\n\n")}

## Custom elements

${install("web")}

With no framework, a component is a custom element that holds it and draws nothing; its parts are
the page's own elements. [Custom elements](/docs/primitives/custom-elements) has the whole of it.

${fence("html", anatomy.collapsible?.web ?? "")}
`
}

const folder = new URL(
  "../content/docs/primitives/components/",
  import.meta.url
)
mkdirSync(folder, { recursive: true })
const written = new Set<string>()
components().forEach((component, at) => {
  if (!DESCRIPTIONS[component.name])
    throw new Error(`${component.name} has no description`)
  const file = `${kebab(component.name)}.md`
  written.add(file)
  const text = page(component.name, at + 1)
  const path = new URL(file, folder)
  // Left alone when it is the same: the content task's cache reads these files.
  if (!existsSync(path) || readFileSync(path, "utf8") !== text)
    writeFileSync(path, text)
})
const write = (path: URL, text: string) => {
  if (!existsSync(path) || readFileSync(path, "utf8") !== text)
    writeFileSync(path, text)
}
written.add("index.md")
write(
  new URL("index.md", folder),
  `---
title: Components
description: The ${components().length} primitives, each with its parts, props, attributes and CSS variables on every framework.
section: primitives-components
order: 0
keywords: [primitives, components, headless, unstyled, list]
---

# Components

${components().length} components, the same on React, Vue, Svelte, Solid, Angular and as custom elements. Each page
is generated from the packages themselves (\`@kirana-ui/*\` ${version}): what it lists is what
that version does.

<!-- ::section-cards section="primitives/components" -->
`
)
write(new URL("../frameworks.md", folder), frameworks())
for (const file of readdirSync(folder))
  if (!written.has(file)) rmSync(new URL(file, folder))
console.log(
  `primitives: ${written.size} component pages from @kirana-ui/* ${version}`
)
