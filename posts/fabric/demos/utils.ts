import { fabric } from 'fabric'

export function useTranslate(canvas: fabric.Canvas, opts = {
  onMove: () => {}
}) {

  canvas.fireMiddleClick = true

  let isDragging = false

  let lastPosX = 0
  let lastPosY = 0

  canvas.on('mouse:down', opt => {
    const evt = opt.e
    if (opt.button === 2) {
      isDragging = true
      canvas.selection = false
      lastPosX = evt.clientX
      lastPosY = evt.clientY
      evt.preventDefault()
    }
  })
  canvas.on('mouse:up', () => {
    isDragging = false
    canvas.selection = true
  })
  canvas.on('mouse:move', opt => {
    if (!isDragging) return
    const e = opt.e
    const vpt = canvas.viewportTransform as number[]
    vpt[4] += e.clientX - lastPosX
    vpt[5] += e.clientY - lastPosY
    canvas.requestRenderAll()
    if (opts.onMove) {
      opts.onMove()
    }
    lastPosX = e.clientX
    lastPosY = e.clientY
  })
}


export type ZoomOption = {
  max: number,
  min: number,
  onZoom: (zoom: number) => void
}

export function useZoom(canvas: fabric.Canvas, opt: ZoomOption = {
  max: 20,
  min: 0.01,
  onZoom: () => {}
}) {
  canvas.on('mouse:wheel', ({ e, pointer }) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    if (zoom <= opt.min) zoom = opt.min
    if (zoom >= opt.max) zoom = opt.max
    canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom)
    opt.onZoom && opt.onZoom(zoom)
  })
}

/**
 * TODO: 旋转元素位置计算
 * 限制元素移动范围：
 * 1. 限制移动区域
 * 2. 限制缩放大小
 * @param targets
 */
export function useShapeMoveLimit(targets: fabric.Object[] | fabric.Object) {
  if (!(targets instanceof Array)) {
    targets = [targets]
  }
  targets.forEach(x => {
    x.on('moving', () => handleMove.call(x, x.canvas))
  })
}

export function useCanvasMoveLimit(target) {
  target.on('object:moving', function (opt) {
    if (!opt.target) return
    const t = opt.target
    handleMove.call(t, target)
  })
}

function handleMove(c) {
  const { left, top, width, height, scaleX, scaleY } = this
  if (left < 0) this.left = 0
  if (top < 0) this.top = 0
  if (left + width * scaleX > c.getWidth()) this.left = c.getWidth() - width * scaleX
  if (top + height * scaleY > c.getHeight()) this.top = c.getHeight() - height * scaleY
}

export function useShapeScaleLimit(targets: fabric.Object[] | fabric.Object) {
  if (!(targets instanceof Array)) {
    targets = [targets]
  }
  targets.forEach(x => {
    x.on('scaling', (opt) => {
      handleScale.call(x, x.canvas)
    })
  })
}

function handleScale(c: fabric.Canvas) {
  console.log(this)
  const { left, top, width, height, scaleX, scaleY } = this
  const w = c.getWidth()
  const h = c.getHeight()
  if (left + width * scaleX >= w) this.scaleX = (w - left) / width
  if (top + height * scaleY >= h) this.scaleY = (h - top) / height
  // TODO：向上/左拉伸如何处理?
}
