import { ref } from "vue";
import { useFabric } from "../hooks/fabric";

export function addShape(shape: fabric.Object) {
  const fb = useFabric()
  fb.add(shape)
  fb.setActiveObject(shape)
}
