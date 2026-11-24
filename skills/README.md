# Agent skills

The skills people install with [`npx skills add kirana-style/kirana-ui`](https://github.com/vercel-labs/skills),
a folder each: `SKILL.md` (the rules and the workflow) and `references/` (what the agent reads
when it needs it). The site's [Agent skills](https://ui.kirana.style/docs/agent-skills) page says
what each teaches.

| Skill                  | Written                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `kirana-ui`            | here: the registry's components in a project                                              |
| `kirana-ui-agent`      | here: the agent bridge                                                                    |
| `kirana-ui-primitives` | copied from the installed `@kirana-ui/core` by `bun scripts/skills.ts`; never edited here |

`bun scripts/skills.ts` copies the primitives' skill and checks every skill (its `name` is its
folder's, its `description` at most 1024 characters, every `references/` file it names exists);
`vp run test` runs the same check. Move a fact here in the same change as the code it describes:
a command, a pitfall's fix, a base's spelling.
