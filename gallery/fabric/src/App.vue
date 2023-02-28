<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/flowchart">FlowChart</RouterLink>
      <RouterLink to="/mindflow">MindFlow</RouterLink>
    </nav>
  </header>
  <main class="content">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
}
</style>
