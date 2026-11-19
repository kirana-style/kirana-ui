<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../ui/accordion"

  let {
    questions
  }: {
    questions: { q: string; a: string }[]
  } = $props()
</script>

<Accordion defaultValue={['0']}>
  {#each questions as item, index (index)}
    <AccordionItem value={String(index)}>
      <AccordionTrigger>
        {item.q}
      </AccordionTrigger>
      <AccordionContent>
        {item.a}
      </AccordionContent>
    </AccordionItem>
  {/each}
</Accordion>
