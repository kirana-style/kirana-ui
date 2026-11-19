import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "model-selector-demo",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <form #form (submit)="onSubmit($event)">
          <div kuiInputGroup>
            <textarea
              kuiInputGroupTextarea
              [value]="text()"
              (input)="onInput($event)"
              placeholder="Ask the agent to change your code..."
              (keydown)="onKeydown($event, form)"
              [sx]="styles.inputGroupTextarea"
            ></textarea>
            <div kuiInputGroupAddon align="block-end">
              <button
                kuiInputGroupButton
                type="submit"
                size="icon-sm"
                variant="outline"
                [sx]="styles.inputGroupButton"
                [disabled]="canSend()"
                aria-label="Attach"
              >
                <svg
                  iconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                ></svg>
              </button>
              <ng-container kuiDropdownMenu>
                <button
                  kuiInputGroupButton
                  kuiDropdownMenuTrigger
                  size="sm"
                  variant="outline"
                  [attr.aria-label]="\`Model: \${currentModel().name}\`"
                  [sx]="styles.inputGroupButton2"
                >
                  {{ currentModel().name }}
                  <svg
                    iconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  ></svg>
                </button>
                <div
                  kuiDropdownMenuContent
                  align="start"
                  [sx]="styles.dropdownMenuContent"
                >
                  <div kuiDropdownMenuRadioGroup [(value)]="model">
                    @for (
                      provider of providers;
                      track provider.name;
                      let index = $index
                    ) {
                      @if (index > 0) {
                        <div kuiDropdownMenuSeparator></div>
                      }
                      <div kuiDropdownMenuGroup>
                        <div kuiDropdownMenuLabel>{{ provider.name }}</div>
                        @for (item of provider.models; track item.id) {
                          <div
                            kuiDropdownMenuRadioItem
                            [value]="item.id"
                            closeOnClick
                          >
                            {{ item.name }}
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              </ng-container>
              <ng-container kuiDropdownMenu>
                <button
                  kuiInputGroupButton
                  kuiDropdownMenuTrigger
                  size="sm"
                  variant="outline"
                  [attr.aria-label]="\`Effort: \${currentEffort().name}\`"
                >
                  <span [sx]="styles.span">Effort</span>
                  {{ currentEffort().name }}
                  <svg
                    iconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  ></svg>
                </button>
                <div
                  kuiDropdownMenuContent
                  align="start"
                  [sx]="styles.dropdownMenuContent2"
                >
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>Effort</div>
                    <div kuiDropdownMenuRadioGroup [(value)]="effort">
                      @for (item of efforts; track item.id) {
                        <div
                          kuiDropdownMenuRadioItem
                          [value]="item.id"
                          closeOnClick
                        >
                          {{ item.name }}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </ng-container>
              <button
                kuiInputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                [sx]="styles.inputGroupButton3"
                [disabled]="!canSend()"
                aria-label="Send"
              >
                <svg
                  iconPlaceholder
                  lucide="ArrowUpIcon"
                  tabler="IconArrowUp"
                  hugeicons="ArrowUp02Icon"
                  phosphor="ArrowUpIcon"
                  remixicon="RiArrowUpLine"
                ></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export default class ModelSelectorDemo {
  protected readonly text = signal("")
  protected readonly model = signal(models[0].id)
  protected readonly effort = signal(efforts[1].id)
  protected readonly currentModel = computed(
    () => models.find((item) => item.id === this.model()) ?? models[0]
  )
  protected readonly currentEffort = computed(
    () => efforts.find((item) => item.id === this.effort()) ?? efforts[1]
  )
  protected readonly canSend = computed(() => this.text().trim().length > 0)
  protected readonly styles = styles
  protected readonly providers = providers
  protected readonly efforts = efforts
  protected readonly page = page

  protected onSubmit(event: Event) {
    event.preventDefault()
    if (!this.canSend()) {
      return
    }

    this.text.set("")
  }

  protected onInput(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value)
  }

  protected onKeydown(event: KeyboardEvent, form: HTMLFormElement) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form.requestSubmit()
    }
  }
}
