import { fabric } from "fabric";
import { Connectable } from '@/views/FlowChart/utils/connectable'

// 可输入文字的矩形(Textbox 与 Rect的组合图形)
class TextRect extends fabric.Textbox {
  border?: string = ''
  borderWidth?: number = 1
  type = 'text-rect'
  constructor(text: string, options: any) {
    super(text, options)
    this.setOptions(options)


    // 隐藏四角控制点, 避免缩放带来的失真
    enhanceControls(this)
  }

  // 禁用双击编辑
  initCursorSelectionHandlers() {}
  _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    new fabric.Rect({
      width: this.width,
      height: this.height,
      stroke: this.border,
      strokeWidth: this.borderWidth,
      fill: '',
    })._render(ctx)
  }

}

export default Connectable(TextRect)

// 增强四角控制点为自由拖动缩放.
function enhanceControls(target: fabric.Object) {
  const tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
  })

  const tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
  })
  const br = new fabric.Control({
    x: 0.5,
    y: 0.5,
  })
  const bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
  })

  target.controls = {
    ...target.controls,
    tr, tl, br, bl,
  }
}
