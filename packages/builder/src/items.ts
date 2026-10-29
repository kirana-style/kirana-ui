/**
 * The registry's items: what each one is, and its source files for each base. The builder reads the
 * rest from the files themselves (dependencies from their imports, the style modules flattened per
 * combination).
 *
 * Paths are relative to `registry/`. A file's place in an installed project follows from its source
 * path (`installedPath`).
 */
import { blockInfo } from "../../../registry/blocks"
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
      if (!frameworks.includes(combination.framework)) return undefined
      if (bases && !bases.includes(combination.base)) return undefined
      return [markupOf(name, combination), `styles/${name}.styles.ts`]
    },
  }
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
      "core/colors.ts",
      "core/config.ts",
      "core/context.ts",
      "core/kirana.ts",
      "core/palettes.ts",
      "core/root.ts",
      "core/scales.ts",
      "core/states.ts",
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
    // React's and Vue's for now; Svelte, Solid and Angular get theirs with their first icon.
    files: (combination) =>
      react(combination)
        ? ["icons/data.ts", "icons/icon-placeholder.tsx"]
        : combination.framework === "vue"
          ? ["icons/data.ts", "icons/IconPlaceholder.vue", "icons/vue.ts"]
          : undefined,
  },
  {
    name: "use-mobile",
    type: "registry:lib",
    title: "useIsMobile",
    description: "Whether the screen is narrower than the md breakpoint.",
    files: (combination) =>
      react(combination) ? ["lib/use-mobile.ts"] : undefined,
  },
  sharedStyles("overlay", "How popups, modals and backdrops come and go."),
  sharedStyles(
    "menu",
    "What every menu-shaped popup shares: its surface and rows."
  ),
  sharedStyles("visually-hidden", "Text only a screen reader reaches."),
  sharedStyles(
    "check",
    "What a checkbox, a radio and a switch share: their edge, fill and rings over their states."
  ),
  sharedStyles(
    "scope",
    "Relations a component reads of another it may be installed without: a tooltip, an input group, a dropdown menu, and where a part sits in a button group."
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
  component(
    "chart",
    "Chart",
    "Charts on TanStack Charts, each series in one of the design's chart colours.",
    ["react"]
  ),
  component(
    "card",
    "Card",
    "Displays a card with a header, content and footer.",
    ALL
  ),
  component("field", "Field", "Combines a label, a control and help text.", [
    "react",
  ]),
  component("input", "Input", "Displays a form input field.", ["react"]),
  component(
    "checkbox",
    "Checkbox",
    "A control that allows the user to toggle between checked and not checked.",
    ["react"]
  ),
  component(
    "radio-group",
    "Radio Group",
    "A set of checkable buttons, known as radio buttons, where no more than one can be checked at a time.",
    ["react"]
  ),
  component(
    "switch",
    "Switch",
    "A control that allows the user to toggle between checked and not checked.",
    ["react"]
  ),
  component("kbd", "Kbd", "Used to display textual user input from keyboard.", [
    "react",
  ]),
  component(
    "spinner",
    "Spinner",
    "An indicator that can be used to show a loading state.",
    ["react"]
  ),
  component(
    "toggle",
    "Toggle",
    "A two-state button that can be either on or off.",
    ["react"]
  ),
  component(
    "toggle-group",
    "Toggle Group",
    "A set of two-state buttons that can be toggled on or off.",
    ["react"]
  ),
  component(
    "native-select",
    "Native Select",
    "A styled native HTML select element with consistent design system integration.",
    ["react"]
  ),
  component(
    "slider",
    "Slider",
    "An input where the user selects a value from within a given range.",
    ["react"]
  ),
  component(
    "input-group",
    "Input Group",
    "Add addons, buttons, and helper content to inputs.",
    ["react"]
  ),
  component(
    "input-otp",
    "Input OTP",
    "Accessible one-time password component with copy-paste functionality.",
    ["react"]
  ),
  component("table", "Table", "A responsive table component.", ["react"]),
  component(
    "textarea",
    "Textarea",
    "Displays a form textarea or a component that looks like a textarea.",
    ["react"]
  ),
  component(
    "badge",
    "Badge",
    "Displays a badge or a component that looks like a badge.",
    ["react"]
  ),
  component("alert", "Alert", "Displays a callout for user attention.", [
    "react",
  ]),
  component(
    "aspect-ratio",
    "Aspect Ratio",
    "Displays content within a desired ratio.",
    ["react"]
  ),
  component(
    "empty",
    "Empty",
    "Use the Empty component to display an empty state.",
    ["react"]
  ),
  component(
    "item",
    "Item",
    "A versatile component for displaying content with media, title, description, and actions.",
    ["react"]
  ),
  component(
    "progress",
    "Progress",
    "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    ["react"]
  ),
  component(
    "marker",
    "Marker",
    "Displays an inline status, system note, bordered row, or labeled separator in a conversation.",
    ["react"]
  ),
  component(
    "button-group",
    "Button Group",
    "A container that groups related buttons together with consistent styling.",
    ["react"]
  ),
  component(
    "scroll-area",
    "Scroll Area",
    "Augments native scroll functionality for custom, cross-browser styling.",
    ["react"]
  ),
  component(
    "popover",
    "Popover",
    "Displays rich content in a portal, triggered by a button.",
    ["react"]
  ),
  component(
    "hover-card",
    "Hover Card",
    "For sighted users to preview content available behind a link.",
    ["react"]
  ),
  component(
    "alert-dialog",
    "Alert Dialog",
    "A modal dialog that interrupts the user with important content and expects a response.",
    ["react"]
  ),
  component(
    "context-menu",
    "Context Menu",
    "Displays a menu of actions triggered by a right click.",
    ["react"]
  ),
  component(
    "combobox",
    "Combobox",
    "Autocomplete input with a list of suggestions.",
    ["react"]
  ),
  component(
    "command",
    "Command",
    "Command menu for search and quick actions.",
    ["react"]
  ),
  component("drawer", "Drawer", "A drawer component for React.", ["react"]),
  component(
    "navigation-menu",
    "Navigation Menu",
    "A collection of links for navigating websites.",
    ["react"],
    ["base"]
  ),
  component(
    "menubar",
    "Menubar",
    "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
    ["react"],
    ["base"]
  ),
  component(
    "label",
    "Label",
    "Renders an accessible label associated with a control.",
    ["react"]
  ),
  component(
    "separator",
    "Separator",
    "Visually or semantically separates content.",
    ["react"]
  ),
  component(
    "avatar",
    "Avatar",
    "An image element with a fallback for representing the user.",
    ["react"]
  ),
  component(
    "breadcrumb",
    "Breadcrumb",
    "Displays the path to the current resource using a hierarchy of links.",
    ["react"]
  ),
  component(
    "collapsible",
    "Collapsible",
    "An interactive component which expands and collapses a panel.",
    ["react"]
  ),
  component(
    "sheet",
    "Sheet",
    "Extends the Dialog to display content from an edge of the screen.",
    ["react"]
  ),
  component(
    "sidebar",
    "Sidebar",
    "A composable, themeable and customizable sidebar component.",
    ["react"]
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
    ["react"]
  ),
  {
    name: "login-01",
    type: "registry:block",
    // Its title and description, with the blocks page's categories, are `registry/blocks.ts`'s.
    title: blockInfo("login-01").title,
    description: blockInfo("login-01").description,
    files: (combination) =>
      react(combination)
        ? [
            `bases/${combination.bases}/blocks/login-01/page.tsx`,
            `bases/${combination.bases}/blocks/login-01/components/login-form.tsx`,
          ]
        : undefined,
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    // Its title and description, with the blocks page's categories, are `registry/blocks.ts`'s.
    title: blockInfo("sidebar-07").title,
    description: blockInfo("sidebar-07").description,
    files: (combination) =>
      react(combination)
        ? [
            `bases/${combination.bases}/blocks/sidebar-07/page.tsx`,
            ...[
              "app-sidebar",
              "nav-main",
              "nav-projects",
              "nav-user",
              "team-switcher",
            ].map(
              (part) =>
                `bases/${combination.bases}/blocks/sidebar-07/components/${part}.tsx`
            ),
          ]
        : undefined,
  },
  // The charts, upstream's `registry/new-york-v4/charts`: one file each, its title and description
  // `registry/charts.ts`'s, on both React bases (Ark UI has no Chart yet).
  ...CHARTS.map((chart): Item => ({
    name: chart.name,
    type: "registry:block",
    title: chart.title,
    description: chart.description,
    files: (combination) =>
      react(combination)
        ? [`bases/${combination.bases}/charts/${chart.name}.tsx`]
        : undefined,
  })),
]

/**
 * Where a registry file lives in an installed project, relative to the registry's root for the
 * combination: markup and style modules in `ui/`, the design system in `lib/kirana/`, a block's
 * page and parts in `blocks/<name>/` and `components/`, a chart in `components/`.
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
  const block = /^bases\/[^/]+\/blocks\/(.+)$/.exec(source)
  if (block) return `blocks/${block[1]}`
  throw new Error(`No place for ${source} in an installed project.`)
}
