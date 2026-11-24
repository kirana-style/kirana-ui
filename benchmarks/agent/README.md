# The agent bridge, measured

One task on one screen, done by the same model three ways: with a browser tool free to chain its
commands, with a browser tool that takes one action per call, and with the agent bridge's three
tools. It answers one question: what does the bridge cost or save an agent, against driving the
page from outside?

## The result (2026-11-24)

Medians of three runs each. Every run did the task (`check.ts`).

| How the agent reached the page                    | Tool calls | Tokens | Time    |
| ------------------------------------------------- | ---------- | ------ | ------- |
| Playwright's command-line tool, one action a call | 22         | 65,347 | 118.0 s |
| Playwright's command-line tool, free to chain     | 5          | 60,609 | 43.1 s  |
| The agent bridge (`snapshot`, `act`, `query`)     | 6          | 59,871 | 33.4 s  |

Read plainly:

- Against a browser tool that takes **one action per call**, which is how a browser's tools reach
  most agents today, the bridge needed 73 % fewer tool calls and 72 % less time. Tokens were 8 %
  fewer.
- Against the same tool **free to chain** several commands in one shell call, the bridge was 22 %
  faster and used the same tokens (1 % fewer), with one more tool call: the bridge runs took a
  second snapshot to check their work.
- **The bridge is not a large saving in tokens on a screen this small.** Each total includes the
  agent's own fixed context (its instructions and tool definitions), which is the same for every
  run and is most of the number; the part that differs is small either way.
- **One thing the bridge could not do:** the task ends when the page says "Saved.", and the bridge
  reads controls, not the page's text, so two of its three runs said they could not confirm it.
  They had saved correctly.

Every run is in `results.json`.

## How it was run

| What          | How                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| The screen    | `/preview/react/kirana/agent-bridge-form` of the built site: eight controls on the Kirana UI base, and a Save   |
| The task      | `task.md`: nine changes, the same words for every run                                                           |
| The model     | Claude Sonnet 5.5, each run a fresh Claude Code subagent given one prompt (`prompts/`)                          |
| The browser   | One Playwright session per run, opened on the screen before the run (`npx @playwright/cli -s=<session> open …`) |
| Browser tools | Playwright's command-line tool, its `eval` and `run-code` commands not allowed                                  |
| The bridge    | `bridge.ts`: the page's `window.agent` reached through the same session, so both pay the same cost per call     |
| Measured      | What the runner reported for each run: tool calls, total tokens, wall time                                      |
| Checked       | `check.ts` reads what the form saved and compares it with the task                                              |

## What this does not show

- **Three runs each, one model, one screen, one machine.** No confidence interval. The runs were
  started together, so the times share the machine's load.
- **No cost in money:** the runner reports total tokens, not input and output apart.
- **Tool calls include one that reads the prompt file**, in every run.
- **A screen of eight controls.** A longer form, a list of hundreds of rows or a page with popups to
  open may move these numbers either way; that is not measured here.
- **Not another library's numbers.** Other benchmarks of this kind compare different pages, tools
  and models; these are not comparable with them.

## Run it again

```sh
vp run build                     # the site, with the React previews
bun <a static server> apps/site/dist/client        # any server for that folder
npx @playwright/cli -s=run1 open http://localhost:<port>/preview/react/kirana/agent-bridge-form
# give an agent one of prompts/*.md, with <session> and the folders filled in
bun benchmarks/agent/check.ts run1
```
