---
title: Generative UI
description: A catalog of Kirana UI's components for Google's A2UI protocol, so an agent can describe a screen from real components. No renderer ships yet.
section: ai
order: 4
status: partial
keywords: [generative ui, a2ui, catalog, manifest, model, registry, declarative]
---

# Generative UI

**Partly built, as of November 2026: a catalog exists, a renderer does not.**

Generative UI here means one thing: a model chooses from a catalog of real components and fills
their props. It never writes code that runs. The registry now describes a first set of components
in the format of [A2UI](https://a2ui.org), Google's protocol for an agent composing an interface
from a client's own components (version 1.0). Nothing in Kirana UI turns that description into a
screen yet.

## What exists today

| File                    | What it holds                                                                                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/r/a2ui/catalog.json`  | An A2UI v1.0 catalog, id `https://ui.kirana.style/r/a2ui/catalog.json`: each component's props typed with A2UI's common types, its variants, and where it may be placed |
| `/r/a2ui/manifest.json` | The same components as plain JSON Schema: each prop, text, child slot and variant, the registry item that installs it and the parts it renders through                  |

The registry's builder writes both from one data module, `registry/a2ui/manifest.ts`. Its tests
hold the data to the code:

| Check                                 | How                                                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Every component exists everywhere     | Its registry item is on every framework and base, and every part it renders is exported there                                                |
| Every variant is real                 | Each enum equals the values the component's style module declares, or the data attribute values its markup writes and its style module reads |
| The catalog is valid A2UI             | It passes A2UI's own `catalog_definition.json`, loads with A2UI's `Catalog`, and A2UI's agent SDK accepts a sample screen against it         |
| The catalog constrains what it should | The agent SDK rejects a variant that does not exist, a child or parent a component does not allow, and a prop it does not have               |

The components, 26 in all, from 14 registry items:

| Item        | A2UI components                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `card`      | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| `button`    | `Button`                                                                                        |
| `badge`     | `Badge`                                                                                         |
| `alert`     | `Alert`, `AlertTitle`, `AlertDescription`                                                       |
| `field`     | `Field`, `FieldLabel`, `FieldDescription`                                                       |
| `input`     | `Input`                                                                                         |
| `textarea`  | `Textarea`                                                                                      |
| `select`    | `Select`                                                                                        |
| `checkbox`  | `Checkbox`                                                                                      |
| `switch`    | `Switch`                                                                                        |
| `tabs`      | `Tabs`                                                                                          |
| `table`     | `Table`, `TableRow`, `TableCell`                                                                |
| `separator` | `Separator`                                                                                     |
| `progress`  | `Progress`                                                                                      |

A component's props are read from React's Base UI markup, so they are React's names: `checked` on
a switch, `items` on a select. A control's `value` or `checked` can be bound to a path in A2UI's
data model, and a button's press is an A2UI action. The catalog has no layout or plain text
component: an agent uses the A2UI Basic Catalog's `Column`, `Row` and `Text` for those, naming that
catalog in each one's `@catalogId`, when the renderer holds both catalogs.

Alongside the catalog:

- **The registry, served to an agent** by `kirana-style ui mcp`. See [Registry](/docs/registry).
- **Every part's states and CSS variables, as data.** `@kirana-ui/vocabulary` holds each part's
  description, states, variables and where it goes inside its component. It holds no props.
- **Every part's props, as text.** Each adapter's `llms.txt`. See
  [Agents build with it](/docs/ai/agents-build).

## What does not exist yet

| Missing                      | What it means                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| A renderer for any framework | Nothing maps the catalog's components to Kirana UI's for React, Vue, Svelte, Solid or Angular; a client would write that mapping itself |
| Generation                   | Kirana UI does not prompt a model or produce A2UI messages; an agent built with A2UI's own SDK could, from the catalog                  |
| The rest of the components   | Charts, dialogs, menus and the other components are not in the catalog                                                                  |
| Other frameworks' props      | Vue, Svelte, Solid and Angular name some props differently; the catalog follows React's                                                 |

Until a renderer exists, this site does not say that Kirana UI generates interfaces from a prompt
or streams them. It says only that its components can be described to an A2UI agent.
