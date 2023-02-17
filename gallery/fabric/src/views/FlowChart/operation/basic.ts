import type { fabric } from 'fabric'
import { useFabric } from '@/views/FlowChart/hooks/fabric'

export function clear(target?: fabric.Canvas) {
  if (!target) {
    target = useFabric()
  }
  target.clear()
}
