<!-- Tooltip and popover triggers inside one form, as their own button and with `as-child` on the
     registry's Button: none may submit the form. `ui` holds one base's parts. -->
<script setup lang="ts">
// oxlint-disable-next-line typescript/no-explicit-any
defineProps<{ ui: Record<string, any> }>()
</script>

<template>
  <form>
    <component :is="ui.Tooltip">
      <component :is="ui.TooltipTrigger">Tooltip</component>
      <component :is="ui.TooltipContent">Tooltip content</component>
    </component>
    <component :is="ui.Tooltip">
      <component :is="ui.TooltipTrigger" as-child>
        <component :is="ui.Button" variant="outline"
          >Tooltip as child</component
        >
      </component>
      <component :is="ui.TooltipContent">Tooltip content</component>
    </component>
    <component :is="ui.Popover">
      <component :is="ui.PopoverTrigger">Popover</component>
      <component :is="ui.PopoverContent">Popover content</component>
    </component>
    <component :is="ui.Popover">
      <component :is="ui.PopoverTrigger" as-child>
        <component :is="ui.Button" variant="outline"
          >Popover as child</component
        >
      </component>
      <component :is="ui.PopoverContent">Popover content</component>
    </component>
  </form>
</template>
