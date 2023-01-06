<template>
  <div class="color-map-container">
    <div
      v-for="[name, color] in Object.entries(fabric.Color.colorNameMap)"
      class="color-block"
      :title="name"
      :key="name"
      :style="{'background-color': color}"
    >
      <span class="color-name" :style="{color: resBgColor(color)}">{{ name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { fabric } from 'fabric';

function resBgColor(colorStr: string) {
  const rgbArr = fabric.Color.fromHex(colorStr).getSource()
  // 当color值大于128时,color值偏向255,即#ffffff,此时字体颜色应为#000000
  // 当color值小于128时,color值偏向0,即#000000,此时字体颜色应为#ffffff
  const color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;
  return color? '#000000': '#ffffff'
}
</script>
<style scoped lang="scss">
.color-map-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 5px;
}
.color-block {
  border-radius: 4px;
  width: 100%;
  height: 20px;
  color: white;
  text-align: center;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
// .color-name {
//   filter: hue-rotate(180deg);
// }
</style>
