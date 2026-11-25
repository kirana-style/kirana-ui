<script setup lang="ts">
import { CopyButton } from "../ui/copy-button"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { inputGroup } from "../../../styles/input-group.styles"
import { page } from "../../../styles/page.styles"

const INVITE = "https://ui.kirana.style/invite/8f3k2q"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel for="copy-button-input">Invite link</FieldLabel>
      <InputGroup>
        <InputGroupInput id="copy-button-input" :value="INVITE" readonly />
        <InputGroupAddon align="inline-end">
          <CopyButton
            :value="INVITE"
            size="icon-xs"
            copy-label="Copy invite link"
            :sx="inputGroup.button({ size: 'icon-xs' })"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </div>
</template>
