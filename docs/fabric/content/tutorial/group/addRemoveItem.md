
那么, 我又想**为组合添加/移除一些元素**, 该如何操作呢?

::: tip 先说结论, 有兴趣的可以阅读详细内容

+ 使用 `addWithUpdate` 和 `removeWithUpdate` 来为Group添加或移除元素并更新Group
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

```ts
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

```ts
g.addWithUpdate(new fabric.Rect({
  width: 20,
  height: 20,
  fill: '#a9e890'
}))
c.renderAll()
```

3️⃣ 为画布添加一个 Rect, 然后将该 Rect 使用 `add` 添加到上一步的 Group 中

```ts
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

```ts
const r2 = new fabric.Rect({
  width: 50,
  height: 50,
  fill: '#193353'
})
c.add(r2)
g.addWithUpdate(r2)
c.renderAll()
```
