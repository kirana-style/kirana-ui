/**
 * The components an agent may compose a screen from, as data: each one's props, the text or
 * children it takes and its variants, read from React's Base UI markup (`bases/react-base/ui`) and
 * the style modules (`styles/<item>.styles.ts`). The builder writes it to `/r/a2ui/manifest.json`
 * and turns it into an A2UI v1.0 catalog, `/r/a2ui/catalog.json` (`packages/builder/src/a2ui.ts`).
 * Not an installed file.
 *
 * A component here is one A2UI component: the registry part it is named after, and the parts it
 * renders through (`parts`). Its props are the real props of those parts, with the part that takes
 * each one; a text prop is a part's children, a children prop the components it holds, an action
 * prop the part's click handler. Every enum is a variant, declared by the style module or written
 * by the markup as a data attribute that the style module reads; `packages/builder/src/a2ui.test.ts`
 * holds each one to its source, and each component to an item every framework has.
 */

/** A JSON Schema for a prop's value: the subset the manifest uses. */
export type ValueSchema =
  | { type: "string" }
  | { type: "boolean" }
  | { type: "number"; minimum?: number; maximum?: number }
  | { type: "array"; items: ValueSchema }
  | {
      type: "object"
      properties: Record<string, ValueSchema>
      required: readonly string[]
    }

type Common = {
  description: string
  /** The part that takes it, where it is not the component's own part. */
  part?: string
  required?: true
}

export type Prop =
  /** A real prop of the part, under the same name. `bindable` lets A2UI bind it to the data model. */
  | (Common & { kind: "prop"; schema: ValueSchema; bindable?: true })
  /** Text rendered as the part's children; a list of texts renders one part per text. */
  | (Common & { kind: "text"; list?: true })
  /** The part's click handler (`onClick`), which A2UI calls an action. */
  | (Common & { kind: "action" })
  /** Other components rendered as the part's children, by id; `allowed` narrows them. */
  | (Common & { kind: "children"; allowed?: readonly string[] })
  /** Tabs' panels: each a trigger's value and title, and the component its panel holds. */
  | (Common & { kind: "panels" })

export type Variant = {
  description: string
  values: readonly string[]
  default: string
  /**
   * Where the values are declared: a recipe's variant key in the style module (`export` names the
   * recipe, `alert.root` for a member), or a data attribute the markup writes from the part's
   * prop and the style module reads (`[data-size="sm"]`).
   */
  from:
    | { recipe: string; key: string }
    | { attribute: string; part: string; prop: string }
}

export type ManifestComponent = {
  /** The A2UI component's name: the registry part it is named after. */
  name: string
  /** The registry item that holds it, `/r/<item>.json`. */
  item: string
  /** Every part it renders through, its own first. */
  parts: readonly string[]
  description: string
  props: Readonly<Record<string, Prop>>
  variants: Readonly<Record<string, Variant>>
  /** The components it may sit in; any, when absent. */
  parents?: readonly string[]
}

const disabled: Prop = {
  kind: "prop",
  schema: { type: "boolean" },
  bindable: true,
  description: "Whether the control is disabled.",
}

const size = (part: string, description: string): Variant => ({
  description,
  values: ["default", "sm"],
  default: "default",
  from: { attribute: "data-size", part, prop: "size" },
})

/** Every component in the catalog, in the order the catalog lists them. */
export const A2UI_COMPONENTS: readonly ManifestComponent[] = [
  {
    name: "Card",
    item: "card",
    parts: ["Card"],
    description:
      "A bordered surface grouping related content: a header, content and a footer.",
    props: {
      children: {
        kind: "children",
        allowed: ["CardHeader", "CardContent", "CardFooter"],
        description: "The card's sections, in order.",
      },
    },
    variants: {
      size: {
        description: "The card's padding and gaps.",
        values: ["default", "sm"],
        default: "default",
        from: { attribute: "data-size", part: "Card", prop: "size" },
      },
    },
  },
  {
    name: "CardHeader",
    item: "card",
    parts: ["CardHeader"],
    description: "The top of a card: its title, description and an action.",
    props: {
      children: {
        kind: "children",
        allowed: ["CardTitle", "CardDescription", "CardAction"],
        description: "The header's title, description and action.",
      },
    },
    variants: {},
    parents: ["Card"],
  },
  {
    name: "CardTitle",
    item: "card",
    parts: ["CardTitle"],
    description: "A card's title.",
    props: {
      text: { kind: "text", required: true, description: "The title." },
    },
    variants: {},
    parents: ["CardHeader"],
  },
  {
    name: "CardDescription",
    item: "card",
    parts: ["CardDescription"],
    description: "A line of muted text under a card's title.",
    props: {
      text: { kind: "text", required: true, description: "The description." },
    },
    variants: {},
    parents: ["CardHeader"],
  },
  {
    name: "CardAction",
    item: "card",
    parts: ["CardAction"],
    description: "A control placed at the end of a card's header.",
    props: {
      children: {
        kind: "children",
        description: "The control, usually one Button.",
      },
    },
    variants: {},
    parents: ["CardHeader"],
  },
  {
    name: "CardContent",
    item: "card",
    parts: ["CardContent"],
    description: "The body of a card.",
    props: {
      children: { kind: "children", description: "The card's content." },
    },
    variants: {},
    parents: ["Card"],
  },
  {
    name: "CardFooter",
    item: "card",
    parts: ["CardFooter"],
    description: "The bottom of a card, usually its actions.",
    props: {
      children: {
        kind: "children",
        description: "The footer's content, usually Buttons.",
      },
    },
    variants: {},
    parents: ["Card"],
  },
  {
    name: "Button",
    item: "button",
    parts: ["Button"],
    description: "A button the user presses to act.",
    props: {
      label: {
        kind: "text",
        required: true,
        description: "The button's text.",
      },
      action: {
        kind: "action",
        required: true,
        description: "What pressing the button does.",
      },
      disabled,
    },
    variants: {
      variant: {
        description:
          "The button's emphasis: default for the main action, destructive for a dangerous one.",
        values: [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
        ],
        default: "default",
        from: { recipe: "button", key: "variant" },
      },
      size: {
        description:
          "The button's height and padding; the icon sizes are square, for a button holding only an icon.",
        values: [
          "default",
          "xs",
          "sm",
          "lg",
          "icon",
          "icon-xs",
          "icon-sm",
          "icon-lg",
        ],
        default: "default",
        from: { recipe: "button", key: "size" },
      },
    },
  },
  {
    name: "Badge",
    item: "badge",
    parts: ["Badge"],
    description: "A small label for a status or a count.",
    props: {
      text: { kind: "text", required: true, description: "The badge's text." },
    },
    variants: {
      variant: {
        description: "The badge's colours.",
        values: [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
        ],
        default: "default",
        from: { recipe: "badge", key: "variant" },
      },
    },
  },
  {
    name: "Alert",
    item: "alert",
    parts: ["Alert"],
    description: "A callout that draws attention to a message.",
    props: {
      children: {
        kind: "children",
        allowed: ["AlertTitle", "AlertDescription"],
        description: "The alert's title and description.",
      },
    },
    variants: {
      variant: {
        description: "The alert's tone: destructive for an error.",
        values: ["default", "destructive"],
        default: "default",
        from: { recipe: "alert.root", key: "variant" },
      },
    },
  },
  {
    name: "AlertTitle",
    item: "alert",
    parts: ["AlertTitle"],
    description: "An alert's title.",
    props: {
      text: { kind: "text", required: true, description: "The title." },
    },
    variants: {},
    parents: ["Alert"],
  },
  {
    name: "AlertDescription",
    item: "alert",
    parts: ["AlertDescription"],
    description: "An alert's message.",
    props: {
      text: { kind: "text", required: true, description: "The message." },
    },
    variants: {},
    parents: ["Alert"],
  },
  {
    name: "Field",
    item: "field",
    parts: ["Field"],
    description: "A form control with its label and help text.",
    props: {
      children: {
        kind: "children",
        allowed: [
          "FieldLabel",
          "FieldDescription",
          "Input",
          "Textarea",
          "Select",
          "Checkbox",
          "Switch",
        ],
        description: "The label, the control and the description, in order.",
      },
    },
    variants: {
      orientation: {
        description:
          "How the label and the control are laid out: stacked, side by side, or side by side on wide screens.",
        values: ["vertical", "horizontal", "responsive"],
        default: "vertical",
        from: {
          attribute: "data-orientation",
          part: "Field",
          prop: "orientation",
        },
      },
    },
  },
  {
    name: "FieldLabel",
    item: "field",
    parts: ["FieldLabel"],
    description: "A field's label.",
    props: {
      text: { kind: "text", required: true, description: "The label." },
    },
    variants: {},
    parents: ["Field"],
  },
  {
    name: "FieldDescription",
    item: "field",
    parts: ["FieldDescription"],
    description: "Help text under a field's control.",
    props: {
      text: { kind: "text", required: true, description: "The help text." },
    },
    variants: {},
    parents: ["Field"],
  },
  {
    name: "Input",
    item: "input",
    parts: ["Input"],
    description: "A single-line text input.",
    props: {
      value: {
        kind: "prop",
        schema: { type: "string" },
        bindable: true,
        description:
          "The text; bound to a path in the data model, it is written back as the user types.",
      },
      placeholder: {
        kind: "prop",
        schema: { type: "string" },
        bindable: true,
        description: "The text shown while the input is empty.",
      },
      type: {
        kind: "prop",
        schema: { type: "string" },
        description:
          "The HTML input type: text, email, password, number, search, tel or url.",
      },
      disabled,
    },
    variants: {},
  },
  {
    name: "Textarea",
    item: "textarea",
    parts: ["Textarea"],
    description: "A multi-line text input.",
    props: {
      value: {
        kind: "prop",
        schema: { type: "string" },
        bindable: true,
        description:
          "The text; bound to a path in the data model, it is written back as the user types.",
      },
      placeholder: {
        kind: "prop",
        schema: { type: "string" },
        bindable: true,
        description: "The text shown while the textarea is empty.",
      },
      rows: {
        kind: "prop",
        schema: { type: "number", minimum: 1 },
        description: "The number of visible lines.",
      },
      disabled,
    },
    variants: {},
  },
  {
    name: "Select",
    item: "select",
    parts: [
      "Select",
      "SelectTrigger",
      "SelectValue",
      "SelectContent",
      "SelectItem",
    ],
    description: "A button that opens a list of options to choose one from.",
    props: {
      items: {
        kind: "prop",
        required: true,
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              value: { type: "string" },
            },
            required: ["label", "value"],
          },
        },
        description: "The options, each a label and the value it stands for.",
      },
      value: {
        kind: "prop",
        schema: { type: "string" },
        bindable: true,
        description:
          "The chosen option's value; bound to a path in the data model, it is written back on a choice.",
      },
      placeholder: {
        kind: "prop",
        part: "SelectValue",
        schema: { type: "string" },
        bindable: true,
        description: "The text shown while nothing is chosen.",
      },
      disabled,
    },
    variants: {
      size: size("SelectTrigger", "The trigger's height."),
    },
  },
  {
    name: "Checkbox",
    item: "checkbox",
    parts: ["Checkbox"],
    description:
      "A box the user ticks on or off; label it with a horizontal Field.",
    props: {
      checked: {
        kind: "prop",
        schema: { type: "boolean" },
        bindable: true,
        description:
          "Whether it is ticked; bound to a path in the data model, it is written back on a change.",
      },
      disabled,
    },
    variants: {},
  },
  {
    name: "Switch",
    item: "switch",
    parts: ["Switch"],
    description:
      "A toggle between on and off; label it with a horizontal Field.",
    props: {
      checked: {
        kind: "prop",
        schema: { type: "boolean" },
        bindable: true,
        description:
          "Whether it is on; bound to a path in the data model, it is written back on a change.",
      },
      disabled,
    },
    variants: {
      size: size("Switch", "The switch's size."),
    },
  },
  {
    name: "Tabs",
    item: "tabs",
    parts: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    description:
      "Panels of content, one shown at a time, chosen by a row of tabs.",
    props: {
      tabs: {
        kind: "panels",
        required: true,
        description:
          "The tabs, in order: each one's value, its title and the component its panel shows.",
      },
      defaultValue: {
        kind: "prop",
        schema: { type: "string" },
        description: "The value of the tab shown first.",
      },
    },
    variants: {
      variant: {
        description: "The tab list's look: a filled track, or an underline.",
        values: ["default", "line"],
        default: "default",
        from: { attribute: "data-variant", part: "TabsList", prop: "variant" },
      },
    },
  },
  {
    name: "Table",
    item: "table",
    parts: [
      "Table",
      "TableHeader",
      "TableBody",
      "TableRow",
      "TableHead",
      "TableCaption",
    ],
    description: "Rows of data under a row of column headings.",
    props: {
      columns: {
        kind: "text",
        list: true,
        part: "TableHead",
        required: true,
        description:
          "The column headings, each a TableHead in the header's row.",
      },
      children: {
        kind: "children",
        part: "TableBody",
        allowed: ["TableRow"],
        description:
          "The rows, in the table's body; a template over a list in the data model writes one per entry.",
      },
      caption: {
        kind: "text",
        part: "TableCaption",
        description: "A caption under the table.",
      },
    },
    variants: {},
  },
  {
    name: "TableRow",
    item: "table",
    parts: ["TableRow"],
    description: "A row of a table's body.",
    props: {
      children: {
        kind: "children",
        allowed: ["TableCell"],
        description: "The row's cells, one per column.",
      },
    },
    variants: {},
    parents: ["Table"],
  },
  {
    name: "TableCell",
    item: "table",
    parts: ["TableCell"],
    description: "A cell of a table's row.",
    props: {
      text: { kind: "text", required: true, description: "The cell's text." },
    },
    variants: {},
    parents: ["TableRow"],
  },
  {
    name: "Separator",
    item: "separator",
    parts: ["Separator"],
    description: "A horizontal line between content.",
    props: {},
    variants: {},
  },
  {
    name: "Progress",
    item: "progress",
    parts: ["Progress"],
    description: "A bar showing how far a task has got.",
    props: {
      value: {
        kind: "prop",
        required: true,
        schema: { type: "number", minimum: 0, maximum: 100 },
        bindable: true,
        description: "How far, from 0 to 100.",
      },
    },
    variants: {},
  },
]
