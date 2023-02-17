import { fabric } from 'fabric'
import ArrowLine from '@/views/FlowChart/shapes/ArrowLine'
import { ref } from 'vue'
import { useFabric } from '@/views/FlowChart/hooks/fabric'
import { nanoid } from 'nanoid'

type Constructor<T = {}> = new (...args: any[]) => T

// 可连接的对象
export function Connectable<T extends Constructor<fabric.Object>>(Target: T) {
  return class extends Target {
    connected?: boolean

    id!: string

    readonly isConnectable = true

    // 默认禁用拉伸翻转
    lockScalingFlip = true

    constructor(...args: any[]) {
      super(...args)
      useLinkControls(this)
      this.id = nanoid(6)
    }

  }
}


function useLinkControls(target: fabric.Object) {

  const linkControlList = [
    {
      key: 'ml',
      x: -.5,
      y: 0,
    },
    {
      key: 'mr',
      x: .5,
      y: 0,
    },
    {
      key: 'mt',
      x: 0,
      y: -.5,
    },
    {
      key: 'mb',
      x: 0,
      y: .5,
    },
  ]

  const linkControls = linkControlList.reduce((acc, item) => {
    acc[item.key] = new fabric.Control({
      ...item,
      actionName: `link-${ item.key }`,
      cursorStyle: 'crosshair',
      render(ctx, left, top, styleOverride, fabricObject) {
        const r = 5
        new fabric.Circle({
          left: left - r,
          top: top - r,
          radius: r,
        }).render(ctx)
      },
    })
    return acc
  }, {} as Record<string, any>)

  target.controls = {
    ...target.controls,
    ...linkControls,
  }

}

// 添加 Connectable 类监听, 用于连线互连
export function useLinkListener(canvas: fabric.Canvas) {
  let isDrawingLine = false
  let currentTarget: fabric.Object | undefined

  let startPoint: number[]

  let line: ArrowLine | undefined

  canvas.on('mouse:down', ({ transform, pointer, target }) => {
    if (transform?.action.startsWith('link-')) {
      // 如果点击的是连接控制点, 开始绘制线段
      currentTarget = target
      isDrawingLine = true
      startPoint = [pointer.x, pointer.y]
      console.log('[Canvas] - 鼠标按下', { pointer, target, currentTarget, isDrawingLine })
      line = new ArrowLine([...startPoint, ...startPoint])
    }
  })

  let candidate: fabric.Object | undefined

  canvas.on('mouse:move', ({ target, e , pointer }) => {
    if (!isDrawingLine || !target) return
    if (candidate) {
      candidate.set('stroke', '')
      canvas.renderAll()
    }
    // 找到当前鼠标位置的图形对象
    candidate = canvas.findTarget(e, true)
    if (!candidate) return
    // 如果当前位置有对应对象, 判断该对象是否为起始对象, 如果为起始对象, 则不进行处理
    if (candidate === target || candidate.id === target.id) candidate = undefined
    if (!candidate) return

    console.log('鼠标移动, 查找元素:', candidate, '距离为:', distance(startPoint[0], startPoint[1], pointer.x, pointer.y))
    const { x, y } = pointer
    line.set({
      x2: x,
      y2: y,
    })
    candidate.set('stroke', 'red')
    canvas.renderAll()
  })

  canvas.on('mouse:up', ({ target, transform, pointer }) => {
    if (!target || !currentTarget || !isDrawingLine) {
      isDrawingLine = false
      return
    }

    // 相同对象不绘图
    console.log('[Canvas] - 鼠标抬起', { pointer, target, currentTarget, isSame :target === currentTarget })

    if (!candidate) return
    // const line = new ArrowLine([...startPoint, pointer.x, pointer.y])
    // canvas.add(line)
    candidate.set('stroke', '')
    candidate = undefined
    currentTarget = undefined
    isDrawingLine = false
    canvas.requestRenderAll()
    console.log('添加连线:', line)
  })

}

// calculate the distance of two points
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

