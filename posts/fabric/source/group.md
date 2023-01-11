---
title: 组合 - Group
source: src/shapes/group.class.ts
---

# {{ $frontmatter.title }} <Badge type="warning" text="wip"/>

源码位置: `{{ $frontmatter.source }}`.

在我们阅读源码之前, 我们可以先想一想自己要如何实现 Group 的功能.

::: details 自己的简单思路
1. 因为Group涉及到元素的添加、删除、查询, 也就是类似于Array的一系列操作方式, **所以 Group 应该有一个 `objects` 属性用来存放该 Group 所包含的全部元素**, 然后为 Group 添加 `add`, `remove`, `clear`, `find` 等常用操作方法.
2. 在添加元素之后, **需要建立 Group 坐标与元素坐标之间的联系**, 使得在 Group 的坐标变更时, 其内部的元素均会相对于 Group 的位置进行变化.
3. Group 的宽高根据内部元素的边界进行计算, 当内部元素位置发生变化时, 需要重新计算 Group 的大小.
:::

## 源码结构

首先, 源码整体大致结构如下:

```ts
// 一些方法的 import... 
// 一些类型定义 ...

export class Group extends createCollectionMixin(FabricObject<GroupEvents>) { /* ... */ }

export const groupDefaultValues: Partial<TClassProperties<Group>> = { /* ... */ }

Object.assign(Group.prototype, groupDefaultValues);

fabric.Group = Group;
```

我们可以看到 Group 的原型被赋值为 `groupDefaultValues`, 很显然这个值为 Group 对象的默认配置,
让我们先忽略这些默认值配置, 先来看一下 Group 的具体代码.

## 实现

首先, 我们在 Group 类的定义上可以看到, Group 继承了 `createCollectionMixin(FabricObject<GroupEvents>)`,
而 `Collection` 是 Fabric 实现的用于操作集合的类, 所以, **Group 默认拥有集合的属性及方法.**

### 属性定义

接下来看一下 Group 定义了哪些属性

+ `layout`

表明组合的策略, 用于根据不同的策略计算布局. 目前内置策略有:  
`fit-content`, `fit-content-lazy`, `fixed`, `clip-path`

+ `subTargetCheck`

如果不需要组合内的元素作为事件目标, 则可以设置为 `false` 以优化性能.

+ `interactive`

是否允许组合内的元素被点选, 需要与 `subTargetCheck` 同时启用

+ `_activeObjects`<Badge type="warning" text="protected"/>

内部用于优化性能, 用于记录当前组合内被选中的元素.  
当组合内的元素被选中的时候, Group实例将会抛开被选中元素进行渲染, 这样可以保证在整个选中元素的交互过程中, Group实例仅会被缓存一次.

先简单熟悉一下上面的属性, 这些属性将会在下面的源码分析中用到.

### 构造函数

#### 源码

```ts {22,25-29}
export class Group extends createCollectionMixin(FabricObject<GroupEvents>) {
  constructor(
    objects: FabricObject[] = [],
    options: any = {},
    objectsRelativeToGroup?: boolean
  ) {
    // 调用父类Collection构造函数
    super();
    // 初始化组合元素
    this._objects = objects || [];
    // 绑定方法上下文
    this.__objectMonitor = this.__objectMonitor.bind(this);
    this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, true);
    this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, false);
    
    // 初始化 完成首次初始化布局 标识为false
    this._firstLayoutDone = false;
    // 初始化属性
    this.set({ ...options, angle: 0, skewX: 0, skewY: 0 });
    // 遍历传入的待组合元素, 调用私有方法: enterGroup
    this.forEachObject((object) => {
      this.enterGroup(object, false);
    });
    // 应用初始布局策略
    this._applyLayoutStrategy({
      type: 'initialization',
      options,
      objectsRelativeToGroup,
    });
  }
}
```

构造函数主要做了以下事情:
1. 初始化部分属性及方法的定义
2. 将 `objects` 与组合做关联
3. 应用初始布局策略

我们来看一下构造函数中比较重要的两个方法 `enterGroup` 与 `_applyLayoutStrategy`

#### enterGroup

该方法主要是预处理已经有Group的元素, 然后再调用内部的 `_enterGroup` 进行后续操作.

1. 如果Group开启了 `subTargetCheck`, 则添加的元素将会重新计算坐标
2. 添加的元素会更新 `group` 与 `canvas` 属性, 为了建立元素与Group间的联系
3. 如果Group开启了 `interactive` 则为元素添加 `changed`、`modified`、`selected`、`deselected` 事件监听.
4. 如果添加的元素是当前画布被选中的元素或者其子元素, 则将其放入 `_activeObjects` 集合中进行记录.

#### _enterGroup

```ts
_enterGroup(object: FabricObject, removeParentTransform?: boolean) {
  if (removeParentTransform) { /*传入的为false, 暂时忽略*/ }
  // 如果Group对象设置了subTargetCheck, 则重新计算元素的坐标
  this._shouldSetNestedCoords() && object.setCoords();
  // 更新元素的 group 与 canvas 信息
  object._set('group', this);
  object._set('canvas', this.canvas);
  // 如果Group对象开启了interactive(组内元素点选), 则启用对象监听
  this.interactive && this._watchObject(true, object);
  const activeObject =
    this.canvas &&
    this.canvas.getActiveObject &&
    this.canvas.getActiveObject();
  // 如果添加的对象为当前被选中的元素(或者其子元素)
  if (
    activeObject &&
    (activeObject === object || object.isDescendantOf(activeObject))
  ) {
    // 将其放入 选中对象数组
    this._activeObjects.push(object);
  }
}
```

#### _applyLayoutStrategy

初始化布局的逻辑:  
计算对象边界框(Bounding Box) 然后将其根据入参(`width`, `height`, `top`, `left`)进行转换, 使得组合元素位于组合的中央.

> 如果需要自定义布局, 可以覆写该方法.

1. 根据布局策略计算当前组合的中心点以及宽高
2. 触发 `layout` 钩子与事件监听

  ```ts
  this.onLayout(context, result);
  this.fire('layout', {
    context,
    result,
    diff,
  })
  ```

3. 如果当前组合为其他组合的子元素, 则递归更新父组合的布局策略


## 添加、移除元素

1. 触发 `object:added` 或 `object:removed` 事件
2. 重新计算 Group 的布局
3. 将 Group 对象的 `dirty` 标识置为 `true` 以便在下次渲染时更新.


## Group 默认值

```ts
export const groupDefaultValues: Partial<TClassProperties<Group>> = {
  type: 'group', // 表明对象的类型
  layout: 'fit-content', // Group的布局方式
  strokeWidth: 0, // 边框宽度
  stateProperties: fabricObjectDefaultValues.stateProperties.concat('layout'), // 状态属性
  subTargetCheck: false, // 是否允许组合内目标被选中
  interactive: false, // 是否允许交互
}
```
