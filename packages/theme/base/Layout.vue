<script setup lang="ts">
import { computed, provide, useSlots, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const route = useRoute()
const { frontmatter } = useData()

const slots = useSlots()
const heroImageSlotExists = computed(() => !!slots['home-hero-image'])
</script>

<template>
  {{ frontmatter }}
  <div v-if="frontmatter.layout" class="Layout">

  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
