import { fabric } from "fabric";
import arrowLineRenderer from '../renderer/arrowLine'
import type { OriginalControls } from "../utils/connectable";

// 流程图连接线

// 控制点只应该有头尾两个点, 在点变化的时候根据算法重新计算并渲染路径
class ArrowLine extends fabric.Line {
  type = 'arrow-line'
  arrowWidth = 5

  stroke = '#e9e9e9'

  start?: {
    target: fabric.Object,
    corner: OriginalControls
  }

  end?: {
    target: fabric.Object,
    corner: OriginalControls
  }

  hasBorders = false
  hasControls = false
  lockScalingX = true
  lockScalingY = true
  lockRotation = true

  constructor(points: number[], options?: Record<keyof fabric.Line, any>) {
    super(points, options)
  }

  _render(ctx: CanvasRenderingContext2D) {
    const p = this.calcLinePoints()
    arrowLineRenderer(ctx)(p.x1, p.y1, p.x2, p.y2, this.arrowWidth)
  }


  // 更新位置
  updatePosition() {
    if (this.start) {
      const { oCoords } = this.start.target
      if (!oCoords) return
      const key = this.start.corner
      this.setOptions({
        x1: oCoords[key].x,
        y1: oCoords[key].y,
      })
    }
    if (this.end) {
      const { oCoords } = this.end.target
      if (!oCoords) return
      const key = this.end.corner
      this.setOptions({
        x2: oCoords[key].x,
        y2: oCoords[key].y,
      })
    }
  }
}

export default ArrowLine
