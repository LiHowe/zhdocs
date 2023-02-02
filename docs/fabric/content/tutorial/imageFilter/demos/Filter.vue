<template>
  <div class="filter-wrapper">
    <div class="showcase-item">
      <img src="/imgs/supermario.jpg"/>
      <p class="item-title">原图</p>
    </div>
    <div class="showcase-item" :id="f.title" v-for="f in filters">
      <p class="item-title">{{ f.title }} - {{ f.translate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { ref, onMounted } from 'vue'

type FilterDemoItem = {
  title: string,
  translate: string,
  grammar: Object,
}

const F = fabric.Image.filters

const filters = ref<FilterDemoItem[]>([
  {
    title: 'Grayscale',
    translate: '灰度调节',
    grammar: new F.Grayscale()
  },
  {
    title: 'Blur',
    translate: '模糊',
    grammar: new F.Blur({ blur: 0.5 })
  },
  {
    title: 'Contrast',
    translate: '对比度',
    grammar: new F.Contrast({ contrast: 0.25 })
  },

  {
    title: 'Brightness',
    translate: '亮度调节',
    grammar: new F.Brightness({ brightness: 0.3 })
  },
  {
    title: 'Sharpen',
    translate: '锐化',
    grammar: new F.Convolute({
      matrix: [  0, -1,  0,
                -1,  5, -1,
                 0, -1,  0 ]
    })
  },
  {
    title: 'Emboss',
    translate: '浮雕',
    grammar: new F.Convolute({
      matrix: [ 1,   1,  1,
                1, 0.7, -1,
               -1,  -1, -1 ]
    })
  },
  {
    title: 'Invert',
    translate: '颜色反转',
    grammar: new F.Invert()
  },
  {
    title: 'Noise',
    translate: '噪点',
    grammar: new F.Noise({ noise: 200 })
  },
  {
    title: 'Pixelate',
    translate: '像素风',
    grammar: new F.Pixelate({ blocksize: 18 })
  },
  {
    title: 'RemoveColor',
    translate: '移除颜色',
    grammar: new F.RemoveColor({
      color: '#fde700',
      distance: 0.5,
    })
  },
  {
    title: 'BlendColor',
    translate: '混合颜色',
    grammar: new F.BlendColor({
      color: '#0055ff',
      mode: 'diff'
    })
  },
  {
    title: 'Gamma',
    translate: '伽马值调整',
    grammar: new F.Gamma({
      gamma: [1, 0.5, 2.1]
    })
  },
  {
    title: 'Vibrance',
    translate: '饱和度',
    grammar: new F.Vibrance({ vibrance: 1 })
  },
  {
    title: 'Hue',
    translate: 'HUE调节',
    grammar: new F.HueRotation({ rotation: -0.5 })
  },
  {
    title: 'Resize',
    translate: '调整大小',
    grammar: new F.Resize({ resizeType: 'hermite' })
  },
  // 下面是预设效果
  {
    title: 'Sepia',
    translate: '发黄的旧照片',
    grammar: new F.Sepia()
  },
  {
    title: 'BlackWhite',
    translate: '黑白照片',
    grammar: new F.BlackWhite()
  },
  {
    title: 'Polaroid',
    translate: '拍立得',
    grammar: new F.Polaroid()
  },
  {
    title: 'Technicolor',
    translate: '鲜艳色彩',
    grammar: new F.Technicolor()
  },
  {
    title: 'Kodachrome',
    translate: '柯达彩色胶片',
    grammar: new F.Kodachrome()
  },
  {
    title: 'Vintage',
    translate: '复古',
    grammar: new F.Vintage()
  },
  {
    title: 'Brownie',
    translate: '勃朗尼相机',
    grammar: new F.Brownie()
  }
])

function handleClick(item: FilterDemoItem) {
  const container = document.querySelector(`#${item.title}`)
  const { width, height } = container!.getBoundingClientRect()

  const canvas = document.createElement('canvas')
  container?.append(canvas)
  canvas.width = width
  canvas.height = height - 32

  const fb = new fabric.StaticCanvas(canvas)

  const { grammar: filter } = item

  fabric.Image.fromURL('/imgs/supermario.jpg', img => {
    img.filters.push(filter)
    img.applyFilters()
    img.set('scaleX', 217 / img.width )
    img.set('scaleY',  145 / img.height)
    img.set('left', 0)
    img.set('top', 0)
    img.set('evented', false)
    img.set('hasControls', false)
    fb.add(img)
  })
}

onMounted(() => {
  fabric.initFilterBackend()
  filters.value.forEach(handleClick)
})

</script>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.showcase-item {
  width: 217px;
  height: 178px;
  margin: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 #e9e9e9;
  position: relative;
  img {
    width: 217px;
  }
  .item-title {
    text-align: center;
    margin: 8px 0;
    line-height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
