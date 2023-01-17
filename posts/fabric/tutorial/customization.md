---
title: 自定义样式 - Customization
---

# {{ $frontmatter.title }}

<script setup>
import Playground from './customization/samples/pg.vue'
</script>

## 鼠标框选样式 - Selection

fabric 默认的框选矩形样式为 

<Image src="./pics/customization-selection.png" title="默认框选样式" />

控制框选样式的属性有以下几个:

+ `selectionColor`： 框选颜色（矩形的填充色）
+ `selectionBorderColor`：框选矩形的边框的颜色
+ `selectionLineWidth`：框选矩形边框的粗细
+ `selection`: 是否支持框选

<Runnable type="view">

```ts
canvas.selectionColor = 'rgba(187 222 251/.1)'
canvas.selectionBorderColor = '#2196f3'
canvas.selectionLineWidth = 1
```

</Runnable>

## 画布背景

可以通过以下属性或方法来设置画布的背景
+ `backgroundColor`: 背景颜色
+ `setBaskgroundImage(url)`： 背景图片
+ `setOverlayImage(url)`: 设置前景图片


## 元素选中样式

fabric 默认的元素选中样式为

<Image src="./pics/img.png" title="元素默认选中样式"/>

我们可以通过以下属性设置来修改默认样式：

+ `hoverCursor`: 鼠标hover在元素上的样式， 默认为 `move`
+ `hasBorders`: 是否有边框
+ `borderColor`: 边框颜色
+ `hasControls`: 是否有控制点
+ `cornerColor`: 控制点颜色
+ `cornorSize`: 控制点的大小
+ `transparentCorners`: 不填充控制点
+ `cornerStyle`: 控制点形状

也可使用以下方法来调整不同位置控制点的显示状态.

+ `setControlVisible(位置, 是否显示)`: 设置控制点是否可见

<Image src="/imgs/controls.svg" title="控制点位置对照" />

## Playground

<Playground />

## 参考链接

+ [fabric Demo - Customization](http://fabricjs.com/customization)
+ [fabric Demo - Controls Customization](http://fabricjs.com/controls-customization)
