<template>
  <div class="code-snippet">
    <div class="code">
      <slot></slot>
    </div>
    <div class="preview" ref="preview">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const preview = ref<HTMLDivElement>()


</script>

<style scoped lang="scss">
.code-snippet {
  .code {

  }
  .preview {

  }
}
</style>
