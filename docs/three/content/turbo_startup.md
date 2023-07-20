# 弹射起步 <Badge type="warning" text="WIP:最后编写" />

本文主要用于需要快速(临时)使用 Three.js 并不想深究的朋友, 以问答的方式进行编写, 根据自己的需求直接找对应的块进行阅读即可.

## 如何添加控制器来使场景可以放大缩小以及移动

关键词: `OrbitControls`

传入你的 `camera` 以及 `renderer` 的 DOM元素来实例化一个 `OrbitControls` 即可

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 添加控制器
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 1, 0 );
controls.update();
```


## 如何获得更好的光照效果

```js
renderer.useLegacyLights = false;
```

## 如何应对高清屏

```js
renderer.setPixelRatio( window.devicePixelRatio );
```

## 抗锯齿

```js
const renderer = new WebGLRenderer({
  antialias: true,
});
```

## 如何设置背景色

```js
const scene = new Scene();
scene.background = new Color(0x4c4c4c); // 设置你需要的颜色
```
