/** Rating's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import RatingDemo from "./rating-demo"
import RatingForm from "./rating-form"
import RatingHalf from "./rating-half"
import RatingReadonly from "./rating-readonly"
import RatingSizes from "./rating-sizes"

@Component({
  selector: "rating-example",
  imports: [
    Example,
    ExampleWrapper,
    RatingDemo,
    RatingForm,
    RatingHalf,
    RatingReadonly,
    RatingSizes,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <rating-demo />
      </div>
      <div kuiExample title="Form" data-showcase>
        <rating-form />
      </div>
      <div kuiExample title="Half" data-showcase>
        <rating-half />
      </div>
      <div kuiExample title="Readonly" data-showcase>
        <rating-readonly />
      </div>
      <div kuiExample title="Sizes" data-showcase>
        <rating-sizes />
      </div>
    </div>
  `,
})
export default class RatingExample {}
