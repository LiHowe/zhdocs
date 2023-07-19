<script setup lang="ts">
/**
 * create_at: 2023/7/18
 * description:
 */
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, SpotLight, Color } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted, ref } from 'vue'

const scene = new Scene()

const renderer = new WebGLRenderer()
// renderer.shadowMap.enabled = true;
renderer.useLegacyLights = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(500, 400)
scene.background = new Color(0xffffff)

const light = new AmbientLight(0xffffff, 1)
scene.add(light)

// 添加相机
const camera = new PerspectiveCamera(45, 500 / 400, 0.25, 100)
camera.position.set(0, 0, 10)

const container = ref()
const loader = new GLTFLoader()

// 添加点光源
const spotLight = new SpotLight(0xffffff, 50)
spotLight.position.set(10, 0, 10)
// spotLight.penumbra = 0.2
// spotLight.castShadow = true
scene.add(spotLight)


// 添加控制器
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 1, 0 );
controls.update();

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

onMounted(async () => {

  const model_res = await loader.loadAsync('./_models/macbook_pro.gltf')
  scene.add(model_res.scene)
  renderer.render(scene, camera)
  container.value.innerHTML = ''
  container.value.appendChild(renderer.domElement)
  animate()
})


const rotateNum = ref(0)

function rotate() {
  rotateNum.value += 1
  scene.rotateY(Math.PI / 180 * rotateNum.value)
}

function clear() {
  scene.clear()
}

</script>
<template>
  <div class="container" ref="container">

  </div>
  <div>
    <button @click="rotate">旋转</button>
    <button @click="clear">清空</button>
  </div>
</template>
<style scoped>
.container {
  width: 500px;
  height: 400px;
}
</style>
