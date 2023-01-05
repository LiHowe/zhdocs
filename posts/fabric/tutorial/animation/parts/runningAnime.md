## 查看正在运行的动画

`runningAnimations` 包含了当前正在执行的动画, 还提供了以下几种方法供我们查找及取消动画

+ `cancelAll()`: 取消全部动画
+ `cancelByCanvas(canvas)`: 取消指定画布动画
+ `cancelByTarget(target)`: 取消指定对象动画
  
+ `findAnimation(cancelFn)`: 根据指定动画的 cancel 方法查找动画
+ `findAnimationIndex(cancelFn)`: 根据指定动画的 cancel 方法查找动画下标
+ `findAnimationsByTarget(target)`: 根据指定对象查找动画

<Runnable type="view">

```ts
let rect

addBtn({
  label: '1.添加矩形',
  onClick: () => {
    if (rect) return
    rect = new fabric.Rect({
      width: 30,
      height: 30,
      fill: '#aaad1c'
    })

    canvas.add(rect)
    canvas.centerObject(rect)
    canvas.setActiveObject(rect)
  }
})

let flag = true

addBtn({
  label: '2.执行动画',
  onClick: () => {
    flag = true
    cancel = rect.animate({
      angle: `+=${Math.random() * 90}`,
    }, {
      duration: 2000,
      onChange() {
        canvas.requestRenderAll.call(canvas)
      },
      abort() {
        if (!flag) return true
      },
      onComplete() {
        rect.set('fill', `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)
      }
    })
  }
})

addBtn({
  label: '取消动画',
  onClick: () => {
    flag = false
    // console.log(fabric.runningAnimations)
    // fabric.runningAnimations.cancelAll()
  }
})

addBtn({
  label: '循环动画',
  onClick: () => {
    function ani() {
      fabric.utils.animate({
        endValue: '+=10',
        onComplate: ani,
        onChange() {
          canvas.requestRenderAll()
        }
      })
    }
  }
})
```

</Runnable>
