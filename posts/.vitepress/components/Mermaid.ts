import { defineComponent, h, onBeforeMount, ref } from 'vue'
import { nanoid } from 'nanoid'
import Mermaid from 'mermaid'

export default defineComponent({
  name: 'Mermaid',
  props: {
    code: {
      type: String,
      required: true,
      default: ''
    },
    config: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const id = 'mermaid_' + nanoid(4)
    const el = ref<HTMLDivElement>()
    const content = ref('')

    let baseConfig = {
      startOnLoad: false,
      securityLevel: 'loose',
      // theme: 'forest',
    }
    let configObj = {}
    try {
      configObj = JSON.parse(props.config?.replace(/\'/g, '\"') || '{}')
    } catch (e) {
      console.error(e)
    } finally {
      configObj = Object.assign({}, baseConfig, configObj)
    }
    const render = async () => {
      Mermaid.mermaidAPI.initialize(configObj)
      Mermaid.mermaidAPI.render(id, props.code, svgCode => {
        content.value = svgCode
      })
    }

    // onMounted(() => {
      // const svg = new DOMParser().parseFromString(document.querySelector(`#${id}`), "image/svg+xml")
      // console.log(svg)
      // const xml = new XMLSerializer().serializeToString(document.querySelector(`#${id}`))
      // const url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(content.value)))
      // const img = new Image()
      // img.src = url
      // el.value.appendChild(img)
    // })

    onBeforeMount(render)
    return () =>
      [h('div', {
        id,
        ref: el,
        class: ['mermaid-svg-wrapper', 'mermaid'],
        innerHTML: content.value
      })]
  }
})
