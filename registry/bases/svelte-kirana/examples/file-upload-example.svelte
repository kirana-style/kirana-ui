<!-- File Upload's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import FileUploadDemo from "./file-upload-demo.svelte"
  import FileUploadAccept from "./file-upload-accept.svelte"
  import FileUploadButton from "./file-upload-button.svelte"
  import FileUploadDisabled from "./file-upload-disabled.svelte"
  import FileUploadMultiple from "./file-upload-multiple.svelte"
</script>

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
