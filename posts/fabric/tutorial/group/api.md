### `add(...objects: FabricObject[])`

为组合添加多个元素, 会触发被移除元素的 `added` 事件.

### `insertAt(index: number, ...objects: FabricObject[])`

在指定位置添加多个元素, 会触发被移除元素的 `added` 事件.

### `remove(...objects: FabricObject[])`

移除组合内多个元素, 会触发被移除元素的 `removed` 事件.

### `removeAll()`

移除全部元素, 会触发被移除元素的 `removed` 事件.
