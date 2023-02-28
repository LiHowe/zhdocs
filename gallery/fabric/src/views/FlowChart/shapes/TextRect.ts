import { fabric } from "fabric";
import { buildConnectable } from '@/views/FlowChart/utils/connectable'

// 可输入文字的矩形(Textbox 与 Rect的组合图形)
class TextRect extends fabric.Textbox {
  border?: string = ''
  borderWidth?: number = 1
  type = 'textrect'

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

  toObject(propertiesToInclude?: string[] | undefined) {
    return super.toObject([
      ...(propertiesToInclude ?? []),
      'border',
      'borderWidth',
    ])
  }

  static fromObject(object: fabric.Object, callback: Function) {
    const copied = Object.assign({}, object)
    return fabric.Object._fromObject('TextRect', copied, callback, {
      extraParam: 'text'
    }) as TextRect
  }

}

fabric.TextRect = TextRect

export default buildConnectable(TextRect)

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
