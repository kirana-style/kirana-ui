<!-- Rating's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. -->
<script setup lang="ts">
import { Example, ExampleWrapper } from "../components/example"
import RatingDemo from "./rating-demo.vue"
import RatingForm from "./rating-form.vue"
import RatingHalf from "./rating-half.vue"
import RatingReadonly from "./rating-readonly.vue"
import RatingSizes from "./rating-sizes.vue"
</script>

<template>
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
</template>
