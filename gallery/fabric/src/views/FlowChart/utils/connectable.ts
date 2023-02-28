import { fabric } from 'fabric'
import ArrowLine from '@/views/FlowChart/shapes/ArrowLine'
import { ref } from 'vue'
import { useFabric } from '@/views/FlowChart/hooks/fabric'
import { nanoid } from 'nanoid'

type Constructor<T = {}> = new (...args: any[]) => T


// 可连接的对象
export function buildConnectable<T extends Constructor<fabric.Object>>(Target: T) {
  return class Connectable extends Target {
    id!: string

    readonly isConnectable = true

    lines: ArrowLine[] = []

    // 默认禁用拉伸翻转
    lockScalingFlip = true

    constructor(...args: any[]) {
      super(...args)
      this.init()
    }

    init() {
      useLinkControls(this)
      this.id = nanoid(6)

      if (this.type && !this.type.startsWith('c-')) {
        this.type = `c-${this.type}`
      }

      this.on('modified', e => {
        console.log('对象改变', { e, lines: this.lines })
        this.updateLine()
      })
    }

    // 在图形位置变化后更新线段位置
    updateLine() {
      this.lines.forEach((line: ArrowLine) => {
        line.updatePosition()
      })
    }

    static fromObject(object: fabric.Object, callback: Function) {
      // const copied = Object.assign({}, object)
      // console.log({
      //   t: this, Target, object
      // })
      // console.log(Target.length, fabric.Rect.length)
      // debugger
      // return callback(new this(copied))
      if (callback) {
        const oc = callback
        callback = (obj: fabric.Object) => {
          Connectable.convert(obj)
          oc(obj)
        }
      }
      return Target.fromObject(object, callback)
    }

    // 将普通对象转为可连接对象
    static convert(target: fabric.Object) {
      target.fromObject = this.fromObject
      target.updateLine = this.updateLine
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

  let startPoint: number[]

  let line: ArrowLine | undefined

  canvas.on('mouse:down', ({ transform, pointer, target }) => {
    if (transform?.action.startsWith('link-')) {
      console.log('鼠标点击, transform is', transform)
      // 如果点击的是连接控制点, 开始绘制线段
      isDrawingLine = true
      const { ex: x, ey: y } = transform
      startPoint = [x, y]
      line = new ArrowLine([...startPoint, ...startPoint])
      line.start = {
        corner: transform.corner,
        target,
      }
      canvas.add(line)
      line.setCoords()
    }
  })

  // 连接线候选目标
  let candidate: fabric.Object | undefined

  // 临时点
  let tempPoint

  canvas.on('mouse:move', ({ target, e , pointer }) => {
    if (!isDrawingLine || !target) return
    candidate = canvas.findTarget(e, true)
    let { x, y } = pointer
    if (candidate) {
      const control = findNearestLinkPoint(pointer!, candidate)
      const nearestLinkPoint = candidate.oCoords[control.key]
      x = nearestLinkPoint.x
      y = nearestLinkPoint.y
      if (tempPoint) {
        canvas.remove(tempPoint)
      }
      // TODO: 可以考虑将可连接点全部绘制
      tempPoint = new fabric.Circle({
        radius: 5,
        left: x - 5,
        top: y - 5,
        fill: 'red',
        evented: false,
        selectable: false,
      })
      canvas.add(tempPoint)
      line.end = {
        target: candidate,
        corner: control.key
      }
    }
    line.set({
      x2: x,
      y2: y,
    })
    line?.setCoords()
    canvas.requestRenderAll()
  })

  canvas.on('mouse:up', ({ target, transform, pointer }) => {
    if (!isDrawingLine) return
    if (tempPoint) canvas.remove(tempPoint)

    if ((line && calcLineDistance(line) < 10) || !candidate) {
      canvas.remove(line)
      return
    }

    if (line) {
      line._setWidthHeight()
      target.lines.push(line)
      candidate.lines.push(line)
      line = undefined
    }
    console.log('添加连线:', line, candidate.lines)

    candidate = undefined
    isDrawingLine = false
    canvas.requestRenderAll()
  })

}

// calculate the distance of two points
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calcLineDistance(line: fabric.Line) {
  if (!line) return 0
  const {
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
  } = line
  return distance(x1, y1, x2, y2)
}

// 找到距离最近的连接点
function findNearestLinkPoint(point: fabric.Point, target: fabric.Object) {
  const { x, y } = point
  const distanceArr = Object.values(target.controls)
    .filter((x: fabric.Control) => x.actionName.startsWith('link-'))
    .sort((a: fabric.Control, b: fabric.Control) => {
      const { x: x1, y: y1 } = target.oCoords[a.key]
      const { x: x2, y: y2 } = target.oCoords[b.key]
      return distance(x, y, x1, y1) - distance(x, y, x2, y2)
    })

  return distanceArr[0]
}

export type OriginalControls =
  'tl' |
  'mt' |
  'tr' |
  'ml' |
  'mr' |
  'bl' |
  'mb' |
  'br' |
  'mtr'
