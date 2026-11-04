import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { toast } from "solid-sonner"
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
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function ComboboxInDialog(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
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

  const [open, setOpen] = createSignal(false)

  return (
    <Example
      title="Combobox in Dialog"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Dialog
        open={open()}
        onOpenChange={(details: { open: ReturnType<typeof open> }) =>
          setOpen(details.open)
        }
      >
        <DialogTrigger
          asChild={(childProps) => (
            <Button {...childProps()} variant="outline">
              Open Dialog
            </Button>
          )}
        />
        <DialogContent sx={styles.narrow}>
          <DialogHeader>
            <DialogTitle>Select Framework</DialogTitle>
            <DialogDescription>
              Choose your preferred framework from the list below.
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel for="framework-dialog" sx={visuallyHidden}>
              Framework
            </FieldLabel>
            <Combobox items={frameworks}>
              <ComboboxInput
                id="framework-dialog"
                placeholder="Select a framework"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {({ item }) => (
                    <ComboboxItem value={item}>{item}</ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                toast("Framework selected.")
                setOpen(false)
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
