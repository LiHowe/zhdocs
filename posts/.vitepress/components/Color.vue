<template>
  <div class="zh-color">
    <span class="label">{{ title }}</span>
    <input type="color" :value="modelValue" @change="handleChange">
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string,
  title?: string
}>()

const emits = defineEmits(['update:modelValue'])

function handleChange(e) {
  emits('update:modelValue', e.target.value)
}

</script>

<style scoped>

</style>
