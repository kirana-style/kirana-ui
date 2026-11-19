<script lang="ts">
  import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Tabs defaultValue="overview">
    <TabsList variant="line">
      <TabsTrigger value="overview">
        Overview
      </TabsTrigger>
      <TabsTrigger value="analytics">
        Analytics
      </TabsTrigger>
      <TabsTrigger value="reports">
        Reports
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>
