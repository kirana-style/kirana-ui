/**
 * cmdk's command menu on Angular, the registry's own as Vue's is: the items register from the
 * markup, what is typed filters them (by value and keywords, as cmdk's default filter does, without
 * its fuzzy score), groups with no match leave, the first match is highlighted (`data-selected`, as
 * cmdk writes it), the arrows (and cmdk's Ctrl+N/J and Ctrl+P/K), Home and End move the highlight,
 * and Enter or a click calls the item's `select`; nothing stays selected. The markup is cmdk's:
 * `cmdk-*` attributes, the list's sizer, a group's heading and items.
 */
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from "@angular/core"
import type { Signal } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { presence } from "../../../lib/angular/presence"
import { command } from "../../../styles/command.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { InputGroup, InputGroupAddon } from "./input-group"

let next = 0

/** An item as it registers with its command: its value, words, group and what choosing it does. */
type CommandEntry = {
  id: string
  element: HTMLElement
  value: Signal<string>
  keywords: Signal<string[]>
  group?: symbol
  disabled: Signal<boolean>
  select: () => void
}

/** A command's state, which its parts share. */
class CommandState {
  readonly listId = `kui-command-list-${next++}`
  readonly inputId = `kui-command-input-${next++}`
  readonly query = signal("")
  readonly shouldFilter = signal(true)
  readonly highlighted = signal<string | null>(null)
  readonly #entries = signal<CommandEntry[]>([])

  /** The items in the page's order. */
  readonly entries = computed(() =>
    [...this.#entries()].sort((a, b) =>
      a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1
    )
  )
  readonly shown = computed(() => {
    const query = this.query().trim().toLowerCase()
    if (!this.shouldFilter() || !query) return this.entries()
    return this.entries().filter((entry) =>
      [entry.value(), ...entry.keywords()].some((word) =>
        word.toLowerCase().includes(query)
      )
    )
  })
  readonly empty = computed(() => this.shown().length === 0)

  constructor() {
    // cmdk highlights the first match, again whenever what is typed changes.
    effect(() => {
      this.query()
      const first = this.shown().find((entry) => !entry.disabled())
      untracked(() => this.highlighted.set(first?.id ?? null))
    })
  }

  register(entry: CommandEntry) {
    this.#entries.update((all) => [...all, entry])
    return () =>
      this.#entries.update((all) => all.filter((item) => item.id !== entry.id))
  }

  visible(id: string) {
    return this.shown().some((entry) => entry.id === id)
  }

  groupVisible(group: symbol) {
    return this.shown().some((entry) => entry.group === group)
  }

  highlight(id: string | null) {
    this.highlighted.set(id)
    const entry = this.entries().find((item) => item.id === id)
    entry?.element.scrollIntoView({ block: "nearest" })
  }

  keydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.isComposing) return
    const items = this.shown().filter((entry) => !entry.disabled())
    const at = items.findIndex((entry) => entry.id === this.highlighted())
    const move = (to: number) => {
      event.preventDefault()
      const entry = items[to]
      if (entry) this.highlight(entry.id)
    }
    const key = event.key.toLowerCase()
    const down =
      key === "arrowdown" || (event.ctrlKey && (key === "n" || key === "j"))
    const up =
      key === "arrowup" || (event.ctrlKey && (key === "p" || key === "k"))
    if (down) move(at < 0 ? 0 : Math.min(at + 1, items.length - 1))
    else if (up) move(at < 0 ? 0 : Math.max(at - 1, 0))
    else if (key === "home") move(0)
    else if (key === "end") move(items.length - 1)
    else if (key === "enter") {
      event.preventDefault()
      items[at]?.select()
    }
  }
}

const COMMAND = new InjectionToken<CommandState>("kui command")
const COMMAND_GROUP = new InjectionToken<symbol>("kui command group")

/**
 * The menu: `<div kuiCommand>`, holding its input and list. `shouldFilter` false leaves the
 * filtering to the caller.
 */
@Directive({
  selector: "[kuiCommand]",
  providers: [
    provideSxPart(),
    { provide: COMMAND, useFactory: () => new CommandState() },
  ],
  host: {
    "data-slot": "command",
    "cmdk-root": "",
    tabindex: "-1",
    "[class]": "part().class",
    "[style]": "part().style",
    "(keydown)": "state.keydown($event)",
  },
})
class Command {
  readonly shouldFilter = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly part = computed(() => partSx(command.root, this.sx()))

  constructor() {
    effect(() => this.state.shouldFilter.set(this.shouldFilter()))
  }
}

/**
 * A command in a dialog: `<kui-command-dialog [(open)]>` around its input and list, as React's
 * `CommandDialog`, which holds the command's state itself. Its title and description are for
 * screen readers.
 */
@Component({
  selector: "kui-command-dialog",
  imports: [
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    SxDirective,
  ],
  providers: [{ provide: COMMAND, useFactory: () => new CommandState() }],
  host: { style: "display: contents" },
  template: `
    <ng-container
      kuiDialog
      [open]="open()"
      (openChange)="openChange.emit($event)"
    >
      <div kuiDialogHeader [sx]="hidden">
        <h2 kuiDialogTitle>{{ title() }}</h2>
        <p kuiDialogDescription>{{ description() }}</p>
      </div>
      <div
        kuiDialogContent
        [sx]="content()"
        [showCloseButton]="showCloseButton()"
        (keydown)="state.keydown($event)"
      >
        <ng-content />
      </div>
    </ng-container>
  `,
})
class CommandDialog {
  readonly open = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly openChange = output<boolean>()
  readonly title = input("Command Palette")
  readonly description = input("Search for a command to run...")
  readonly showCloseButton = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly hidden = visuallyHidden
  protected readonly content = computed(
    () => [command.dialog, this.sx()] as SxInput
  )
}

/**
 * The search field: `<div kuiCommandInput placeholder="…">`, its wrapper, holding the input in an
 * input group with its search icon. The caller's `sx` goes on the input, as React's.
 */
@Component({
  selector: "[kuiCommandInput]",
  imports: [IconPlaceholder, InputGroup, InputGroupAddon, SxDirective],
  host: {
    "data-slot": "command-input-wrapper",
    "[class]": "wrapper",
  },
  template: `
    <div kuiInputGroup [sx]="group">
      <input
        data-slot="command-input"
        cmdk-input
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        aria-autocomplete="list"
        role="combobox"
        aria-expanded="true"
        type="text"
        [id]="state.inputId"
        [attr.aria-controls]="state.listId"
        [attr.aria-activedescendant]="state.highlighted()"
        [attr.placeholder]="placeholder() ?? null"
        [value]="state.query()"
        (input)="state.query.set($any($event.target).value)"
        [sx]="inputSx()"
      />
      <div kuiInputGroupAddon>
        <svg
          iconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="SearchIcon"
          phosphor="MagnifyingGlassIcon"
          remixicon="RiSearchLine"
          [sx]="icon"
        ></svg>
      </div>
    </div>
  `,
})
class CommandInput {
  readonly placeholder = input<string>()
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly wrapper = partSx(command.inputWrapper, undefined).class
  protected readonly group = command.inputGroup
  protected readonly icon = command.inputIcon
  protected readonly inputSx = computed(
    () => [command.input, this.sx()] as SxInput
  )
}

/** The list of results: `<div kuiCommandList>`, scrolling, its items in cmdk's sizer. */
@Component({
  selector: "[kuiCommandList]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "command-list",
    "cmdk-list": "",
    role: "listbox",
    tabindex: "-1",
    "aria-label": "Suggestions",
    "[id]": "state.listId",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<div cmdk-list-sizer><ng-content /></div>`,
})
class CommandList {
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly part = computed(() => partSx(command.list, this.sx()))
}

/** What it says when nothing matches, in the page only then. */
@Directive({
  selector: "[kuiCommandEmpty]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "command-empty",
    "cmdk-empty": "",
    role: "presentation",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CommandEmpty {
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly part = computed(() => partSx(command.empty, this.sx()))

  constructor() {
    // In the page only while nothing matches, as cmdk renders it.
    presence(() => this.state.empty())
  }
}

/** A group of items under its `heading`, gone while none of them matches. */
@Component({
  selector: "[kuiCommandGroup]",
  providers: [
    provideSxPart(),
    { provide: COMMAND_GROUP, useFactory: () => Symbol("group") },
  ],
  host: {
    "data-slot": "command-group",
    "cmdk-group": "",
    role: "presentation",
    "[class]": "part().class",
    "[style]": "part().style",
    "[style.display]": "state.groupVisible(group) ? null : 'none'",
  },
  template: `
    @if (heading()) {
      <div cmdk-group-heading aria-hidden="true" [id]="headingId">
        {{ heading() }}
      </div>
    }
    <div
      cmdk-group-items
      role="group"
      [attr.aria-labelledby]="heading() ? headingId : null"
    >
      <ng-content />
    </div>
  `,
})
class CommandGroup {
  readonly heading = input<string>()
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly group = inject(COMMAND_GROUP)
  protected readonly headingId = `kui-command-group-${next++}`
  protected readonly part = computed(() => partSx(command.group, this.sx()))
}

/** A line between groups, gone while something is typed, as cmdk's. */
@Directive({
  selector: "[kuiCommandSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "command-separator",
    "cmdk-separator": "",
    role: "separator",
    "[class]": "part().class",
    "[style]": "part().style",
    "[style.display]": "state.query() ? 'none' : null",
  },
})
class CommandSeparator {
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly part = computed(() => partSx(command.separator, this.sx()))
}

/**
 * An item: `<div kuiCommandItem (select)="…">`. Its `value` is what it is matched by and known as,
 * its text when not given; `keywords` match too.
 */
@Component({
  selector: "[kuiCommandItem]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "command-item",
    "cmdk-item": "",
    role: "option",
    "[id]": "id",
    "[attr.aria-disabled]": "disabled()",
    "[attr.aria-selected]": "highlighted()",
    "[attr.data-disabled]": "String(disabled())",
    "[attr.data-selected]": "String(highlighted())",
    "[attr.data-value]": "own()",
    "[class]": "part().class",
    "[style]": "part().style",
    "[style.display]": "state.visible(id) ? null : 'none'",
    "(pointermove)": "!disabled() && !highlighted() && state.highlight(id)",
    "(click)": "!disabled() && choose()",
  },
  template: `
    <ng-content />
    <svg
      iconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
      [sx]="indicator"
    ></svg>
  `,
})
class CommandItem {
  readonly value = input<string>()
  readonly keywords = input<string[]>([])
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly select = output<string>()
  readonly sx = input<SxInput>()
  protected readonly state = inject(COMMAND)
  protected readonly id = `kui-command-item-${next++}`
  protected readonly indicator = command.itemIndicator
  protected readonly String = String
  readonly #text = signal("")
  protected readonly own = computed(() => this.value() ?? this.#text())
  protected readonly highlighted = computed(
    () => this.state.highlighted() === this.id
  )
  protected readonly part = computed(() => partSx(command.item, this.sx()))

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const group = inject(COMMAND_GROUP, { optional: true }) ?? undefined
    // Registered at once, so the command is never empty while its items draw; its text, its
    // value when it is given none, is read once drawn.
    const unregister = this.state.register({
      id: this.id,
      element,
      value: this.own,
      keywords: this.keywords,
      group,
      disabled: this.disabled,
      select: () => this.choose(),
    })
    afterNextRender(() => this.#text.set(element.textContent?.trim() ?? ""))
    inject(DestroyRef).onDestroy(unregister)
  }

  protected choose() {
    this.select.emit(this.own())
  }
}

/** A keyboard shortcut at an item's end. */
@Directive({
  selector: "[kuiCommandShortcut]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "command-shortcut",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CommandShortcut {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.shortcut, this.sx()))
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
