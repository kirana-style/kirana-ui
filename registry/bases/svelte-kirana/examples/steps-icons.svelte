<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import {
    Steps,
    StepsContent,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsTitle,
    StepsTrigger,
  } from "../ui/steps"
  import { containerSize } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    steps: css({ maxWidth: containerSize.md }),
    muted: css({ color: theme.mutedForeground }),
  }

  const STEPS = [
    { title: "Account", content: "Sign in, or create an account." },
    { title: "Payment", content: "Add a card to pay with." },
    { title: "Confirmation", content: "We send a receipt to your email." },
  ]
</script>

<div sx={page.example}>
  <Steps defaultStep={1} sx={styles.steps}>
    <StepsList aria-label="Purchase">
      {#each STEPS as each, index (each.title)}
        <StepsItem {index}>
          <StepsTrigger>
            <StepsIndicator>
              {#if index === 0}
                <IconPlaceholder lucide="UserIcon" tabler="IconUser" hugeicons="UserIcon" phosphor="UserIcon" remixicon="RiUserLine" />
              {:else if index === 1}
                <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
              {:else}
                <IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="Mail01Icon" phosphor="EnvelopeIcon" remixicon="RiMailLine" />
              {/if}
            </StepsIndicator>
            <StepsTitle>{each.title}</StepsTitle>
          </StepsTrigger>
        </StepsItem>
      {/each}
    </StepsList>
    {#each STEPS as each, index (each.title)}
      <StepsContent {index} sx={styles.muted}>
        {each.content}
      </StepsContent>
    {/each}
  </Steps>
</div>
