<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import { FileUpload, FileUploadDropzone, FileUploadList, FileUploadTrigger } from "../ui/file-upload"

  const styles = {
    upload: css({ maxWidth: containerSize.sm }),
  }
</script>

<div sx={page.example}>
  <FileUpload accept=".pdf,.doc,.docx" sx={styles.upload}>
    <!-- PF-079: the file input is drawn by the dropzone, so a button-only upload keeps one, hidden. -->
    <FileUploadDropzone hidden />
    <FileUploadTrigger>
      <IconPlaceholder lucide="UploadCloudIcon" tabler="IconCloudUpload" hugeicons="CloudUploadIcon" phosphor="CloudArrowUpIcon" remixicon="RiUploadCloudLine" />
      Upload your CV
    </FileUploadTrigger>
    <FileUploadList />
  </FileUpload>
</div>
