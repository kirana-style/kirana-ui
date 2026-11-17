<script lang="ts">
  import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Tabs defaultValue="home">
    <TabsList>
      <TabsTrigger value="home">
        Home
      </TabsTrigger>
      <TabsTrigger value="settings" disabled>
        Disabled
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>
