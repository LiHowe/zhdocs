选中组合是比较常用的功能了，代码比较简单， 直接上代码

```ts
// 组合选中元素
function groupObject() {
  // 如果当前没有选中元素，不做处理
  if (!canvas.getActiveObject()) return
  if (canvas.getActiveObject().type !== 'activeSelection') return
  canvas.getActiveObject().toGroup()
  canvas.requestRenderAll()
}

// 解除组合
function unGroupObject() {
  if (!canvas.getActiveObject()) return
  if (canvas.getActiveObject().type !== 'group') return
  canvas.getActiveObject().toActiveSelection()
  canvas.requestRenderAll()
}

```
