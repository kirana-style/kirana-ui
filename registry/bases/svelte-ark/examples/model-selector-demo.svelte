<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
  } from "../ui/input-group"
  import { css } from "@kirana-style/core"
  import { radius, theme } from "../../../core/tokens"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      marginInline: "auto",
      width: "100%",
      maxWidth: containerSize.lg,
      paddingBlock: space[6],
    }),
    inputGroupTextarea: css({
      // `p-3`, block sides logical: InputGroupTextarea sets `padding-block`, which a physical side
      // would not replace.
      paddingBlock: space[3],
      paddingInline: space[3],
    }),
    inputGroupButton: css({
      borderRadius: { "*": null, base: radius.full },
    }),
    inputGroupButton2: css({
      marginLeft: { "*": null, base: "auto" },
    }),
    dropdownMenuContent: css({
      width: { "*": null, base: space[48] },
    }),
    span: css({
      color: theme.mutedForeground,
    }),
    dropdownMenuContent2: css({
      width: { "*": null, base: space[36] },
    }),
    inputGroupButton3: css({
      borderRadius: { "*": null, base: radius.full },
    }),
  }

  const providers = [
    {
      name: "OpenAI",
      models: [
        { id: "gpt-5", name: "GPT-5" },
        { id: "gpt-5-mini", name: "GPT-5 mini" },
      ],
    },
    {
      name: "Anthropic",
      models: [
        { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
        { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
      ],
    },
  ]

  const models = providers.flatMap((provider) => provider.models)

  const efforts = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ]

  let text = $state("")
  let model = $state(models[0].id)
  let effort = $state(efforts[1].id)
  let form = $state<HTMLFormElement>()
  const currentModel = $derived.by(
    () => models.find((item) => item.id === model) ?? models[0]
  )
  const currentEffort = $derived.by(
    () => efforts.find((item) => item.id === effort) ?? efforts[1]
  )
  const canSend = $derived.by(() => text.trim().length > 0)

  function onSubmit(event: Event) {
    event.preventDefault()
    if (!canSend) {
      return
    }

    text = ""
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form?.requestSubmit()
    }
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <form bind:this={form} onsubmit={onSubmit}>
      <InputGroup>
        <InputGroupTextarea bind:value={text} placeholder="Ask the agent to change your code..." onkeydown={onKeydown} sx={styles.inputGroupTextarea} />
        <InputGroupAddon align="block-end">
          <InputGroupButton type="submit" size="icon-sm" variant="outline" sx={styles.inputGroupButton} disabled={canSend} aria-label="Attach">
            <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="PlusSignIcon" phosphor="PlusIcon" remixicon="RiAddLine" />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {#snippet asChild(props)}
                <InputGroupButton {...props()} class={props().class} style={props().style} size="sm" variant="outline" aria-label={`Model: ${currentModel.name}`} sx={styles.inputGroupButton2}>
                  {currentModel.name}
                  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
                </InputGroupButton>
              {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sx={styles.dropdownMenuContent}>
              <DropdownMenuRadioGroup value={model} onValueChange={(details: { value: typeof model }) => (model = details.value)}>
                {#each providers as provider, index (provider.name)}
                  {#if index > 0}
                    <DropdownMenuSeparator />
                  {/if}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      {provider.name}
                    </DropdownMenuLabel>
                    {#each provider.models as item (item.id)}
                      <DropdownMenuRadioItem value={item.id} closeOnSelect>
                        {item.name}
                      </DropdownMenuRadioItem>
                    {/each}
                  </DropdownMenuGroup>
                {/each}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {#snippet asChild(props)}
                <InputGroupButton {...props()} size="sm" variant="outline" aria-label={`Effort: ${currentEffort.name}`}>
                  <span sx={styles.span}>
                    Effort
                  </span>
                  {currentEffort.name}
                  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
                </InputGroupButton>
              {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sx={styles.dropdownMenuContent2}>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  Effort
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={effort} onValueChange={(details: { value: typeof effort }) => (effort = details.value)}>
                  {#each efforts as item (item.id)}
                    <DropdownMenuRadioItem value={item.id} closeOnSelect>
                      {item.name}
                    </DropdownMenuRadioItem>
                  {/each}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupButton type="submit" size="icon-sm" variant="default" sx={styles.inputGroupButton3} disabled={!canSend} aria-label="Send">
            <IconPlaceholder lucide="ArrowUpIcon" tabler="IconArrowUp" hugeicons="ArrowUp02Icon" phosphor="ArrowUpIcon" remixicon="RiArrowUpLine" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  </div>
</div>
