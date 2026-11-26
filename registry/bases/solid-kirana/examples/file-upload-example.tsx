/** File Upload's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import FileUploadDemo from "./file-upload-demo"
import FileUploadAccept from "./file-upload-accept"
import FileUploadButton from "./file-upload-button"
import FileUploadDisabled from "./file-upload-disabled"
import FileUploadMultiple from "./file-upload-multiple"

export default function FileUploadExample() {
  return (
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
  )
}
