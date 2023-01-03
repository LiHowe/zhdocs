<template>
  <div :class="containerCls" :title="title">
    <input :id="id" class="cbx-input" type="checkbox" :checked="modelValue" @change="handleChange">
    <label v-if="label" :for="id" class="cbx-label">{{ label }}</label>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue'

const emit = defineEmits([
  'change',
  'update:modelValue',
])

const id = `cbx-${Date.now() * Math.random()}`

const props = withDefaults(defineProps<{
  modelValue: boolean,
  label?: string,
  title?: string
  inline?: boolean
}>(), {
  inline: true,
})

function handleChange(e: Event) {
  const { checked } = e.target as HTMLInputElement
  emit('change', checked)
  emit('update:modelValue', checked)
}

const containerCls = computed(() => {
  return {
    'h-checkbox': true,
    'inline': props.inline,
    checked: props.modelValue
  }
})

</script>
<style scoped lang="scss">
$size: 13px;
.h-checkbox {
  padding: 4px 8px;
  border-radius: 4px;
  margin: 5px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-mute);
  width: fit-content;
  &.inline {
    display: inline-block;
  }
  &.checked {
    color: var(--vp-c-bg-mute);
    background-color: var(--vp-c-brand)
  }
}
.dark .h-checkbox.checked {
  color: var(--vp-c-text-1);
}
.cbx-label {
  cursor: pointer;
  font-size: $size;

}
.cbx-input {
  accent-color: var(--vp-c-brand);
  width: $size;
  height: $size;
}
</style>
