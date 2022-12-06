---
title: Collection
source: collection.mixin.ts
docURL: http://fabricjs.com/docs/fabric.Collection.html
---

# {{ $frontmatter.title }}

`fabric.Collection` 为`fabric`定义的集合对象, 该对象主要用于作为其他对象父类从而为继承它的类提供对应的集合操作方法

整体源码没有什么阅读难度, 基本上该类可以理解为Array的包装类, 添加了元素添加与移除的钩子函数

## 对象定义一览

参照源码定义的interface, 可以一览对象提供的属性及方法, 便于查看与理解.  
源码请自行前往[GitHub](https://github1s.com/fabricjs/fabric.js/blob/HEAD/src/mixins/collection.mixin.ts)查看.

```typescript
// fabric集合对象
interface Collection {
  // 集合内对象
  _objects: FabricObject[]

  // 用于子类覆盖的钩子函数, 在元素添加后进行调用(add 和 insertAt)
  _onObjectAdded: (object: FabricObject) => void
  // 同上, 在元素移除后进行调用
  _onObjectRemoved: (object: FabricObject) => void

  // 相当于Array.prototype.push, 返回新集合长度
  add: (...objects: FabricObject[]) => number
  // 在集合指定位置插入对象(可多个)
  insertAt: (index: number, ...objects: FabricObject[]) => number
  // 移除对象(可多个)
  remove: (...objects: FabricObject[]) => FabricObject
  // 循环对象
  forEachObject: (callback: (
    object: FabricObject,
    index: number,
    array: FabricObject[]
  ) => any) => void
  // 获取集合元素, 如果指定了元素类型, 则只返回符合条件的元素
  getObjects: (...types: string[]) => FabricObject[]
  // 获取指定下标的对象
  item: (index: number) => FabricObject | undefined
  // 是否是空集合
  isEmpty: () => boolean
  // 获取集合大小
  size: () => number
  // 判断集合内是否已存在目标对象
  contains: (object: FabricObject, deep: boolean) => boolean
  // 返回集合复杂度
  complexity: () => number
}
```

### complexity

实质使用 `Array.prototype.reduce` 来遍历数组, 如果对象有 `complexity()` 方法(也就是嵌套), 则进行调用并累计复杂度, 最后返回遍历结束所累计的总复杂度.

为了便于理解, 这里使用 `Canvas` 来测试该方法:
> `fabric.Canvas` 是继承于 `Collection` 的

```typescript
  import { fabric } from 'fabric'
  let a = new fabric.Canvas()
  a.add(new fabric.Rect())
  a.add(new fabric.Rect())
  console.log(a.complexity()) // -> 2, 两个Rect
```
