export default function(ctx: CanvasRenderingContext2D) {
  return (x1: number, y1: number, x2: number, y2: number, arrowWidth: number) => {

    // 计算箭头方向的角度
    const angle = Math.atan2(y2 - y1, x2 - x1)

    // 计算箭头顶点坐标
    const topX = x2
    const topY = y2

    // 计算箭头两侧顶点的角度
    const angle1 = angle + Math.PI / 6
    const angle2 = angle - Math.PI / 6

    // 计算箭头两侧顶点坐标
    const sideX1 = x2 - arrowWidth * Math.cos(angle1);
    const sideY1 = y2 - arrowWidth * Math.sin(angle1);
    const sideX2 = x2 - arrowWidth * Math.cos(angle2);
    const sideY2 = y2 - arrowWidth * Math.sin(angle2);

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    // 绘制箭头
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(sideX1, sideY1);
    ctx.lineTo(sideX2, sideY2);
    ctx.closePath();
    ctx.fill()
  }
}

// 连线策略 - 曼哈顿路由
function lineStrategy() {

}
