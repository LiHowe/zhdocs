### obj.animate

`obj.animate` 方法有两种使用方式

1. `obj.animate(attr, value, options)`: 单属性动画
2. `obj.animate(attrAndValues, options)`: 属性键值对, 可同时设置多个属性动画

比如, 我们想要为一个矩形的宽度设置动画, 使其相对于原 `width` 增大50, 那么我们可以使用以下写法

```ts
const rect = new fabric.Rect({
  width: 50,
  height: 50,
})

canvas.add(rect)
// [!code focus:12]
// 写法1
rect.animate('width', '+=50', {
  onChange: canvas.requestRenderAll.bind(canvas)
})

// 写法2
rect.animate({
  width: '+=50',
}, {
  onChange: canvas.requestRenderAll.bind(canvas)
})

```

::: tip 属性值变化写法

属性值可以写为绝对值, 也可以写为相对于当前属性值的相对值(变化值).

假设我们有一个 width 为 `100` 的 `rect`, 那么两种写法为:

**绝对值(宽度变为`200`):**

```ts
rect.animate('width', '200', {
  onChange: canvas.requestRenderAll.bind(canvas)
})
```

**相对值(相对于初始值`100`, 宽度变为 `100 + 200 = 300`):**

```ts
rect.animate('width', '+=200', {
  onChange: canvas.requestRenderAll.bind(canvas)
})
```

:::

那么 `options` 都支持哪些配置呢?

#### options

| 属性 | 说明 |
| --- | --- |
| `from` | 动画起始值 |
| `duration` | 动画持续时长, 默认是500ms |
| `delay` | 延迟, 默认0ms |
| `easing` | 缓动动画, 默认是defaultEasing(匀速) |
| `abort` | 结束动画的方法(提前完成, 返回 true 则代表动画完成) |
| `onChange` | 动画过程中调用的函数 |
| `onComplete` | 动画完成时调用的函数 |

其中, `abort`, `onChange`, `onComplete` 参数相同

| 参数名 | 说明 |
| --- | --- |
| `value`| 当前动画进度下的对应属性值 |
| `valueProgress`| 值变化的**进度**, 动画开始为0, 动画结束为1, 过程中为浮点数 |
| `timeProgress`| 当前动画的时间**进度**, 开始为0, 结束为1 |

+ `abort(value, valueProgress, timeProgress)`

结束动画的方法, 返回 `true` 则代表动画结束.

::: danger 注意事项
如果我们设置了键值对进行动画设置, 那么同一时间的 `abort` 方法调用次数将与键值对数量相对应.

+ **`abort` 的具体调用顺序与 `Object.keys(键值对)` 相同.**
+ **`abort` 返回 `true` 只表示对应属性的动画结束, 而非对象全部动画结束.**

比如:

```ts
// rect 初始 width 和 height 均为 20.
rect.animate({ width: '+=30', height: '=+20' }, {
  onChange: canvas.requestRenderAll.bind(canvas),
  abort: (value) => {
    if (value >= 50) return true
  }
})
```

这里 `abort` 每次会调用两次, 顺序为 `width` -> `height`, 当 `width` 变为 `50` 的时候, `width` 对应动画停止, 但是
`height` 动画会继续运行, 直到数值也符合 `>=50` 

:::

+ `onChange(value, valueProgress, timeProgress)`

对象动画过程中属性变化时触发

::: danger 注意事项
与 `abort` 不同的是, `onChange` 在多属性动画的时候只会触发 `Object.keys(键值对)` 中的最后一个属性值.
:::

+ `onComplete(value, valueProgress, timeProgress)`

对象动画全部结束后触发, 多属性下的触发行为与 `onChange` 一致
