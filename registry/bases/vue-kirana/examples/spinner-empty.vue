<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { Spinner } from "../ui/spinner"
import { page } from "../../../styles/page.styles"

const styles = {
  full: css({ width: "100%" }),
}
</script>

<template>
  <div :sx="page.example">
    <Empty :sx="styles.full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Cancel</Button>
      </EmptyContent>
    </Empty>
  </div>
</template>
