<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field>
      <FieldLabel for="input-group-url"> Website URL </FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText> https:// </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="AlertCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </div>
</template>
