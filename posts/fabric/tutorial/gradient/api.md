## API

### 属性

| 属性名                 | 说明                                        | 默认值                                                      |
|---------------------|-------------------------------------------|----------------------------------------------------------|
| `offsetX`           | 横向偏移                                      | `0`                                                      |
| `offsetY`           | 横向偏移                                      | `0`                                                      |
| `gradientTransform` | 渐变色变换矩阵                                   | `null`                                                   |
| `gradientUnits`     | 计算单位, 像素(`'pixels'`)或者百分比(`'percentage`') | `'pixels'`                                               |
| `type`              | 渐变的类型, 线性渐变(`'linear'`)与径向渐变(`'radial'`)  | `'linear'`                                               |
| `coords`            | 渐变的定位(起点,终点,半径)                           | `{ x1: 0, y1: 0, x2: 0, y2: 0 }`, 径向渐变还包含 `r1: 0, r2: 0` |
| `colorStops`        | 渐变的色块分布                                   | `[]`                                                     |
| `excludeFromExport` | 是否在canvas序列化的时候忽略                         | `false`                                                  |

### 方法

#### addColorStop

用于追加色块.

`addColorStop(colorStops: Record<string, string>)`

#### toObject

用于将渐变色转为对象, 用于序列化

`toObject(propertiesToInclude?: (keyof this | string)[]): Object`

+ `propertiesToInclude`: 额外需要保留的属性(原始属性之外的业务追加属性)

#### toSVG

用于将渐变色对象转为SVG 渐变色标签(`<linearGradient>`, `<radialGradient>`)

`toSVG(object: FabricObject, { additionalTransform: preTransform }: { additionalTransform?: string } = {})`

+ `additionalTransform`: 额外的渐变色变换, 会被应用在 SVG Gradient 标签的 `gradientTransform` 属性上

#### toLive

将 `FabricGradient` 对象转为 [`CanvasGradient`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient#instance_properties) 对象, `CanvasGradient` 可供原始 Canvas 上下文(`CanvasRenderingContext2D`)使用.

`toLive(ctx: CanvasRenderingContext2D): CanvasGradient`

+ `ctx`: canvas 2d上下文

```ts
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gradient = new fabric.Gradient({
  coords: {
    x1: 0,
    y1: 0,
    x2: rect.width,
    y2: 0
  },
  colorStops: [
    { offset: 0, color: '#000' },
    { offset: 1, color: '#fff' },
  ]
})

ctx.fill = gradient.toLive(ctx) // [!code hl]
```

#### fromElement <Badge text="static" type="warning" />

由 SVG 标签创建 Fabric 渐变色对象

`fabric.Gradient.fromElement(el: SVGGradientElement, instance: FabricObject, svgOptions: SVGOptions)`

+ `el`: SVG渐变色标签(`<linearGradient>`, `<radialGradient>`)
+ `instance`: Fabric 实例
+ `svgOptions`: SVG 选项

比如我们已有一个SVG渐变标签

```html
<radialGradient id="radialGrad">
  <stop offset="0" stop-color="rgb(255,255,255)"></stop>
  <stop offset="0.5" stop-color="rgb(0,0,0)"></stop>
  <stop offset="1" stop-color="rgb(255,255,255)"></stop> 
</radialGradient>
```

使用该方法将上面标签转为fabric gradient对象

```ts
const gradientEl = document.querySelector('#radialGrad')
const fabricGrad = fabric.Gradient.fromElement(gradientEl)
```
