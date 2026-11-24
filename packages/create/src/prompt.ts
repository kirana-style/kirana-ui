/**
 * The prompt a reader pastes into a coding agent to start a project: Copy Prompt's text. It is the
 * same one command Get Code gives (`projectSteps`), with what an agent needs around it: where to
 * work, the skills to install and read, the line to leave in `AGENTS.md`, a first component, the
 * checks, and to stop and ask where a step fails instead of working around it. Every command is
 * written for the runner the reader chose.
 */
import type { DesignSystem } from "@workspace/registry/core/config"

import {
  BASE_LABELS,
  FRAMEWORK_LABELS,
  PROJECT,
  REGISTRY,
  SITE,
  TEMPLATE_LABELS,
  WORKSPACE,
} from "./catalog.ts"
import type { Runner } from "./catalog.ts"
import type { ProjectChoices } from "./choices.ts"
import { commandLines, projectSteps } from "./commands.ts"

/**
 * The skills an agent installs, each by its name (an agent's own guard may refuse "every skill of
 * a repository"): Kirana UI's, and Kirana's for the styles its components are written in.
 */
export const SKILLS = [
  { source: "kirana-style/kirana-ui", skill: "kirana-ui" },
  { source: "kirana-style/kirana", skill: "kirana" },
]

/** What the agent leaves in the project's `AGENTS.md`, for the sessions after this one. */
export const AGENTS_NOTE =
  "This project uses Kirana UI. Read the kirana-ui skill before writing any interface. Add a component with `kirana-style ui add <item>`, never by pasting its code. Styles are css() handles passed as sx, never className."

const indent = (lines: readonly string[]) =>
  lines.map((line) => `   ${line}`).join("\n")

export function agentPrompt(
  choices: ProjectChoices,
  design: DesignSystem,
  runner: Runner,
  registry = REGISTRY,
  site = SITE
): string {
  const lines = (steps: Parameters<typeof commandLines>[0]) =>
    commandLines(steps, runner)
  // A preset's code carries its framework and base, and `init` follows the code: the design is
  // the choices' own, whatever page it came from.
  const chosen = { ...design, framework: choices.framework, base: choices.base }
  const workspace = choices.monorepo !== "none"
  const app = workspace
    ? `${PROJECT.directory}/apps/${PROJECT.app}`
    : PROJECT.directory
  return [
    `Set up Kirana UI for me: ${FRAMEWORK_LABELS[choices.framework]} on ${TEMPLATE_LABELS[choices.template]}, with ${BASE_LABELS[choices.base]} as its headless library.`,
    "",
    "1. Work in an empty folder. If this folder already holds a project, stop and ask me before you change it.",
    "",
    `2. Create the project. This one command fetches the template, installs it and sets up the design system in \`${PROJECT.directory}\`:`,
    "",
    indent(lines(projectSteps(choices, chosen, registry))),
    "",
    `3. In \`${PROJECT.directory}\`, install the agent skills, then read the \`kirana-ui\` skill before you write any interface:`,
    "",
    indent([
      `cd ${PROJECT.directory}`,
      ...lines(
        SKILLS.map(({ source, skill }) => ({
          run: `skills add ${source} --skill ${skill} --yes`,
        }))
      ),
    ]),
    "",
    `   Then check that \`.agents/skills/kirana-ui/SKILL.md\` exists: the installer can skip a skill and still say it is done. If it is missing, stop and tell me.`,
    "",
    `4. Add this line to \`AGENTS.md\` there (create the file if it is missing):`,
    "",
    indent([AGENTS_NOTE]),
    "",
    workspace
      ? `5. Add a first component from the app (\`${app}\`; it installs into \`${WORKSPACE.uiPath}\`) and use it on the home page:`
      : "5. Add a first component and use it on the home page:",
    "",
    indent(lines([{ exec: "kirana-style ui add button" }])),
    "",
    "6. Run the project's `lint`, `typecheck` and `build` scripts from its package.json. All of them must pass.",
    "",
    "7. If a step fails (an install that is blocked, a network error, a diagnostic you cannot fix), stop and show me its output. Do not work around it, and do not change a version to get past it.",
    "",
    "When it builds, tell me how to start the dev server and what you added.",
    "",
    `Docs written for agents: ${site}/llms.txt`,
  ].join("\n")
}
