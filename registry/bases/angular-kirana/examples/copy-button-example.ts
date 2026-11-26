/** Copy Button's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import CopyButtonDemo from "./copy-button-demo"
import CopyButtonInput from "./copy-button-input"
import CopyButtonText from "./copy-button-text"
import CopyButtonVariants from "./copy-button-variants"

@Component({
  selector: "copy-button-example",
  imports: [
    Example,
    ExampleWrapper,
    CopyButtonDemo,
    CopyButtonInput,
    CopyButtonText,
    CopyButtonVariants,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <copy-button-demo />
      </div>
      <div kuiExample title="Input" data-showcase>
        <copy-button-input />
      </div>
      <div kuiExample title="Text" data-showcase>
        <copy-button-text />
      </div>
      <div kuiExample title="Variants" data-showcase>
        <copy-button-variants />
      </div>
    </div>
  `,
})
export default class CopyButtonExample {}
