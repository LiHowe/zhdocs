<script setup>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  LineBasicMaterial,
  BoxGeometry,
  SpotLight,
  EdgesGeometry,
  LineSegments, AmbientLight, Color,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ref, onMounted } from 'vue'

const scene = new Scene();
scene.background = new Color(0x4c4c4c)

// 透视相机
const camera = new PerspectiveCamera( 75, 500 / 300, 0.1, 1000 );
camera.position.z = 5;

// 渲染器
const renderer = new WebGLRenderer({
  antialias: true, // 抗锯齿
});
// 设置渲染的canvas大小
renderer.setSize( 500, 300 );
// 高清屏
renderer.setPixelRatio( window.devicePixelRatio );
// 更好光照效果
renderer.useLegacyLights = false;

// 添加控制器
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();

const container = ref()

// 点光源
const light = new SpotLight(0xffffff, 50)
light.position.set(2, 2, 2)
scene.add(light)

// 有反射材质
const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshPhongMaterial( { color: 0x00a001 } );
const cube = new Mesh( geometry, material );

// 无反射材质
const cube_1 = cube.clone()
cube_1.material = new MeshBasicMaterial({ color: 0x00a001 })
cube_1.position.set(2, 0, 0)

// 边框
const edgeMaterial = new LineBasicMaterial({color: 0x007c01})
let cubeEdges = new EdgesGeometry(geometry, 1);
const cubeEdge = new LineSegments(cubeEdges, edgeMaterial)

scene.add( cubeEdge, cube, cube_1, light );

/**
 * 动画
 */
function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube_1.rotation.x += 0.01;
  cube_1.rotation.y += 0.01;
  cubeEdge.rotation.x += 0.01;
  cubeEdge.rotation.y += 0.01;

  renderer.render( scene, camera );
}

onMounted(() => {
  container.value.appendChild( renderer.domElement );
  animate();
})

</script>

<template>
  <Demo title="起步Demo - 旋转的立方体">
    <div class="start-demo" ref="container">

    </div>
  </Demo>
</template>

<style scoped>
.start-demo {
  width: 500px;
  height: 300px;
}
</style>
