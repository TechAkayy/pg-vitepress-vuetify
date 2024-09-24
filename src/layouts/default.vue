<script setup lang="ts">
  // import { VPHomeHero } from 'vitepress/theme'
  import { useData } from 'vitepress'
  const { site, frontmatter, page } = useData()
  const isHomePage = computed(() => {
    return page.value.filePath === 'index.md'
  })
  //TODO: HeadAndMeta not loading correctly
</script>

<template>
  <div>
    <HeadAndMeta />
    <div class="d-flex flex-column bg-background text-on-background">
      <!-- <NavBar class="position-fixed bg-background shadow" style="z-index: 20" /> -->
      <!-- <div class="mt-24 shadow"> -->
      <div>
        <Content />
      </div>
      <!-- </div> -->
      <!-- <TheFooter /> -->
    </div>
  </div>
</template>
<style></style>
