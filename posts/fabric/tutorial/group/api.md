### 属性

| 属性名                 | 说明                                        | 默认值                                                      |
|---------------------|-------------------------------------------|----------------------------------------------------------|
| `cacheProperties` | 缓存的属性列表 | `[]` |
| `strokeWidth` | 边框宽度 | |
| `subTargetCheck` | 组合内元素可触发鼠标事件 | `false` |
| `type` | 对象类型 | `group` |

### 方法

#### `add(...objects: FabricObject[])`

为组合添加多个元素, 会触发元素的 `added` 事件.

> 不会重新计算组合的坐标, 如果需要重新计算, 需要调用 `addWithUpdate()` 方法

#### `addWithUpdate()`

同 `add`, 但是会更新(重新计算)组合坐标

#### `insertAt(index: number, ...objects: FabricObject[])`

在指定下标添加多个元素, 会触发元素的 `added` 事件.

#### `remove(...objects: FabricObject[])`

移除组合内多个元素, 会触发元素的 `removed` 事件.

> 不会重新计算组合的坐标, 如果需要重新计算, 需要调用 `removeWithUpdate()` 方法

#### `removeWithUpdate()`

同 `remove`, 但是会更新(重新计算)组合坐标

#### `removeAll()`

移除全部元素, 会触发元素的 `removed` 事件.
