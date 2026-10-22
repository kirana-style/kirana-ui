# Documentation

This project is the shadcn/ui component set rebuilt on Kirana, a compile-time
styling system, with a design system layered on top that keeps Tailwind's
vocabulary.

> **Kirana is the compiler, Panda is the inspiration for the API, and Tailwind is
> the vocabulary.**

## Read in this order

| Document                                             | What it answers                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| [architecture.md](architecture.md)                   | How the system is layered, and _why_ each decision went that way        |
| [porting-from-tailwind.md](porting-from-tailwind.md) | The mental shift, the utility-by-utility mapping, and the pitfalls      |
| [catalogue.md](catalogue.md)                         | What already exists, and how to use it instead of rebuilding it         |
| [workflows.md](workflows.md)                         | Adding a component, removing one, verifying it, keeping these docs true |

The compiler itself, in the [kirana repository](https://github.com/kirana-style/kirana/blob/main/README.md):

- [`spec/`](https://github.com/kirana-style/kirana/blob/main/spec/README.md) — the specification: the authoring API, merge and
  precedence rules, the diagnostic catalogue, and the decision log.
- [`CHANGELOG.md`](https://github.com/kirana-style/kirana/blob/main/CHANGELOG.md) — what each release changed; this repository
  pins one release (`scripts/use-kirana.ts`).
- [`@kirana-style/core`'s README](https://github.com/kirana-style/kirana/blob/main/packages/kirana/npm/core/README.md) — the
  authoring API in one page.

## The one rule about these docs

**They are part of the deliverable, not a report on it.** A change that adds a
token, a recipe, a relation, or a pattern is not finished until the relevant
document says so (and the instructions you give a coding agent, if you use one).

The point is that the next person — or the next agent — can extend this system
instead of inventing a second one beside it. Every time someone re-derives a
pattern that already exists, the codebase grows a second way of doing the same
thing, and the two drift.

None of this is settled. If you find a better pattern, change it _and_ change the
docs, and say what it replaces.
