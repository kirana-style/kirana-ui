/**
 * The registry's items: what each one is, and its source files for each base. The builder reads the
 * rest from the files themselves (dependencies from their imports, the style modules flattened per
 * combination).
 *
 * Paths are relative to `registry/`. A file's place in an installed project follows from its source
 * path (`installedPath`).
 */
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

import { BLOCKS, blockInfo } from "../../../registry/blocks"
import { CHARTS } from "../../../registry/charts"
import type { Base } from "./flatten"

export type Framework = "react" | "vue" | "svelte" | "solid" | "angular"

export type Combination = {
  /** `<framework>-<base>-<style>`: `react-base-nova`. */
  id: string
  framework: Framework
  base: Base
  /** The folder of its markup under `registry/bases`. */
  bases: string
  style: string
}

export const STYLES = [
  "nova",
  "vega",
  "lyra",
  "maia",
  "mira",
  "luma",
  "rhea",
  "sera",
] as const

export const FRAMEWORK_BASES = [
  { framework: "react", base: "base", bases: "react-base" },
  { framework: "react", base: "aria", bases: "react-aria" },
  { framework: "vue", base: "ark", bases: "vue-ark" },
  { framework: "svelte", base: "ark", bases: "svelte-ark" },
  { framework: "solid", base: "ark", bases: "solid-ark" },
  { framework: "angular", base: "ng", bases: "angular-ng" },
] as const

export const COMBINATIONS: Combination[] = FRAMEWORK_BASES.flatMap((entry) =>
  STYLES.map((style) => ({ ...entry, id: `${entry.bases}-${style}`, style }))
)

export type Item = {
  name: string
  type: "registry:ui" | "registry:lib" | "registry:block"
  title: string
  description: string
  /** Its files for a combination, relative to `registry/`; `undefined` when the base has none. */
  files: (combination: Combination) => string[] | undefined
  /**
   * Only in Kirana's format, whose style modules travel as written: a helper they import, which
   * flattening inlines into shadcn/ui's.
   */
  kiranaOnly?: true
  /** A design system's wiring, in Kirana's format only. */
  setup?: {
    config?: { module: string; export: string }
    stylesheets?: string[]
    document?: { module: string; export: string }
  }
}

const react = (combination: Combination) => combination.framework === "react"

/**
 * A component's markup: one file for React and Solid (`.tsx`) and Angular (`.ts`, its directives),
 * a folder of single-file components with an `index.ts` for Vue and Svelte.
 */
function markupOf(name: string, combination: Combination): string {
  const folder = `bases/${combination.bases}/ui`
  switch (combination.framework) {
    case "react":
    case "solid":
      return `${folder}/${name}.tsx`
    case "angular":
      return `${folder}/${name}.ts`
    default:
      return `${folder}/${name}/*`
  }
}

/** Every framework: the components each one has (Button, Card, Skeleton so far). */
const ALL: Framework[] = ["react", "vue", "svelte", "solid", "angular"]

/**
 * A component: its markup in each base, and its style module. `bases` narrows it to the bases that
 * have it, where a framework's other base has no such part (React Aria has no menubar).
 */
function component(
  name: string,
  title: string,
  description: string,
  frameworks: Framework[] = ["react", "vue"],
  bases?: Base[]
): Item {
  return {
    name,
    type: "registry:ui",
    title,
    description,
    files: (combination) => {
      if (
        !frameworks.includes(combination.framework) &&
        !(frameworks.includes("vue") && ported(name, combination))
      )
        return undefined
      if (bases && !bases.includes(combination.base)) return undefined
      return [markupOf(name, combination), `styles/${name}.styles.ts`]
    },
  }
}

/**
 * The frameworks being ported after Vue, built against React's pages: each has a component Vue
 * has once its markup is written.
 */
const PORTING: Framework[] = ["svelte", "solid", "angular"]

function ported(name: string, combination: Combination): boolean {
  return (
    PORTING.includes(combination.framework) &&
    existsSync(join(REGISTRY, markupOf(name, combination).replace(/\/\*$/, "")))
  )
}

/** A style module more than one component reads. */
function sharedStyles(name: string, description: string): Item {
  return {
    name: `${name}-styles`,
    type: "registry:ui",
    title: `${name[0].toUpperCase()}${name.slice(1)} styles`,
    description,
    files: () => [`styles/${name}.styles.ts`],
  }
}

/** The registry's folder, which a block's files are listed from. */
const REGISTRY = join(import.meta.dirname, "..", "..", "..", "registry")

/** A block's files in a combination's base: its page first, then its parts and data, sorted. */
function blockFiles(bases: string, name: string): string[] {
  const root = join(REGISTRY, "bases", bases, "blocks", name)
  const walk = (folder: string): string[] =>
    readdirSync(join(root, folder), { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? walk(join(folder, entry.name))
        : [join(folder, entry.name)]
    )
  return walk("")
    .sort((left, right) =>
      left.startsWith("page.")
        ? -1
        : right.startsWith("page.")
          ? 1
          : left.localeCompare(right)
    )
    .map((file) => `bases/${bases}/blocks/${name}/${file}`)
}

/** A chart's file's extension, by framework. */
const CHART_EXTENSIONS: Record<Framework, string> = {
  react: "tsx",
  vue: "vue",
  svelte: "svelte",
  solid: "tsx",
  angular: "ts",
}

/** A framework's components written for one chart or demo, `components/<name>/`, if any. */
function localComponents(bases: string, name: string): string[] {
  const folder = join(REGISTRY, "bases", bases, "components", name)
  return existsSync(folder)
    ? readdirSync(folder)
        .sort()
        .map((file) => `bases/${bases}/components/${name}/${file}`)
    : []
}

/** A block, as an item: `registry/blocks.ts` names it, its folder holds it, React draws it, and
 * each other framework whose base has its folder. */
function blockItem(name: string): Item {
  return {
    name,
    type: "registry:block",
    title: blockInfo(name).title,
    description: blockInfo(name).description,
    files: (combination) =>
      react(combination) ||
      existsSync(join(REGISTRY, "bases", combination.bases, "blocks", name))
        ? blockFiles(combination.bases, name)
        : undefined,
  }
}

/** The icon placeholder's data: the map, and the libraries it loads when a design draws them. */
const ICON_DATA = [
  "icons/data.ts",
  "icons/tabler.ts",
  "icons/phosphor.ts",
  "icons/remixicon.ts",
]

export const ITEMS: Item[] = [
  {
    name: "kirana",
    type: "registry:lib",
    title: "Kirana design system",
    description:
      "The design system's tokens, axes and scales, and the Kirana configuration a project spreads.",
    files: () => [
      "core/attributes.ts",
      "core/axes.ts",
      "core/base-color-palette.ts",
      "core/base-colors.ts",
      "core/chart-color-palette.ts",
      "core/chart-colors.ts",
      "core/config.ts",
      "core/context.ts",
      "core/kirana.ts",
      "core/neutral.ts",
      "core/root.ts",
      "core/scales.ts",
      "core/states.ts",
      "core/theme-palette.ts",
      "core/themes.ts",
      "core/tokens.ts",
      "core/document.ts",
      "styles/reset.css",
    ],
    // How `kirana-style ui init` wires it into a project.
    setup: {
      config: {
        module: "@/registry/lib/kirana/kirana",
        export: "installConfig",
      },
      stylesheets: ["@/registry/ui/reset.css"],
      document: {
        module: "@/registry/lib/kirana/document",
        export: "htmlStyles",
      },
    },
  },
  {
    name: "sx",
    type: "registry:lib",
    title: "sx",
    description:
      "The sx prop React components take in place of className, and the props type that adds it.",
    // Vue merges a caller's `:sx` with Kirana's own `useSx()`, so it needs no helper.
    files: (combination) => (react(combination) ? ["lib/sx.ts"] : undefined),
  },
  {
    name: "icon-placeholder",
    type: "registry:lib",
    title: "Icon placeholder",
    description:
      "An icon named for every icon library, drawn in the one the project uses.",
    // Each framework's own placeholder over the same data: Lucide's and Hugeicons' in `data.ts`,
    // each other library's in a file it loads on demand.
    files: (combination) =>
      react(combination)
        ? [...ICON_DATA, "icons/icon-placeholder.tsx"]
        : combination.framework === "vue"
          ? [...ICON_DATA, "icons/IconPlaceholder.vue", "icons/vue.ts"]
          : combination.framework === "svelte"
            ? [...ICON_DATA, "icons/IconPlaceholder.svelte", "icons/svelte.ts"]
            : combination.framework === "solid"
              ? [...ICON_DATA, "bases/solid-ark/ui/icon-placeholder.tsx"]
              : [...ICON_DATA, "icons/angular.ts"],
  },
  {
    name: "placement",
    type: "registry:lib",
    title: "Placement",
    description:
      "Base UI's side, align and offsets for a popup, as Ark UI's positioning.",
    // Ark UI's frameworks: their popups take Base UI's placement on the content and place it
    // from the root.
    files: (combination) =>
      combination.base === "ark" ? ["lib/placement.ts"] : undefined,
  },
  {
    name: "control",
    type: "registry:lib",
    title: "Form control",
    description:
      "What Angular's form controls share: the caller's aria-invalid, kept where ng-primitives clears it.",
    files: (combination) =>
      combination.framework === "angular"
        ? ["lib/angular/control.ts"]
        : undefined,
  },
  {
    name: "presence",
    type: "registry:lib",
    title: "Presence",
    description:
      "An Angular panel in the page only while it is open, with Base UI's motion attributes.",
    files: (combination) =>
      combination.framework === "angular"
        ? ["lib/angular/presence.ts"]
        : undefined,
  },
  {
    name: "popup",
    type: "registry:lib",
    title: "Popup",
    description:
      "Angular's popups on Floating UI, in Base UI's markup: their state, trigger, placement and motion.",
    files: (combination) =>
      combination.framework === "angular"
        ? ["lib/angular/popup.ts"]
        : undefined,
  },
  {
    name: "menu",
    type: "registry:lib",
    title: "Menu",
    description:
      "Angular's menus and select lists: the highlight, the keyboard, items and submenus, as Base UI's.",
    files: (combination) =>
      combination.framework === "angular" ? ["lib/angular/menu.ts"] : undefined,
  },
  {
    name: "use-mobile",
    type: "registry:lib",
    title: "useIsMobile",
    description: "Whether the screen is narrower than the md breakpoint.",
    files: (combination) =>
      react(combination)
        ? ["lib/use-mobile.ts"]
        : combination.framework === "vue"
          ? ["lib/vue/use-mobile.ts"]
          : combination.framework === "svelte"
            ? ["lib/svelte/use-mobile.svelte.ts"]
            : combination.framework === "solid"
              ? ["lib/solid/use-mobile.ts"]
              : undefined,
  },
  {
    name: "use-highlighted-code",
    type: "registry:lib",
    title: "useHighlightedCode",
    description:
      "A code's lines, highlighted with TanStack Highlight, for Code Block.",
    files: (combination) =>
      react(combination)
        ? [
            "lib/use-highlighted-code.ts",
            "lib/highlighter.tsx",
            "lib/highlight-tokens.ts",
            "styles/highlight.styles.ts",
          ]
        : combination.framework === "vue"
          ? [
              "lib/vue/use-highlighted-code.ts",
              "lib/highlight-tokens.ts",
              "styles/highlight.styles.ts",
            ]
          : combination.framework === "svelte"
            ? [
                "lib/svelte/use-highlighted-code.ts",
                "lib/svelte/HighlightedLine.svelte",
                "lib/highlight-tokens.ts",
                "styles/highlight.styles.ts",
              ]
            : combination.framework === "solid"
              ? [
                  "lib/solid/use-highlighted-code.tsx",
                  "lib/highlight-tokens.ts",
                  "styles/highlight.styles.ts",
                ]
              : undefined,
  },
  sharedStyles("overlay", "How popups, modals and backdrops come and go."),
  sharedStyles(
    "menu",
    "What every menu-shaped popup shares: its surface and rows."
  ),
  sharedStyles("visually-hidden", "Text only a screen reader reaches."),
  sharedStyles(
    "scroll-fade",
    "A scrolling region that fades out at an edge with more to scroll."
  ),
  sharedStyles("shimmer", "A highlight sweeping across text while it works."),
  sharedStyles(
    "check",
    "What a checkbox, a radio and a switch share: their edge, fill and rings over their states."
  ),
  sharedStyles(
    "scope",
    "Relations a component reads of another it may be installed without: a tooltip, an input group, a dropdown menu, a message, and where a part sits in a button group."
  ),
  sharedStyles(
    "field-scope",
    "A Field's relation, and the width a control takes as a Field's child."
  ),
  {
    name: "control-styles",
    type: "registry:ui",
    title: "Control styles",
    description:
      "What form controls share: their focus and invalid rings, colour transitions and icon sizes.",
    files: () => ["styles/control.ts"],
    kiranaOnly: true,
  },
  component(
    "button",
    "Button",
    "Displays a button or a component that looks like a button.",
    ALL
  ),
  component("dialog", "Dialog", "A window overlaid on the page."),
  component(
    "select",
    "Select",
    "Displays a list of options to pick from, triggered by a button."
  ),
  component(
    "dropdown-menu",
    "Dropdown Menu",
    "Displays a menu of actions or functions, triggered by a button."
  ),
  component(
    "tabs",
    "Tabs",
    "A set of layered sections of content, displayed one at a time."
  ),
  {
    ...component(
      "chart",
      "Chart",
      "Charts on TanStack Charts, each series in one of the design's chart colours.",
      ["react", "vue"]
    ),
    // The helpers no framework needs (`lib/chart.ts`) come with each framework's container.
    files: (combination) =>
      react(combination) ||
      combination.framework === "vue" ||
      ported("chart", combination)
        ? [
            markupOf("chart", combination),
            "styles/chart.styles.ts",
            "lib/chart.ts",
          ]
        : undefined,
  },
  component(
    "card",
    "Card",
    "Displays a card with a header, content and footer.",
    ALL
  ),
  component("field", "Field", "Combines a label, a control and help text.", [
    "react",
    "vue",
  ]),
  component("input", "Input", "Displays a form input field.", ["react", "vue"]),
  component(
    "checkbox",
    "Checkbox",
    "A control that allows the user to toggle between checked and not checked.",
    ["react", "vue"]
  ),
  component(
    "radio-group",
    "Radio Group",
    "A set of checkable buttons, known as radio buttons, where no more than one can be checked at a time.",
    ["react", "vue"]
  ),
  component(
    "switch",
    "Switch",
    "A control that allows the user to toggle between checked and not checked.",
    ["react", "vue"]
  ),
  component("kbd", "Kbd", "Used to display textual user input from keyboard.", [
    "react",
    "vue",
  ]),
  component(
    "spinner",
    "Spinner",
    "An indicator that can be used to show a loading state.",
    ["react", "vue"]
  ),
  component(
    "toggle",
    "Toggle",
    "A two-state button that can be either on or off.",
    ["react", "vue"]
  ),
  component(
    "toggle-group",
    "Toggle Group",
    "A set of two-state buttons that can be toggled on or off.",
    ["react", "vue"]
  ),
  component(
    "native-select",
    "Native Select",
    "A styled native HTML select element with consistent design system integration.",
    ["react", "vue"]
  ),
  component(
    "slider",
    "Slider",
    "An input where the user selects a value from within a given range.",
    ["react", "vue"]
  ),
  component(
    "input-group",
    "Input Group",
    "Add addons, buttons, and helper content to inputs.",
    ["react", "vue"]
  ),
  component(
    "input-otp",
    "Input OTP",
    "Accessible one-time password component with copy-paste functionality.",
    ["react", "vue"]
  ),
  component("table", "Table", "A responsive table component.", [
    "react",
    "vue",
  ]),
  component(
    "textarea",
    "Textarea",
    "Displays a form textarea or a component that looks like a textarea.",
    ["react", "vue"]
  ),
  component(
    "badge",
    "Badge",
    "Displays a badge or a component that looks like a badge.",
    ["react", "vue"]
  ),
  component("alert", "Alert", "Displays a callout for user attention.", [
    "react",
    "vue",
  ]),
  component(
    "aspect-ratio",
    "Aspect Ratio",
    "Displays content within a desired ratio.",
    ["react", "vue"]
  ),
  component(
    "empty",
    "Empty",
    "Use the Empty component to display an empty state.",
    ["react", "vue"]
  ),
  component(
    "item",
    "Item",
    "A versatile component for displaying content with media, title, description, and actions.",
    ["react", "vue"]
  ),
  component(
    "progress",
    "Progress",
    "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    ["react", "vue"]
  ),
  component(
    "marker",
    "Marker",
    "Displays an inline status, system note, bordered row, or labeled separator in a conversation.",
    ["react", "vue"]
  ),
  component(
    "button-group",
    "Button Group",
    "A container that groups related buttons together with consistent styling.",
    ["react", "vue"]
  ),
  component(
    "scroll-area",
    "Scroll Area",
    "Augments native scroll functionality for custom, cross-browser styling.",
    ["react", "vue"]
  ),
  component(
    "popover",
    "Popover",
    "Displays rich content in a portal, triggered by a button.",
    ["react", "vue"]
  ),
  component(
    "hover-card",
    "Hover Card",
    "For sighted users to preview content available behind a link.",
    ["react", "vue"]
  ),
  component(
    "alert-dialog",
    "Alert Dialog",
    "A modal dialog that interrupts the user with important content and expects a response.",
    ["react", "vue"]
  ),
  component(
    "context-menu",
    "Context Menu",
    "Displays a menu of actions triggered by a right click.",
    ["react", "vue"]
  ),
  component(
    "combobox",
    "Combobox",
    "Autocomplete input with a list of suggestions.",
    ["react", "vue"]
  ),
  component(
    "command",
    "Command",
    "Command menu for search and quick actions.",
    ["react", "vue"]
  ),
  component(
    "drawer",
    "Drawer",
    "A drawer that slides in from an edge of the screen.",
    ["react", "vue"]
  ),
  component(
    "navigation-menu",
    "Navigation Menu",
    "A collection of links for navigating websites.",
    ["react", "vue"],
    ["base", "ark"]
  ),
  component(
    "menubar",
    "Menubar",
    "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
    ["react"],
    ["base"]
  ),
  component(
    "accordion",
    "Accordion",
    "A vertically stacked set of interactive headings that each reveal a section of content.",
    ["react", "vue"]
  ),
  component(
    "pagination",
    "Pagination",
    "Pagination with page navigation, next and previous links.",
    ["react", "vue"]
  ),
  {
    // A provider, drawing nothing: its markup only, no style module.
    name: "direction",
    type: "registry:ui",
    title: "Direction",
    description:
      "A provider component that sets the text direction for your application.",
    files: (combination) =>
      combination.framework === "react" ||
      combination.framework === "vue" ||
      ported("direction", combination)
        ? [markupOf("direction", combination)]
        : undefined,
  },
  component("sonner", "Sonner", "An opinionated toast component for React.", [
    "react",
    "vue",
  ]),
  component(
    "toast",
    "Toast",
    "A succinct message that is displayed temporarily.",
    ["react", "vue"],
    // React Aria has no toast: its pages use Sonner.
    ["base", "ark"]
  ),
  component(
    "resizable",
    "Resizable",
    "Accessible resizable panel groups and layouts with keyboard support.",
    ["react", "vue"]
  ),
  component(
    "carousel",
    "Carousel",
    "A carousel with motion and swipe built using Embla.",
    ["react", "vue"]
  ),
  component(
    "calendar",
    "Calendar",
    "A calendar component that allows users to select a date or a range of dates.",
    ["react", "vue"]
  ),
  component(
    "attachment",
    "Attachment",
    "Displays a file or image attachment with media, metadata, upload state, and actions.",
    ["react", "vue"]
  ),
  component(
    "bubble",
    "Bubble",
    "Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.",
    ["react", "vue"]
  ),
  component(
    "message",
    "Message",
    "Displays a message in a conversation, with optional avatar, header, footer, and alignment.",
    ["react", "vue"]
  ),
  component(
    "message-scroller",
    "Message Scroller",
    "A chat scroll container that anchors turns, opens saved transcripts, follows streamed responses, loads history without jumping, and jumps to any message.",
    ["react"]
  ),
  component(
    "questionnaire",
    "Questionnaire",
    "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.",
    ["react"]
  ),
  component(
    "code-block",
    "Code Block",
    "Displays code, terminal output and diffs with an optional header, line numbers and a copy button.",
    ["react", "vue"]
  ),
  component(
    "trace",
    "Trace",
    "The building block for reasoning, tool calls, sources and more.",
    ["react", "vue"]
  ),
  component(
    "label",
    "Label",
    "Renders an accessible label associated with a control.",
    ["react", "vue"]
  ),
  component(
    "separator",
    "Separator",
    "Visually or semantically separates content.",
    ["react", "vue"]
  ),
  component(
    "avatar",
    "Avatar",
    "An image element with a fallback for representing the user.",
    ["react", "vue"]
  ),
  component(
    "breadcrumb",
    "Breadcrumb",
    "Displays the path to the current resource using a hierarchy of links.",
    ["react", "vue"]
  ),
  component(
    "collapsible",
    "Collapsible",
    "An interactive component which expands and collapses a panel.",
    ["react", "vue"]
  ),
  component(
    "sheet",
    "Sheet",
    "Extends the Dialog to display content from an edge of the screen.",
    ["react", "vue"]
  ),
  component(
    "sidebar",
    "Sidebar",
    "A composable, themeable and customizable sidebar component.",
    ["react", "vue"]
  ),
  component(
    "skeleton",
    "Skeleton",
    "Shows a placeholder while content is loading.",
    ALL
  ),
  {
    name: "typeset",
    type: "registry:ui",
    title: "Typeset",
    description:
      "Styles for rendered markdown and other HTML you do not control, inside a typeset container.",
    // A stylesheet and the handle that gives it the design: the same for every framework.
    files: () => ["styles/typeset.css", "styles/typeset.styles.ts"],
  },
  component(
    "tooltip",
    "Tooltip",
    "A popup that displays information related to an element when it receives focus or is hovered.",
    ["react", "vue"]
  ),
  // The blocks, upstream's `registry/bases/<base>/blocks`: each one's title and description
  // `registry/blocks.ts`'s, its files read from its folder, on both React bases.
  ...BLOCKS.map((entry): Item => blockItem(entry.name)),
  // The charts, upstream's `registry/new-york-v4/charts`: one file each, its title and description
  // `registry/charts.ts`'s, on both React bases and on each other framework whose base has it.
  ...CHARTS.map((chart): Item => ({
    name: chart.name,
    type: "registry:block",
    title: chart.title,
    description: chart.description,
    files: (combination) => {
      if (react(combination))
        return [`bases/${combination.bases}/charts/${chart.name}.tsx`]
      const file = `bases/${combination.bases}/charts/${chart.name}.${CHART_EXTENSIONS[combination.framework]}`
      return existsSync(join(REGISTRY, file))
        ? [
            file,
            // The chart's own parts, a file each on the other frameworks (React's file declares
            // them).
            ...localComponents(combination.bases, chart.name),
          ]
        : undefined
    },
  })),
]

/**
 * Where a registry file lives in an installed project, relative to the registry's root for the
 * combination: markup and style modules in `ui/`, the design system in `lib/kirana/`, a block's
 * page and parts in `blocks/<name>/` and `components/`, a chart and a docs demo in `components/`.
 */
export function installedPath(source: string): string {
  const base = /^bases\/[^/]+\/ui\/(.+)$/.exec(source)
  if (base) return `ui/${base[1]}`
  const style = /^styles\/(.+)$/.exec(source)
  if (style) return `ui/${style[1]}`
  const core = /^(core|lib)\/(.+)$/.exec(source)
  if (core) return `lib/kirana/${core[2]}`
  const icon = /^icons\/(.+)$/.exec(source)
  if (icon) return `lib/kirana/icons/${icon[1]}`
  const blockPart = /^bases\/[^/]+\/blocks\/[^/]+\/components\/(.+)$/.exec(
    source
  )
  if (blockPart) return `components/${blockPart[1]}`
  // A chart is one component, as upstream's install into `components/`.
  const chart = /^bases\/[^/]+\/charts\/(.+)$/.exec(source)
  if (chart) return `components/${chart[1]}`
  // So is a docs demo, as upstream's examples (`registry:example`), and the frame upstream's
  // `-example` pages share (its `example` item).
  const demo = /^bases\/[^/]+\/(?:examples|components)\/(.+)$/.exec(source)
  if (demo) return `components/${demo[1]}`
  const block = /^bases\/[^/]+\/blocks\/(.+)$/.exec(source)
  if (block) return `blocks/${block[1]}`
  throw new Error(`No place for ${source} in an installed project.`)
}
