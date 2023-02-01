<template>
  <FabricContainer :mounted="mounted">

  </FabricContainer>
</template>
<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';

function mounted(fb, canvas) {
  console.log(fb, canvas)
}

</script>
<style scoped></style>
