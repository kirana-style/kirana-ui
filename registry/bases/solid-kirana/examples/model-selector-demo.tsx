import { For, Show, createMemo, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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

export default function ModelSelectorDemo() {
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

  const [text, setText] = createSignal("")
  const [model, setModel] = createSignal(models[0].id)
  const [effort, setEffort] = createSignal(efforts[1].id)
  const [form, setForm] = createSignal<HTMLFormElement>()
  const currentModel = createMemo(
    () => models.find((item) => item.id === model()) ?? models[0]
  )
  const currentEffort = createMemo(
    () => efforts.find((item) => item.id === effort()) ?? efforts[1]
  )
  const canSend = createMemo(() => text().trim().length > 0)

  function onSubmit(event: Event) {
    event.preventDefault()
    if (!canSend()) {
      return
    }

    setText("")
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form()?.requestSubmit()
    }
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <form ref={setForm} onSubmit={onSubmit}>
          <InputGroup>
            <InputGroupTextarea
              value={text()}
              placeholder="Ask the agent to change your code..."
              onKeyDown={onKeydown}
              sx={styles.inputGroupTextarea}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                type="submit"
                size="icon-sm"
                variant="outline"
                sx={styles.inputGroupButton}
                disabled={canSend()}
                aria-label="Attach"
              >
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </InputGroupButton>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <InputGroupButton
                      {...props()}
                      size="sm"
                      variant="outline"
                      aria-label={`Model: ${currentModel().name}`}
                      sx={styles.inputGroupButton2}
                    >
                      {currentModel().name}{" "}
                      <IconPlaceholder
                        lucide="ChevronDownIcon"
                        tabler="IconChevronDown"
                        hugeicons="ArrowDown01Icon"
                        phosphor="CaretDownIcon"
                        remixicon="RiArrowDownSLine"
                      />
                    </InputGroupButton>
                  )}
                />
                <DropdownMenuContent
                  align="start"
                  sx={styles.dropdownMenuContent}
                >
                  <DropdownMenuRadioGroup
                    value={model()}
                    onValueChange={(details: {
                      value: ReturnType<typeof model>
                    }) => setModel(details.value)}
                  >
                    <For each={providers}>
                      {(provider, index) => (
                        <>
                          <Show when={index() > 0}>
                            <DropdownMenuSeparator />
                          </Show>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>
                              {provider.name}
                            </DropdownMenuLabel>
                            <For each={provider.models}>
                              {(item) => (
                                <DropdownMenuRadioItem
                                  value={item.id}
                                  closeOnSelect
                                >
                                  {item.name}
                                </DropdownMenuRadioItem>
                              )}
                            </For>
                          </DropdownMenuGroup>
                        </>
                      )}
                    </For>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <InputGroupButton
                      {...props()}
                      size="sm"
                      variant="outline"
                      aria-label={`Effort: ${currentEffort().name}`}
                    >
                      <span sx={styles.span}>Effort</span>{" "}
                      {currentEffort().name}{" "}
                      <IconPlaceholder
                        lucide="ChevronDownIcon"
                        tabler="IconChevronDown"
                        hugeicons="ArrowDown01Icon"
                        phosphor="CaretDownIcon"
                        remixicon="RiArrowDownSLine"
                      />
                    </InputGroupButton>
                  )}
                />
                <DropdownMenuContent
                  align="start"
                  sx={styles.dropdownMenuContent2}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Effort</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={effort()}
                      onValueChange={(details: {
                        value: ReturnType<typeof effort>
                      }) => setEffort(details.value)}
                    >
                      <For each={efforts}>
                        {(item) => (
                          <DropdownMenuRadioItem value={item.id} closeOnSelect>
                            {item.name}
                          </DropdownMenuRadioItem>
                        )}
                      </For>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <InputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                sx={styles.inputGroupButton3}
                disabled={!canSend()}
                aria-label="Send"
              >
                <IconPlaceholder
                  lucide="ArrowUpIcon"
                  tabler="IconArrowUp"
                  hugeicons="ArrowUp02Icon"
                  phosphor="ArrowUpIcon"
                  remixicon="RiArrowUpLine"
                />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  )
}
