/**
 * The registry's items: what each one is, and its source files for each base. The builder reads the
 * rest from the files themselves (dependencies from their imports, the style modules flattened per
 * combination).
 *
 * Paths are relative to `registry/`. A file's place in an installed project follows from its source
 * path (`installedPath`).
 */
import type { Base } from "./flatten"

export type Framework = "react" | "vue"

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

/** A component: its markup in each base, and its style module. */
function component(
  name: string,
  title: string,
  description: string,
  frameworks: Framework[] = ["react", "vue"]
): Item {
  return {
    name,
    type: "registry:ui",
    title,
    description,
    files: (combination) => {
      if (!frameworks.includes(combination.framework)) return undefined
      return [
        ...(react(combination)
          ? [`bases/${combination.bases}/ui/${name}.tsx`]
          : [`bases/${combination.bases}/ui/${name}/*`]),
        `styles/${name}.styles.ts`,
      ]
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
    files: (combination) => [
      "icons/data.ts",
      ...(react(combination)
        ? ["icons/icon-placeholder.tsx"]
        : ["icons/IconPlaceholder.vue", "icons/vue.ts"]),
    ],
  },
  sharedStyles("overlay", "How popups, modals and backdrops come and go."),
  sharedStyles(
    "menu",
    "What every menu-shaped popup shares: its surface and rows."
  ),
  sharedStyles("visually-hidden", "Text only a screen reader reaches."),
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
    "Displays a button or a component that looks like a button."
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
    "card",
    "Card",
    "Displays a card with a header, content and footer.",
    ["react"]
  ),
  component("field", "Field", "Combines a label, a control and help text.", [
    "react",
  ]),
  component("input", "Input", "Displays a form input field.", ["react"]),
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
  {
    name: "login-01",
    type: "registry:block",
    title: "Login 01",
    description: "A simple login form.",
    files: (combination) =>
      react(combination)
        ? [
            `bases/${combination.bases}/blocks/login-01/page.tsx`,
            `bases/${combination.bases}/blocks/login-01/components/login-form.tsx`,
          ]
        : undefined,
  },
]

/**
 * Where a registry file lives in an installed project, relative to the registry's root for the
 * combination: markup and style modules in `ui/`, the design system in `lib/kirana/`, a block's
 * page and parts in `blocks/<name>/` and `components/`.
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
  const block = /^bases\/[^/]+\/blocks\/(.+)$/.exec(source)
  if (block) return `blocks/${block[1]}`
  throw new Error(`No place for ${source} in an installed project.`)
}
