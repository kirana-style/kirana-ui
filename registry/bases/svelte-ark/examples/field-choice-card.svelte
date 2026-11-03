<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
  } from "../ui/field"
  import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  }
</script>

<div sx={page.example}>
  <FieldGroup sx={styles.narrow}>
    <FieldSet>
      <FieldLegend variant="label">
        Compute Environment
      </FieldLegend>
      <FieldDescription>
        Select the compute environment for your cluster.
      </FieldDescription>
      <RadioGroup defaultValue="kubernetes">
        <FieldLabel for="kubernetes-r2h">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>
                Kubernetes
              </FieldTitle>
              <FieldDescription>
                Run GPU workloads on a K8s cluster.
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
          </Field>
        </FieldLabel>
        <FieldLabel for="vm-z4k">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>
                Virtual Machine
              </FieldTitle>
              <FieldDescription>
                Access a cluster to run GPU workloads.
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="vm" id="vm-z4k" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </FieldSet>
  </FieldGroup>
</div>
