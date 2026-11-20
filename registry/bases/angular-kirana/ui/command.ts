/**
 * cmdk's command menu on Kirana UI's (`KpCommand`): the items come from the markup, what is typed
 * filters them by their text (or their `value`, as cmdk's) and keywords, groups with no match leave,
 * the arrows move the highlight (`data-highlighted`) and Enter or a press chooses; choosing an item
 * calls its `select`, heard through the root's `itemSelected`. The markup keeps cmdk's attributes
 * (`cmdk-item` …), which the command's styles read, and its list's sizer.
 */
import {
  Component,
  DestroyRef,
  Directive,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  viewChild,
} from "@angular/core"
import type { ElementRef } from "@angular/core"
import {
  KpCommand,
  KpCommandEmpty,
  KpCommandGroup,
  KpCommandGroupHeading,
  KpCommandInput,
  KpCommandItem,
  KpCommandList,
  KpCommandSeparator,
  hostInputs,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
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

/**
 * What a command's root hands its items: each item's `select`, by the value it gave Kirana UI's
 * item, run when the root reports that value chosen.
 */
class CommandState {
  readonly #entries = new Set<{ key: () => string; select: () => void }>()

  /** Hears its root's choices. */
  listen(root: KpCommand) {
    root.itemSelected.subscribe(({ value }) => {
      for (const entry of this.#entries)
        if (entry.key() === value) entry.select()
    })
  }

  register(key: () => string, select: () => void) {
    const entry = { key, select }
    this.#entries.add(entry)
    return () => this.#entries.delete(entry)
  }
}

const COMMAND = new InjectionToken<CommandState>("kui command")
const provideCommand = () => ({
  provide: COMMAND,
  useFactory: () => new CommandState(),
})

/**
 * The menu: `<div kuiCommand>`, holding its input and list, on Kirana UI's root. `shouldFilter`
 * false leaves the filtering to the caller: Kirana UI's `filter` is then `null`, every item shown.
 */
@Directive({
  selector: "[kuiCommand]",
  providers: [provideSxPart(), provideCommand()],
  hostDirectives: [KpCommand],
  host: {
    "data-slot": "command",
    "cmdk-root": "",
    tabindex: "-1",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Command {
  readonly shouldFilter = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.root, this.sx()))

  constructor() {
    hostInputs(KpCommand, {
      filter: computed(() => (this.shouldFilter() ? undefined : null)),
    })
    inject(COMMAND).listen(inject(KpCommand))
  }
}

/**
 * A command in a dialog: `<kui-command-dialog [(open)]>` around its input and list, as React's
 * `CommandDialog`; its element is Kirana UI's command root (`KpCommand`), drawing nothing. Its title and
 * description are for screen readers.
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
  providers: [provideCommand()],
  hostDirectives: [KpCommand],
  host: { style: "display: contents" },
  template: `
    <ng-container
      kuiDialog
      [open]="open()"
      (openChange)="openChange.emit(!!$event)"
    >
      <div kuiDialogHeader [sx]="hidden">
        <h2 kuiDialogTitle>{{ title() }}</h2>
        <p kuiDialogDescription>{{ description() }}</p>
      </div>
      <div
        kuiDialogContent
        [sx]="content()"
        [showCloseButton]="showCloseButton()"
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
  protected readonly hidden = visuallyHidden
  protected readonly content = computed(
    () => [command.dialog, this.sx()] as SxInput
  )

  constructor() {
    inject(COMMAND).listen(inject(KpCommand))
  }
}

/**
 * The search field: `<div kuiCommandInput placeholder="…">`, its wrapper, holding Kirana UI's input
 * in an input group with its search icon. The caller's `sx` goes on the input, as React's.
 */
@Component({
  selector: "[kuiCommandInput]",
  imports: [
    IconPlaceholder,
    InputGroup,
    InputGroupAddon,
    KpCommandInput,
    SxDirective,
  ],
  host: {
    "data-slot": "command-input-wrapper",
    "[class]": "wrapper",
  },
  template: `
    <div kuiInputGroup [sx]="group">
      <input
        kpCommandInput
        data-slot="command-input"
        cmdk-input
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        [attr.placeholder]="placeholder() ?? null"
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
  hostDirectives: [KpCommandList],
  host: {
    "data-slot": "command-list",
    "cmdk-list": "",
    "aria-label": "Suggestions",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<div cmdk-list-sizer><ng-content /></div>`,
})
class CommandList {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.list, this.sx()))
}

/**
 * What it says when nothing matches: Kirana UI's structural `*kpCommandEmpty`, in the page only
 * then, drawn here; its own element draws nothing.
 */
@Component({
  selector: "[kuiCommandEmpty]",
  imports: [KpCommandEmpty],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpCommandEmpty
      data-slot="command-empty"
      cmdk-empty
      role="presentation"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class CommandEmpty {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.empty, this.sx()))
}

/** A group of items under its `heading`, gone while none of them matches. */
@Component({
  selector: "[kuiCommandGroup]",
  imports: [KpCommandGroupHeading],
  providers: [provideSxPart()],
  hostDirectives: [KpCommandGroup],
  host: {
    "data-slot": "command-group",
    "cmdk-group": "",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (heading()) {
      <div kpCommandGroupHeading cmdk-group-heading>{{ heading() }}</div>
    }
    <div cmdk-group-items><ng-content /></div>
  `,
})
class CommandGroup {
  readonly heading = input<string>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.group, this.sx()))
}

/** A line between groups, gone while something is typed, as cmdk's. */
@Directive({
  selector: "[kuiCommandSeparator]",
  providers: [provideSxPart()],
  hostDirectives: [KpCommandSeparator],
  host: {
    "data-slot": "command-separator",
    "cmdk-separator": "",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CommandSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(command.separator, this.sx()))
}

/**
 * An item: `<div kuiCommandItem (select)="…">`. Its `value` is what it is matched by and known as,
 * its text when not given; `keywords` match too. Kirana UI's item needs a value (a required input,
 * which a host directive must expose), which a cmdk item may leave out, so it is drawn here,
 * inside an element that draws nothing, and given the caller's value or one of its own.
 */
@Component({
  selector: "[kuiCommandItem]",
  imports: [IconPlaceholder, KpCommandItem, SxDirective],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      #row
      kpCommandItem
      data-slot="command-item"
      cmdk-item
      [value]="key()"
      [label]="value()"
      [keywords]="keywords()"
      [disabled]="disabled()"
      [class]="part().class"
      [style]="part().style"
    >
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
    </div>
  `,
})
class CommandItem {
  readonly value = input<string>()
  readonly keywords = input<string[]>([])
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly select = output<string>()
  readonly sx = input<SxInput>()
  protected readonly indicator = command.itemIndicator
  readonly #id = `kui-command-item-${next++}`
  readonly #state = inject(COMMAND)
  private readonly row = viewChild.required<ElementRef<HTMLElement>>("row")
  /** What Kirana UI's item is known by: the caller's value, or its own. */
  protected readonly key = computed(() => this.value() ?? this.#id)
  protected readonly part = computed(() => partSx(command.item, this.sx()))

  constructor() {
    const unregister = this.#state.register(this.key, () =>
      this.select.emit(
        this.value() ?? this.row().nativeElement.textContent?.trim() ?? ""
      )
    )
    inject(DestroyRef).onDestroy(unregister)
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
