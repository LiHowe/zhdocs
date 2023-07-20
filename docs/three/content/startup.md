# 起步


## 1. 安装

```shell
pnpm add three
# npm
npm install three
```

`Three.js` 支持按需引用, 所以使用方式有以下两种:

1. 全量引用

  ```ts
    import * as Three from 'three'
  ```

2. 按需引用

  ```ts
  import { Scene } from 'three'
  ```


## 2. 简单的Demo

可以先不用理解 Demo 的细节, 先简单体验下 Three.js.

<script setup>
import StartUpDemo from './StartUpDemo.vue'
</script>

<StartUpDemo />


从这个 Demo 中可以得到接下来要学习的功能/特性

1. 场景(Scene)
2. 光照(Light)
3. 几何体(Geometry)
4. 材质(Material)
5. 渲染器(Renderer)
6. 动画(Animation)
7. 控制(Control)

以及一些 Demo 未涉及的功能

+ 网格(Mesh)
+ 辅助器(Helper)
+ 加载器(Loader)
+ 音频(Audio)
+ 物体(Object)
+ 纹理贴图(Texture)

