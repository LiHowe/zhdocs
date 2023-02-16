import { fabric } from "fabric";
import arrowLineRenderer from '../renderer/arrowLine'

// 流程图连接线

// 控制点只应该有头尾两个点, 在点变化的时候根据算法重新计算并渲染路径
class ArrowLine extends fabric.Line {
  type = 'arrow-line'
  arrowWidth = 5

  constructor(points: number[], options: Record<keyof fabric.Line, any>) {
    console.log('初始化ArrowLine', {points})
    super(points, options)
  }

  _render(ctx: CanvasRenderingContext2D) {
    const p = this.calcLinePoints()
    arrowLineRenderer(ctx)(p.x1, p.y1, p.x2, p.y2, this.arrowWidth)
  }
}

export default ArrowLine
