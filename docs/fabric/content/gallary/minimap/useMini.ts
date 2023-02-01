import { fabric } from "fabric"
import { useTranslate } from "../utils"

export interface MiniMapOptions {
  // 距离边框距离
  offset: number
  // 小地图位置
  position: 'tl' | 'tr' | 'bl' | 'br'
  // 最小缩放比例
  min: number
  // 最大缩放比例
  max: number
  // 小地图的大小比例
  ratio: number
  // 内容大小, 如果不提供, 则使用画布大小作为内容大小
  contentSize?: {
    width: number,
    height: number,
  },
  // 是否使用StaticCanvas渲染小地图
  interactive?: boolean
}

const defaultOptions: MiniMapOptions = {
  offset: 5,
  position: 'br',
  min: 0.01,
  max: 10,
  ratio: 0.2,
  contentSize: {
    height: 480,
    width: 800,
  },
  interactive: true
}

function createContainer() {
  return fabric.util.makeElement('div', {
    class: 'canvas-container'
  })
}

function getCoords(str: MiniMapOptions['position']) {
  const charMap: Record<string, string> = {
    t: 'top',
    l: 'left',
    b: 'bottom',
    r: 'right',
  }
  return str.split('').map(char => charMap[char])
}

export function useMiniMap(canvas: fabric.Canvas, opts: Partial<MiniMapOptions> = {}) {

  if (!canvas.interactive) {
    console.warn('Can not useMiniMap in StaticCanvas or inactive canvas.')
    return
  }

  const {
    interactive,
    ratio,
    min, max,
    position,
    offset,
  } = {
    ...defaultOptions,
    ...opts,
  }

  useTranslate(canvas, { onMove })

  function onMove() {

  }

  const container = createContainer()
  const minimapEl = fabric.util.createCanvasElement()

  const mapWrapperStyle = `
  position: absolute;
  ${getCoords(position).reduce((init, item) => init+=`${item}:${offset}px;`, '')}
  z-index: 1;
  border: 1px solid #e9e9e9;
  `

  // @ts-ignore
  fabric.util.wrapElement(canvas.wrapperEl, container)
  fabric.util.wrapElement(minimapEl, container)

  const minimap = new fabric[interactive ? 'Canvas' : 'StaticCanvas'](minimapEl, {
    width: canvas.getWidth() * ratio,
    height: canvas.getHeight() * ratio,
    containerClass: 'minimap-container'
  })

  if (!interactive) {
    minimapEl.style.cssText = mapWrapperStyle
  } else {
    // @ts-ignore
    minimap.wrapperEl.style.cssText = `
    ${mapWrapperStyle}
    width: ${minimap.getWidth()}px;
    height: ${minimap.getHeight()}px;
    `
  }


  const thumbRatio = fabric.util.findScaleToFit(canvas, minimap)
  const thumb = new fabric.Image(canvas.toCanvasElement(minimap.getRetinaScaling() * thumbRatio))

  minimap.backgroundColor = '#fff'
  minimap.backgroundImage = thumb
  minimap.requestRenderAll()


  function onZoom() {
    console.log('zzzzzooom')
  }

  useZoom(canvas, {
    min, max,
    onZoom,
  })
}

export type ZoomOption = {
  max: number,
  min: number,
  onZoom: (zoom: number) => void
}

export function useZoom(canvas: fabric.Canvas, opt: ZoomOption = {
  max: 20,
  min: 0.01,
  onZoom: () => {}
}) {
  canvas.on('mouse:wheel', ({ e, pointer }) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    if (zoom <= opt.min) zoom = opt.min
    if (zoom >= opt.max) zoom = opt.max
    canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom)
    opt.onZoom && opt.onZoom(zoom)
  })
}
