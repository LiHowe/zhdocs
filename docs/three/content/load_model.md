
# 模型引用

模型分为以下几种

| 模型类型                                                     | 说明          | 后缀名             | 加载器        | 
|----------------------------------------------------------|-------------|-----------------|------------|
| [glTF](https://www.khronos.org/gltf)                     | 推荐使用        | `.glb`, `.gltf` | GLTFLoader |
| [obj](https://en.wikipedia.org/wiki/Wavefront_.obj_file) | 搭配mtl材质信息使用 | `.obj`          | OBJLoader  |
| mtl                                                      | obj 的材质信息   | `.mtl`          | MTLLoader  |


<script setup>
import LoadGun from './LoadGun.vue'
</script>

<LoadGun />
