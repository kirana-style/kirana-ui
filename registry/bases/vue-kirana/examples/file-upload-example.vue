<!-- File Upload's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import FileUploadDemo from "./file-upload-demo.vue"
import FileUploadAccept from "./file-upload-accept.vue"
import FileUploadButton from "./file-upload-button.vue"
import FileUploadDisabled from "./file-upload-disabled.vue"
import FileUploadMultiple from "./file-upload-multiple.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Default" data-showcase>
      <FileUploadDemo />
    </Example>
    <Example title="Accept" data-showcase>
      <FileUploadAccept />
    </Example>
    <Example title="Button" data-showcase>
      <FileUploadButton />
    </Example>
    <Example title="Disabled" data-showcase>
      <FileUploadDisabled />
    </Example>
    <Example title="Multiple" data-showcase>
      <FileUploadMultiple />
    </Example>
  </ExampleWrapper>
</template>
