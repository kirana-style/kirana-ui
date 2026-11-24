import { readFileSync, readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"

import { Catalog, validatePayload } from "@a2ui/agent"
import { Ajv2020 } from "ajv/dist/2020.js"
import { describe, expect, it } from "vite-plus/test"

import { A2UI_COMPONENTS } from "../../../registry/a2ui/manifest"
import type { ManifestComponent } from "../../../registry/a2ui/manifest"
import { CATALOG_ID, a2uiCatalog, a2uiManifest } from "./a2ui"
import { COMBINATIONS, FRAMEWORK_BASES, ITEMS } from "./items"

const REGISTRY = join(import.meta.dirname, "../../../registry")
const read = (path: string) => readFileSync(join(REGISTRY, path), "utf8")

/** A2UI's own schemas, as `@a2ui/web_core` ships them. */
const SCHEMAS = join(
  dirname(createRequire(import.meta.url).resolve("@a2ui/web_core")),
  "v1_0",
  "schemas"
)
const schema = (file: string) =>
  JSON.parse(readFileSync(join(SCHEMAS, file), "utf8")) as object

/**
 * The keys of the object literal whose `{` is at `open` in `code`, in order: the source read as
 * text, so no module that calls Kirana is loaded. Strings, comments and nested brackets are
 * skipped.
 */
function keysAt(code: string, open: number): { key: string; at: number }[] {
  const keys: { key: string; at: number }[] = []
  let depth = 0
  let expectKey = false
  for (let i = open; i < code.length; i++) {
    const ch = code[i]
    if (ch === "/" && code[i + 1] === "/") {
      i = code.indexOf("\n", i)
      continue
    }
    if (ch === "/" && code[i + 1] === "*") {
      i = code.indexOf("*/", i) + 1
      continue
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const end = code.indexOf(ch, i + 1)
      if (depth === 1 && expectKey && code[end + 1] === ":")
        keys.push({ key: code.slice(i + 1, end), at: end + 1 })
      i = end
      expectKey = false
      continue
    }
    if ("{[(".includes(ch)) {
      depth++
      if (depth === 1) expectKey = true
      continue
    }
    if ("}])".includes(ch)) {
      depth--
      if (depth === 0) return keys
      continue
    }
    if (depth === 1 && ch === ",") {
      expectKey = true
      continue
    }
    if (depth === 1 && expectKey && /[A-Za-z_$]/.test(ch)) {
      const name = /^[A-Za-z_$][\w$]*/.exec(code.slice(i))![0]
      const after = code.slice(i + name.length).match(/^\s*:/)
      if (after)
        keys.push({ key: name, at: i + name.length + after[0].length - 1 })
      i += name.length - 1
      expectKey = false
      continue
    }
    if (!/\s/.test(ch)) expectKey = false
  }
  throw new Error("Unbalanced object literal.")
}

/** The value object of `key` in the object at `open`: where its `{` is. */
function member(code: string, open: number, key: string): number {
  const found = keysAt(code, open).find((entry) => entry.key === key)
  if (!found) throw new Error(`No ${key} in the object.`)
  const brace = code.indexOf("{", found.at)
  return brace
}

/** The variant values a recipe declares, `recipe` naming it (`button`, `alert.root`). */
function recipeVariants(module: string, recipe: string, key: string) {
  const code = read(`styles/${module}`)
  const [name, ...path] = recipe.split(".")
  const declared = new RegExp(`export const ${name}\\s*=\\s*`).exec(code)
  if (!declared) throw new Error(`${module} exports no ${name}.`)
  let at = declared.index + declared[0].length
  // `recipe({` or an object holding recipes.
  let open = code.indexOf("{", at)
  for (const step of path) open = member(code, open, step)
  at = open
  return keysAt(code, member(code, member(code, at, "variants"), key)).map(
    (entry) => entry.key
  )
}

/** The literal union a part's prop is typed with in React's Base UI markup. */
function markupUnion(item: string, part: string, prop: string) {
  const code = read(`bases/react-base/ui/${item}.tsx`)
  const start = code.indexOf(`function ${part}(`)
  if (start < 0) throw new Error(`${item}.tsx has no ${part}.`)
  const end = code.indexOf("\nfunction ", start + 1)
  const body = code.slice(start, end < 0 ? undefined : end)
  const union = new RegExp(`\\b${prop}\\?:\\s*((?:"[^"]+"\\s*\\|?\\s*)+)`).exec(
    body
  )
  if (!union) throw new Error(`${part}'s ${prop} is not a literal union.`)
  return [...union[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
}

/** Every file an item installs for a combination, a folder's `*` read as its files. */
function filesOf(paths: string[]) {
  return paths.flatMap((path) =>
    path.endsWith("/*")
      ? readdirSync(join(REGISTRY, path.slice(0, -2))).map(
          (name) => `${path.slice(0, -2)}/${name}`
        )
      : [path]
  )
}

const exported = (code: string, name: string) =>
  new RegExp(
    `export\\s+(?:default\\s+)?(?:class|function|const)\\s+${name}\\b|\\bas\\s+${name}\\b|export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`
  ).test(code)

describe("the A2UI manifest", () => {
  it("names each component once", () => {
    const names = A2UI_COMPONENTS.map((component) => component.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("names an item every framework and base has, which exports every part it renders", () => {
    const missing: string[] = []
    for (const component of A2UI_COMPONENTS) {
      const item = ITEMS.find((each) => each.name === component.item)
      if (!item) {
        missing.push(`${component.name}: no item ${component.item}`)
        continue
      }
      for (const { bases } of FRAMEWORK_BASES) {
        const combination = COMBINATIONS.find(
          (each) => each.bases === bases && each.style === "nova"
        )!
        const files = item.files(combination)
        if (!files) {
          missing.push(`${component.name}: ${component.item} not on ${bases}`)
          continue
        }
        const code = filesOf(files)
          .filter((file) => file.startsWith(`bases/${bases}/`))
          .map(read)
          .join("\n")
        for (const part of component.parts)
          if (!exported(code, part))
            missing.push(`${component.name}: ${bases} exports no ${part}`)
      }
    }
    expect(missing).toEqual([])
  })

  it("gives each prop and variant a part the component renders, and a parent or child it has", () => {
    const names = new Set(A2UI_COMPONENTS.map((component) => component.name))
    const wrong: string[] = []
    for (const component of A2UI_COMPONENTS) {
      for (const [name, prop] of Object.entries(component.props)) {
        if (prop.part && !component.parts.includes(prop.part))
          wrong.push(`${component.name}.${name}: ${prop.part}`)
        if (prop.kind === "children")
          for (const child of prop.allowed ?? [])
            if (!names.has(child)) wrong.push(`${component.name}: ${child}`)
      }
      for (const [name, variant] of Object.entries(component.variants))
        if (
          "part" in variant.from &&
          !component.parts.includes(variant.from.part)
        )
          wrong.push(`${component.name}.${name}: ${variant.from.part}`)
      for (const parent of component.parents ?? [])
        if (!names.has(parent)) wrong.push(`${component.name}: ${parent}`)
    }
    expect(wrong).toEqual([])
  })

  it("holds each variant to the values its style module declares", () => {
    for (const component of A2UI_COMPONENTS) {
      for (const [name, variant] of Object.entries(component.variants)) {
        const label = `${component.name}.${name}`
        expect(variant.values, label).toContain(variant.default)
        const { from } = variant
        if ("recipe" in from) {
          expect(
            recipeVariants(
              `${component.item}.styles.ts`,
              from.recipe,
              from.key
            ),
            label
          ).toEqual(variant.values)
        } else {
          expect(
            markupUnion(component.item, from.part, from.prop).slice().sort(),
            label
          ).toEqual(variant.values.slice().sort())
          // The style module reads every value but the default, the default's look being its base.
          const code = read(`styles/${component.item}.styles.ts`)
          for (const value of variant.values)
            if (value !== variant.default)
              expect(
                code.includes(`[${from.attribute}="${value}"]`) ||
                  code.includes(`[${from.attribute}='${value}']`),
                `${label}: ${value}`
              ).toBe(true)
        }
      }
    }
  })

  it("has an enum only where a variant is", () => {
    const enums: string[] = []
    const walk = (value: unknown, path: string) => {
      if (Array.isArray(value))
        value.forEach((each, i) => walk(each, `${path}/${i}`))
      else if (value && typeof value === "object")
        for (const [key, each] of Object.entries(value)) {
          if (key === "enum") enums.push(path)
          walk(each, `${path}/${key}`)
        }
    }
    const manifest = a2uiManifest()
    walk(manifest, "")
    const catalog = a2uiCatalog()
    walk(catalog, "")
    const variantPaths = A2UI_COMPONENTS.flatMap((component, i) =>
      Object.keys(component.variants).flatMap((name) => [
        `/components/${i}/variants/${name}/schema`,
        `/components/${component.name}/properties/${name}`,
      ])
    )
    expect(enums.slice().sort()).toEqual(variantPaths.slice().sort())
    for (const component of A2UI_COMPONENTS)
      for (const [name, variant] of Object.entries(component.variants))
        expect(
          (
            catalog.components[component.name] as {
              properties: Record<string, { enum: readonly string[] }>
            }
          ).properties[name].enum
        ).toEqual(variant.values)
  })
})

describe("the A2UI catalog", () => {
  const catalog = a2uiCatalog()

  it("is valid by A2UI's catalog_definition.json", () => {
    const ajv = new Ajv2020({ strict: false, allErrors: true })
    ajv.addSchema(schema("common_types.json"))
    const validate = ajv.compile(schema("catalog_definition.json"))
    // The schema check itself, on A2UI's own Basic Catalog.
    expect(validate(schema("catalogs/basic/catalog.json"))).toBe(true)
    expect(validate(catalog), JSON.stringify(validate.errors)).toBe(true)
    expect(catalog.protocolVersion).toBe("1.0")
  })

  it("loads with A2UI's Catalog, every component with its constraints", () => {
    const loaded = Catalog.fromJson(catalog)
    expect(loaded.id).toBe(CATALOG_ID)
    expect(loaded.protocolVersion).toBe("1.0")
    expect([...loaded.components.keys()]).toEqual(
      A2UI_COMPONENTS.map((component) => component.name)
    )
    expect(loaded.components.get("Card")?.allowedChildren).toEqual([
      "CardHeader",
      "CardContent",
      "CardFooter",
    ])
    expect(loaded.components.get("CardTitle")?.allowedParents).toEqual([
      "CardHeader",
    ])
  })

  describe("checks a surface as A2UI's agent SDK does", () => {
    const loaded = Catalog.fromJson(catalog)
    const surface = (
      components: Record<string, unknown>[],
      dataModel?: Record<string, unknown>
    ) => [
      {
        version: "1.0",
        createSurface: {
          surfaceId: "main",
          catalogId: CATALOG_ID,
          components,
          ...(dataModel ? { dataModel } : {}),
        },
      },
    ]
    const button = (variant?: string) => ({
      id: "go",
      component: "Button",
      label: "Continue",
      ...(variant ? { variant } : {}),
      action: { event: { name: "submit" } },
    })

    it("accepts a sign-in card bound to its data model", () => {
      expect(() =>
        validatePayload(
          [loaded],
          surface(
            [
              {
                id: "root",
                component: "Card",
                children: ["head", "body", "foot"],
              },
              {
                id: "head",
                component: "CardHeader",
                children: ["title", "hint"],
              },
              { id: "title", component: "CardTitle", text: "Sign in" },
              {
                id: "hint",
                component: "CardDescription",
                text: { "@path": "/hint" },
              },
              { id: "body", component: "CardContent", children: ["email"] },
              { id: "email", component: "Field", children: ["label", "input"] },
              { id: "label", component: "FieldLabel", text: "Email" },
              {
                id: "input",
                component: "Input",
                type: "email",
                value: { "@path": "/email" },
              },
              { id: "foot", component: "CardFooter", children: ["go"] },
              button("default"),
            ],
            { hint: "Use your work email.", email: "" }
          )
        )
      ).not.toThrow()
    })

    it("accepts tabs, and a table's rows from a template", () => {
      expect(() =>
        validatePayload(
          [loaded],
          surface(
            [
              {
                id: "root",
                component: "Tabs",
                variant: "line",
                tabs: [{ value: "orders", title: "Orders", child: "table" }],
              },
              {
                id: "table",
                component: "Table",
                columns: ["Order", "Status"],
                children: { componentId: "row", path: "/orders" },
              },
              {
                id: "row",
                component: "TableRow",
                children: ["order", "status"],
              },
              { id: "order", component: "TableCell", text: { "@path": "id" } },
              {
                id: "status",
                component: "TableCell",
                text: { "@path": "status" },
              },
            ],
            { orders: [{ id: "1001", status: "Shipped" }] }
          )
        )
      ).not.toThrow()
    })

    it("rejects a variant the style module does not declare", () => {
      expect(() =>
        validatePayload(
          [loaded],
          surface([{ ...button("primary"), id: "root" }])
        )
      ).toThrow(/variant/)
    })

    it("rejects a child or a parent the component does not allow", () => {
      expect(() =>
        validatePayload(
          [loaded],
          surface([
            { id: "root", component: "Card", children: ["go"] },
            button(),
          ])
        )
      ).toThrow(/cannot contain/)
      expect(() =>
        validatePayload(
          [loaded],
          surface([{ id: "root", component: "CardTitle", text: "Alone" }])
        )
      ).toThrow(/cannot be placed/)
    })

    it("rejects a prop the component does not have", () => {
      expect(() =>
        validatePayload(
          [loaded],
          surface([
            { id: "root", component: "Badge", text: "New", colour: "red" },
          ])
        )
      ).toThrow(/colour/)
    })
  })
})

describe("the manifest as written", () => {
  it("gives every prop with a value a JSON Schema, and no action one", () => {
    const manifest = a2uiManifest()
    for (const component of manifest.components)
      for (const [name, prop] of Object.entries(component.props) as [
        string,
        { kind: string; schema?: object },
      ][])
        expect(
          prop.kind === "action" ? !prop.schema : !!prop.schema,
          `${component.name}.${name}`
        ).toBe(true)
  })

  it("lists the components the catalog lists", () => {
    const names = (
      components: readonly ManifestComponent[] | { name: string }[]
    ) => components.map((component) => component.name)
    expect(names(a2uiManifest().components)).toEqual(
      Object.keys(a2uiCatalog().components)
    )
  })
})
