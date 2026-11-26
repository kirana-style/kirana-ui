/** File Upload's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import FileUploadDemo from "./file-upload-demo"
import FileUploadAccept from "./file-upload-accept"
import FileUploadButton from "./file-upload-button"
import FileUploadDisabled from "./file-upload-disabled"
import FileUploadMultiple from "./file-upload-multiple"

@Component({
  selector: "file-upload-example",
  imports: [
    Example,
    ExampleWrapper,
    FileUploadDemo,
    FileUploadAccept,
    FileUploadButton,
    FileUploadDisabled,
    FileUploadMultiple,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <file-upload-demo />
      </div>
      <div kuiExample title="Accept" data-showcase>
        <file-upload-accept />
      </div>
      <div kuiExample title="Button" data-showcase>
        <file-upload-button />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <file-upload-disabled />
      </div>
      <div kuiExample title="Multiple" data-showcase>
        <file-upload-multiple />
      </div>
    </div>
  `,
})
export default class FileUploadExample {}
