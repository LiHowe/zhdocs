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
        const c1 = r1.animate('angle', -180, {
          duration: 2000,
          onChange: canvas.renderAll.bind(canvas),
          abort: function(angle, vp, tp) {
            console.log('abort', { angle })
            if (Math.round(angle) === -90) {
              this.dispose()
              return true
            }
          },
          onComplete: (...args) => {
            console.log('onComplete', args)
          }
        })

        console.log('r1.animation', c1)

        const cancel = fb.util.animate({
          endValue: 180,
          duration: 2000,
          onChange: (angle: number) => {
            r2.set('angle', angle)
            canvas.requestRenderAll()
          }
        })

        console.log(fabric.runningAnimations)
        // setTimeout(() => {
        //   // r1.dispose()
        //   c1()
        //   r2.dispose()
        // }, 500);

      }
    },
    {
      title: '取消全部动画',
      click: () => {
        fabric.runningAnimations.cancelAll()
        c.value.requestRenderAll()
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
