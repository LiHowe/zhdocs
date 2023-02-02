---
title: 路径 - Path
---

# {{ $frontmatter.title }}

fabric 还支持类似于SVG路径的路径元素, 比如我们有以下路径字符串
`'M 0 0 L 200 100 L 170 200 z'`, 该路径为一个三角形.

我们使用fabric来绘制该路径

```ts
const canvas = new fabric.Canvas()
const path = new fabric.Path('M 0 0 L 200 100 L 170 200 z')
// 设置path图形的位置
path.set({ left: 120, top: 120 })
canvas.add(path)
```

<Image src="/imgs/shape_triangle.png" title="路径绘制结果" />

:::details SVG path相关字符含义

| 字符 | 含义                      | 语法                  |
| ---- | ------------------------- | --------------------- |
| `M`  | `move to` 移动到(起点)    | `M x y`               |
| `L`  | `line to` 划线到          | `L x y`               |
| `H`  | `horizontal line` 水平线  | `H x`                 |
| `V`  | `vertical line` 垂直线    | `V y`                 |
| `C`  | `cubic bezier` 贝塞尔曲线 | `C x1 y1, x2 y2, x y` |
| `Z`  | `close path` 结束路径     | `Z`                   |

更多字符请前往[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)查看
:::

但是平时我们并不会手动的去逐个点去用代码编写Path图形, 所以 fabric 也提供了 [`fabric.loadSVGFromString`](/apis/canvas/parts/loadSVGFromString.md)
与 [`fabric.loadSVGFromURL`](/apis/canvas/parts/loadSVGFromURL.md) 来供我们加载 SVG 图形.

比如我们从 iconFont 随便找一个 SVG 图标下载下来放到项目文件夹内, 然后通过 `fabric.loadSVGFromURL` 的方式去加载这个SVG文件.

```html
<canvas id="pathCanvas" width="300" height="200"></canvas>
<button id="loadBtn">加载SVG</button>
<script>
const el = document.querySelector('#pathCanvas')
const fb = new fabric.Canvas(el)

const btn = ducument.querySelector('#loadBtn')

btn.addEventListener('click', () => {
  fabric.loadSVGFromURL('/svg/demo1.svg', res => {
    const group = new fabric.Group(res)
    fb.add(group)
  })
})

</script>
```

<Demo>
<canvas ref="pathCanvas" width="500" height="200"></canvas>
<el-button @click="load">点击加载SVG</el-button>
</Demo>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fabric } from 'fabric'
import Empty from '/svg/demo1.svg'

console.log(Empty)

const pathCanvas = ref()

const pathFb = ref(null)

onMounted(() => {
  const f = new fabric.Canvas(pathCanvas.value)
  pathFb.value = f
  
})

function load() {
  fabric.loadSVGFromURL(Empty, (results) => {
    const group = new fabric.Group(results)
    pathFb.value.add(group)
  })
}

</script>
