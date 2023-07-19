# Step 1


## 安装

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


## 常用设置

### `useLegacyLights`

是否使用传统光照, 默认为 `true` , 主要用于兼容老设备, 使光照为传统行为:

+ 只使用基础光照类型 (AmbientLight、DirectionalLight 等)
+ 使用旧版材质和着色语法,不支持 PBR 材质
+ 使用简化的光照计算和阴影算法
+ 只支持基础的阴影映射技术

现代设备及浏览器可以将该属性设置为 `false` 来追求更加的渲染效果及光照效果

+ 基于物理的渲染 (PBR)
+ 环境光遮蔽 (SSAO)
+ 平行光阴影映射
+ 点光和聚光源阴影
+ 更精确的阴影

