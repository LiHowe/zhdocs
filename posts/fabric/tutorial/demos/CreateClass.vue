<template>
  <Demo>
    <FabricContainer :mounted="mounted">
      <template #ops>
        <el-button @click="createSector">绘制扇形</el-button>
        <el-button @click="createCircle">绘制圆形</el-button>
        <el-button @click="createButton">绘制按钮</el-button>
      </template>
    </FabricContainer>
  </Demo>
</template>
<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';
import { ref } from 'vue'
import { Sector, Spiral, LabeledRect } from './Sector';


const fb = ref()
const canvas = ref()

function mounted(f, c) {
  fb.value = f
  canvas.value = c
}

const commonOptions = {
  left: 10,
  top: 10,
  radius: 30,
  startAngle: 0,
  endAngle: 90,
  fill: '#42b883',
  opacity: 0.5,
}

function createSector() {
  const sec = new Sector(commonOptions)
  canvas.value.add(sec)
}

function createCircle() {
  const cir = new fb.value.Circle(commonOptions)
  canvas.value.add(cir)
}

function createSpiral() {
  const s = new Spiral({
    left: 10,
    top: 10,
    radius: 40,
  })
  canvas.value.add(s)
}

function createButton() {
  const b = new LabeledRect({
    label: 'HZZZH',
    width: 100,
    height: 50,
    rx: 10,
    fill: '#00a001',
    color: '#fff'
  })
  canvas.value.add(b)
}
</script>
<style scoped>

</style>
