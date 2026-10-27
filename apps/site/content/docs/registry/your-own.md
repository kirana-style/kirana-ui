---
title: Your own registry
description: Serve a registry of your own in Kirana's format, and install from it beside kirana/ui's.
section: registry
order: 2
keywords: [registry, publish, namespace, private registry, format, validate]
---

# Your own registry

A registry is static JSON anyone can host: one document per item at a URL that holds
the item's name, and an index, the item named `index`. `kirana-style ui` reads yours
as it reads kirana/ui's.

## Naming it

A project names its registries in `kirana.config.ts`, each under a namespace, with
the URL its items are at:

```ts
export default defineConfig({
  ui: {
    registries: {
      "@acme": "https://acme.dev/r/{name}.json",
    },
  },
})
```

and installs from it by namespace, beside kirana/ui's (`@kirana`, a name alone):

<!-- ::install exec="kirana-style ui add @acme/card button" -->

## An item

Each item is a JSON document valid against Kirana's schema: its style modules,
written once for every framework; its markup per framework and base; its packages
and the items it needs; and a hash for every file. An item of type
`design-system` also says how `init` wires it into a project.

Kirana's [registry format](https://github.com/kirana-style/kirana) documents every
field, with the schemas.

## Checking

<!-- ::install exec="kirana-style ui validate public/r/card.json public/r/index.json" -->

`validate` checks each document against its schema and each file's hash. Run it in
your registry's CI before you publish.
