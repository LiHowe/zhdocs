import { ref } from 'vue'
import { fabric } from 'fabric'

export const canvas = ref<HTMLCanvasElement>()

let fb: fabric.Canvas | null = null

export function initCanvas(el: HTMLCanvasElement) {
  canvas.value = el
}

export function useFabric(): fabric.Canvas {
  if (!canvas.value) {
    throw new Error('Please make sure the target <canvas> is exist!')
  }
  if (!fb) {
    fb = new fabric.Canvas(canvas.value, {
      containerClass: 'flowchart-container',
      width: 800,
      height: 400,
    })
    console.log('canvas init, fabric version is:', fabric.version)
  }
  return fb
}

