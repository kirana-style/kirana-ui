import { For, Show, createMemo, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment"
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

export default function PromptInputDemo() {
  const styles = {
    div: css({
      marginInline: "auto",
      width: "100%",
      maxWidth: containerSize.lg,
      paddingBlock: space[6],
    }),
    input: css({
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
    inputGroupAddon: css({
      flexWrap: { "*": null, base: "wrap" },
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

  type AttachmentFile = {
    id: string
    name: string
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
  const [files, setFiles] = createSignal<AttachmentFile[]>([])
  const [model, setModel] = createSignal(models[0].id)
  const [effort, setEffort] = createSignal(efforts[1].id)
  const [form, setForm] = createSignal<HTMLFormElement>()
  const [input, setInput] = createSignal<HTMLInputElement>()
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
    setFiles([])
  }

  function onAttach(event: Event) {
    const target = event.target as HTMLInputElement
    const selected = target.files
    if (!selected) {
      return
    }

    setFiles([
      ...files(),
      ...Array.from(selected, (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
      })),
    ])
    target.value = ""
  }

  function remove(id: string) {
    setFiles(files().filter((item) => item.id !== id))
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
          <input
            ref={setInput}
            type="file"
            multiple
            sx={styles.input}
            tabindex={-1}
            onChange={onAttach}
          />
          <InputGroup>
            <Show when={files().length > 0}>
              <InputGroupAddon align="block-start" sx={styles.inputGroupAddon}>
                <For each={files()}>
                  {(file) => (
                    <Attachment size="sm">
                      <AttachmentMedia>
                        <IconPlaceholder
                          lucide="FileTextIcon"
                          tabler="IconFileText"
                          hugeicons="FileIcon"
                          phosphor="FileTextIcon"
                          remixicon="RiFileTextLine"
                        />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>{file.name}</AttachmentTitle>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction
                          aria-label={`Remove ${file.name}`}
                          onClick={() => {
                            remove(file.id)
                          }}
                        >
                          <IconPlaceholder
                            lucide="XIcon"
                            tabler="IconX"
                            hugeicons="Cancel01Icon"
                            phosphor="XIcon"
                            remixicon="RiCloseLine"
                          />
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                  )}
                </For>
              </InputGroupAddon>
            </Show>
            <InputGroupTextarea
              value={text()}
              placeholder="Ask the agent to change your code..."
              onKeyDown={onKeydown}
              sx={styles.inputGroupTextarea}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                size="icon-sm"
                variant="outline"
                sx={styles.inputGroupButton}
                aria-label="Attach files"
                onClick={() => {
                  input()?.click()
                }}
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
