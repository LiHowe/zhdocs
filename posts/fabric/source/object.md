---
title: Fabric对象 | FabricObject
source: object.class.ts
---

<script setup>
import TutorialPlayground from '../components/TutorialPlayground.vue'
</script>

# {{ $frontmatter.title }}

FabricObject为 fabric 所有2d图形对象的父类, 部分图形继承链如下

![](https://s2.loli.net/2022/11/28/JxRqXQYyuHamsEN.png)

## 对象属性一览

| 属性名                         | 类型                                  | 描述                                                                                                           | 默认值                               | 备注         |
|-----------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------|-----------------------------------|------------|
| `type`                      | `string`                            | 对象类型                                                                                                         | `object`                          |            |
| **基础属性**                    |                                     |                                                                                                              |                                   |            |
| `top`                       | `number`                            | 顶部距离                                                                                                         | `0`                               |            |
| `left`                      | `number`                            | 左侧距离                                                                                                         | `0`                               |            |
| `width`                     | `number`                            | 宽度                                                                                                           | `0`                               |            |
| `height`                    | `number`                            | 高度                                                                                                           | `0`                               |            |
| `opacity`                   | `number`                            | 透明度                                                                                                          | `1`                               |            |
| `angle`                     | `number`                            | 旋转角度                                                                                                         | `0`                               |            |
| `padding`                   | `number`                            | 元素距离它控制边框的距离                                                                                                 | `0`                               |            |
| `fill`                      | `string`                            | 填充颜色                                                                                                         | `rgb(0,0,0)`                      |            |
| `fillRule`                  | `string`                            | 填充策略                                                                                                         | `nonzero`                         |            |
| `backgroundColor`           | `string`                            | 背景颜色                                                                                                         | `''`                              |            |
| `globalCompositeOperation`  |                                     | [合成操作类型](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) |                                   |            |
| `borderColor`               | `string`                            | 边框颜色                                                                                                         | `rgb(178,204,255)`                |            |
| `borderDashArray`           | `Array`                             | 边框虚线数组                                                                                                       | `null`                            |            |
| **控制点**                     |                                     |                                                                                                              |                                   |            |
| `cornerSize`                | `number`                            | 控制点的大小                                                                                                       | `13`                              | 负数也可以，取绝对值 |
| `cornerColor`               | `string`                            | 控制点颜色                                                                                                        | `rgb(178,204,255)`                |            |
| `cornerStrokeColor`         | `string`                            | 控制点边框颜色                                                                                                      | `''`                              |            |
| `cornerDashArray`           | `Array`                             | 控制点虚线                                                                                                        | `null`                            |            |
| `cornerStyle`               | `rect`, `circle`                    | 控制点形状                                                                                                        | `rect`                            |            |
| `transparentCorners`        | `boolean`                           | 透明控制点                                                                                                        | `true`                            |            |
| `touchCornerSize`           | `number`                            | 触控控制点的大小                                                                                                     | `24`                              |            |
| **变换**                      |                                     |                                                                                                              |                                   |            |
| `scaleX`                    | `number`                            | X轴缩放大小                                                                                                       | `1`                               |            |
| `scaleY`                    | `number`                            | Y轴缩放大小                                                                                                       | `1`                               |            |
| `skewX`                     | `number`                            | X轴偏转角度                                                                                                       | `0`                               |            |
| `skewY`                     | `number`                            | Y轴偏转角度                                                                                                       | `0`                               |            |
| `originX`                   | `number`, `center`, `left`, `right` | 对象变换的垂直中心                                                                                                    | `'left'`                          |            |
| `originY`                   | `number`, `center`, `top`, `bottom` | 对象变换的水平中心                                                                                                    | `'top'`                           |            |
| `flipX`                     | `boolean`                           | 水平翻转(渲染为水平镜像)                                                                                                | `false`                           |            |
| `flipY`                     | `boolean`                           | 垂直翻转(渲染为垂直镜像)                                                                                                | `false`                           |            |
| **边框**                      |                                     |                                                                                                              |                                   |            |
| `stroke`                    |                                     | 边框                                                                                                           | `null`                            |            |
| `strokeWidth`               | `number`                            | 边框宽度                                                                                                         | `1`                               |            |
| `strokeDashArray`           |                                     | 边框虚线                                                                                                         | `null`                            |            |
| `strokeDashOffset`          | `number`                            | 边框虚线偏移量                                                                                                      | `0`                               |            |
| `strokeLineCap`             | `string`                            | 边框                                                                                                           | `butt`                            |            |
| `strokeLineJoin`            | `string`                            | 边框线相交策略                                                                                                      | `miter`                           |            |
| `strokeMiterLimit`          | `number`                            | 相交限制                                                                                                         | `4`                               |            |
| `strokeUniform`             | `boolean`                           | 边框宽度是否随着对象缩放变化                                                                                               | `false`                           |            |
| **控制**                      |                                     |                                                                                                              |                                   |            |
| `perPixelTargetFind`        | `boolean`                           | 是否按照像素点查找元素（默认按边界框）                                                                                          | `false`                           |            |
| `includeDefaultValues`      | `boolean`                           | 对象序列化的时候是否包含默认值                                                                                              | `true`                            |            |
| `lockMovementX`             | `boolean`                           | 禁用水平移动                                                                                                       | `false`                           |            |
| `lockMovementY`             | `boolean`                           | 禁用垂直移动                                                                                                       | `false`                           |            |
| `lockRotation`              | `boolean`                           | 禁用旋转                                                                                                         | `false`                           |            |
| `lockScalingX`              | `boolean`                           | 禁用水平缩放                                                                                                       | `false`                           |            |
| `lockScalingY`              | `boolean`                           | 禁用垂直缩放                                                                                                       | `false`                           |            |
| `lockSkewingX`              | `boolean`                           | 禁用水平倾斜                                                                                                       | `false`                           |            |
| `lockSkewingY`              | `boolean`                           | 禁用垂直倾斜                                                                                                       | `false`                           |            |
| `lockScalingFlip`           | `boolean`                           | 禁用缩放翻转                                                                                                       | `false`                           |            |
| `excludeFromExport`         | `boolean`                           | 导出时排除(不导出)                                                                                                   | `false`                           |            |
| `objectCaching`             | `boolean`                           | 对象缓存                                                                                                         | `true`, Node环境为`false`            |            |
| `statefullCache`            | `boolean`                           | 有状态的缓存                                                                                                       | `false`                           |            |
| `noScaleCache`              | `boolean`                           | 缩放不更新缓存                                                                                                      | `true`                            |            |
| `paintFirst`                | `stroke`,`fill`                     | 先绘制边还是先填充                                                                                                    | `fill`                            |            |
| **其他设置**                    |                                     |                                                                                                              |                                   |            |
| `dirty`                     | `boolean`                           | 脏（是否需要重新渲染）                                                                                                  | `false`                           |            |
| `__corner`                  | `number`,`string`                   | 鼠标悬浮在元素上的最后一个角                                                                                               | `0`                               | 0为没有角      |
| `stateProperties`           | `Array<string>`                     | 决定对象状态是否变化的属性列表                                                                                              | 参考官网(太多了)                         |            |
| `cacheProperties`           | `Array<string>`                     | 需要缓存的属性列表                                                                                                    | 同上...太多了                          |            |
| `colorProperties`           | `Array<string>`                     | 支持颜色动画的属性                                                                                                    | `fill`,`stroke`,`backgroundColor` |            |
| `activeOn`                  | `down`,`up`                         | 对象触发时机                                                                                                       | `down`, mousedown/touchstart时候激活  |            |
| **剪裁路径**                    |                                     |                                                                                                              |                                   |            |
| `inverted`                  | `boolean`                           | 对象用作clipPath时候才有用，围绕对象外面剪裁                                                                                   | `false`                           |            |
| `absolutePositioned`        | `boolean`                           | 对象用作clipPath才有用，clipPath相对于画布的顶部和左侧                                                                          | `false`                           |            |
| **指针**                      |                                     |                                                                                                              |                                   |            |
| `hoverCursor`               | `string`                            | 鼠标hover元素的指针样式                                                                                               | `null`                            |            |
| `moveCursor`                | `string`                            | 鼠标移动的指针                                                                                                      |                                   |            |
| **引用**                      |                                     |                                                                                                              |                                   |            |
| [`aCoords`](#aCoords)       | `object`                            | 元素四个角的位置, `tl`, `tr`, `bl`, `br`                                                                             |                                   |            |
| [`lineCoords`](#lineCoords) | `object`                            | 包含了padding的四个角的位置                                                                                            |                                   |            |
| `group`                     | `object`                            | 所属组合对象                                                                                                       |                                   |            |
| `canvas`                    | `object`                            | 实际添加该元素的画布                                                                                                   |                                   |            |
| `ownMatrixCache`            | `object`                            | 元素变换矩阵的缓存                                                                                                    |                                   |            |


<ClientOnly>
<TutorialPlayground />
</ClientOnly>

## aCoords

用来标识对象角位置(比如矩形的四个顶点拐角), 该属性值为一个对象

```typescript
export type TCornerPoint = {
  tl: Point;
  tr: Point;
  bl: Point;
  br: Point;
}
```

![](https://s2.loli.net/2022/11/28/LFqTdBSHE6Vzmj8.png#crop=0&crop=0&crop=1&crop=1&id=kIE3Y&originHeight=166&originWidth=162&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

每个点(Point)对象的 `x`, `y` 取决于以下属性: `width`, `height`, `scaleX`, `scaleY`,
`skewX`, `skewY`, `angel`, `strokeWidth`, `top`, `left`

## lineCoords

用于对象检测, 描述对象角的位置,包括内边距(padding).
该属性值在`setCoords`时候被赋值与刷新

::: details 与 aCoords 的区别?
TODO

:::
