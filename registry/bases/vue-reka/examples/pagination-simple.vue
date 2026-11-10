<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#"> 1 </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" is-active> 2 </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#"> 3 </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#"> 4 </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#"> 5 </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
</template>
