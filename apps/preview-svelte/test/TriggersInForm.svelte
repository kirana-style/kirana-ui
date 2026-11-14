<!-- Every kind of trigger inside one form, as its own button and through `asChild` with the
     registry's Button: none may submit the form. `ui` holds one base's parts. -->
<script lang="ts">
  // The parts of one base, by their export names.
  // oxlint-disable-next-line typescript/no-explicit-any
  let { ui }: { ui: Record<string, any> } = $props()
</script>

{#snippet button(props: () => Record<string, unknown>, label: string)}
  <ui.Button {...props()} class={props().class} style={props().style} variant="outline">{label}</ui.Button>
{/snippet}

<form>
  <ui.Popover>
    <ui.PopoverTrigger>Popover</ui.PopoverTrigger>
    <ui.PopoverContent>Popover content</ui.PopoverContent>
  </ui.Popover>
  <ui.Popover>
    <ui.PopoverTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Popover as child")}{/snippet}
    </ui.PopoverTrigger>
    <ui.PopoverContent>Popover content</ui.PopoverContent>
  </ui.Popover>

  <ui.DropdownMenu>
    <ui.DropdownMenuTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Menu as child")}{/snippet}
    </ui.DropdownMenuTrigger>
    <ui.DropdownMenuContent><ui.DropdownMenuItem>Item</ui.DropdownMenuItem></ui.DropdownMenuContent>
  </ui.DropdownMenu>

  <ui.Dialog>
    <ui.DialogTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Dialog as child")}{/snippet}
    </ui.DialogTrigger>
    <ui.DialogContent><ui.DialogTitle>Dialog</ui.DialogTitle></ui.DialogContent>
  </ui.Dialog>

  <ui.AlertDialog>
    <ui.AlertDialogTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Alert dialog as child")}{/snippet}
    </ui.AlertDialogTrigger>
    <ui.AlertDialogContent><ui.AlertDialogTitle>Alert dialog</ui.AlertDialogTitle></ui.AlertDialogContent>
  </ui.AlertDialog>

  <ui.Sheet>
    <ui.SheetTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Sheet as child")}{/snippet}
    </ui.SheetTrigger>
    <ui.SheetContent><ui.SheetTitle>Sheet</ui.SheetTitle></ui.SheetContent>
  </ui.Sheet>

  <ui.Collapsible>
    <ui.CollapsibleTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Collapsible as child")}{/snippet}
    </ui.CollapsibleTrigger>
    <ui.CollapsibleContent>Collapsible content</ui.CollapsibleContent>
  </ui.Collapsible>

  <ui.Tooltip>
    <ui.TooltipTrigger>Tooltip</ui.TooltipTrigger>
    <ui.TooltipContent>Tooltip content</ui.TooltipContent>
  </ui.Tooltip>
  <ui.Tooltip>
    <ui.TooltipTrigger>
      {#snippet asChild(props: () => Record<string, unknown>)}{@render button(props, "Tooltip as child")}{/snippet}
    </ui.TooltipTrigger>
    <ui.TooltipContent>Tooltip content</ui.TooltipContent>
  </ui.Tooltip>
</form>
