<template>
<Demo>
  <FabricContainer :mounted="mounted">
    <template #ops v-if="rect">
      <div>
        边框颜色
        <el-color-picker v-model="rect.borderColor" title="borderColor" />
      </div>
      <div>
        控制点填充颜色
        <el-color-picker v-model="rect.cornerColor" title="cornerColor" />
      </div>
      <div>
        控制点边框颜色
        <el-color-picker v-model="rect.cornerStrokeColor" title="cornerStrokeColor" />
      </div>
      <el-checkbox v-model="rect.transparentCorners" title="transparentCorners" label="无填充控制点"/>
      <el-checkbox v-model="rect.hasControls" title="hasControls" label="显示控制点"/>
      <el-checkbox v-model="rect.hasBorders" title="hasBorders" label="显示控制点边框"/>
      <div>
        <Cbx v-for="item in controls" v-model="item.checked" :label="item.label" />
      </div>
      <el-row gutter="16">
        <el-col :span="8">
          内边距
          <el-slider v-model="rect.padding" title="padding"/>
        </el-col>
        <el-col :span="8">
          控制点大小
          <el-slider v-model="rect.cornerSize" title="padding"/>
        </el-col>
      </el-row>
      <div>
        <el-row>控制点独立控制</el-row>
        <el-checkbox v-for="item in controls" :key="item.label" :label="item.label" v-model="item.checked" />
      </div>
    </template>

  </FabricContainer>
</Demo>
</template>
<script setup>
import FabricContainer from '../../../components/FabricContainer.vue';
import { ref, watch, reactive } from 'vue'

const rect = ref(null);

const controls = reactive([
  'tl',
  'tr',
  'bl',
  'br',
  'ml',
  'mr',
  'mt',
  'mb',
  'mtr',
].map(x => ({
  label: x,
  checked: true
})))

function mounted(fb, c) {
  const r = new fabric.Rect({ width: 140, height: 140, fill: '#e9e9e9'})
  c.add(r)
  rect.value = r
  r.center()
  c.setActiveObject(r)
  watch(rect, val => {
    c.requestRenderAll()
  }, { deep: true })

  watch(controls, () => {
    controls.forEach(x => {
      r.setControlVisible(x.label, x.checked)
    })
    c.requestRenderAll()
  }, { deep: true })
}
</script>
