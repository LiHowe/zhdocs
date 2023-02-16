import { fabric } from 'fabric'

type Constructor<T = {}> = new (...args: any[]) => T

// 可连接的对象
export function Connectable<T extends Constructor<fabric.Object>>(Target: T) {
  return class extends Target {
    connected?: boolean

    constructor(...args: any[]) {
      super(...args)
      // 隐藏原有控制点
      const originControls = Object.keys(this.controls)
      this.setControlsVisibility(originControls.reduce((ac, cur) => {
        ac[cur] = false
        return ac
      }, {} as Record<string, boolean>))
      this.controls = {
        ...this.controls,
        ...linkControls,
      }
    }
  }
}

const commonLinkControl = (dir: LinkControlName) => ({
  actionName: `link-${dir}`,
  cursorStyle: 'crosshair'
})

const nControl: fabric.Control = new fabric.Control({
  ...commonLinkControl('n'),
  x: 0,
  y: -0.5,
})

// 东南西北代表上下左右
export type LinkControlName = 'n' | 'w' | 'e' | 's'

const linkControls: Record<LinkControlName, fabric.Control> = {
  n: nControl
}
