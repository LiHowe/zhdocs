// 放置一些预设的图形
import { fabric } from "fabric"
import TextRect from '@/views/FlowChart/shapes/TextRect'

export function useRect(opts?: fabric.IRectOptions) {
  const rect = new fabric.Rect({
    width: 100,
    height: 40,
    stroke: '#e9e9e9',
    fill: '',
    cornerSize: 10,
    ...opts,
  })

  return rect
}


export function useLine() {
  const line = new fabric.Polyline([
    new fabric.Point(10, 10),
    new fabric.Point(10, 100)
  ], {
    stroke: 'red'
  })

  return line
}

export function useCurve() {
  const p1 = new fabric.Point(20, 20)
  const p2 = new fabric.Point(50, 100)
  const p3 = new fabric.Point(10, 150)
  return [p1, p2, p3]
}


export function useTextRect() {
  const textRect = new TextRect('text', {
    isEditing: false,
    width: 100,
    height: 50,
    border: '#e9e9e9',
  })

  console.log(textRect)
  return textRect
}


export function useText() {
  const text = new fabric.IText('测试文字')

  return text
}
