<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { Example } from "../../components/example"
  import { Button } from "../../ui/button"
  import { Card, CardContent, CardFooter } from "../../ui/card"
  import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
  } from "../../ui/combobox"
  import { Field, FieldGroup, FieldLabel } from "../../ui/field"
  import { containerSize } from "../../../../core/scales"

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
    wFullMaxWSm: css({
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
    }),
    wFull: css({ width: { "*": null, base: "100%" } }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const framework = formData.get("framework") as string
    toast(`You selected ${framework} as your framework.`)
  }
</script>

<Example title="Form with Combobox" {...rest} sx={className as Sx}>
  <Card sx={styles.wFullMaxWSm} size="sm">
    <CardContent>
      <form id="form-with-combobox" sx={styles.wFull} onsubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel for="framework">
              Framework
            </FieldLabel>
            <Combobox items={frameworks}>
              <ComboboxInput id="framework" name="framework" placeholder="Select a framework" required />
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
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Button type="submit" form="form-with-combobox">
        Submit
      </Button>
    </CardFooter>
  </Card>
</Example>
