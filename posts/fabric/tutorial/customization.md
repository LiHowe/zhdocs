---
title: 自定义 - Customization
---

# {{ $frontmatter.title }}



## 自定义鼠标框选样式 - Selection

fabric 默认的框选矩形样式为 

<Image src="./pics/customization-selection.png" title="默认框选样式" />

控制框选样式的属性有以下几个:

+ `selectionColor`： 框选颜色（矩形的填充色）
+ `selectionBorderColor`：框选矩形的边框的颜色
+ `selectionLineWidth`：框选矩形边框的粗细

<Demo>

```ts
const c = new fabric.Canvas('c')
c.selectionColor = 'rgba(187 222 251/.1)'
c.selectionBorderColor = '#2196f3'
c.selectionLineWidth = 1
```

<FabricContainer :mounted="mounted1" ></FabricContainer>
</Demo>

## 元素选中样式

fabric 默认的元素选中样式为

<Image src="./pics/img.png" title="元素默认选中样式"/>

我们可以通过以下属性设置来修改默认样式：

+ `borderColor`: 边框颜色
+ `cornerColor`: 控制点颜色
+ `cornorSize`: 控制点的大小
+ `transparentCorners`: 不填充控制点
+ `hasBorders`: 是否有边框
+ `hasControls`: 是否有控制点
+ `hoverCursor`: 鼠标hover在元素上的样式， 默认为 `move`


<Demo>

```ts

```

<FabricContainer :mounted="mounted2">
  <template #ops v-if="rect">
    <Color v-model="rect.borderColor" title="borderColor" />
    <Color v-model="rect.cornerColor" title="cornerColor" />
    <Cbx v-model="rect.transparentCorners" label="transparentCorners"/>
    <Cbx v-model="rect.hasControls" label="hasControls"/>
    <Cbx v-model="rect.hasBorders" label="hasBorders"/>
  </template>
</FabricContainer>

</Demo>

<script setup>
import FabricContainer from '../components/FabricContainer.vue';
import Runnable from '../components/Runnable.vue'
import Color from '../../.vitepress/components/Color.vue'
import { ref } from 'vue'

function mounted1(fb, c) {
  c.selectionColor = 'rgba(187 222 251/.1)'
  c.selectionBorderColor = '#2196f3'
  c.selectionLineWidth = 1
}

const rect = ref(null);

function mounted2(fb, c) {
  const r = new fabric.Rect({ width: 40, height: 40, fill: '#e9e9e9'})
  c.add(r)
  rect.value = r
}
</script>

## 锚点样式

## 参考链接

+ [fabric Demo - Customization](http://fabricjs.com/customization)
