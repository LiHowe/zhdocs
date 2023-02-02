<template>
  <Demo title="Event Playground">
    <fabric-container :mounted="mounted" ref="d">
      <template #ops>
        <!-- 预设 -->
        <div>
          <el-button draggable="true" style="cursor: move;">我是可拖动元素</el-button>
          <el-button @click="clearLog">清空日志</el-button>
          <template v-if="target">
            <el-button @click="changeTarget">切换目标事件元素</el-button>
            <Cbx :modelValue="target.evented" label="evented" @change="toggleEventful"/>
          </template>
        </div>
        <!-- 按钮操作块 -->
        <div class="opt-block" v-for="block in blocks">
          <p class="opt-title">{{ block.title }}</p>
          <Cbx
            v-for="btn in block.list"
            v-model="btn.checked"
            :key="btn.key"
            :title="btn.key"
            :label="btn.label"
            inline
            @change="(v: boolean) => handleClick(v, btn, block.target)"
          />
          <!-- <template v-for="btn in block.list">
            <input type="checkbox" :id="btn.key" :checked="btn.checked" @change="e => handleClick(e, btn, block.target)">
            <label :for="btn.key" :title="btn.key">{{ btn.label }}</label>
          </template> -->
        </div>
        <!-- 日志块 -->
        <div class="log">
          <hr>
          <div class="log-title">logs</div>
          <div class="log-content">
            <p v-for="([date, type, value], i) in logs" :key="i">
              <b>{{ date }}</b> | <span>[{{ type }}]</span>:&nbsp;
              <a class="key" v-for="key in Object.keys(value)" :title="JSON.stringify(value[key], null, 2)">{{ key }}</a>
            </p>
          </div>
        </div>
      </template>
    </fabric-container>
  </Demo>
</template>

<script setup lang="ts">
import FabricContainer from '../../../components/FabricContainer.vue';
import { ref, watchEffect } from 'vue'

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
// the fabric rect
const rect = ref()
// the fabric text
const text = ref()
const target = ref()
const blocks = ref<OptGroup[]>([])

function mounted(fb, canvas) {
  f.value = fb
  c.value = canvas
  rect.value = new fb.Rect({
    width: 60,
    height: 40,
    left: 20,
    top: 20,
    fill: '#4caf50'
  })
  text.value = new fb.Textbox('zhDoc', {
    top: 30,
    left: 20,
  })
  target.value = rect.value
  logs.value = []
  watchEffect(() => {
    c.value.clear()
    c.value.add(target.value)
  })
}

watchEffect(() => {
  blocks.value = [
    bindObjectTransformEvent(target.value),
    bindObjectMouseEvent(target.value),
    bindObjectDnDEvent(target.value),
  ]
})

function clearLog() {
  logs.value.length = 0
}

function toggleEventful(v: boolean) {
  rect.value.set('evented', v)
}

function changeTarget() {
  logs.value.length = 0
  target.value.off()
  target.value = target.value === rect.value ? text.value : rect.value
}

const logs = ref<any[]>([])

type OptGroup = {
  title: string,
  target: any,
  list: OptItem[]
}

type OptItem = {
  label: string,
  key: string,
  checked: boolean,
}

function handleClick(v: boolean, item: OptItem, target: any) {
  const { key } = item
  const handler = (e: any) => {
    logs.value.unshift([new Date().toLocaleString('zh-cn'), key, e])
    if (logs.value.length > 20) logs.value.pop()
  }
  if (v) {
    target.on(key, handler)
  } else {
    target.off(key)
  }
}

// 对象变换事件
function bindObjectTransformEvent(target: any): OptGroup {
  return {
    title: '对象变换',
    target,
    list: [
      {
        label: '移动',
        key: 'moving',
        checked: false,
      },
      {
        label: '旋转',
        key: 'rotating',
        checked: false,
      },
      {
        label: '缩放',
        key: 'scaling',
        checked: false,
      },
      {
        label: '倾斜',
        key: 'skewing',
        checked: false,
      },
      {
        label: 'Textbox改变宽度',
        key: 'resizing',
        checked: false,
      },
    ]
  }
}

// 对象鼠标事件
function bindObjectMouseEvent(target: any): OptGroup {
  return {
    title: '对象鼠标事件',
    target,
    list: [
      {
        label: '按键抬起',
        key: 'mouseup',
        checked: false,
      },
      {
        label: '按键按下',
        key: 'mousedown',
        checked: false,
      },
      {
        label: '鼠标移动',
        key: 'mousemove',
        checked: false,
      },
      {
        label: '按键抬起前置',
        key: 'mouseup:before',
        checked: false,
      },
      {
        label: '按键按下前置',
        key: 'mousedown:before',
        checked: false,
      },
      {
        label: '鼠标移动前置',
        key: 'mousemove:before',
        checked: false,
      },
      {
        label: '双击鼠标',
        key: 'mousedblclick',
        checked: false,
      },
      {
        label: '鼠标滚轮',
        key: 'mousewheel',
        checked: false,
      },
      {
        label: '鼠标移入元素',
        key: 'mouseover',
        checked: false,
      },
      {
        label: '鼠标移出元素',
        key: 'mouseout',
        checked: false,
      },
    ]
  }
}

// 对象拖拽事件
function bindObjectDnDEvent(target: any): OptGroup {
  return {
    title: '对象拖动事件',
    target,
    list: [
      {
        label: '放置元素前',
        key: 'drop:before',
        checked: false,
      },
      {
        label: '放置元素',
        key: 'drop',
        checked: false,
      },
      {
        label: '拖动',
        key: 'dragover',
        checked: false,
      },
      {
        label: '拖入',
        key: 'dragenter',
        checked: false,
      },
      {
        label: '拖离',
        key: 'dragleave',
        checked: false,
      },
    ]
  }
}



</script>

<style lang="scss" scoped>
.log {
  font-size: 13px;
  &-title {
    font-weight: bold;
  }
  &-content {
    overflow: hidden auto;
    height: 200px;
    .key {
      margin: 0 5px;
      cursor: help;
    }
  }
}
.opt-block {
  font-size: 13px;
  label {
    cursor: pointer;
  }
}
.opt-title {
  font-weight: bold;
}
</style>
