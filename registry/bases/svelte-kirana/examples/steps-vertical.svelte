<script lang="ts">
  import { css } from "@kirana-style/core"

  import {
    Steps,
    StepsContent,
    StepsDescription,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsTitle,
    StepsTrigger,
  } from "../ui/steps"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    steps: css({ maxWidth: containerSize.lg }),
  }

  const STEPS = [
    {
      title: "Create a project",
      description: "Name it and choose a template.",
      content: "Give your project a name and pick the template it starts from.",
    },
    {
      title: "Invite your team",
      description: "Add the people you work with.",
      content: "Send an invitation to each person who should see the project.",
    },
    {
      title: "Deploy",
      description: "Put it on the web.",
      content: "Connect a domain and deploy the first version.",
    },
  ]
</script>

<div sx={page.example}>
  <Steps orientation="vertical" defaultStep={1} sx={styles.steps}>
    <StepsList aria-label="Getting started">
      {#each STEPS as each, index (each.title)}
        <StepsItem {index}>
          <StepsTrigger>
            <StepsIndicator />
            <StepsTitle>{each.title}</StepsTitle>
            <StepsDescription>{each.description}</StepsDescription>
          </StepsTrigger>
        </StepsItem>
      {/each}
    </StepsList>
    {#each STEPS as each, index (each.title)}
      <StepsContent {index}>
        {each.content}
      </StepsContent>
    {/each}
  </Steps>
</div>
