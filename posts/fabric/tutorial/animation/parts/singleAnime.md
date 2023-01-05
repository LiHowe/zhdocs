### 单个元素动画

我们可以通过 `obj.animate(attr, targetValue, options)` 方法来为画布元素添加动画效果, 比如我们将一个矩形的宽度变为双倍

<Runnable type="view" show-code> 

```ts
const rect = new fabric.Rect({
  width: 30,
  height: 50,
  top: 0,
  left: 0,
  fill: '#42b883',
  selectable: false,
})
canvas.add(rect)
rect.animate('width', '+=50', {
  onChange: canvas.renderAll.bind(canvas)
})
```

</Runnable>

:::tip 为什么要写 onChange
因为 **`animate` 方法并不会自动帮我们调用 canvas 的渲染方法, 所以需要在 `onChange` 方法中自行调用渲染方法.**
:::
