<script setup lang="ts">
/**
 * create_at: 2023/7/19
 * description: 测试Fov的变化对画面的影响
 */
import { PerspectiveCamera, Scene, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial, AxesHelper } from 'three'
import { ref, onMounted, watchEffect, watch, onBeforeUnmount } from 'vue'
const p_demo_1 = ref()

const fov = ref(50)
const aspect = ref(1)
const near = ref(0.1)
const far = ref(100)
const focal = ref(35)

const c = new PerspectiveCamera(fov.value, aspect.value, near.value, far.value)
const s = new Scene()
const r = new WebGLRenderer({
  antialias: true,
})
const helper = new AxesHelper(200)

s.add(helper)

c.position.z = 10
c.position.x = 10
c.position.y = 10
c.lookAt(0, 0, 0)

r.useLegacyLights = false
// c.rotateZ(-Math.PI / 180 * 5)

const geo = new BoxGeometry(1, 1, 1)

const mat = new MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
})
const cube = new Mesh(geo, mat)

const cube_1 = cube.clone()
cube_1.position.set(0, 0, -5)

const cube_2 = cube.clone()
cube_2.position.set(0, 0, 5)

const cube_3 = cube.clone()
cube_3.position.set(5, 0, 0)

const cube_4 = cube.clone()
cube_4.position.set(-5, 0, 0)

s.add(cube, cube_1, cube_2, cube_3, cube_4)

r.setSize(200, 200)

function reRender() {
  r.render(s, c)
}

reRender()

onMounted(() => {
  p_demo_1.value.appendChild(r.domElement)
})

onBeforeUnmount(() => {
  p_demo_1.value.innerHTML = ''
})

watch(
  () => aspect.value + near.value + far.value,
  () => {
    c.aspect = aspect.value
    c.near = near.value
    c.far = far.value
    c.updateProjectionMatrix()
    reRender()
})

function changeFocal() {
  fov.value = c.fov
  c.setFocalLength(focal.value)
  c.updateProjectionMatrix()
  reRender()
}

function changeFov() {
  c.fov = fov.value
  focal.value = c.getFocalLength()
  c.updateProjectionMatrix()
  reRender()
}

</script>
<template>
  <Demo :title="`相机测试 [fov: ${fov}, aspect: ${aspect}, near: ${near}, far: ${far}]`">
    <div class="fov-demo">
      <div class="perspective-camera-container" ref="p_demo_1" style="width: 200px; height: 200px;"></div>
      <div>
        <div>
          <p>
            <span>相机位置: </span>
            <code>{{ c.position }}</code>
          </p>
          <p>
            <span>立方体大小: </span>
            <code>1 * 1 * 1</code>
          </p>
        </div>
        <div class="control-line">
          <span class="label">视野(fov)</span>
          <el-slider :min="1" :max="100" v-model="fov" @input="changeFov" />
        </div>
        <div class="control-line">
          <span>长宽比(aspect)</span>
          <el-slider v-model="aspect" :min="0.1" :step="0.1" :max="1.9"></el-slider>
        </div>
        <div class="control-line">
          <span>近截面距离(near)</span>
          <el-slider v-model="near" :min="0" :max="10" :step="0.1"></el-slider>
        </div>
        <div class="control-line">
          <span>远截面距离(far)</span>
          <el-slider v-model="far" :min="10" :max="100" :step="1"></el-slider>
        </div>
        <div class="control-line">
          <span>焦距(focal)</span>
          <el-slider v-model="focal" :min="1" :max="300" :step="1" @input="changeFocal"></el-slider>
        </div>
      </div>
    </div>
  </Demo>
</template>
<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.fov-demo {
  padding: 20px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-gap: 20px;
  height: 100%;
  width: 100%;
}
.control-line {
  display: grid;
  grid-template-columns: 150px auto;
  grid-gap: 10px;
  padding: 5px;
}
</style>

