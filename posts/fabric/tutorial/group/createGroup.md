`new fabric.Group([待组合元素列表], options)`

例如, 我们要将一个 Text 与一个 Circle 组合成一个新元素

<Runnable type="view">

```ts
// 创建文本
const text = new fabric.Text('文本', {
  left: 10,
  top: 10,
  fontSize: 20,
})

// 创建圆形
const circle = new fabric.Circle({
  radius: 50,
  left: 0,
  top: 20,
  scaleY: 0.5,
  fill: '',
  stroke: '#000',
})

// 创建组合, 将文本与圆形传入
const group = new fabric.Group([text, circle], {
  top: 20,
  left: 20,
})

canvas.add(group)
canvas.setActiveObject(group)
```

</Runnable>

可以看到, 组合后的图形左上角的位置为我们所设置的 `(top, left)`, 但是组合内的元素定位却相对于
**组合内所有元素的 left, top 最小值进行定位**, 也就是 `(0, 10)`

白话来讲就是每个元素的left都减去0, top都减去10后基于 group 的左上角进行定位.
