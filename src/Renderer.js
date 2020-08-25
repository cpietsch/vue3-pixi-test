import { h } from 'vue'
import { useRenderer} from "./use/Renderer.js"


export default {
  setup(props) {
    const { canvasEl, wrapperEl } = useRenderer()

    return () =>
      h('div', { ref: wrapperEl }, h('canvas', { ref: canvasEl }))
  }
}