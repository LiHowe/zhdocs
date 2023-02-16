import { ref } from "vue";
import { useFabric } from "../hooks/fabric";
import type { fabric } from 'fabric'

export function addShape(shape: fabric.Object | fabric.Object[]) {
  const fb = useFabric()
  if (shape instanceof Array) {
    shape.forEach(s => {
      fb.add(s)
    })
  } else {
    fb.add(shape)
    fb.setActiveObject(shape)
  }
}
