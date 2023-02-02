import { fabric } from 'fabric'
// 继承Circle, 如果没有特定的继承类, 可以使用 fabric.Object 基础类
export const Sector = fabric.util.createClass(fabric.Circle, { // [!code hl]
  type: 'sector', // [!code hl]
  // 图形绘制方法
  _render(ctx: CanvasRenderingContext2D) { // [!code hl]
    console.log(this.fill)
    // 180 度的半圆可以直接使用父类方法进行绘制
    if ((this.startAngle - this.endAngle) % 180 === 0) {
      this.callSuper('_render', ctx)
    } else {
      const { startAngle, endAngle, radius } = this
      ctx.beginPath()
      ctx.moveTo(0, 0)
      // 因为将角度转为弧度, 使用 arc 进行绘制
      const startRadian = fabric.util.degreesToRadians(startAngle) // 等同于 startAngle * Math.PI / 180
      const endRadian = fabric.util.degreesToRadians(endAngle)
      ctx.arc(0, 0, radius, startRadian, endRadian)
      ctx.closePath()
      this._renderPaintInOrder(ctx)
    }
  }
})


export const LabeledRect = fabric.util.createClass(fabric.Rect, {
  label: '',
  type: 'labeledRect',
  fontsize: 20,
  color: '#333',
  _render(ctx: CanvasRenderingContext2D) {
    this.callSuper('_render', ctx)
    ctx.font = `${this.fontsize}px Helvetica`
    ctx.fillStyle = this.color
    const { width } = ctx.measureText(this.label)
    ctx.fillText(
      this.label,
      -(this.width-width/2) / 2,
      -(this.height - this.fontsize) / 2 + this.fontsize
      )
  }
})

// 螺旋
export const Spiral = fabric.util.createClass(fabric.Object, {
  step: 5,
  radius: 10,
  initialize(opts = {}) {
    this.callSuper('initialize', opts)
    this.set('width', this.radius * 2)
    this.set('height', this.radius * 2)
  },
  _render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    // TODO:
    ctx.stroke()
  }
})
