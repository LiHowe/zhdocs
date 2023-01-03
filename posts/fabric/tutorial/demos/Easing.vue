<template>
  <div>
    <select :value="easing" @change="changeEasing" class="select easing-select">
      <option v-for="e in easingList" :value="e" :key="e">{{ e }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const easing = ref('easeInQuad')

const easingList = [
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",
  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",
  "easeInElastic",
  "easeOutElastic",
  "easeInOutElastic",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeInBounce",
  "easeOutBounce",
  "easeInOutBounce"
]

function changeEasing(e: Event) {
  const target = e.target as HTMLSelectElement
  const v = target.value
  console.log(v)
  easing.value = v
}

</script>
<style scoped lang="scss">
.easing-select {
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 4px;
}
</style>
