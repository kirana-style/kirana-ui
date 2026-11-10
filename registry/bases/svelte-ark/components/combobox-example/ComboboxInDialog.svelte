<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { Example } from "../../components/example"
  import { Button } from "../../ui/button"
  import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
  } from "../../ui/combobox"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../ui/dialog"
  import { Field, FieldLabel } from "../../ui/field"
  import { breakpoint } from "../../../../core/scales"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const styles = {
    narrow: css({
      maxWidth: {
        "*": null,
        base: "calc(100% - 2rem)",
        [breakpoint.sm]: "425px",
      },
    }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  let open = $state(false)
</script>

<Example title="Combobox in Dialog" {...rest} sx={className as Sx}>
  <Dialog open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
    <DialogTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Open Dialog
        </Button>
      {/snippet}
    </DialogTrigger>
    <DialogContent sx={styles.narrow}>
      <DialogHeader>
        <DialogTitle>
          Select Framework
        </DialogTitle>
        <DialogDescription>
          Choose your preferred framework from the list below.
        </DialogDescription>
      </DialogHeader>
      <Field>
        <FieldLabel for="framework-dialog" sx={visuallyHidden}>
          Framework
        </FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInput id="framework-dialog" placeholder="Select a framework" />
          <ComboboxContent>
            <ComboboxEmpty>
              No items found.
            </ComboboxEmpty>
            <ComboboxList>
              {#snippet children({ item })}
                <ComboboxItem value={item}>
                  {item}
                </ComboboxItem>
              {/snippet}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <DialogFooter>
        <Button type="button" variant="outline" onclick={() => (open = false)}>
          Cancel
        </Button>
        <Button type="button" onclick={
              () => {
                toast('Framework selected.')
                open = false
              }
            }>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</Example>
