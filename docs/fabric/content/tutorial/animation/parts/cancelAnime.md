## 取消动画

我们可以使用以下方法来取消对象动画:

1. 调用 `animate` 方法的返回值
2. 调用对象的 `dispose()` 方法
3. 调用 `fabric.runningAnimations.cancelByTarget(target)`, target 传入待取消动画的对象

```ts
const cancelRect1Animate = rect1.animate('width', '+=10', {
  onChange: canvas.requestRenderAll.bind(canvas),
  duration: 2000
})

const cancelRect2Animate = fabric.util.animate({
  startValue: 0,
  endValue: 180,
  duration: 2000,
  onChange: (angle: number) => {
    rect2.set('rotate', -angle)
    canvas.requestRenderAll()
  }
})

// 取消动画
setTimeout(() => {
  cancelRect1Animate() // [!code hl]
  cancelRect2Animate() // [!code hl]
}, 1000)

```
