/**
 * Writes a page for each primitive into `content/docs/primitives/components/`, their index, and
 * `primitives/frameworks.md` (none committed):
 * its reference and its anatomy from the installed `@kirana-ui/*` packages (`primitives-data.ts`),
 * and how it is written on each framework from `primitives/anatomy.json`. `generate-content.ts`
 * runs it first.
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
import { SHARED, hasDemo, styledCode } from "./primitives-demos.ts"
import type { StyledCode } from "./primitives-demos.ts"

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
  CheckboxGroup:
    "Several checkboxes that share one value, a list of what is checked, and a parent that checks them all.",
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

const REPOSITORY = "https://github.com/kirana-style/kirana-ui"

/** The file a framework's example would be, for its title. */
const EXAMPLE_FILE: Record<Framework | "web", string> = {
  react: "demo.tsx",
  vue: "Demo.vue",
  svelte: "Demo.svelte",
  solid: "demo.tsx",
  angular: "demo.html",
  web: "index.html",
}

const fence = (language: string, code: string) =>
  `\`\`\`${language}\n${code}\n\`\`\``

/** A cell of a table: a `|` in a type would end it, and a backslash would escape what follows. */
const cell = (text: string) => text.replace(/[\\|]/g, "\\$&")

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

/** A part's attributes and CSS variables as tables, with what the reference says the part is. */
interface Written {
  said: string
  tables: string[]
}

/** The reference's "Attributes and CSS variables, by part", by the part's name there (`scrollUpArrow`). */
function statesByPart(lines: readonly string[]): Map<string, Written> {
  const found = new Map<string, Written>()
  let attributes: string[] = []
  let variables: string[] = []
  let into: Written | undefined
  const flush = () => {
    if (into && attributes.length)
      into.tables.push(
        ["| Attribute | When |", "| --- | --- |", ...attributes].join("\n")
      )
    if (into && variables.length)
      into.tables.push(
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
      into = { said: part[2]!, tables: [] }
      found.set(part[1]!, into)
    } else if (entry) {
      const row = `| \`${cell(entry[1]!)}\` | ${cell(entry[2]!)} |`
      if (entry[1]!.startsWith("--")) variables.push(row)
      else attributes.push(row)
    }
  }
  flush()
  return found
}

interface Each {
  /** As the framework writes it: `Select.Trigger`. */
  label: string
  /** What the reference says of it: the element it draws, and what it is for. */
  said: string
  /** Its own props, as the reference's lines. */
  props: string[]
}

/** The reference's "Each part, and its own props" (or the one line of a component of one part). */
function eachPart(lines: readonly string[]): Each[] {
  const found: Each[] = []
  for (const line of lines) {
    const part = /^(?:- )?`<([\w.]+)>` (.*)$/.exec(line)
    const prop = /^ {4}- (.*)$/.exec(line)
    if (part) found.push({ label: part[1]!, said: part[2]!, props: [] })
    else if (prop && found.length) found.at(-1)!.props.push(`- ${prop[1]!}`)
  }
  return found
}

/** What every positioner takes, from the reference's own section. */
const positioner = (() => {
  const text = packageFile("react", "llms.txt")
  const from = text.indexOf("\n## Positioner options")
  const section = text.slice(from, text.indexOf("\n## ", from + 1))
  return {
    props: section.split("\n").filter((line) => line.startsWith("- `")),
    /** A component's own defaults over those: `{ align: "start" }`. */
    defaults: (name: string) =>
      new RegExp(`\`${name}\` (\`\\{[^}]*\\}\`)`).exec(section)?.[1],
  }
})()

const POSITIONER = 'Takes the positioner options ("Positioner options", above).'
const ABOVE = "Its props are above."
const sentence = (text: string) =>
  text.trim().replace(/^[a-z]/, (letter) => letter.toUpperCase())

/** The reference as the page's sections: every part with its element, props, attributes and variables. */
function api(name: string, body: string): string {
  const lines = body.split("\n")
  const from = (heading: RegExp) =>
    lines.findIndex((line) => heading.test(line))
  const props = from(/^Props( of its root)?:$/)
  const each = from(/^Each part, and its own props:$/)
  const attributes = from(/^Attributes and CSS variables, by part:$/)
  const end = attributes >= 0 ? attributes : lines.length
  const root =
    props >= 0
      ? lines.slice(props + 1, each > props ? each : end)
      : ([] as string[])
  const parts = eachPart(lines.slice(each >= 0 ? each + 1 : 0, end))
  const states = statesByPart(
    attributes >= 0 ? lines.slice(attributes + 1) : []
  )
  const camel = (label: string) => {
    const part = label.includes(".") ? label.slice(label.indexOf(".") + 1) : ""
    return part ? part[0]!.toLowerCase() + part.slice(1) : ""
  }
  const out: string[] = ["## API reference"]
  // What the reference says between its lists (how a toaster is made): said before the parts.
  const notes = lines
    .slice(each >= 0 ? each + 1 : 0, end)
    .join("\n")
    .split("\n\n")
    .filter(
      (text) =>
        text.trim() && !/^(- |`<|```|Props|Parts:|Anatomy:)/.test(text.trim())
    )
    .map((text) => text.replaceAll(', under "Types"', "").trim())
  out.push(...notes)
  const used = new Set<string>()
  for (const part of parts) {
    const key =
      camel(part.label) || (parts.length === 1 ? [...states.keys()][0] : "")
    const state = key ? states.get(key) : undefined
    if (key) used.add(key)
    const own = part.said.includes(ABOVE)
    const placed = part.said.includes(POSITIONER)
    const said = sentence(
      part.said
        .replace(ABOVE, "")
        .replace(POSITIONER, "")
        // Said twice of a portal.
        .replace(
          "draws no element. Draws no element of its own:",
          "draws no element:"
        )
        .trim()
    )
    const rows = [
      // A component of one part: its props are the part's.
      ...(own || parts.length === 1 ? root : []),
      ...(placed ? positioner.props : []),
      ...part.props,
    ]
    const defaults = placed ? positioner.defaults(name) : undefined
    out.push(
      `### ${part.label}`,
      [state?.said, said].filter(Boolean).join(" "),
      ...(placed
        ? [
            `It takes what every positioner takes${defaults ? `; here the defaults are ${defaults}` : ""}.`,
          ]
        : []),
      ...(rows.length ? [propsTable(rows)] : []),
      ...(state?.tables ?? [])
    )
  }
  // A part the reference gives attributes and does not list: never left out.
  for (const [key, state] of states)
    if (!used.has(key))
      out.push(`### ${name}.${pascal(key)}`, state.said, ...state.tables)
  return out.filter(Boolean).join("\n\n")
}

const pascal = (part: string) =>
  part.replace(/(^|-)([a-z])/g, (_whole, _dash, letter: string) =>
    letter.toUpperCase()
  )

interface Node {
  label: string
  notes: string[]
  children: Node[]
}

/**
 * A component's parts as they nest, from the reference's own "Anatomy" (the library's data), with
 * what it says of each: a part that draws no element, one that may be left out, one written once
 * for each entry. A component of one part is that part.
 */
function tree(name: string): { text: string; rest: string[] } | undefined {
  const own = references.react.get(name)
  if (!own) return undefined
  const parts = eachPart(own.body.split("\n"))
  if (!parts.length) return undefined
  const ghost = new Set(
    parts
      .filter((part) => part.said.startsWith("draws no element"))
      .map((part) => part.label)
  )
  const drawn = /\nAnatomy:\n\n```\n([\s\S]*?)\n```/.exec(`\n${own.body}`)?.[1]
  const top: Node = { label: "", notes: [], children: [] }
  const used = new Set<string>()
  if (!drawn) {
    for (const part of parts) {
      used.add(part.label)
      top.children.push({ label: part.label, notes: [], children: [] })
    }
  } else {
    // Each open part by its indent: a line is inside the nearest line indented less.
    const open: { indent: number; node: Node }[] = []
    for (const line of drawn.split("\n")) {
      const found = /^( *)<([\w.]+)>(?: \(([^)]*)\))?$/.exec(line)
      if (!found) throw new Error(`${name}: an anatomy line not read: ${line}`)
      const [, spaces = "", label = "", marks = ""] = found
      while (open.length && open.at(-1)!.indent >= spaces.length) open.pop()
      used.add(label)
      const node: Node = {
        label,
        notes: [
          ...(ghost.has(label) ? ["no element"] : []),
          ...marks
            .split(", ")
            .filter(Boolean)
            .map((mark) =>
              mark === "repeated"
                ? "once for each"
                : mark === "as above"
                  ? "also here"
                  : mark
            ),
        ],
        children: [],
      }
      ;(open.at(-1)?.node ?? top).children.push(node)
      open.push({ indent: spaces.length, node })
    }
  }
  const write = (node: Node): string =>
    `${node.label}${node.notes.length ? `|${node.notes.join(" · ")}` : ""}${
      node.children.length ? `[${node.children.map(write).join(",")}]` : ""
    }`
  return {
    text: top.children.map(write).join(","),
    rest: parts.map((part) => part.label).filter((part) => !used.has(part)),
  }
}

function page(
  name: string,
  order: number,
  styled: StyledCode | undefined
): string {
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
${
  styled
    ? `
<!-- ::start:primitive-demo demo="${slug}" source="${REPOSITORY}/tree/main/apps/preview-primitives/src/demos/${slug}" -->

${[
  fence('tsx title="React · CSS Modules · demo.tsx"', styled.css.component),
  fence(
    'css title="React · CSS Modules · demo.module.css"',
    styled.css.stylesheet
  ),
  fence('css title="React · CSS Modules · theme.css"', SHARED.theme),
  fence('tsx title="React · Kirana · demo.tsx"', styled.kirana),
  fence('ts title="React · Kirana · tokens.ts"', SHARED.tokens),
  fence('tsx title="React · Tailwind · demo.tsx"', styled.tailwind),
  fence('css title="React · Tailwind · app.css"', SHARED.tailwind),
  fence('css title="React · Tailwind · theme.css"', SHARED.theme),
  fence('tsx title="React · Raw · demo.tsx"', styled.raw),
  ...(["vue", "svelte", "solid", "angular", "web"] as const).flatMap(
    (framework) => {
      const code = anatomy[slug]?.[framework]
      return code
        ? [
            fence(
              `${LANGUAGE[framework]} title="${LABELS[framework]} · Example · ${EXAMPLE_FILE[framework]}"`,
              code
            ),
          ]
        : []
    }
  ),
].join("\n\n")}

<!-- ::end:primitive-demo -->
`
    : ""
}
## Installation

${imports}
${
  drawn
    ? `\n## Anatomy\n\nHow its parts go together: as a picture of the component itself, and as the structure you write. A dashed part draws no element; "optional" is a wrapper you may leave out; "once for each" is a part written for every entry.\n\n<!-- ::anatomy tree="${drawn.text}" rest="${drawn.rest.join(",")}"${styled ? ` demo="${slug}"` : ""} -->\n`
    : ""
}${names ? `\n### What each part is called\n\n${names}\n` : ""}
${api(name, own.body)}

The props, attributes and variables are the same on every framework, and the types are written
here as React's; how each framework writes a prop and hears a change is in
[Frameworks](/docs/primitives/frameworks). This page is generated from \`@kirana-ui/*\` ${version}.
`
}

/** What a line of a reference's "Using it" is about, for the lines every framework shares. */
const TOPICS: [RegExp, string][] = [
  [/^- No CSS is shipped/, "Styles"],
  [/^- A boolean state/, "States"],
  [/^- An entrance starts/, "Motion"],
  [/^- A popup is drawn/, "Popups"],
  [/^- Every change callback/, "Changes"],
  [/^- A value is controlled/, "Values"],
  [/^- A control with a `name`/, "Forms"],
  [/^- `PortalProvider`/, "Portals"],
  [/^- An agent can read/, "Agents"],
]

/**
 * How each framework writes a component: a picker, then the same steps on each, with that
 * framework's own notes from its reference; what every reference says the same is said once.
 */
function frameworks(): string {
  const lists = Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, usage(framework)])
  ) as Record<Framework, string[]>
  const shared = lists.react.filter((line) =>
    FRAMEWORKS.every((framework) => lists[framework].includes(line))
  )
  const example = (framework: Framework | "web") =>
    fence(LANGUAGE[framework], anatomy.meter?.[framework] ?? "")
  const one = (framework: Framework) =>
    [
      `### ${LABELS[framework]}`,
      "<!-- ::start:steps -->",
      "### Install the package",
      install(framework),
      "### Import a component",
      "Each component is an entry of its own, so a page carries only what it draws.",
      fence("ts", references[framework].get("Meter")?.import ?? ""),
      "### Write its parts",
      "A meter: a root, a label, a track with its indicator, and the value as text.",
      example(framework),
      `### Know how ${LABELS[framework]} writes things`,
      lists[framework].filter((line) => !shared.includes(line)).join("\n"),
      "<!-- ::end:steps -->",
    ].join("\n\n")
  const same = shared.map((line) => {
    const topic = TOPICS.find(([pattern]) => pattern.test(line))?.[1] ?? "Also"
    return `| **${topic}** | ${cell(line.slice(2))} |`
  })
  return `---
title: Frameworks
description: Pick your framework and follow the same four steps on each. The parts, their attributes, the keyboard and the callbacks do not change.
section: primitives
order: 3
keywords: [react, vue, svelte, solid, angular, custom elements, web components, render, as-child, directive]
---

# Frameworks

Pick your framework. The steps are the same on each, and so is the component: one core holds its
behaviour, and a package per framework draws its parts in that framework's own idiom.

<!-- ::start:picker -->

<!-- ::start:tabs -->

${FRAMEWORKS.map(one).join("\n\n")}

### Custom elements

<!-- ::start:steps -->

### Install the package

${install("web")}

### Import a component

Importing an entry defines its element. \`@kirana-ui/web\` alone defines them all.

${fence("ts", 'import "@kirana-ui/web/meter"')}

### Write its parts

The element holds the component and draws nothing. Each part is an element of your own, named by
\`kui-part\`.

${example("web")}

### Know how custom elements write things

- A prop is an attribute in kebab case, and a property in camel case: \`default-open\`, \`element.open = true\`.
- A change is an event named for its callback (\`open-change\`, \`value-change\`); preventing it refuses the change.
- A list the component draws is written once as a \`<template kui-each="…">\`.
- [Custom elements](/docs/primitives/custom-elements) has the whole of it.

<!-- ::end:steps -->

<!-- ::end:tabs -->

<!-- ::end:picker -->

## The same on every framework

These hold whichever you picked. The library's tests play one set of scenarios on every adapter
and compare the DOM of every state, so they cannot drift apart.

| | |
| --- | --- |
${same.join("\n")}

This page is generated from each package's own reference (\`llms.txt\`, version ${version}).
`
}

const folder = new URL(
  "../content/docs/primitives/components/",
  import.meta.url
)
mkdirSync(folder, { recursive: true })
const written = new Set<string>()
for (const [at, component] of components().entries()) {
  if (!DESCRIPTIONS[component.name])
    throw new Error(`${component.name} has no description`)
  const file = `${kebab(component.name)}.md`
  written.add(file)
  const slug = kebab(component.name)
  const text = page(
    component.name,
    at + 1,
    hasDemo(slug) ? await styledCode(slug) : undefined
  )
  const path = new URL(file, folder)
  // Left alone when it is the same: the content task's cache reads these files.
  if (!existsSync(path) || readFileSync(path, "utf8") !== text)
    writeFileSync(path, text)
}
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
