<template>
  <Demo title="Event Playground">
    <fabric-container :mounted="mounted">
      <template #ops>
        <div>

        </div>
      </template>
    </fabric-container>
  </Demo>
</template>

<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';
import { ref } from 'vue'

type CanvasEventType =
| 'mouse'
| 'dnd'
| 'object'
| 'selection'
| 'render'

type ObjectEventType =
| 'transform'
| 'dnd'
| 'mouse'

const props = defineProps<{
  type: CanvasEventType & ObjectEventType & 'all'
}>()

// fabric
const f = ref()
// fabric canvas
const c = ref()
// the rect
const rect = ref()

function mounted(fb, canvas) {
  f.value = fb
  c.value = canvas
  const rect = new fb.Rect({
    width: 60,
    height: 40,
    left: 20,
    top: 20,
    fill: '#4caf50'
  })
  canvas.add(rect)
}

function bindObjectEvent() {
  const lint = [
    {
      label: '对象变更',
      key: 'object:modified',
      onclick(e: Event) {
        const { checked } = e.target as HTMLInputElement
      }
    }
  ]
}


</script>

<style lang="scss" scoped>

</style>
