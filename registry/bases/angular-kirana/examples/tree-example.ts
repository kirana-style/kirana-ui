/** Tree's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import TreeDemo from "./tree-demo"
import TreeControlled from "./tree-controlled"
import TreeDisabled from "./tree-disabled"
import TreeMultiple from "./tree-multiple"

@Component({
  selector: "tree-example",
  imports: [
    Example,
    ExampleWrapper,
    TreeDemo,
    TreeControlled,
    TreeDisabled,
    TreeMultiple,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <tree-demo />
      </div>
      <div kuiExample title="Controlled" data-showcase>
        <tree-controlled />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <tree-disabled />
      </div>
      <div kuiExample title="Multiple" data-showcase>
        <tree-multiple />
      </div>
    </div>
  `,
})
export default class TreeExample {}
