import { ref } from 'vue'
import { fabric } from 'fabric'

export const canvas = ref<HTMLCanvasElement>()

const fb = ref<fabric.Canvas>()

export function initCanvas(el: HTMLCanvasElement) {
  canvas.value = el
}

export function useFabric(): fabric.Canvas {
  if (!canvas.value) {
    throw new Error('Please make sure the target <canvas> is exist!')
  }
  if (!fb.value) {
    fb.value = new fabric.Canvas(canvas.value, {
      containerClass: 'flowchart-container',
      width: 800,
      height: 400,
    })
  }
  return fb.value
}
