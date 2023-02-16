import { fabric } from "fabric";
import { Connectable } from '@/views/FlowChart/utils/connectable'

// 可输入文字的矩形(Textbox 与 Rect的组合图形)
class TextRect extends fabric.Textbox {
  border?: string = ''

  borderWidth?: number = 1


  constructor(text: string, options: any) {
    super(text, options)
    this.setOptions(options)

    // 隐藏四角控制点, 避免缩放带来的失真
    this.setControlsVisibility({
      tl: false,
      tr: false,
      bl: false,
      br: false,
    })
  }

  _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const rect = new fabric.Rect({
      width: this.width,
      height: this.height,
      stroke: this.border,
      strokeWidth: this.borderWidth,
      fill: '',
    })
    rect._render(ctx)
  }
}

export default Connectable(TextRect)
