import { fabric } from 'fabric'

type Constructor<T = {}> = new (...args: any[]) => T

// 可连接的对象
export function Connectable<T extends Constructor<fabric.Object>>(Target: T) {
  return class extends Target {
    connected?: boolean

    // 默认禁用拉伸翻转
    lockScalingFlip = true

    constructor(...args: any[]) {
      super(...args)
      useLinkControls(this)
    }
  }
}


function useLinkControls(target: fabric.Object) {

  const linkControlList = [
    {
      key: 'tr',
      x: -.5,
      y: -.5,
    },
    {
      key: 'tl',
      x: .5,
      y: -.5,
    },
    {
      key: 'br',
      x: .5,
      y: .5,
    },
    {
      key: 'bl',
      x: -.5,
      y: .5,
    }
  ]

  const linkControls = linkControlList.reduce((acc, item) => {
    acc[item.key] = new fabric.Control({
      ...item,
      actionName: `link-${item.key}`,
      cursorStyle: 'crosshair',
      render(ctx, left, top, styleOverride, fabricObject) {
        new fabric.Circle({
          left, top,
          radius: 5
        }).render(ctx)
      }
    })
    return acc
  }, {} as Record<string, any>)


  target.controls = {
    ...target.controls,
    ...linkControls,
  }
}


