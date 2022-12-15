<template>
  <Demo>
    <FabricContainer :mounted="mounted">
      <template #ops>
        <Btn v-for="b in btns" @click="handleClick(b)">{{ b.title }}</Btn>
      </template>
    </FabricContainer>
  </Demo>
</template>
<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';
import { ref } from 'vue'

const c = ref()

type BtnItem = {
  title: string,
  click: (...args: any) => void
}

const btns = ref<BtnItem[]>([])

function mounted(fb, canvas) {

  c.value = canvas

  btns.value = [
    {
      title: '多元素动画',
      click: () => {
        const r1 = new fb.Rect({
          width: 80,
          height: 30,
          fill: '#42b883',
          left: 40,
          top: 40,
        })
        const r2 = fb.util.object.clone(r1)
        r2.set({
          'left': r1.left + r1.width,
          originX: 'right',
          originY: 'top'
        })
        canvas.add(r1, r2)
        const cancel = fb.util.animate({
          endValue: 180,
          duration: 2000,
          onChange: (angle: number) => {
            r1.set('angle', -angle)
            r2.set('angle', angle)
            canvas.requestRenderAll()
          }
        })
      }
    }
  ]
}

function handleClick(b: BtnItem) {
  try {
    c.value.clear()
    b.click()
  } catch(e) {
    console.log(`Something wrong when invoking ${b.title}.click: ${e}`)
  }
}

</script>
<style scoped>
</style>
