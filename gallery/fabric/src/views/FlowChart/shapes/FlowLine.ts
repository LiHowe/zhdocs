import { fabric } from "fabric";
import arrowLineRenderer from '../renderer/arrowLine'

// 箭头样式
type VertexType = 'arrow'


// 流程图连接线
const ArrowLineAttrs = {
  type: 'arrow-line',
  arrowWidth: 5,
  _render: function(ctx: CanvasRenderingContext2D) {
    const p = this.calcLinePoints()
    arrowLineRenderer(ctx)(p.x1, p.y1, p.x2, p.y2, this.arrowWidth)
    // this.callSuper('_render', ctx)

    // const arrowWidth = this.arrowWidth

    // const p = this.calcLinePoints()

    // // 计算箭头方向的角度
    // const angle = Math.atan2(p.y2 - p.y1, p.x2 - p.x1)

    // // 计算箭头顶点坐标
    // const topX = p.x2
    // const topY = p.y2

    // // 计算箭头两侧顶点的角度
    // const angle1 = angle + Math.PI / 6
    // const angle2 = angle - Math.PI / 6

    // // 计算箭头两侧顶点坐标
    // const sideX1 = p.x2 - arrowWidth * Math.cos(angle1);
    // const sideY1 = p.y2 - arrowWidth * Math.sin(angle1);
    // const sideX2 = p.x2 - arrowWidth * Math.cos(angle2);
    // const sideY2 = p.y2 - arrowWidth * Math.sin(angle2);

    // // 绘制箭头
    // ctx.beginPath();
    // ctx.moveTo(topX, topY);
    // ctx.lineTo(sideX1, sideY1);
    // ctx.lineTo(sideX2, sideY2);
    // ctx.closePath();
    // this._renderPaintInOrder(ctx)
  }
}

export const ArrowLine = fabric.util.createClass(fabric.Line, ArrowLineAttrs)
