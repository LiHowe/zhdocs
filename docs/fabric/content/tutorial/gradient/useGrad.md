### 为对象添加渐变

渐变可以用于图形的填充(`fill`)与边框(`stroke`)

<Runnable type="view" static auto>

```ts
const gap = 10

// 矩形
const rect = new fabric.Rect({
  width: 100,
  height: 50,
  top: gap,
  left: gap
})
// 线性渐变 - pixels(像素)单位
const linearGradient = new fabric.Gradient({
  type: 'linear',
  gradientUnits: 'pixels',
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
rect.fill = linearGradient

// 圆形
const circle = new fabric.Circle({
  radius: 60,
  left: rect.width + rect.left + gap,
  top: gap,
})
// 径向渐变 - percentage(百分比)单位
const radialGradient = new fabric.Gradient({
  type: 'radial',
  gradientUnits: 'percentage',
  coords: {
    x1: 0.5,
    y1: 0.5,
    x2: 0.5,
    y2: 0.5,
    r1: 0,
    r2: 1,
  },
  colorStops: [
    { offset: 1, color: '#646cff' },
    { offset: 0, color: new fabric.Color('#fff').toRgba() },
  ]
})

// 线段
const line = new fabric.Line([0,0,100,0], {
  top: gap,
  left: circle.left + circle.width + gap,
  stroke: '#000',
  strokeWidth: 5,
})
// 使用rect的渐变作为边框填充
line.set('stroke', linearGradient)

// 或者 circle.set('fill', radialGradient)
circle.fill = radialGradient
canvas.add(rect, circle, line)

```

</Runnable>
