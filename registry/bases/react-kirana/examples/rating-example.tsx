/** Rating's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import RatingDemo from "./rating-demo"
import RatingForm from "./rating-form"
import RatingHalf from "./rating-half"
import RatingReadonly from "./rating-readonly"
import RatingSizes from "./rating-sizes"

export default function RatingExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <RatingDemo />
      </Example>
      <Example title="Form" data-showcase>
        <RatingForm />
      </Example>
      <Example title="Half" data-showcase>
        <RatingHalf />
      </Example>
      <Example title="Readonly" data-showcase>
        <RatingReadonly />
      </Example>
      <Example title="Sizes" data-showcase>
        <RatingSizes />
      </Example>
    </ExampleWrapper>
  )
}
