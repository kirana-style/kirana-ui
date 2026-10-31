import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
    padding: space[3],
  }),
  inputGroupButton: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  inputGroupButton2: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  dropdownMenu: css({
    width: { "*": null, base: space[48] },
  }),
  span: css({
    color: theme.mutedForeground,
  }),
  dropdownMenu2: css({
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

export default function PromptInputDemo() {
  const [text, setText] = React.useState("")
  const [files, setFiles] = React.useState<AttachmentFile[]>([])
  const [model, setModel] = React.useState(models[0].id)
  const [effort, setEffort] = React.useState(efforts[1].id)
  const formRef = React.useRef<HTMLFormElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const currentModel = models.find((item) => item.id === model) ?? models[0]
  const currentEffort = efforts.find((item) => item.id === effort) ?? efforts[1]
  const canSend = text.trim().length > 0

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSend) {
      return
    }

    setText("")
    setFiles([])
  }

  function onAttach(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files
    if (!selected) {
      return
    }

    setFiles((current) => [
      ...current,
      ...Array.from(selected, (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
      })),
    ])
    event.target.value = ""
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <form ref={formRef} onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="file"
            multiple
            sx={styles.input}
            tabIndex={-1}
            onChange={onAttach}
          />
          <InputGroup>
            {files.length > 0 && (
              <InputGroupAddon align="block-start" sx={styles.inputGroupAddon}>
                {files.map((file) => (
                  <Attachment key={file.id} size="sm">
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
                        onPress={() =>
                          setFiles((current) =>
                            current.filter((item) => item.id !== file.id)
                          )
                        }
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
                ))}
              </InputGroupAddon>
            )}
            <InputGroupTextarea
              value={text}
              onChange={(event) => {
                setText(
                  typeof event === "string" ? event : event.currentTarget.value
                )
              }}
              placeholder="Ask the agent to change your code..."
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  formRef.current?.requestSubmit()
                }
              }}
              sx={styles.inputGroupTextarea}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                size="icon-sm"
                variant="outline"
                sx={styles.inputGroupButton}
                aria-label="Attach files"
                onPress={() => inputRef.current?.click()}
              >
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </InputGroupButton>
              <DropdownMenuTrigger>
                <InputGroupButton
                  size="sm"
                  variant="outline"
                  aria-label={`Model: ${currentModel.name}`}
                  sx={styles.inputGroupButton2}
                >
                  {currentModel.name}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </InputGroupButton>
                <DropdownMenu
                  sx={styles.dropdownMenu}
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={[model]}
                  onSelectionChange={(keys) =>
                    setModel([...(keys as Set<string>)][0] as string)
                  }
                >
                  {providers.map((provider, index) => (
                    <React.Fragment key={provider.name}>
                      {index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>{provider.name}</DropdownMenuLabel>
                        {provider.models.map((item) => (
                          <DropdownMenuItem key={item.id} id={item.id}>
                            {item.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </React.Fragment>
                  ))}
                </DropdownMenu>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger>
                <InputGroupButton
                  size="sm"
                  variant="outline"
                  aria-label={`Effort: ${currentEffort.name}`}
                >
                  <span sx={styles.span}>Effort</span>
                  {currentEffort.name}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </InputGroupButton>
                <DropdownMenu
                  sx={styles.dropdownMenu2}
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={[effort]}
                  onSelectionChange={(keys) =>
                    setEffort([...(keys as Set<string>)][0] as string)
                  }
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Effort</DropdownMenuLabel>
                    {efforts.map((item) => (
                      <DropdownMenuItem key={item.id} id={item.id}>
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenu>
              </DropdownMenuTrigger>
              <InputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                sx={styles.inputGroupButton3}
                isDisabled={!canSend}
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
