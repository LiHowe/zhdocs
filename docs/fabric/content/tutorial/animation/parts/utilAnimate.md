### fabric.util.animate

`fabric.util.animate(options)` 用于同时为多个对象添加动画, options 在 `object.animate` 基础上增加了

+ `startValue`: 起始值
+ `endValue`: 结束值

::: code-group

```ts [a.ts]
fabric.util.animate({
  startValue: 0,
  endValue: 100,
  duration: 2000,
  onChange: (value) => {
    rect.width = value
    canvas.requestRenderAll()
  }
})

```

```ts [b.ts]
fabric.util.animate({
  startValue: [1, 2, 3],
  endValue: [5, 6, 7],
  duration: 2000,
  onChange: ([x, y, angle]) => {
    rect.set({
      x, y, angle
    })
    canvas.requestRenderAll()
  }
})
```

:::

我们可以在 onChange 方法中同时修改多个对象的属性来使它们同时执行动画.

<Runnable type="view" static>

```ts
canvas.clear()

const rect = new fabric.Rect({
  width: 30,
  height: 40,
  fill: '#e9a931',
  selectable: false,
})

const circle = new fabric.Circle({
  radius: 40,
  fill: '#a31931',
  selectable: false,
})

canvas.add(rect, circle)

// 执行动画
function invokeAnime() {
  fabric.util.animate({
    startValue: [30, 0],
    endValue: [100, 100],
    onChange: ([width, left]) => {
      rect.set({
        width,
        top: left
      })
      circle.left = left
      canvas.requestRenderAll()
    }
  })
}

// 测试abort(宽度>=40停止动画)
function testAbort() {
  fabric.util.animate({
    startValue: [30, 0],
    endValue: [100, 100],
    onChange: ([width, left]) => {
      rect.set({
        width,
        top: left
      })
      circle.left = left
      canvas.requestRenderAll()
    },
    abort: ([width]) => {
      if (width >= 40) return true
    }
  })
}

// 往复播放
function testInfinity() {
  const startValue = [30, 0]
  const endValue = [100, 100]

  const time = Date.now()

  function anime(start, end) {
    fabric.util.animate({
      startValue: start,
      endValue: end,
      duration: 1000,
      onChange: ([width, left]) => {
        rect.set({
          width,
          top: left
        })
        circle.left = left
        canvas.requestRenderAll()
      },
      onComplete: _ => {
        anime.apply(this, start === startValue ? [endValue, startValue] : [startValue, endValue])
      }
    })
  }
  anime(startValue, endValue)
}

function cancelAnime() {
  fabric.runningAnimations.cancelAll()
}


addBtn({
  label: '执行动画',
  onClick: invokeAnime
})

addBtn({
  label: '测试abort(宽度>=40停止动画)',
  onClick: testAbort
})

addBtn({
  label: '往复播放',
  onClick: testInfinity
})

addBtn({
  label: '取消动画',
  onClick: cancelAnime
})

```

</Runnable>
