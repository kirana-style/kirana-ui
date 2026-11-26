<!-- Rating's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script lang="ts">
  import { Example, ExampleWrapper } from "../components/example"
  import RatingDemo from "./rating-demo.svelte"
  import RatingForm from "./rating-form.svelte"
  import RatingHalf from "./rating-half.svelte"
  import RatingReadonly from "./rating-readonly.svelte"
  import RatingSizes from "./rating-sizes.svelte"
</script>

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
