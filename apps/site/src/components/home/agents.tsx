/**
 * The home page's "for agents" chapter, under the hero: what an agent does with kirana/ui, a
 * picture card per verb, in the Kirana site's own language of cards. Build shows the command an
 * agent runs and what the compiler really answers (`kirana-style check --format json`, for a
 * width written without its unit); Drive shows a step of the agent bridge reaching the control it
 * names; Compose, which is being built, is drawn dashed. Every command and call in a drawing is on
 * the docs page its card links to.
 */
import { css } from "@kirana-style/core"
import {
  ChartAreaIcon,
  CommandLineIcon,
  CubeIcon,
  DashboardSquare01Icon,
  RoboticIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons"

import { IllustratedCard } from "@/components/page/illustrated-card"
import { PageSection } from "@/components/page/page"
import {
  At,
  Caret,
  Line,
  Pill,
  Row,
  Scene,
  T,
  Tile,
  Window,
} from "@/components/scenery/kit"
import { breakpoint, space } from "@workspace/registry/core/scales"

const styles = {
  grid: css({
    display: "grid",
    gap: space[4],
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.xl]: "repeat(3, minmax(0, 1fr))",
    },
  }),
  // A drawing wider than its card is shrunk to it, layout and all: on a phone, and where three
  // stand in a row.
  fit: css({
    zoom: { base: 0.8, [breakpoint.sm]: 1, [breakpoint.xl]: 0.94 },
  }),
}

/** A coding agent's check, and what the compiler answers it: a code, what is wrong, the fix. */
function BuildArt() {
  return (
    <div sx={styles.fit}>
      <Window title="~/app" icon={CommandLineIcon} width={344} glow>
        <Row typed={0}>
          <T tone="prompt">$</T>
          <T tone="strong">kirana-style check src --format json</T>
        </Row>
        <Row typed={1}>
          <T tone="muted">{"[{"}</T>
        </Row>
        <Row typed={2}>
          <T tone="prompt">{'  "code":'}</T>
          <T>{'"KRN1203",'}</T>
        </Row>
        <Row typed={3}>
          <T tone="prompt">{'  "name":'}</T>
          <T>{'"unitless-length",'}</T>
        </Row>
        <Row typed={4}>
          <T tone="prompt">{'  "help":'}</T>
          <T tone="success">{'["write the unit, for example \\"5px\\""]'}</T>
        </Row>
        <Row typed={5}>
          <T tone="muted">{"}]"}</T>
          <Caret />
        </Row>
      </Window>
    </div>
  )
}

/** A step of the bridge, and the control it names turning on. */
function DriveArt() {
  const wire = "M 62 86 C 100 86, 112 70, 150 70"
  return (
    <div sx={styles.fit}>
      <Scene width={330} height={170} live={[wire]}>
        <At x={11} y={50}>
          <Tile icon={RoboticIcon} primary size={46} caption="agent.act()" />
        </At>
        <At x={72} y={50}>
          <Window title="Settings" width={180}>
            <Row field lit>
              <T tone="strong">Alerts</T>
              <Pill active>on</Pill>
            </Row>
            <Row field>
              <T>Region</T>
              <Pill>Singapore</Pill>
            </Row>
            <Row field>
              <T>Project name</T>
              <Pill>Atlas</Pill>
            </Row>
            <Row field>
              <T tone="muted">Password</T>
              <Pill>redacted</Pill>
            </Row>
          </Window>
        </At>
      </Scene>
    </div>
  )
}

/** The registry's components going into a surface that is not built yet. */
function ComposeArt() {
  const ys = [34, 85, 136]
  const wires = ys.map((y) => `M 60 ${y} C 110 ${y}, 120 85, 168 85`)
  return (
    <div sx={styles.fit}>
      <Scene width={330} height={170} wires={wires}>
        <At x={11} y={20}>
          <Tile icon={DashboardSquare01Icon} size={38} />
        </At>
        <At x={11} y={50}>
          <Tile icon={CubeIcon} size={38} />
        </At>
        <At x={11} y={80}>
          <Tile icon={ChartAreaIcon} size={38} />
        </At>
        <At x={74} y={50}>
          <Window title="surface" icon={SourceCodeIcon} width={160} dashed>
            <Row>
              <Line width="62%" />
            </Row>
            <Row>
              <Line width="88%" />
            </Row>
            <Row>
              <Line width="40%" />
            </Row>
            <Row field>
              <Line width="30%" />
              <Pill>Confirm</Pill>
            </Row>
          </Window>
        </At>
      </Scene>
    </div>
  )
}

export function Agents() {
  return (
    <PageSection
      id="agents"
      label="For agents"
      title="Three things an agent does with it"
      lede="An agent adds the components, uses the page they make, and answers with them. Two of the three are released."
    >
      <div sx={styles.grid}>
        <IllustratedCard
          row
          art={<BuildArt />}
          title="Build"
          note="3 skills"
          text="Skills teach a coding agent the commands and the rules. A wrong value does not ship: the compiler answers with a code, the line and the fix, as JSON the agent reads."
          links={[
            { title: "Agent skills", href: "/docs/agent-skills" },
            { title: "The commands", href: "/docs/cli" },
          ]}
        />
        <IllustratedCard
          row
          art={<DriveArt />}
          title="Drive"
          note="no screenshots"
          text="The agent bridge reads each control by its role and asks it to act. Your policy decides what it may do, a person answers where you ask for one, and a secret is never read back."
          links={[{ title: "The agent bridge", href: "/docs/ai/agent-bridge" }]}
        />
        <IllustratedCard
          row
          art={<ComposeArt />}
          title="Compose"
          note="being built"
          text="An agent answers with an interface made of the components your project already has, never with generated code. It is built on the registry that serves every component today."
          links={[{ title: "Where it stands", href: "/docs/ai/generative-ui" }]}
        />
      </div>
    </PageSection>
  )
}
