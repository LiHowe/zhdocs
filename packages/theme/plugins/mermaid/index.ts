import { defineComponent, h, onBeforeMount, ref, onMounted, onBeforeUnmount } from 'vue'
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
    let configObj = {} as any
    try {
      configObj = JSON.parse(props.config?.replace(/\'/g, '\"') || '{}')
    } catch (e) {
      console.error(e)
    } finally {
      configObj = Object.assign({}, baseConfig, configObj)
    }
    const render = async () => {
      const isDark = document.documentElement.classList.contains('dark')
      Mermaid.mermaidAPI.initialize({
        ...configObj,
        theme: isDark ? 'dark' : configObj.theme ?? 'default'
      })
      Mermaid.mermaidAPI.render(id, props.code, svgCode => {
        content.value = svgCode
      })
    }
    let mo: MutationObserver

    onMounted(async () => {
      await render()
      mo = new MutationObserver((record, ob) => {
        render()
      })
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    })
    onBeforeUnmount(() => mo.disconnect())

    onBeforeMount(render)
    return () =>
      [h('div', {
        ref: el,
        class: ['mermaid-svg-wrapper', 'mermaid'],
        innerHTML: content.value
      })]
  }
})
