
那么, 如何让元素都居中呢?

我们需要给组内元素的 `left` 和 `top` 属性设置为 `0`, 然后添加 `originX`, `originY` 属性并设置
为 `center` 即可.

```ts
// 创建文本
const text = new fabric.Text('文本', {
  left: 10, // [!code --]
  top: 10, // [!code --]
  originX: 'center', // [!code ++]
  originY: 'center', // [!code ++]
  fontSize: 20,
})

// 创建圆形
const circle = new fabric.Circle({
  radius: 50,
  left: 0, // [!code --]
  top: 20, // [!code --]
  originX: 'center', // [!code ++]
  originY: 'center', // [!code ++]
  scaleY: 0.5,
  fill: '',
  stroke: '#000',
})

// 创建组合, 将文本与圆形传入
const group = new fabfic.Group([text, circle], {
  top: 20,
  left: 20,
})

fb.add(group)
```

<Image src="https://s2.loli.net/2022/12/07/CSOVAEDYKTyjx1e.png" title="组合元素居中" />

有同学要问了, 那我已经组合好了, 该**如何修改组合内元素的属性啊**?

下面列举一些常用的获取Group元素的方法

+ `getObjects()`: 获取全部组合中的元素
+ `size()`: 获取组合中的元素数量
+ `item(idx)`: 获取组合中指定下标的元素
+ `forEachObject(cb)`: 用来遍历组合中元素

所以, 我们可以使用多种方式来处理组合中的元素, 这里就不一一说明了.

```ts
// 居中全部元素
group.forEachObject(item => {
  item.set({
    left: 0,
    top: 0,
    'originX': 'center',
    'originY': 'center',
  })
})
fb.requestRenderAll()

// 居中单个元素
group.item(0).set({
  left: 0,
  top: 0,
  'originX': 'center',
  'originY': 'center',
})
```
