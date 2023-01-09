<template>
  <Demo title="type为percentage">
    <FabricContainer :mounted="mounted" static>
      <template #ops v-if="gradient">
        <div class="type">
          <span>渐变类型:</span>
          <el-select v-model="gradient.type">
            <el-option key="linear" value="linear">线性渐变 - linear</el-option>
            <el-option key="radial" value="radial">径向渐变 - radial</el-option>
          </el-select>
        </div>
        <div class="points">
          <div v-for="key in Object.keys(gradient.coords)">
            <label for="x1c">{{ key }}:</label>
            <el-input-number
            :min="-1" :max="1" :step="0.1" :precision="1"
            v-model="gradient.coords[key]" />
          </div>
        </div>
        <div class="stops">
          <p>色块配置</p>
          <div v-for="stop in gradient.colorStops">
            <span>偏移:</span>
            <el-input-number v-model="stop.offset" :min="0" :max="1" :step="0.1" :precision="1" @change="reRenderRect"/>
            <span>颜色:</span>
            <el-color-picker v-model="stop.color" @change="reRenderRect" />
          </div>
          <el-button type="primary" @click="addStop">添加色块</el-button>
        </div>
      </template>
    </FabricContainer>
  </Demo>
</template>
<script setup lang="ts">
import FabricContainer from '../../../components/FabricContainer.vue';
import { ref, watchEffect } from 'vue'
import type { fabric } from 'fabric'

const fabric = ref()
const canvas = ref<fabric.StaticCanvas>()

function mounted(fb: any, c: fabric.StaticCanvas) {
  fabric.value = fb
  canvas.value = c

  initShape(fb, c)
  initGradient(fb)
}

const rect = ref<fabric.Rect>()
function initShape(fb: any, c: fabric.StaticCanvas) {
  rect.value = new fb.Rect({
    width: 200,
    height: 80,
  })
  c.add(rect.value)
  rect.value.center()
}

const gradient = ref()

const gradientConfig = ref(getConfig())

function getConfig() {
  return {
    type: 'linear',
    gradientUnits: 'percentage',
    coords: {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
      r1: 0,
      r2: 0,
    },
    colorStops: [
      { offset: 0, color: '#fff' },
      { offset: 1, color: '#000' },
    ]
  }
}

function initGradient(fb = fabric.value) {
  gradientConfig.value = getConfig()
  watchEffect(() => {
    gradient.value = new fb.Gradient(gradientConfig.value)
    if (gradient.value.type === 'radial') {
      for (const key in gradientConfig.value.coords) {
        gradient.value.coords[key] = key === 'r1' ? 0: 0.5
      }
    } else {
      for (const key in gradientConfig.value.coords) {
        gradient.value.coords[key] = ['x2', 'y2'].includes(key) ? 1: 0
      }
    }
  })
  watchEffect(reRenderRect)
}

function reRenderRect() {
  rect.value.fill = gradient.value
  rect.value.dirty = true
  canvas.value.renderAll()
}

function addStop() {
  gradientConfig.value.colorStops.push({
    offset: 1,
    color: '#646cff'
  })
}

</script>
<style scoped lang="scss">
p {
  margin: 0;
}
.points {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 10px;
}
</style>
