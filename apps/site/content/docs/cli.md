---
title: kirana-style ui
description: The commands that install, update and remove kirana/ui's components, and change a project's design.
section: start
order: 3
keywords: [cli, kirana-style ui, add, update, diff, remove, preset, lockfile]
---

# kirana-style ui

`kirana-style ui` copies components from a registry into your project, as
shadcn/ui's CLI does: the files become yours. It installs one source for every
framework, rewrites its imports to your aliases, adds the packages it needs, and
records what it wrote so it can update it later without losing your edits.

The commands live in `@kirana-style/registry`. In a folder with nothing installed
yet, run the package itself, `npx @kirana-style/registry <command>`: the same
commands under another name.

## Commands

| Command                           | Does                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `kirana-style ui init`            | Sets a project up: Kirana, the aliases, the design system ([Installation](/docs/installation)) |
| `kirana-style ui add <item…>`     | Installs items and every item they need                                                        |
| `kirana-style ui view <item…>`    | Shows an item before you install it: its files, bases and packages                             |
| `kirana-style ui search [query]`  | Lists the registry's items, by name, title or description                                      |
| `kirana-style ui outdated`        | Lists installed items the registry has changed                                                 |
| `kirana-style ui diff [item…]`    | The lines between your files and what installing them now would write                          |
| `kirana-style ui update [item…]`  | Writes what the registry changed and keeps what you changed                                    |
| `kirana-style ui remove <item…>`  | Deletes an item's files you left as installed                                                  |
| `kirana-style ui preset <code>`   | Changes the project's design                                                                   |
| `kirana-style ui validate <doc…>` | Checks registry items, indexes and lockfiles against their schemas                             |

Every command that writes takes `--dry-run`; `add`, `update` and `preset` take
`--overwrite` to replace a file you changed.

## Adding

<!-- ::install exec="kirana-style ui add select" -->

Each component's files land under your alias for their type, `@/components/ui` by
default, and its icons are drawn with your icon library. Its packages are installed
with your package manager, and Kirana checks what was written. `add` never changes
a file you already have unless you pass `--overwrite`.

## The lockfile

`kirana-style.lock.json` records each installed component: the registry it came
from, its version, the framework and base, and for each file two hashes, of the
registry's content and of what was written. Commit it: the two hashes are how
`outdated`, `diff` and `update` tell the registry's change from yours.

## Changing the design

<!-- ::install exec="kirana-style ui preset klmNKQS" -->

`preset` writes the design to `ui.design` in `kirana.config.ts`, sets its
attributes on `<html>`, and places every installed component again. The registry
carries each component's styles flattened for every style, so the project gets the
build for its new style, with only that style's values in it. A file you changed
stops it until you look, or pass `--overwrite`.

## Kirana's reference

These are Kirana's commands, documented in full on
[Kirana's site](https://github.com/kirana-style/kirana): their flags, their output
and the registry format they read.
