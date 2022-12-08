---
title: 组合 - Group
---

<script setup>
import GroupDemo from './demos/Group.vue'

</script>

# {{ $frontmatter.title }}

在我们平时的使用过程中, 单一的图形并不一定可以满足我们的开发需求, 有时候我们需要将多个元素
组合成为一个新的元素进行合并控制, 这时候我们就需要用到 Group 来操作.

## 使用

`Group` 也是继承于 `Fabric.Object` , 所以一些基础的位置设置等与图形设置相同.

### 创建组合

`new fabric.Group([待组合元素列表], options)`

例如, 我们要将一个 Text 与一个 Circle 组合成一个新元素

```typescript
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
const group = new fabfic.Group([text, circle], {
  top: 20,
  left: 20,
})

fb.add(group)
```

<Image src="https://s2.loli.net/2022/12/07/LUv5JVWYxBOfi7n.png" title="运行结果" />

可以看到, 组合后的图形左上角的位置为我们所设置的 (top, left), 但是组合内的元素定位却相对于
**组合内所有元素的 left, top 最小值进行定位**, 也就是 `(0, 10)`

白话来讲就是每个元素的left都减去0, top都减去10后基于 group 的左上角进行定位.

### 修改组合内元素

那么, 如何让元素都居中呢?

我们需要给组内元素的 `left` 和 `top` 属性设置为 `0`, 然后添加 `originX`, `originY` 属性并设置
为 `center` 即可.

```typescript
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

```typescript
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

### 追加元素

那么, 我又想**为组合添加一些新的元素**, 该如何操作呢?

::: tip 先说结论, 有兴趣的可以阅读详细内容

+ 使用 `addWithUpdate` 和 `removeWithUpdate` 来更新Group元素.
+ 将画布上已存在的元素添加到 Group 的操作顺序应该如下
  1. 调用 `clone()` 方法来复制一个待添加元素的副本
  2. 将副本添加到Group中
  3. 移除源元素

:::

fabric 提供了2种方式供我们添加/移除元素, 一种是添加/移除元素并更新Group尺寸和大小, 另一种则是不更新.

+ 更新组合尺寸及大小
  + `addWithUpdate`
  + `removeWithUpdate`
+ 不更新组合尺寸及大小
  + `add`
  + `remove`

待添加的元素其实也分为两种, 一种是已经在画布上绘制的元素, 一种是还未在画布上绘制的元素, 接下来我们根据这几种情况来
试验一下 addwithUpdate 与 add 的区别(在Playground中进行试验)

1️⃣ 我们先来尝试下在**空**画布上使用 `add` 添加一个只有一个Rect的Group, 并查看效果

```typescript
const g = new fabric.Group()
g.add(new fabric.Rect({
  width: 30,
  height: 30,
  left: 30,
  top: 30,
  fill: '#c4d9e9'
}))

// c 是 fabric canvas 实例
c.add(g)
// 更新画布
c.renderAll()
```

2️⃣ 在上一步的基础上使用 `addWithUpdate` 为 Group 添加一个新的 Rect, 并查看效果

```typescript
g.addWithUpdate(new fabric.Rect({
  width: 20,
  height: 20,
  fill: '#a9e890'
}))
c.renderAll()
```

3️⃣ 为画布添加一个 Rect, 然后将该 Rect 使用 `add` 添加到上一步的 Group 中

```typescript
const r1 = new fabric.Rect({
  width: 50,
  height: 50,
  fill: '#890123'
})
c.add(r1)
g.add(r1)
c.renderAll()
```

4️⃣ 为画布再添加一个 Rect, 然后使用 `addWithUpdate` 添加到 Group 中

```typescript
const r2 = new fabric.Rect({
  width: 50,
  height: 50,
  fill: '#193353'
})
c.add(r2)
g.addWithUpdate(r2)
c.renderAll()
```

## Playground

<GroupDemo />


## API

### `add(...objects: FabricObject[])`

为组合添加多个元素, 会触发被移除元素的 `added` 事件.

### `insertAt(index: number, ...objects: FabricObject[])`

在指定位置添加多个元素, 会触发被移除元素的 `added` 事件.

### `remove(...objects: FabricObject[])`

移除组合内多个元素, 会触发被移除元素的 `removed` 事件.

### `removeAll()`

移除全部元素, 会触发被移除元素的 `removed` 事件.

