<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { Badge } from "../../ui/badge"
  import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
  import { Trace, TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
  import { css } from "@kirana-style/core"
  import { fontFamily, space } from "../../../../core/scales"
  import Step from "./Step.svelte"
  import type { Status, StepPart } from "./types"

  let { part, streaming }: {
    part: StepPart
    streaming: boolean
  } = $props()

  const styles = {
    stepRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
    stepRowCodeBlockContent2: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowDiv: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space["1.5"],
    }),
    stepRowBadge: css({
      fontFamily: { "*": null, base: fontFamily.mono },
    }),
  }

  const status = $derived.by<Status>(() => part.state === "output-available"
      ? undefined
      : part.state === "output-error" || !streaming
        ? "error"
        : "running"
  )
  const verb = (running: string, done: string, failed: string) =>
    status === "running"
      ? running
      : status === "error"
        ? failed
        : done
  const content = $derived.by(
    () => part.state === "output-error" || part.state === "output-available"
  )
</script>

{#if part.type === 'tool-searchWeb'}
  <Step status={status} content={content} title={`${verb('Searching', 'Searched', 'Failed to search')} the web for ${part.input?.query}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <Trace>
        {#each part.output.results as result (result.url)}
          <a href={result.url} target="_blank" rel="noreferrer">
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
              </TraceIcon>
              <TraceTitle>
                {result.title}
                <span sx={styles.stepRowSpan}>
                  (opens in a new tab)
                </span>
              </TraceTitle>
              <TraceIcon>
                <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" />
              </TraceIcon>
            </TraceLine>
          </a>
        {/each}
      </Trace>
    {/if}
  </Step>
{:else if part.type === 'tool-readBuildLog'}
  <Step status={status} content={content} defaultOpen title={`${verb('Reading', 'Read', 'Failed to read')} the build log for ${part.input?.deployment}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent2}>{part.output.log}</CodeBlockContent>
      </CodeBlock>
    {/if}
  </Step>
{:else}
  <Step status={status} content={content} title={`${verb('Searching', 'Searched', 'Failed to search')} the code for ${part.input?.query}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <div sx={styles.stepRowDiv}>
        {#each part.output.files as file (file)}
          <Badge variant="secondary" sx={styles.stepRowBadge}>
            {file}
          </Badge>
        {/each}
      </div>
    {/if}
  </Step>
{/if}
