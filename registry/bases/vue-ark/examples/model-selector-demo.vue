<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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

const text = ref("")
const model = ref(models[0].id)
const effort = ref(efforts[1].id)
const form = useTemplateRef<HTMLFormElement>("form")
const currentModel = computed(
  () => models.find((item) => item.id === model.value) ?? models[0]
)
const currentEffort = computed(
  () => efforts.find((item) => item.id === effort.value) ?? efforts[1]
)
const canSend = computed(() => text.value.trim().length > 0)

function onSubmit(event: Event) {
  event.preventDefault()
  if (!canSend.value) {
    return
  }

  text.value = ""
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    form.value?.requestSubmit()
  }
}
</script>
<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <form ref="form" @submit="onSubmit">
        <InputGroup>
          <InputGroupTextarea
            v-model="text"
            placeholder="Ask the agent to change your code..."
            @keydown="onKeydown"
            :sx="styles.inputGroupTextarea"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="outline"
              :sx="styles.inputGroupButton"
              :disabled="canSend"
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
              <DropdownMenuTrigger as-child>
                <InputGroupButton
                  size="sm"
                  variant="outline"
                  :aria-label="`Model: ${currentModel.name}`"
                  :sx="styles.inputGroupButton2"
                >
                  {{ currentModel.name }}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                :sx="styles.dropdownMenuContent"
              >
                <DropdownMenuRadioGroup v-model="model">
                  <template
                    v-for="(provider, index) in providers"
                    :key="provider.name"
                  >
                    <DropdownMenuSeparator v-if="index > 0" />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        {{ provider.name }}
                      </DropdownMenuLabel>
                      <DropdownMenuRadioItem
                        v-for="item in provider.models"
                        :key="item.id"
                        :value="item.id"
                        close-on-select
                      >
                        {{ item.name }}
                      </DropdownMenuRadioItem>
                    </DropdownMenuGroup>
                  </template>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <InputGroupButton
                  size="sm"
                  variant="outline"
                  :aria-label="`Effort: ${currentEffort.name}`"
                >
                  <span :sx="styles.span"> Effort </span>
                  {{ currentEffort.name }}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                :sx="styles.dropdownMenuContent2"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel> Effort </DropdownMenuLabel>
                  <DropdownMenuRadioGroup v-model="effort">
                    <DropdownMenuRadioItem
                      v-for="item in efforts"
                      :key="item.id"
                      :value="item.id"
                      close-on-select
                    >
                      {{ item.name }}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              :sx="styles.inputGroupButton3"
              :disabled="!canSend"
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
</template>
