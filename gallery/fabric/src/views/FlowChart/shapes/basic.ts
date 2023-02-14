// 放置一些预设的图形
import { fabric } from "fabric"

export function useRect(opts?: fabric.IRectOptions) {
  const rect = new fabric.Rect({
    width: 100,
    height: 40,
    stroke: '#e9e9e9',
    fill: '',
    cornerSize: 10,
    ...opts
  })

  rect.controls.mtr.withConnection = false
  rect.controls.mtr.render = (ctx, left, top, styleOverride, fabricObject) => {
    rect.controls.mt.render(ctx, left, top, {
      cornerStyle: 'circle'
    }, fabricObject)
  }
  return rect
}

export function useLine() {
  const line = new fabric.Line([10, 10, 10, 100], {
    stroke: '#e9e9e9'
  })
  // line.hasBorders = false

  for (let name in line.controls) {
    line.setControlVisible(name, false)
  }


  const originRender = line.controls.mt.render.bind(line)

  // line.originX = 'left'
  // line.originY = 'top'
  // line.flipX = false
  // line.flipY = false

  // 起始点
  const start = new fabric.Control({
    actionName: 'start-point',
    cursorStyle: 'grab',
    x: -0.5,
    y: -0.5,
    render(ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      styleOverride, fabricObject
      ) {
        const { x1, y1 } = line.calcLinePoints()
        ctx.save()
        ctx.beginPath()
        // ctx.moveTo(left, top)
        ctx.arc(left, top, 5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
        // originRender(ctx, left - x1, top + y1, {
        //   cornerStyle: 'circle',
        //   ...styleOverride
        // }, fabricObject)
    }
  })

  const end = new fabric.Control({
    actionName: 'end-point',
    cursorStyle: 'grab',
    x: 0.5,
    y: 0.5,
    render(ctx, left, top, styleOverride, fabricObject) {
      const { x2, y2 } = line.calcLinePoints()
      ctx.save()
      ctx.beginPath()
      // ctx.moveTo(left, top)
      ctx.arc(left, top, 5, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    },
    // 方案1: 获取当前偏移量 x, y, 重新设置 x2, y2 与 x1, y1
    mouseDownHandler(eventData, transformData, x, y) {
      const { left, top } = line
      const {x2, y2} = line

      console.log({
        x, y,
        x2, y2,
        left, top,
        transformData,
        eventData
      })
      return false
    },
    actionHandler(eventData, transformData, x, y) {
      const { left = 0, top = 0 } = line
      const {x1, y1} = line
      // 在 y2 < y2 或 x2 < x1 的时候, 需要同时变更 left, top
      line.set({
        x1, y1,
        x2: x - left + 10,
        y2: y - top + 10,
        left, top
      })
      line.controls.end.x = 0.5 * (line.x2 < 0 ? -1 : 1)
      line.controls.end.y = 0.5 * (line.y2 < 0 ? -1 : 1)
      console.log({
        target: this,
        x, y,
        left, top,
        x2: line.x2,
        y2: line.y2
      })
      return true
    }
  })

  line.controls = {
    start,
    end,
  }

  return line
}
