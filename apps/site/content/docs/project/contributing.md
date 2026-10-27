---
title: Contributing
description: Report a bug, port a component or a block, or fix a page, in kirana/ui's repository.
section: project
order: 1
keywords: [contributing, issues, pull request, port, conformance]
---

# Contributing

kirana/ui is built in the open, in
[kirana-style/kirana-ui](https://github.com/kirana-style/kirana-ui). Issues and pull requests are
welcome there.

## Report something

Open an [issue](https://github.com/kirana-style/kirana-ui/issues) with what you saw, what you
expected, the page or the item, and the design (its [preset code](/docs/presets)). A component that
looks different from shadcn/ui's in the same style is a bug.

## Work on it

The repository uses Vite+ (`vp`) for its tasks, with Bun as the package manager.

```bash
vp install        # the dependencies and the git hooks
vp run check      # format, lint with Kirana's rules, types
vp run build      # every app, with Kirana's diagnostics
vp run registry   # the registry, flattened and checked for every combination
vp run prepush    # what the pre-push hook and CI run
```

A component is ported from shadcn/ui's own source, its look into one style module that holds
every style ([How styles are built](/docs/kirana/how-styles-are-built)), then checked against
shadcn/ui's site, property by property, in every style. A pull request title is a Conventional
Commit (`feat:`, `fix:`, `docs:` …).
