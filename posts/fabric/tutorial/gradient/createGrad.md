### 创建 Gradient 对象

创建渐变对象支持以下属性配置:

+ `type`: 渐变类型, 支持线性渐变(`linear`)与径向渐变(`radial`), 默认为 `'linear'`
+ `gradientUnits`: 渐变坐标单位, 支持像素(`'pixels'`)及百分比(`'percentage'`), 默认为像素

:::tip 说明
`pixels`模式下, x1, y1等设置为具体的像素, 比如 `x1: 50, y1: 50` 代表起点为 `(50px, 50px)`, 比较适用于元素大小固定的场景, 而百分比(`percentage`)模式下 `x1: 1, y1: 0` 代表起点为 `(100%, 0%)`, 百分比是相对于目标元素大小的, 比较适合元素大小不固定的场景.
:::

+ `coords`: 起点与终点的配置(径向渐变还包含半径)
+ `colorStops`: 色块配置
+ `offsetX`: 横轴偏移量
+ `offsetY`: 纵轴偏移量
+ `gradientTransform`: 应用在渐变色上的变换, [MDN|gradientTransform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientTransform)
+ `id`: 仅在转换为SVG的时候会用到, 作为SVG标签的id(`SVGID_${id}`)

<Play />

fabric 还支持使用 SVG `<radialGradient>` 标签来创建渐变色对象, 比如我们有以下渐变色标签

```html
<linearGradient id="linearGrad1">
  <stop offset="0%" stop-color="white"/>
  <stop offset="100%" stop-color="black"/>
</linearGradient>
```

使用上面的标签来创建 Fabric Gradient 对象:

```ts
const el = document.querySelector('#linearGrad1')
fabric.Gradient.fromElement(el)
```
