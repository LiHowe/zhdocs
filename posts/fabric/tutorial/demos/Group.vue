<template>
  <Demo title="Group Playground">
    <FabricContainer :mounted="mounted">
      <template #ops>
        <el-button @click="centerItems">居中组合元素</el-button>
        <el-button @click="addItemWithoutUpdate"> 1️⃣ 添加矩形(不更新)</el-button>
        <el-button @click="addItemWithUpdate"> 2️⃣ 添加矩形(更新)</el-button>
        <el-button @click="addExistItemWithoutUpdate"> 3️⃣ 添加已存在的矩形(更新)</el-button>
        <el-button @click="addExistItemWithUpdate"> 4️⃣ 添加已存在的矩形(更新)</el-button>
        <el-button @click="reset">清空画布</el-button>
      </template>
    </FabricContainer>
  </Demo>

</template>
<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';
import { ref } from 'vue'

// fabric
const f = ref()
// fabric canvas
const c = ref()
// the group
const g = ref()

function mounted(fb, canvas) {
  f.value = fb
  c.value = canvas
  g.value = new fb.Group([], {
    left: 20,
    top: 20,
  })
  c.value.add(g.value)
}

function centerItems() {
  g.value.forEachObject(item => {
    item.set({
      left: 0,
      top: 0,
      'originX': 'center',
      'originY': 'center',
    })
  })
  c.value.renderAll()
  console.log(g.value)
}

function addItemWithoutUpdate() {
  const rect = new f.value.Rect({
    width: 30,
    height: 30,
    left: 30,
    top: 30,
    fill: '#c4d9e9'
  })
  g.value.add(rect)
  c.value.renderAll()
}

function addItemWithUpdate() {
  const rect = new f.value.Rect({
    width: 20,
    height: 20,
    fill: '#a9e890',
  })
  g.value.addWithUpdate(rect)
  c.value.renderAll()
}

function addExistItemWithoutUpdate() {
  const rect = new f.value.Rect({
    width: 50,
    height: 50,
    fill: '#890123'
  })
  c.value.add(rect)
  g.value.add(rect)
  c.value.renderAll()
}

function addExistItemWithUpdate() {
  const rect = new f.value.Rect({
    width: 50,
    height: 50,
    fill: '#193353'
  })
  c.value.add(rect)
  g.value.addWithUpdate(rect)
  c.value.renderAll()
}

function reset() {
  c.value.clear()
  mounted(f.value, c.value)
}

</script>
<style scoped>
</style>
