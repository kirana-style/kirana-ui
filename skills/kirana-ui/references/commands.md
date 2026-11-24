# kirana-style ui: the commands

Run through the project's package manager: `npx kirana-style ui …`, `bunx kirana-style ui …`,
`pnpm exec kirana-style ui …`. In a folder with no project yet, `npx @kirana-style/registry …`.
The command is `kirana-style`, never a bare `kirana`.

| Command            | What it does                                                                                                                                                                                                                                                                                                                                                                                 | Use it when                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `init`             | Sets a project up: Kirana where it is missing, the `ui` settings in `kirana.config.*` (`--framework`, `--base`, `--registry @kirana=<url>/{name}.json`), the design system installed and wired in (its config, its reset, its styles on `<html>`). `--template <name> [dir]` starts a new project; `--preset <code>` its design; `--rtl`, `--pointer`; `--workspace <package>` in a monorepo | a new project, or adding Kirana UI to one    |
| `add <item…>`      | Installs items and every item they need, at the project's aliases, packages included, each file's hash in `kirana-style.lock.json`                                                                                                                                                                                                                                                           | adding a component, block, chart, font       |
| `view <item…>`     | An item's frameworks and bases, files, styles and dependencies (`--json`)                                                                                                                                                                                                                                                                                                                    | before adding, to know what it brings        |
| `search [query]`   | The registries' items whose name, title or description holds the query                                                                                                                                                                                                                                                                                                                       | finding whether a component exists           |
| `diff [item…]`     | Each installed file the registry or the project changed, as lines                                                                                                                                                                                                                                                                                                                            | before `update` or `--overwrite`             |
| `outdated [item…]` | The installed items behind their registry                                                                                                                                                                                                                                                                                                                                                    | regular upkeep                               |
| `update [item…]`   | Writes what the registry changed, keeps what the project changed; stops where both changed                                                                                                                                                                                                                                                                                                   | taking the registry's fixes                  |
| `remove <item…>`   | Deletes the files the project left as installed, unless another item needs them                                                                                                                                                                                                                                                                                                              | dropping a component                         |
| `preset <code>`    | Changes the project's design: every item placed again for it                                                                                                                                                                                                                                                                                                                                 | a new style, colours, radius, fonts          |
| `validate <doc…>`  | Checks items, indexes and lockfiles: schema and every file's hash                                                                                                                                                                                                                                                                                                                            | a lockfile that looks wrong                  |
| `mcp`              | A Model Context Protocol server over stdio: the registries, searching and viewing items, their files and the add command                                                                                                                                                                                                                                                                     | giving an AI assistant the registry as tools |

Flags most commands take: `--dry-run` (print, write nothing), `--overwrite` (write over files the
project changed; run `diff` first), `--no-check` (skip the `kirana-style check` it runs on what it
wrote; only to see the files, then check them).

## A new project

The site's Get Code (`/create`) writes the exact command for the framework, template, base,
monorepo and tooling chosen:

```sh
npx @kirana-style/registry init --template @kirana/vite-react--none--eslint my-app \
  --framework react --base base --preset k0 \
  --registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json
```

A template's name is `<template>--<monorepo>--<tooling>`; every one is in
`r/templates/index.json`. Solid on ui-sdk needs Solid 2: its template is `vite-solid2`.

## With shadcn/ui's CLI

React's combinations are also exported in shadcn/ui's format (`/r/shadcn/`). `shadcn add
@kirana/button` copies the files but does not set Kirana up: run `kirana-style ui init` first.
Prefer `kirana-style ui`: it installs every framework, checks what it writes, and records hashes.

## Kirana's own commands, beside these

- `npx kirana-style check <paths>`: every diagnostic, with its code and a fix (`--format json`).
- `npx kirana-style trace <file>:<line> <property>`: which rule wins on an element, and why.
- `npx kirana-style export`: the design system's tokens, themes and recipes, by their names.
- `npx kirana-style doctor`: whether the engine, the packages and the wiring are right.
