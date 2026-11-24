/**
 * The registry as a catalog for A2UI v1.0, Google's protocol for an agent composing an interface
 * from a client's own components (https://a2ui.org): from `registry/a2ui/manifest.ts`, the builder
 * writes
 *
 * - `<out>/a2ui/manifest.json`: each component's props, text, children and variants as JSON Schema,
 *   with the registry item and the parts it renders through;
 * - `<out>/a2ui/catalog.json`: the same components as an A2UI catalog, its props typed with A2UI's
 *   common types (`common_types.json`), so an agent can bind them to the data model.
 *
 * It describes the components; no renderer ships with it yet.
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { A2UI_COMPONENTS } from "../../../registry/a2ui/manifest"
import type {
  ManifestComponent,
  Prop,
  ValueSchema,
} from "../../../registry/a2ui/manifest"

/** Where the site serves the catalog: its id, as A2UI asks, and its `$id`. */
export const CATALOG_ID = "https://ui.kirana.style/r/a2ui/catalog.json"
export const MANIFEST_ID = "https://ui.kirana.style/r/a2ui/manifest.json"

type Json = { [key: string]: unknown }

const common = (name: string) => ({ $ref: `common_types.json#/$defs/${name}` })

const INSTRUCTIONS = `Kirana UI's components, as shadcn/ui draws them. Compose them as shadcn/ui does:

- A card is a \`Card\` holding a \`CardHeader\` (a \`CardTitle\`, a \`CardDescription\`, a \`CardAction\`), a \`CardContent\` and a \`CardFooter\`, each optional.
- A form control sits in a \`Field\`: its \`FieldLabel\`, the control (\`Input\`, \`Textarea\`, \`Select\`, \`Checkbox\`, \`Switch\`), then its \`FieldDescription\`. A \`Checkbox\` or \`Switch\` goes in a \`Field\` with \`orientation\` "horizontal", the control first.
- A table is a \`Table\` with its \`columns\` and a \`TableRow\` of \`TableCell\`s per row; a template over a list in the data model writes one row per entry.
- Bind a control's \`value\` or \`checked\` to a path in the data model (\`{"@path": "/form/email"}\`): the renderer writes the user's input back to it.
- Use \`variant\` to say what matters: one \`Button\` with the default variant per surface for the main action, "outline" or "ghost" for the others, "destructive" for an action that deletes.

This catalog has no layout or plain text components: for those, use the A2UI Basic Catalog's \`Column\`, \`Row\` and \`Text\`, naming its id in their \`@catalogId\`, when the renderer holds both catalogs.`

/** A prop's value in the manifest: a JSON Schema of what the part takes. */
function manifestSchema(prop: Prop): Json | undefined {
  switch (prop.kind) {
    case "prop":
      return prop.schema
    case "text":
      return prop.list
        ? { type: "array", items: { type: "string" } }
        : { type: "string" }
    case "children":
      return {
        type: "array",
        items: { type: "string", description: "A component's id." },
      }
    case "panels":
      return {
        type: "array",
        items: {
          type: "object",
          properties: {
            value: { type: "string" },
            title: { type: "string" },
            child: { type: "string", description: "A component's id." },
          },
          required: ["value", "title", "child"],
        },
      }
    case "action":
      return undefined
  }
}

/** The manifest as the builder writes it, every prop and variant a JSON Schema. */
export function a2uiManifest(
  components: readonly ManifestComponent[] = A2UI_COMPONENTS
) {
  return {
    $id: MANIFEST_ID,
    catalogId: CATALOG_ID,
    description:
      "Kirana UI's components an agent may compose a screen from: each one's props, text, children and variants, read from React's Base UI markup and the registry's style modules.",
    components: components.map((component) => ({
      name: component.name,
      item: component.item,
      parts: component.parts,
      description: component.description,
      ...(component.parents ? { parents: component.parents } : {}),
      props: Object.fromEntries(
        Object.entries(component.props).map(([name, prop]) => {
          const schema = manifestSchema(prop)
          return [
            name,
            {
              kind: prop.kind,
              ...(prop.part ? { part: prop.part } : {}),
              ...(prop.required ? { required: true } : {}),
              ...(prop.kind === "prop" && prop.bindable
                ? { bindable: true }
                : {}),
              ...(prop.kind === "children" && prop.allowed
                ? { allowed: prop.allowed }
                : {}),
              description: prop.description,
              ...(schema ? { schema } : {}),
            },
          ]
        })
      ),
      variants: Object.fromEntries(
        Object.entries(component.variants).map(([name, variant]) => [
          name,
          {
            description: variant.description,
            schema: {
              type: "string",
              enum: variant.values,
              default: variant.default,
            },
            from: variant.from,
          },
        ])
      ),
    })),
  }
}

/** A bindable value: a literal, a path in the data model, or a function's result. */
function dynamic(schema: ValueSchema): Json {
  switch (schema.type) {
    case "string":
      return common("DynamicString")
    case "boolean":
      return common("DynamicBoolean")
    case "number":
      return common("DynamicNumber")
    case "array":
      if (schema.items.type === "string") return common("DynamicStringList")
      return schema
    default:
      return schema
  }
}

/** A prop's schema in the catalog, typed with A2UI's common types. */
function catalogSchema(prop: Prop): Json {
  const described = (schema: Json) => ({
    ...schema,
    description: prop.description,
  })
  switch (prop.kind) {
    case "prop":
      return described(prop.bindable ? dynamic(prop.schema) : prop.schema)
    case "text":
      return described(
        common(prop.list ? "DynamicStringList" : "DynamicString")
      )
    case "action":
      return described(common("Action"))
    case "children":
      return described(common("ChildList"))
    case "panels":
      return described({
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            value: { type: "string", description: "The tab's value." },
            title: {
              ...common("DynamicString"),
              description: "The tab's title.",
            },
            child: {
              ...common("Child"),
              description: "The id of the component its panel shows.",
            },
          },
          required: ["value", "title", "child"],
          additionalProperties: false,
        },
      })
  }
}

/** One component's entry in the catalog. */
function catalogComponent(component: ManifestComponent): Json {
  const allowedChildren = [
    ...new Set(
      Object.values(component.props).flatMap((prop) =>
        prop.kind === "children" ? (prop.allowed ?? []) : []
      )
    ),
  ]
  // A component whose children are open takes any: no `allowedChildren`.
  const open = Object.values(component.props).some(
    (prop) =>
      (prop.kind === "children" && !prop.allowed) || prop.kind === "panels"
  )
  return {
    type: "object",
    description: component.description,
    ...(component.parents ? { allowedParents: component.parents } : {}),
    ...(allowedChildren.length && !open ? { allowedChildren } : {}),
    metadata: { extensions: { registryItem: component.item } },
    properties: {
      component: { const: component.name },
      ...Object.fromEntries(
        Object.entries(component.variants).map(([name, variant]) => [
          name,
          {
            type: "string",
            description: variant.description,
            enum: variant.values,
            default: variant.default,
          },
        ])
      ),
      ...Object.fromEntries(
        Object.entries(component.props).map(([name, prop]) => [
          name,
          catalogSchema(prop),
        ])
      ),
    },
    required: [
      "component",
      ...Object.entries(component.props)
        .filter(([, prop]) => prop.required)
        .map(([name]) => name),
    ],
  }
}

/** The A2UI v1.0 catalog of the manifest's components. */
export function a2uiCatalog(
  components: readonly ManifestComponent[] = A2UI_COMPONENTS
) {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: CATALOG_ID,
    catalogId: CATALOG_ID,
    protocolVersion: "1.0",
    title: "Kirana UI",
    description:
      "shadcn/ui's components as Kirana UI builds them, for React, Vue, Svelte, Solid and Angular.",
    instructions: INSTRUCTIONS,
    components: Object.fromEntries(
      components.map((component) => [
        component.name,
        catalogComponent(component),
      ])
    ),
    functions: {},
    $defs: {
      anyComponent: {
        oneOf: components.map((component) => ({
          $ref: `#/components/${component.name}`,
        })),
        discriminator: { propertyName: "component" },
      },
      // The catalog defines no function of its own.
      anyFunction: { not: {} },
    },
  }
}

/** Writes both files into `<out>/a2ui/`, returning their paths and how many components. */
export function writeA2ui(out: string) {
  const folder = join(out, "a2ui")
  mkdirSync(folder, { recursive: true })
  const files: [string, unknown][] = [
    [join(folder, "manifest.json"), a2uiManifest()],
    [join(folder, "catalog.json"), a2uiCatalog()],
  ]
  for (const [path, value] of files)
    writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)
  return {
    files: files.map(([path]) => path),
    components: A2UI_COMPONENTS.length,
  }
}
