<template>
  <i :class="['iconfont', `icon-${name}`]"></i>
</template>
<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<style scoped>
</style>
