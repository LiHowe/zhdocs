import { fabric } from 'fabric'
// 快捷键

export function useShortcut(
  canvas: fabric.Canvas,
  actions: ((canvas: fabric.Canvas, el: HTMLCanvasElement, ) => void)[]
  ) {
  // @ts-ignore
  const el = canvas.wrapperEl
  el.setAttribute('tabindex', '1')
  el.style.outline = 'none'
  actions.forEach(fn => {
    try {
      fn(canvas, el)
    } catch(e) {
      console.error('Something wrong in register shortcut')
    }
  })
}


// Backspace 删除
function useDelete(canvas: fabric.Canvas, el: HTMLCanvasElement) {
  el.addEventListener('keydown', e => {
    if (e.key !== 'Backspace') return
    e.preventDefault()
    const o = canvas.getActiveObject()
    o && canvas.remove(o)
  })

}

// 撤销&恢复
function useUndoRedo(canvas: fabric.Canvas) {
  const operationCache = []
  // TODO: 待做
  // 所有对象的变更与添加均放入操作数组
  canvas.on('before:render', e => {
    console.log('before: render', e)
  })
}

function useCopyPaste(canvas: fabric.Canvas, el: HTMLCanvasElement) {
  el.addEventListener('keydown', e => {
    const { metaKey, ctrlKey, code } = e
    if (!metaKey && !ctrlKey) return
    if (!['KeyC', 'KeyV'].includes(code)) return
    e.preventDefault()
    if (code === 'KeyC') {
      _handleCopy(canvas.getActiveObject())
    } else {
      _handlePaste()
    }
  })

  let _clipboard: fabric.Object

  function _handleCopy(obj: fabric.Object | null) {
    if (!obj) return
    console.log('待复制对象:', obj)
    // FIXME: selection 拷贝会报错
    obj.clone((cloned: fabric.Object) => {
      _clipboard = cloned
    })
  }

  function _handlePaste() {
    if (!_clipboard) return
    _clipboard.clone((cloned: fabric.Object) => {
      console.log('克隆的对象为', cloned)
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      })
      // 如果当前拷贝的对象是激活的选区
      if(cloned.type === 'activeSelection') {
        cloned.canvas = canvas
        cloned.forEachObject(obj => {
          canvas.add(obj)
        })
        cloned.setCoords()
      } else {
        canvas.add(cloned)
      }
      // 更新位置
      _clipboard.top += 10
      _clipboard.left += 10

      canvas.setActiveObject(cloned)
      canvas.requestRenderAll()

    })
  }

}




export const actions = {
  delete: useDelete,
  copyPaste: useCopyPaste,
  undoRedo: useUndoRedo,
}
