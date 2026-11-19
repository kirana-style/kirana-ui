<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Example, ExampleWrapper } from "../components/example"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import {
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
  } from "../ui/native-select"
  import { space } from "../../../core/scales"

  const styles = {
    flexFlexColGap4: css({
      display: "flex",
      flexDirection: "column",
      gap: { "*": null, base: space[4] },
    }),
  }
</script>

<ExampleWrapper>
  <!-- NativeSelectBasic -->
  <Example title="Basic">
    <NativeSelect>
      <NativeSelectOption value="">
        Select a fruit
      </NativeSelectOption>
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
      <NativeSelectOption value="grapes" disabled>
        Grapes
      </NativeSelectOption>
      <NativeSelectOption value="pineapple">
        Pineapple
      </NativeSelectOption>
    </NativeSelect>
  </Example>
  <!-- NativeSelectWithGroups -->
  <Example title="With Groups">
    <NativeSelect>
      <NativeSelectOption value="">
        Select a food
      </NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">
          Apple
        </NativeSelectOption>
        <NativeSelectOption value="banana">
          Banana
        </NativeSelectOption>
        <NativeSelectOption value="blueberry">
          Blueberry
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">
          Carrot
        </NativeSelectOption>
        <NativeSelectOption value="broccoli">
          Broccoli
        </NativeSelectOption>
        <NativeSelectOption value="spinach">
          Spinach
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  </Example>
  <!-- NativeSelectSizes -->
  <Example title="Sizes">
    <div sx={styles.flexFlexColGap4}>
      <NativeSelect size="sm">
        <NativeSelectOption value="">
          Select a fruit
        </NativeSelectOption>
        <NativeSelectOption value="apple">
          Apple
        </NativeSelectOption>
        <NativeSelectOption value="banana">
          Banana
        </NativeSelectOption>
        <NativeSelectOption value="blueberry">
          Blueberry
        </NativeSelectOption>
      </NativeSelect>
      <NativeSelect size="default">
        <NativeSelectOption value="">
          Select a fruit
        </NativeSelectOption>
        <NativeSelectOption value="apple">
          Apple
        </NativeSelectOption>
        <NativeSelectOption value="banana">
          Banana
        </NativeSelectOption>
        <NativeSelectOption value="blueberry">
          Blueberry
        </NativeSelectOption>
      </NativeSelect>
    </div>
  </Example>
  <!-- NativeSelectWithField -->
  <Example title="With Field">
    <Field>
      <FieldLabel for="native-select-country">
        Country
      </FieldLabel>
      <NativeSelect id="native-select-country">
        <NativeSelectOption value="">
          Select a country
        </NativeSelectOption>
        <NativeSelectOption value="us">
          United States
        </NativeSelectOption>
        <NativeSelectOption value="uk">
          United Kingdom
        </NativeSelectOption>
        <NativeSelectOption value="ca">
          Canada
        </NativeSelectOption>
        <NativeSelectOption value="au">
          Australia
        </NativeSelectOption>
      </NativeSelect>
      <FieldDescription>
        Select your country of residence.
      </FieldDescription>
    </Field>
  </Example>
  <!-- NativeSelectDisabled -->
  <Example title="Disabled">
    <NativeSelect disabled>
      <NativeSelectOption value="">
        Disabled
      </NativeSelectOption>
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
    </NativeSelect>
  </Example>
  <!-- NativeSelectInvalid -->
  <Example title="Invalid">
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">
        Error state
      </NativeSelectOption>
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
    </NativeSelect>
  </Example>
</ExampleWrapper>
