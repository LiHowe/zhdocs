### 多个元素动画

我们也可以使用 `obj.animate` 来分别为待配置对象设置动画, 也可以使用 `fabric.util.animate(option)` 来为多个元素同时添加动画.

比如我们同时将两个矩形旋转180°, 一个顺时针一个逆时针.

```ts
const r1 = new fb.Rect({ 
  width: 80,
  height: 30,
  fill: '#42b883',
  left: 40,
  top: 40,
})
const r2 = fb.util.object.clone(r1)
// 调整第二个矩形位置, 并设置原点为右上角
r2.set({
  'left': r1.left + r1.width,
  originX: 'right',
  originY: 'top'
})
canvas.add(r1, r2)

fabric.util.animate({
  startValue: 0,
  endValue: 180,
  duration: 2000,
  onChange: (angle: number) => {
    r1.set('rotate', angle)
    r2.set('rotate', -angle)
    canvas.requestRenderAll()
  }
})

```
