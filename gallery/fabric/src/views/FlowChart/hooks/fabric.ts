import { ref } from 'vue'
import { fabric } from 'fabric'

export const canvas = ref<HTMLCanvasElement>()

const fb = ref<fabric.Canvas>()

export function useFabric(): fabric.Canvas | null {
  if (!canvas.value) return null
  if (!fb.value) {
    fb.value = new fabric.Canvas(canvas.value, {
      containerClass: 'flowchart-container',
      width: 800,
      height: 400,
    })
  }
  return fb.value
}
