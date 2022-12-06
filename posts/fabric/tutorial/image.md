---
title: 图片 - Image
---

# {{ $frontmatter.title }}

fabric 支持以下几种方式来创建图片对象

1. 使用现有 `<img>` 标签创建 (`new fabric.Image`)
2. 使用fabric导出的object信息(`Image.fromObject`)
3. 指定图片的URL来异步加载(`Image.fromURL`)
4. 从现有 `<image>` 标签创建(`Image.fromElement`)

`fromURL`  与 `fromElement` 方法都接收三个参数, 分别为:

`callback(img, failed, options)`

> 下个版本(6.x)会取消callback处理异步的方式, 改用 Promise.

+ `img`: 加载成功返回的 fabric Image 对象, 加载失败返回 null
+ `failed`: 图片是否加载失败
+ `options`: 支持传入 `signal` 来取消请求.

:::tip 提示

`fromElement` 本质上是获取图片URL再使用 `fromURL` 进行加载图片

:::

## 使用

比如我们现有一个 SVG `<image>` 标签, 如下图

<svg  width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image id="imageDemo" xlink:href="https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png" height="200" width="200" />
</svg>

### 从SVG图片加载

:::warning 注意事项

1. 需要直接传入 `<image>` 标签, 而不是包裹它的 `<svg>`
2. `<image>` 标签必须带有 `xlink:href` 属性(虽然已经被MDN标记废弃)

:::

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image id="svgImageDemo" xlink:href="https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png" height="200" width="200" /> // [!code hl]
</svg>
<canvas id="fb" width="200" height="200" ></canvas>

<script>
  // 获取图片标签
  const imgEl = document.querySelector('#svgImageDemo') // [!code hl]
  // 实例化 fabric 画布
  const fb = new fabric.Canvas('#fb')
  // 创建 fabric 图片对象
  fabric.Image.fromElement(imgEl, img => {
    // 将图片放入到画布
    fb.add(img)
  })
</script>
```

### 从URL加载

我们依旧使用前面给到的图片路径 `https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png`

```typescript
const fb = new fabric.Canvas('#fb')
fabric.Image.fromURL('https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png', img => {
  fb.add(img)
})
```

### 从 `<img>` 标签加载

可以直接 `new fabric.Image` 传入图片标签, 
也可以使用与[从URL加载](#从URL加载)类似的方法, 只不过需要从 `<img>` 标签中提取 `src` 属性而已

<img id="imageEl" src="https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png" height="200" width="200" style="display: none" />

```typescript
const fb = new fabric.Canvas('#fb')
const imgEl = document.querySelector('imageEl')
// 直接创建
const img = new fabric.Image(imgEl, {
  left: 10,
  top: 10,
})
fb.add(img)
// 使用fromURL
fabric.Image.fromURL(imageEl.src, imgx => {
  fb.add(imgx)
})
```


<Demo>
<canvas ref="imageCanvas" width="500" height="200"></canvas>
<Btn @click="loadImg(1)" :loading="loading">fromURL加载</Btn>
<Btn @click="loadImg(2)" :loading="loading">fromElement加载</Btn>
<Btn @click="loadImg(3)" :loading="loading">img标签加载</Btn>
</Demo>

<script setup lang="ts">

import { fabric } from 'fabric'
import { ref, onMounted } from 'vue'

const imageCanvas = ref()
const fb = ref()

const loading = ref(false)

onMounted(() => {
  fb.value = new fabric.Canvas(imageCanvas.value)
})

function loadImg(way) {
  loading.value = true
  switch(way) {
    case 2: {
       const img1 = fabric.Image.fromElement(document.querySelector('#imageDemo'), img => {
        console.log(img)
        fb.value.add(img)
        loading.value = false
      })
      break
    }
    case 1: {
      const img = fabric.Image.fromURL('https://s2.loli.net/2022/12/02/MJ7bfStW96GNVmk.png', (img, failed) => {
        fb.value.add(img)
        loading.value = false
      })
      break
    }
    case 3: {
      const img = new fabric.Image(document.querySelector('#imageEl'))
      loading.value = false
      fb.value.add(img)
      break
    }
  }
}

</script>

## 相关链接

+ [官网/Image](http://fabricjs.com/docs/fabric.Image.html)
